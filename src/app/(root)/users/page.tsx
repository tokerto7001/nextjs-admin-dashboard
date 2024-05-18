import { db } from "@/db"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

export default async function UsersPage(){

    const users = await db.user.findMany({
        select: {
            email: true,
            id: true,
            isAdmin: true
        }
    });

    return (
        <div className="p-5 mt-3">
            <Table>
            <TableCaption>A list of users.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>isAdmin</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {
                users.map((user) => (
                    <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.isAdmin ? 'TRUE' : 'FALSE'}</TableCell>
                    </TableRow>
                ))
            }

            </TableBody>
            </Table>

        </div>
    )
};