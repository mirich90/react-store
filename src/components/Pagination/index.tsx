import ReactPaginate from "react-paginate";
import IPaginationProps from "../../interfaces/IPaginationProps";
import styles from "./Pagination.module.scss";

export const Pagination: React.FC<IPaginationProps> = ({
  lengthPage,
  onChangePage,
  currentPage,
}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={lengthPage}
      forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
