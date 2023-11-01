import { Container as MapDiv, Marker, NaverMap, useNavermaps } from "react-naver-maps";
import DrawerComponent from "../components/DrawerComponent";
import NavigationBar from "../components/NavigationBar";
import useGeolocation from "../hooks/useGeolocation";
import { useRecoilState } from "recoil";
import coordinateState from "../states/coordinates";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
export interface ICoordinate {
  mapX: string;
  mapY: string;
}
export interface IAddress {
  jibunAddress: string;
  roadAddress: string;
}
function Places() {
  const navermaps = useNavermaps();
  const location = useGeolocation();
  const [currentAddr, setCurrentAddr] = useState<IAddress>();
  useEffect(() => {
    if (location.loaded) {
      console.log(location.coordinates);
      naver.maps.Service.reverseGeocode(
        {
          coords: new naver.maps.LatLng(location.coordinates!.lat, location.coordinates!.lng),
        },
        (status, response) => {
          if (status !== naver.maps.Service.Status.OK) {
            return alert("Something wrong!");
          }

          setCurrentAddr(response.v2.address); // 검색 결과의 컨테이너
        },
      );
    }
  }, [location.loaded]);
  const [coordinates, setCoordinates] = useRecoilState<ICoordinate[]>(coordinateState);
  return (
    <>
      <MapDiv
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {location.loaded && (
          <NaverMap
            defaultCenter={
              new navermaps.LatLng(location.coordinates!.lat, location.coordinates!.lng)
            }
            defaultZoom={18}
            disableKineticPan={false}
            zoomControl
            zoomControlOptions={{
              position: navermaps.Position.TOP_RIGHT,
            }}
            minZoom={8}
            maxZoom={21}
          >
            {coordinates.length &&
              coordinates.map((coordinate, idx) => {
                const lat = coordinate.mapY;
                const lng = coordinate.mapX;
                return (
                  <Marker
                    key={`좌표${idx}`}
                    position={new navermaps.LatLng(parseFloat(lat), parseFloat(lng))}
                  />
                );
              })}
            <Marker
              position={new navermaps.LatLng(location.coordinates!.lat, location.coordinates!.lng)}
            />
          </NaverMap>
        )}
      </MapDiv>
      <DrawerComponent setCoordinates={setCoordinates} currentAddr={currentAddr} />
      <NavigationBar />
    </>
  );
}

export default Places;
