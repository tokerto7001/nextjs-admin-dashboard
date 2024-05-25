import { db } from "@/db";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertStoM } from "@/utils/convertStoM";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateCourseForm from "@/components/courses/create-course-form";

export default async function CoursesPage() {
  const courses = await db.course.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      duration: true,
      imageName: true,
    },
  });

  return (
    <div className="p-5 mt-3">
      <div className="flex justify-end mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Course</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">
                Create a new course
              </DialogTitle>
              <DialogDescription asChild>
                <div className="h-96 p-5 flex justify-center">
                  <CreateCourseForm />
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableCaption>A list of courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead></TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-center">Description</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <Link href={`/courses/${course.id}`} key={course.id} legacyBehavior>
              <TableRow className="cursor-pointer">
                <TableCell>{course.id}</TableCell>
                <TableCell>
                  <Image
                    src={`/${course.imageName}`}
                    alt="Course Image"
                    width={75}
                    height={75}
                  />
                </TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>{convertStoM(course.duration)}</TableCell>
              </TableRow>
            </Link>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
