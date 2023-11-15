import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { BiSearch } from "react-icons/bi";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { SetterOrUpdater, useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { useCategoryQuery, useSearchQuery } from "../hooks/usePlaceQuery";
import Loading from "../pages/Loading";
import { ICoordinate } from "../pages/Places";
import { userState } from "../states/useUser";
import RenderPlaces from "./RenderPlaces";

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
  font-family: NanumSquareNeoBold;
`;

const NickName = styled.b`
  background: linear-gradient(90deg, #3fd5de, #2deea8); /* 가로 그라데이션 */
  color: transparent; /* 텍스트 색상을 투명하게 만듦 */
  -webkit-background-clip: text; /* 텍스트에만 적용 */
  font-size: 20px;
  font-family: NanumSquareNeoExtraBold;
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

const Observer = styled.div`
  margin-top: 16px;
  width: fit-content;
  height: fit-content;
  color: var(--emerald);
`;
const UpButtonWrapper = styled.div`
  cursor: pointer;
`;

const categoryButtons = ["맛집", "병원", "관광지"];

function DrawerComponent({ setCoordinates, currentCoord, setIsWork }: IDrawerComponent) {
  const [showDrawer, setShowDrawer] = useState(true);
  const [category, setCategory] = useState("맛집");
  const [inputSearch, setInputSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const observerElem = useRef<HTMLDivElement>(null);
  const drawer = useRef<HTMLDivElement>(null);

  const { nickname } = useRecoilValue(userState);

  const {
    data: categoryData,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage: isFetchingNextCategoryPage,
    refetch: refetchCategory,
    remove: removeCategory,
  } = useCategoryQuery(category, currentCoord.mapY, currentCoord.mapX);

  const {
    data: searchData,
    hasNextPage: hasNextSearch,
    fetchNextPage: fetchNextSearch,
    refetch: refetchSearch,
    isFetchingNextPage: isFetchingNextSearchPage,
    remove: removeSearch,
  } = useSearchQuery(inputSearch, currentCoord.mapY, currentCoord.mapX);

  const handleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (isSearch) {
        if (target.isIntersecting && hasNextSearch) {
          fetchNextSearch();
        }
      }
      if (!isSearch) {
        if (target.isIntersecting && hasNextPage && category) {
          fetchNextPage();
        }
      }
    },
    [category, hasNextPage, hasNextSearch],
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };
  const fetchSearchData = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setCategory("");
        await handleClick();
      }
    },
    [inputSearch],
  );
  const handleClick = useCallback(async () => {
    setIsSearch(false);
    setIsSearch(true);
    setCategory("");
    removeCategory();
    removeSearch();
    refetchSearch();
  }, [inputSearch, isSearch]);
  const goTop = () => {
    drawer.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (isSearch) {
      if (searchData) {
        setCoordinates!(
          searchData.pages.flatMap((page: any) =>
            page!.documents.map((place: IPlaceItem) => {
              return { mapX: place.x, mapY: place.y };
            }),
          ),
        );
        setIsWork(true);
      }
    } else {
      if (isSuccess && categoryData) {
        setCoordinates!(
          categoryData.pages.flatMap((page: any) =>
            page!.documents.map((place: IPlaceItem) => {
              return { mapX: place.x, mapY: place.y };
            }),
          ),
        );
        setIsWork(true);
      }
    }
  }, [isSearch, categoryData, searchData]);

  useEffect(() => {
    const element = observerElem.current;
    const option = { threshold: 0 };

    const observer = new IntersectionObserver(handleObserver, option);
    element && observer.observe(element);
    return () => {
      element && observer.unobserve(element);
    };
  }, [fetchNextPage, hasNextPage, handleObserver, fetchNextSearch, hasNextSearch]);

  useEffect(() => {
    if (category) refetchCategory();
  }, [category]);

  return (
    <DrawerWrapper $isShow={showDrawer}>
      <Drawer ref={drawer}>
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
            disabled={!inputSearch}
          >
            <IconContext.Provider value={{ color: "white" }}>
              <BiSearch size={30} />
            </IconContext.Provider>
          </SearchButton>
        </SearchWrapper>
        <ContentsWrapper>
          <Text>
            {nickname && (
              <>
                <NickName>{nickname}&nbsp;</NickName>님을 위한 추천 스팟이에요
              </>
            )}
          </Text>
          <CategoryButtonWrapper>
            {categoryButtons.map((button: string) => {
              return (
                <CategoryButton
                  key={crypto.randomUUID()}
                  type="button"
                  value={button}
                  onClick={() => {
                    setIsSearch(false);
                    setCategory(button);
                    setInputSearch("");
                    removeSearch();
                  }}
                  className={category === button ? "active" : ""}
                />
              );
            })}
          </CategoryButtonWrapper>
          <PlacesWrapper data-testid="category">
            {isSearch
              ? searchData &&
                searchData.pages.map(
                  page => page && <RenderPlaces key={crypto.randomUUID()} data={page} />,
                )
              : isSuccess &&
                categoryData &&
                categoryData.pages.map(
                  page => page && <RenderPlaces key={crypto.randomUUID()} data={page} />,
                )}
            <Observer className="loader" ref={observerElem}>
              {(isFetchingNextSearchPage || isFetchingNextCategoryPage) &&
              (hasNextPage || hasNextSearch) ? (
                <Loading />
              ) : (
                !(hasNextPage || hasNextSearch) &&
                (searchData || categoryData) && (
                  <UpButtonWrapper onClick={goTop}>
                    <BsArrowUpCircleFill size={35} />
                  </UpButtonWrapper>
                )
              )}
            </Observer>
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
