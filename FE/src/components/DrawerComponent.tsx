import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { SetterOrUpdater } from "recoil";
import { styled } from "styled-components";
import { ICoordinate } from "../pages/Places";
import useQueryDebounce from "../hooks/useDebounceQuery";

interface IPlace {
  title: string;
  link?: string;
  category: string;
  address: string;
  mapx: string;
  mapy: string;
}
interface IDrawerComponent {
  setCoordinates: SetterOrUpdater<ICoordinate[]>;
}

const SearchWrapper = styled.div`
  width: 100%;
`;
const SearchButton = styled.button``;

const SearchBar = styled.input.attrs({ type: "text" })``;

const ContentsWrapper = styled.div`
  width: 100%;
  background-color: pink;
`;
const Text = styled.p`
  color: black;
`;

const CategoryButtonWrapper = styled.div`
  width: 100%;
`;
const CategoryButton = styled.input.attrs({ type: "button" })``;
const PlacesWrapper = styled.div`
  background-color: blue;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DrawerWrapper = styled.div<{ $isShow: boolean }>`
  top: 0px;
  height: 100%;
  transform: ${props => (props.$isShow ? "translateX(0%)" : "translateX(-100%)")};
  transition: 0.5s;
  box-shadow:
    rgba(0, 0, 0, 0.2) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 5px 0px 15px 0px;
  //media query 스타일이 360px미만일때 적용되게 됩니다.
`;
const Drawer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
  color: white;
  @media screen and (max-width: 360px) {
    width: 120px;
  }
  @media screen and (min-width: 360px) and (max-width: 780px) {
    width: 380px;
  }
  @media screen and (min-width: 780px) and (max-width: 1280px) {
    width: 400px;
  }
  @media screen and (min-width: 1280px) {
    width: 100%;
  }
`;
const DrawerButton = styled.button`
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  z-index: 10;
  overflow: hidden;
  display: inline-block;
  color: black;
  line-height: 1px;
  vertical-align: top;
  background-image: IoIosArrowBack;
  height: 80px;
  width: fit-content;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 0px 5px 5px 0px;
`;

function DrawerComponent({ setCoordinates }: IDrawerComponent) {
  const [showDrawer, setShowDrawer] = useState(true);
  const [category, setCategory] = useState("맛집");
  const [inputSearch, setInputSearch] = useState("");
  const debounceInputSearch = useQueryDebounce(inputSearch);
  const [isSearch, setIsSearch] = useState(false);
  const searchRef = useRef(null);
  const handleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const fetchPlaces = async (query: string) => {
    try {
      const response = await axios.get("/api/v1/search/local.json", {
        params: {
          query: query,
          display: 20,
          sort: "comment",
        },
        headers: {
          "X-Naver-Client-Id": process.env.VITE_NAVER_SEARCH_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.VITE_NAVER_SEARCH_CLIENT_SECRET,
        },
      });
      console.log(response.data.items);
      setCoordinates([
        ...response.data.items.map((ele: IPlace) => {
          return { mapx: ele.mapx, mapy: ele.mapy };
        }),
      ]);
      return response.data.items;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.errorCode === "SE01") {
          window.alert("검색어를 입력해주세요");
        }
      }
    }
  };
  const { data, isFetched, refetch } = useQuery({
    queryKey: ["places", category],
    queryFn: () => fetchPlaces(isSearch ? debounceInputSearch : category),
    suspense: false,
    refetchOnWindowFocus: false,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
    setIsSearch(true);
  };
  return (
    <DrawerWrapper $isShow={showDrawer}>
      <Drawer>
        <SearchWrapper>
          <SearchBar
            placeholder="검색"
            type="text"
            ref={searchRef}
            onChange={handleSearch}
            value={inputSearch}
          />
          <SearchButton onClick={() => refetch()}>검색</SearchButton>
        </SearchWrapper>
        <ContentsWrapper>
          <Text>이순자 님을 위한 추천 스팟이에요</Text>
          <CategoryButtonWrapper>
            <CategoryButton
              type="button"
              value="맛집"
              onClick={() => {
                setIsSearch(false);
                setCategory("맛집");
              }}
            />
            <CategoryButton
              type="button"
              value="공연"
              onClick={() => {
                setIsSearch(false);
                setCategory("공연");
              }}
            />
            <CategoryButton type="button" value="휴양지" onClick={() => setCategory("휴양지")} />
          </CategoryButtonWrapper>
          <PlacesWrapper data-testid="category">
            {isFetched && data.map((place: IPlace) => <div key={place.title}>{place.title}</div>)}
          </PlacesWrapper>
        </ContentsWrapper>
      </Drawer>
      <DrawerButton onClick={handleDrawer}>
        {showDrawer ? <MdArrowBackIosNew /> : <MdArrowForwardIos />}
      </DrawerButton>
    </DrawerWrapper>
  );
}

export default DrawerComponent;
