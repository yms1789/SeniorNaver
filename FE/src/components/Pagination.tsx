import styled from "styled-components";

const PaginationBox = styled.div`
  display: flex;
`;
const PaginationButton = styled.button`
  font-family: "NanumSquareNeoRegular";
  font-size: 18px;
  color: var(--gray02);
  background: var(--white);
  border: 1px solid var(--gray02);
  border-radius: 10px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 5px;
  width: 75px;
  height: 40px;
  &:hover {
    border: 2px solid transparent;
    padding: 5px;
    background: linear-gradient(97.76deg, #3fd5de 3.15%, #2deea8 76.87%) transparent;
  }
  &:active {
    border: 3px solid rgba(0, 0, 0, 0.3);
  }
`;
function Pagination({
  totalPages,
  setCurrentPage,
  currentPage,
}: {
  totalPages: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}) {
  const pageList: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageList.push(i);
    window.scrollTo(0, 0);
  }

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo(0, 0);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
    window.scrollTo(0, 0);
  };

  return (
    <PaginationBox>
      <PaginationButton onClick={goToPrevPage} disabled={currentPage === 1}>
        prev
      </PaginationButton>

      {pageList.map((page: any) => (
        <PaginationButton
          key={page}
          onClick={() => setCurrentPage(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </PaginationButton>
      ))}

      <PaginationButton onClick={goToNextPage} disabled={currentPage === pageList.length}>
        next
      </PaginationButton>
    </PaginationBox>
  );
}
export default Pagination;
