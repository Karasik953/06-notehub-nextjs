import ReactPaginate from "react-paginate"
import css from "./Pagination.module.css"

interface PaginationProps {
  pageCount: number
  onPageChange: (page: number) => void
  currentPage: number
}

export default function Pagination({
  pageCount,
  onPageChange,
  currentPage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={(e) => onPageChange(e.selected + 1)}
      previousLabel="← Prev"
      nextLabel="Next →"
      containerClassName={css.pagination}
      activeClassName={css.active}
      breakLabel="..."
    />
  )
}
