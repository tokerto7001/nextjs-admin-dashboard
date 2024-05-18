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

  return (
    <div className="m-20 flex justify-between">
      <Card className="w-96 h-96 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">{course.title}</CardTitle>
          <CardDescription className="flex justify-center items-center !mt-5">
            <Image
                src={`/${course.imageName}`}
                alt="Course Image"
                width={200}
                height={200}
            />
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center mt-4">
          <p>{course.description}</p>
        </CardContent>
        <CardContent className="flex items-center justify-center mt-4">
          <p>{convertStoM(course.duration)}</p>
        </CardContent>
      </Card>
      <Card className="w-96 h-96">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
