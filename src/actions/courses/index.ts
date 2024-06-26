"use server";

import { db } from "@/db";
import { generateString } from "@/utils/generateString";
import { User } from "@prisma/client";
import { writeFile, unlink } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export interface CreateCourseFormState {
  error: {
    title?: string[];
    description?: string[];
    duration?: string[];
    image?: string[];
    _form?: string[];
    toastError?: string;
  };
  success?: boolean;
}

const ACCEPTED_MIME_TYPES = ["image/gif", "image/jpeg", "image/png"];

const createCourseSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  duration: z
    .string()
    .transform((duration) => Number(duration))
    .refine((duration) => !isNaN(duration), {
      message: "Expected number, received string",
    }),
  image: z
    .instanceof(File)
    .refine((file) => ACCEPTED_MIME_TYPES.includes(file.type), {
      message: "This type of file is not supported",
    }),
});

export async function createCourse(
  formState: CreateCourseFormState,
  formData: FormData
): Promise<CreateCourseFormState> {
  const title = formData.get("title");
  const description = formData.get("description");
  const duration = formData.get("duration");
  const image = formData.get("image");
  const validationResult = createCourseSchema.safeParse({
    title,
    description,
    duration,
    image,
  });

  if (!validationResult.success)
    return {
      error: {
        ...validationResult.error.flatten().fieldErrors,
        _form: validationResult.error.flatten().formErrors,
      },
    };

    const { title: validatedTitle, description: validatedDescription, duration: validatedDuration, image: validatedImage } = validationResult.data;

    try{
        const courseExists = await db.course.findFirst({
            where: {
                title: validatedTitle
            }
        });
    
        if(courseExists) return {
            error: {
                toastError: 'There is already a course with the same name'
            },
            success: false
        };

        const imageName = generateString();
        const imageExtension = validatedImage.type.split('/')[1];

        await writeFile(`public/${imageName}.${imageExtension}`, Buffer.from(await validatedImage.arrayBuffer()));
        await db.course.create({
            data: {
                title: validatedTitle,
                description: validatedDescription,
                duration: validatedDuration,
                imageName: `${imageName}.${imageExtension}`
            }
        });
    } catch(err) {
        return {
            success: false,
            error: {
                toastError: 'Something went wrong!'
            }
        }
    }

    revalidatePath('/courses');
  return {
    error: {},
    success: true
  };
}

export async function deleteCourse(id: number): Promise<void>{
  try{
    await db.$transaction(async(tx) => {
      await tx.userCourses.deleteMany({
        where: {
          courseId: id
        }
      });
      const course = await tx.course.findFirst({
        where: {
          id
        }
      });
      await unlink(`./public/${course?.imageName}`);
      await tx.course.delete({
        where: {
          id
        }
      });
    });
  }catch(err) {
    console.log(err);
  }

  revalidatePath('/courses');
  redirect('/courses')
}

const getUnenrolledUsersSchema = z.object({
  email: z.string(),
  courseId: z.number()
})
export async function getUnenrolledUsers(email: string, courseId: number): Promise<Pick<User, 'email' | 'id'>[]> {
  try{
    const validationResult = getUnenrolledUsersSchema.safeParse({email, courseId});
    if(!validationResult.success) {
      console.log(validationResult.error)
      throw Error(validationResult.error.flatten().fieldErrors.email?.toString());
    }

    const users = await db.user.findMany({
      where: {
        email: {
          startsWith: email,
        },
        courses: {
          none: {
            courseId
          }
        }
      },
      select: {
        id: true,
        email: true
      },
      take: 5
    });
    
    return users;

  }catch(err: any){
    throw err;
  }
}

const enrollUserToCourseSchema = z.object({
  userId: z.number(),
  courseId: z.number()
});
interface EnrollUserToCourseFormState {
  error: {
    courseId?: string[];
    userId?: string[];
    _form?: string[];
  }
  success?: {
    message: string;
  }
}
export async function enrollUserToCourse(courseId: number, userId?: number, ): Promise<EnrollUserToCourseFormState>{
  try{
    const validationResult = enrollUserToCourseSchema.safeParse({userId, courseId});
    if(!validationResult.success) {
      return {
        error: {
          ...validationResult.error.flatten().fieldErrors,
          _form: validationResult.error.flatten().formErrors,
        },
      }
    }
  
    const user = await db.user.findFirst({
      where: {
        id: userId
      }
    });
    if(!user) return {
      error: {
        userId: ['User not found!']
      }
    }
  
    const course = await db.course.findFirst({
      where: {
        id: courseId
      }
    });
    if(!course) return {
      error: {
        userId: ['Course not found!']
      }
    }

    const userRecord = await db.userCourses.findFirst({
      where: {
        courseId: validationResult.data.courseId,
        userId: validationResult.data.userId
      }
    });
    if(userRecord) {
      return {
        error: {
          _form: ['User already enrolled!']
        }
      }
    };
    
    await db.userCourses.create({
      data: {
        courseId: validationResult.data.courseId,
        userId: validationResult.data.userId
      }
    });
  
  }catch(err: any) {
    return {
      error: {
        _form: ['Something went wrong'!]
      }
    }
  }

  revalidatePath(`/courses/${courseId}`);
  return {
    error: {},
    success: {
      message: 'User enrolled successfully!'
    }
  }
}