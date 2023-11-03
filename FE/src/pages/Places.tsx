import { Container as MapDiv, Marker, NaverMap, useNavermaps } from "react-naver-maps";
import DrawerComponent from "../components/DrawerComponent";
import NavigationBar from "../components/NavigationBar";
import useGeolocation from "../hooks/useGeolocation";
import { useRecoilState } from "recoil";
import coordinateState from "../states/coordinates";
import { useEffect, useRef, useState, Suspense } from "react";
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
  // const [mapState, setMapState] = useState(null);s
  const map = useRef<naver.maps.Map>(null);

  const [isWork, setIsWork] = useState(false);

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

  useEffect(() => {
    if (map.current && isWork && coordinates.length) {
      const cpCoord = [...coordinates];
      cpCoord.sort((a: ICoordinate, b: ICoordinate) => {
        return parseFloat(a.mapY) - parseFloat(b.mapY);
      });
      const [minLat, maxLat] = [cpCoord[0].mapY, cpCoord[coordinates.length - 1].mapY];
      cpCoord.sort((a: ICoordinate, b: ICoordinate) => {
        return parseFloat(a.mapX) - parseFloat(b.mapX);
      });
      const [minLng, maxLng] = [cpCoord[0].mapX, cpCoord[coordinates.length - 1].mapX];

      const boundary = new navermaps.LatLngBounds(
        new navermaps.LatLng(parseFloat(minLat), parseFloat(minLng)),
        new navermaps.LatLng(parseFloat(maxLat), parseFloat(maxLng)),
      );
      map.current.fitBounds(boundary);
    }
    setIsWork(false);
  }, [isWork]);

  return (
    <>
      <Suspense fallback={<div>로딩 중...</div>}>
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
              ref={map}
              defaultCenter={
                new navermaps.LatLng(location.coordinates!.lat, location.coordinates!.lng)
              }
              defaultZoom={10}
              disableKineticPan={false}
              zoomControl
              zoomControlOptions={{
                position: navermaps.Position.TOP_RIGHT,
              }}
              minZoom={8}
              maxZoom={13}
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
            </NaverMap>
          )}
        </MapDiv>
        <DrawerComponent
          setCoordinates={setCoordinates}
          currentAddr={currentAddr}
          setIsWork={setIsWork}
        />
        <NavigationBar />
      </Suspense>
    </>
  );
}

export default Places;
