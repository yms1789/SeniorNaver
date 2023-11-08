import { useEffect, useRef, useState } from "react";
import { Container as MapDiv, Marker, NaverMap } from "react-naver-maps";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import DrawerComponent from "../components/DrawerComponent";
import Error from "../components/Error";
import NavigationBar from "../components/NavigationBar";
import useGeolocation from "../hooks/useGeolocation";
import coordinateState from "../states/coordinates";
import { ErrorBoundary } from "react-error-boundary";
export interface ICoordinate {
  mapX: string;
  mapY: string;
}

const PlacesWrapper = styled.div`
  display: flex;
`;

function Places({ navermaps }: { navermaps: typeof naver.maps }) {
  const location = useGeolocation();
  const [currentCoord, setcurrentCoord] = useState<ICoordinate>();
  const map = useRef<naver.maps.Map>(null);
  const [coordinates, setCoordinates] = useRecoilState<ICoordinate[]>(coordinateState);

  const [isWork, setIsWork] = useState(false);

  useEffect(() => {
    if (location.loaded) {
      console.log(location.coordinates);
      setcurrentCoord({
        mapX: "" + location.coordinates?.lng,
        mapY: "" + location.coordinates?.lat,
      });
    }
  }, [location.loaded]);

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
      map.current.panToBounds(boundary);
    }
    setIsWork(false);
  }, [isWork]);

  return (
    <PlacesWrapper>
      <ErrorBoundary fallbackRender={Error}>
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
              {coordinates.length
                ? coordinates.map((coordinate, idx) => {
                    const lat = coordinate.mapY;
                    const lng = coordinate.mapX;
                    return (
                      <Marker
                        key={`좌표${idx}`}
                        position={new navermaps.LatLng(parseFloat(lat), parseFloat(lng))}
                      />
                    );
                  })
                : currentCoord && (
                    <Marker
                      position={
                        new navermaps.LatLng(
                          parseFloat(currentCoord!.mapY),
                          parseFloat(currentCoord!.mapX),
                        )
                      }
                    />
                  )}
            </NaverMap>
          )}
        </MapDiv>
        {currentCoord && (
          <DrawerComponent
            setCoordinates={setCoordinates}
            currentCoord={currentCoord}
            setIsWork={setIsWork}
          />
        )}
        <NavigationBar />
      </ErrorBoundary>
    </PlacesWrapper>
  );
}

export default Places;
