import styled from "styled-components";
import Carousel from "../components/Carousel";
import CurationCategoryButton from "../components/CurationCategoryButton";
import RoundedButton from "../components/RoundedButton";
import News from "../components/News";

const HomeWrapper = styled.div`
  background-color: var(--white);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-base);
  color: var(--dark02);
  padding: 0;
  font-family: "NanumSquare Neo ExtraBold";
`;

function Home() {
  const images = [
    "https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg",
    "https://png.pngtree.com/thumb_back/fh260/background/20210902/pngtree-into-the-june-sunflower-background-image_788302.jpg",
    "https://png.pngtree.com/thumb_back/fh260/background/20230803/pngtree-blue-sky-and-sunflowers-image_12987016.jpg",
    "https://www.urbanbrush.net/web/wp-content/uploads/edd/2022/12/urbanbrush-20221214144619159434.jpg",
    "https://cdn.crowdpic.net/list-thumb/thumb_l_D623AE308211C3678E61EC0E3FF3C969.jpg",
    "https://png.pngtree.com/background/20230314/original/pngtree-dramatic-sky-and-clouds-dramatic-sky-and-clouds-summer-ultramarine-outdoor-picture-image_2136784.jpg",
  ];

  return (
    <HomeWrapper>
      <Carousel images={images} />
      {/* <CurationCategoryButton /> */}
      {/* <News /> */}
      {/* <RoundedButton /> */}
    </HomeWrapper>
  );
}

export default Home;
