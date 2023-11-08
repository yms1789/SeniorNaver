import { Suspense, useCallback, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { BiSearch } from "react-icons/bi";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { SetterOrUpdater } from "recoil";
import { styled } from "styled-components";
import { fetchSearch, useCategoryQuery } from "../hooks/usePlaceQuery";
import Loading from "../pages/Loading";
import { ICoordinate } from "../pages/Places";

export type IPlaceItem = {
  place_name: string;
  place_url: string;
  category_name: string;
  thumbnail: string;
  address_name: string;
  id: string;
  category_group_name: string;
  x: string;
  y: string;
};
interface IDrawerComponent {
  setCoordinates?: SetterOrUpdater<ICoordinate[]>;
  currentCoord: ICoordinate;
  setIsWork: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchWrapper = styled.div`
  @media screen and (min-width: 400px) and (max-width: 780px) {
    width: 300px;
  }
  width: fit-content;
  margin: 0 auto;
  padding: 12px;
  display: flex;
`;
const SearchButton = styled.button`
  background-color: var(--gray02);
  margin-left: 4px;
  font-size: 16px;
  padding: 4px;
  font-family: NanumSquareNeoReuglar;
`;

const SearchBar = styled.input.attrs({ type: "text" })`
  padding: 10px 6px;
  width: 300px;
  ::placeholder {
    font-family: NanumSquareNeoReuglar;
  }
  border-radius: 6px;
`;

const ContentsWrapper = styled.div`
  width: 100%;
`;
const Text = styled.p`
  color: black;
  padding: 5px 10px;
  font-family: NanumSquareNeoReuglar;
`;

const CategoryButtonWrapper = styled.div`
  width: fit-content;
  margin: 0 auto;
`;
const CategoryButton = styled.input.attrs({ type: "button" })`
  background-color: var(--gray02);
  border: none;
  @media screen and (min-width: 400px) and (max-width: 780px) {
    padding: 12px 16px;
  }
  padding: 12px 20px;
  margin-right: 12px;
  border-radius: 20px;
  font-size: 16px;
  margin-top: 10px;
  font-family: NanumSquareNeoBold;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f74245;
  }
  &.active {
    background-color: #f74245;
  }
`;
const PlacesWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
  overflow-y: scroll;
  background-color: #ffffff;
  color: white;
  @media screen and (max-width: 400px) {
    display: none;
  }
  @media screen and (min-width: 400px) and (max-width: 780px) {
    width: 300px;
  }
  @media screen and (min-width: 780px) and (max-width: 1030px) {
    width: 400px;
  }
  @media screen and (min-width: 1030px) {
    width: 450px;
  }
`;
const DrawerButton = styled.button`
  @media screen and (max-width: 400px) {
    display: none;
  }
  background-color: white;
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

const PlaceText = styled.p`
  font-family: NanumSquareNeoExtraBold;
  display: inline;
  text-align: start;
  color: black;
  font-size: 20px;
  width: fit-content;
`;
const PlaceDetail = styled.p`
  display: inline;
  text-align: end;
  font-family: NanumSquareNeoRegular;
  color: var(--gray02);
  font-size: 16px;
  width: fit-content;
  overflow: hidden;
`;
const PlaceImage = styled.img`
  object-fit: fill;
  width: 100%;
  height: 200px;
  border-radius: 10px;
`;
const PlaceWrapper = styled.a`
  border-top: 2px solid var(--gray03);
  border-bottom: 2px solid var(--gray03);
  margin-top: -2px;
  padding: 10px 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  cursor: pointer;
  &:hover {
    background-color: lightblue;
  }
`;

function DrawerComponent({ setCoordinates, currentCoord, setIsWork }: IDrawerComponent) {
  const [showDrawer, setShowDrawer] = useState(true);
  const [category, setCategory] = useState("맛집");
  const [inputSearch, setInputSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState<IPlaceItem[] | undefined>([]);
  const handleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  const { data: categoryData, isFetched: isCategoryFetched } = useCategoryQuery(
    category,
    currentCoord.mapY,
    currentCoord.mapX,
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };
  const fetchSearchData = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        await handleClick();
      }
    },
    [inputSearch],
  );
  const handleClick = useCallback(async () => {
    setIsLoading(true);
    const response = await fetchSearch(inputSearch, currentCoord.mapY, currentCoord.mapX);
    setSearchData(response);
    setIsLoading(false);
    setIsSearch(true);
  }, [inputSearch]);

  useEffect(() => {
    if (isSearch) {
      if (searchData) {
        setCoordinates!([
          ...searchData.map((ele: IPlaceItem) => {
            return { mapX: ele.x, mapY: ele.y };
          }),
        ]);
        setIsWork(true);
      }
    } else {
      if (isCategoryFetched && categoryData) {
        setCoordinates!([
          ...categoryData.map((ele: IPlaceItem) => {
            return { mapX: ele.x, mapY: ele.y };
          }),
        ]);
        setIsWork(true);
      }
    }
  }, [isSearch, categoryData, searchData]);
  if (isLoading) {
    <Loading />;
  }

  return (
    <DrawerWrapper $isShow={showDrawer}>
      <Drawer>
        <SearchWrapper>
          <SearchBar
            placeholder="검색"
            type="text"
            onChange={handleSearch}
            value={inputSearch}
            onKeyDown={fetchSearchData}
          />
          <SearchButton
            onClick={() => {
              handleClick();
            }}
          >
            <IconContext.Provider value={{ color: "white" }}>
              <BiSearch size={30} />
            </IconContext.Provider>
          </SearchButton>
        </SearchWrapper>
        <ContentsWrapper>
          <Text>
            <b>이순자</b> 님을 위한 추천 스팟이에요
          </Text>
          <CategoryButtonWrapper>
            <CategoryButton
              type="button"
              value="맛집"
              onClick={() => {
                setIsSearch(false);
                setCategory("맛집");
                setInputSearch("");
              }}
              className={category === "맛집" ? "active" : ""}
            />
            <CategoryButton
              type="button"
              value="병원"
              onClick={() => {
                setIsSearch(false);
                setCategory("병원");
                setInputSearch("");
              }}
              className={category === "병원" ? "active" : ""}
            />
            <CategoryButton
              type="button"
              value="관광지"
              onClick={() => {
                setIsSearch(false);
                setCategory("관광지");
              }}
              className={category === "관광지" ? "active" : ""}
            />
          </CategoryButtonWrapper>
          <Suspense fallback={<Loading />}>
            <PlacesWrapper data-testid="category">
              {isSearch
                ? searchData &&
                  searchData.map((place: IPlaceItem) => {
                    return (
                      <PlaceWrapper key={place.place_name} href={place.place_url} target="_blank">
                        <PlaceImage src={place.thumbnail} referrerPolicy="no-referrer" />
                        <PlaceText data-testid="title">{place.place_name}</PlaceText>
                        <PlaceDetail>{place.address_name}</PlaceDetail>
                      </PlaceWrapper>
                    );
                  })
                : isCategoryFetched &&
                  categoryData &&
                  categoryData.map((place: IPlaceItem) => {
                    return (
                      <PlaceWrapper key={place.place_name} href={place.place_url} target="_blank">
                        <PlaceImage src={place.thumbnail} referrerPolicy="no-referrer" />
                        <PlaceText data-testid="title">{place.place_name}</PlaceText>
                        <PlaceDetail>{place.address_name}</PlaceDetail>
                      </PlaceWrapper>
                    );
                  })}
            </PlacesWrapper>
          </Suspense>
        </ContentsWrapper>
      </Drawer>
      <DrawerButton onClick={handleDrawer}>
        {showDrawer ? <MdArrowBackIosNew /> : <MdArrowForwardIos />}
      </DrawerButton>
    </DrawerWrapper>
  );
}

export default DrawerComponent;
