import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

function Pagination({ data, currentPage, title }: { data: { totalPages: number, hasPrevPage: boolean, hasNextPage: boolean }, currentPage: number, title: string }) {

    return (
        <div className="pagination">
            {data.hasPrevPage && (
                <Link
                    href={`/${title}${currentPage > 2 ? `?page=${currentPage - 1}` : ''}`}
                    className="page-btn"
                    aria-label="Go to previous page"
                >
                    <ChevronLeft />
                    Previous
                </Link>
            )}
            <button className="page-btn">{currentPage} of {data.totalPages}</button>
            {data.hasNextPage && (
                <Link
                    href={`/${title}?page=${currentPage + 1}`}
                    className="page-btn"
                    aria-label="Go to next page"
                >
                    Next
                    <ChevronRight  />
                </Link>
            )}
        </div>
    )
}

export default Pagination