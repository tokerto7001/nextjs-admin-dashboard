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
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  
interface UsersPageProps {
    searchParams: {
        page: string;
    }
}
export default async function UsersPage({searchParams}: UsersPageProps){

    const { page = 1 } = searchParams;
    if(isNaN(+page)) redirect('/users')
    const offset = (+page - 1) * 10; 

    // console.log(+page - 1 < 1)

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
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                    <PaginationPrevious disabled={+page - 1 < 1} href={`/users?page=${+page - 1}`} />
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationNext disabled={users.length < 10} href={`/users?page=${+page + 1}`} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
};