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
import { redirect } from "next/navigation";
import Pagination from "@/components/shared/pagination";

interface UsersPageProps {
    searchParams: {
        page: string;
    }
}
export default async function UsersPage({searchParams}: UsersPageProps){

    const { page = 1 } = searchParams;
    if(isNaN(+page)) redirect('/users')
    const offset = (+page - 1) * 10; 

    const users = await db.user.findMany({
        select: {
            email: true,
            id: true,
            isAdmin: true
        },
        skip: offset,
        take: 10
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
                users.map((user, idx) => (
                    <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.isAdmin ? 'TRUE' : 'FALSE'}</TableCell>
                    </TableRow>
                ))
            }

            </TableBody>
            </Table>
            <Pagination
                previousDisabled={Boolean(+page - 1 < 1)}
                nextDisabled={users.length < 10}
                previousHref={`/users?page=${+page - 1}`}
                nextHref={`/users?page=${+page + 1}`}
            />
        </div>
    )
};