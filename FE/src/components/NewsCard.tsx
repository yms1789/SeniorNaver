import styled from "styled-components";

const Slide1692 = styled.img`
  align-self: stretch;
  flex: 1;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  object-fit: cover;
`;
const Slide1691 = styled.div`
  width: 23.63rem;
  height: 12.5rem;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 18.75rem;
  max-width: 23.63rem;
  min-height: 10.5rem;
  max-height: 12.5rem;
`;
const B7 = styled.b`
  align-self: stretch;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const B1 = styled.div`
  position: relative;
`;
const VectorIcon = styled.img`
  position: relative;
  width: 1.39rem;
  height: 1.25rem;
`;
const FrameDiv = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  color: var(--gray02);
`;
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--gap-5xl);
`;
const Cardnews = styled.div`
  flex: 1;
  height: 17.63rem;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-xl);
  min-width: 18.75rem;
  max-width: 23.63rem;
`;

function NewsCard() {
  return (
    <Cardnews>
      <Slide1691>
        <Slide1692 alt="" src="/slide-169--28@2x.png" />
      </Slide1691>
      <Container>
        <B7>
          택시기사들, 고령 운전 자격검사 '조직적 거부' 움직임택시기사들, 고령 운전 자격검사 '조직적
          거부' 움직임
        </B7>
        <FrameDiv>
          <B1>연합뉴스</B1>
          <VectorIcon alt="" src="/vector8.svg" />
        </FrameDiv>
      </Container>
    </Cardnews>
  );
}

export default NewsCard;
