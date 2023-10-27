import { Container as MapDiv, Marker, NaverMap, useNavermaps } from "react-naver-maps";
import DrawerComponent from "../components/DrawerComponent";
import NavigationBar from "../components/NavigationBar";
import useGeolocation from "../hooks/useGeolocation";
import { useRecoilState } from "recoil";
import coordinateState from "../states/coordinates";
export interface ICoordinate {
  mapx: string;
  mapy: string;
}
function Places() {
  const navermaps = useNavermaps();
  const location = useGeolocation();
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
                const lat = parseFloat(
                  coordinate.mapy.slice(0, 2) +
                    "." +
                    coordinate.mapy.slice(2, coordinate.mapy.length),
                );
                const lng = parseFloat(
                  coordinate.mapx.slice(0, 3) +
                    "." +
                    coordinate.mapx.slice(3, coordinate.mapx.length),
                );
                return <Marker key={`좌표${idx}`} position={new navermaps.LatLng(lat, lng)} />;
              })}
            <Marker
              position={new navermaps.LatLng(location.coordinates!.lat, location.coordinates!.lng)}
            />
          </NaverMap>
        )}
      </MapDiv>
      <DrawerComponent setCoordinates={setCoordinates} />
      <NavigationBar />
    </>
  );
}

export default Places;
