import styled from "styled-components";
import { IPlace } from "../hooks/usePlaceQuery";

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

function RenderPlaces({ data }: { data: IPlace }) {
  return data.documents.map((place: IPlaceItem) => {
    return (
      <PlaceWrapper key={place.place_name} href={place.place_url} target="_blank">
        <PlaceImage src={place.thumbnail} referrerPolicy="no-referrer" />
        <PlaceText data-testid="title">{place.place_name}</PlaceText>
        <PlaceDetail>{place.address_name}</PlaceDetail>
      </PlaceWrapper>
    );
  });
}

export default RenderPlaces;
