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
          <DialogTrigger>
            <Button>Add Course</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new course</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
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
