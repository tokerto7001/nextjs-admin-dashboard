import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

interface SharedPaginationProps {
    previousDisabled: boolean;
    nextDisabled: boolean;
    previousHref: string;
    nextHref: string;
}

export default function SharedPagination({
    previousDisabled = false,
    nextDisabled = false,
    previousHref,
    nextHref
    }
    : SharedPaginationProps){
    return (
        <Pagination>
        <PaginationContent>
            <PaginationItem>
            <PaginationPrevious disabled={previousDisabled} href={previousHref} />
            </PaginationItem>
            <PaginationItem>
            <PaginationNext disabled={nextDisabled} href={nextHref} />
            </PaginationItem>
        </PaginationContent>
    </Pagination>
    )
}