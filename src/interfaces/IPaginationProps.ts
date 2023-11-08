interface IPaginationProps {
  lengthPage: number;
  onChangePage: (pageId: number) => void;
  currentPage: number;
}
export default IPaginationProps;
