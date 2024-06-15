import { User, UserCourses } from "@prisma/client";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface EnrolledUsersAccordionItemProps {
    users: {
        id: number;
        isCompleted: boolean;
        userId: number;
        courseId: number;
        user: {
            id: number;
            email: string;
            password: string;
            isAdmin: boolean;
        }
    }[]

}

export default function EnrolledUsersAccordionItem({users}: EnrolledUsersAccordionItemProps){

    return (
        <div>
            <Table>
        <TableCaption>A list of courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            users.map((user) => (
                <TableRow key={user.userId}>
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>{user.user.email}</TableCell>
                    <TableCell>{user.isCompleted ? 'Completed' : 'Uncompleted'}</TableCell>
                </TableRow>
            ))
          }
        </TableBody>
      </Table>
        </div>
    )
}