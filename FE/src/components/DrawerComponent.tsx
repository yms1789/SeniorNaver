import { useEffect, useRef, useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { SetterOrUpdater } from "recoil";
import { styled } from "styled-components";
import useQueryDebounce from "../hooks/useDebounceQuery";
import { useCategoryQuery, useSearchQuery } from "../hooks/usePlaceQuery";
import { IAddress, ICoordinate } from "../pages/Places";
import { IconContext } from "react-icons";
import { BiSearch } from "react-icons/bi";

export type IPlace = {
  category: string;
  thumbnail: string;
  shopName: string;
  mapX: string;
  mapY: string;
  shopLocation: string;
};
interface IDrawerComponent {
  setCoordinates?: SetterOrUpdater<ICoordinate[]>;
  currentAddr?: IAddress;
}

const SearchWrapper = styled.div`
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
  padding: 12px;
  margin-right: 12px;
  border-radius: 20px;
  font-size: 16px;
  margin-top: 10px;
  font-family: NanumSquareNeoBold;
  color: white;
  &:hover {
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
  @media screen and (max-width: 360px) {
    display: none;
  }
  @media screen and (min-width: 360px) and (max-width: 780px) {
    width: 380px;
  }
  @media screen and (min-width: 780px) and (max-width: 1280px) {
    width: 400px;
  }
  @media screen and (min-width: 1280px) {
    width: 500px;
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
const PlaceWrapper = styled.div`
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
`;

function DrawerComponent({ setCoordinates, currentAddr }: IDrawerComponent) {
  const [showDrawer, setShowDrawer] = useState(true);
  const [category, setCategory] = useState("맛집");
  const [inputSearch, setInputSearch] = useState("");
  const debounceInputSearch = useQueryDebounce(inputSearch);
  const [isSearch, setIsSearch] = useState(false);
  const searchRef = useRef(null);
  const handleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  const { data: categoryData, isFetched: isSCategoryFetched } = useCategoryQuery(
    category,
    currentAddr?.jibunAddress,
  );

  const {
    data: searchData,
    isFetched: isSearchFetched,
    refetch,
  } = useSearchQuery(debounceInputSearch);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
    refetch();
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsSearch(true);
      refetch();
    }
    if (e.key === "Backspace") {
      setIsSearch(false);
    }
  };
  useEffect(() => {
    if (isSearch) {
      if (isSearchFetched && searchData) {
        setCoordinates!([
          ...searchData.map((ele: IPlace) => {
            return { mapX: ele.mapX, mapY: ele.mapY };
          }),
        ]);
      }
    } else {
      if (isSCategoryFetched && categoryData) {
        setCoordinates!([
          ...categoryData.map((ele: IPlace) => {
            return { mapX: ele.mapX, mapY: ele.mapY };
          }),
        ]);
      }
    }
  }, []);

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
            onKeyDown={handleKeyDown}
          />
          <SearchButton
            onClick={() => {
              setIsSearch(true);
              refetch();
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
            <CategoryButton
              type="button"
              value="휴양지"
              onClick={() => {
                setIsSearch(false);
                setCategory("휴양지");
              }}
            />
          </CategoryButtonWrapper>
          <PlacesWrapper data-testid="category">
            {isSearch
              ? isSearchFetched &&
                searchData &&
                searchData.map((place: IPlace) => {
                  return (
                    <PlaceWrapper key={place.shopName}>
                      <PlaceImage src={place.thumbnail} />
                      <PlaceText data-testid="title">{place.shopName}</PlaceText>
                      <PlaceDetail>{place.shopLocation}</PlaceDetail>
                    </PlaceWrapper>
                  );
                })
              : isSCategoryFetched &&
                categoryData &&
                categoryData.map((place: IPlace) => {
                  return (
                    <PlaceWrapper key={place.shopName}>
                      <PlaceImage src={place.thumbnail} />
                      <PlaceText data-testid="title">{place.shopName}</PlaceText>
                      <PlaceDetail>{place.shopLocation}</PlaceDetail>
                    </PlaceWrapper>
                  );
                })}
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
