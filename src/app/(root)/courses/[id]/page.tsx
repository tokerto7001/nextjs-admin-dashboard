import { db } from "@/db";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { convertStoM } from "@/utils/convertStoM";

interface CoursePageProps {
  params: {
    id: string;
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = params;
  if (isNaN(+id)) return notFound();

  const course = await db.course.findFirst({
    where: {
      id: +id,
    },
  });
  if (!course) return notFound();


  const enrolledUsers = await db.userCourses.findMany({
    where: {
        courseId: +id
    },
    include: {
        user: {
            select: {
                email: true,
            }
        }
    },
  });

  return (
    <div className="m-20 flex justify-between">
      <Card className="w-96 h-96 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">{course.title}</CardTitle>
          <CardDescription className="flex justify-center items-center">
            <Image
                src={`/${course.imageName}`}
                alt="Course Image"
                width={200}
                height={200}
            />
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <p>{course.description}</p>
        </CardContent>
        <CardContent className="flex items-center justify-center">
          <p>{enrolledUsers.length} user(s) enrolled this course</p>
        </CardContent>
        <CardContent className="flex items-center justify-center">
          <p>{convertStoM(course.duration)}</p>
        </CardContent>
      </Card>
      <Card className="w-96 h-96 shadow-lg overflow-scroll">
        <CardHeader>
          <CardTitle className="text-center">Enrolled Users</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col gap-3 p-2 over">
            {
                enrolledUsers.length && enrolledUsers.map((enrolledUser) => (
                        <div key={enrolledUser.id} className="flex justify-between">
                            <p>{enrolledUser.user.email}</p>
                            <p>{enrolledUser.isCompleted ? 'Completed' : 'Uncompleted'}</p>
                        </div>
                ))
            }
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
