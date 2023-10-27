import styled from "styled-components";
import NewsCategoryButton from "../components/NewsCategoryButton";
import NewsCard from "../components/NewsCard";

const CardnewsParent = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--gap-13xl);
  min-width: 37.5rem;
  max-width: 75rem;
`;
const PcInner = styled.div`
  position: absolute;
  width: calc(100% - 240px);
  top: 66.69rem;
  right: 7.47rem;
  left: 7.53rem;
  height: 60.88rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function News() {
  return (
    <>
      <NewsCategoryButton />
      <PcInner>
        <CardnewsParent>
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </CardnewsParent>
      </PcInner>
    </>
  );
}

export default News;
