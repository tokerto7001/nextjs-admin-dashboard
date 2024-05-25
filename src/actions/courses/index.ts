"use server";

import { db } from "@/db";
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

    try{
        const courseExists = await db.course.findFirst({
            where: {
                title: validationResult.data.title
            }
        });
    
        if(courseExists) return {
            error: {
                toastError: 'There is already a course with the same name'
            },
            success: false
        };
    } catch(err) {
        return {
            success: false,
            error: {
                toastError: 'Something went wrong!'
            }
        }
    }

  return {
    error: {},
  };
}
