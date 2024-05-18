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

export default async function CoursesPage() {
  const courses = await db.course.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      duration: true,
    },
  });

  return (
    <div className="p-5 mt-3">
      <Table>
        <TableCaption>A list of courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-center">Description</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course, idx) => (
            <TableRow key={course.id}>
              <TableCell>{course.id}</TableCell>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.description}</TableCell>
              <TableCell>{convertStoM(course.duration)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
