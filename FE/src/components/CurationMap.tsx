import { useEffect } from "react";
import { styled } from "styled-components";
import { TDataTravelDetail } from "../utils/types";
import { Container as MapDiv, NaverMap, Marker } from "react-naver-maps";

const CurationMapWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

interface TCurationMapProps {
  navermaps: typeof naver.maps;
  x: string;
  y: string;
  dataTravelDetail: TDataTravelDetail;
}

function CurationMap({ navermaps, x, y, dataTravelDetail }: TCurationMapProps) {
  useEffect(() => {
    if (x && y) {
      const mapOptions = {
        center: new navermaps.LatLng(parseFloat(y), parseFloat(x)),
        zoom: 20,
      };

      const map = new navermaps.Map("map", mapOptions);

      const markerIcon = {
        content: `<div style="width: 0px; height: 0px;"></div>`,
      };

      new navermaps.Marker({
        position: new navermaps.LatLng(parseFloat(y), parseFloat(x)),
        map: map,
        icon: markerIcon,
      });
    }
  }, [dataTravelDetail]);

  return (
    <CurationMapWrapper>
      <MapDiv
        id="map"
        style={{
          width: "150vw",
          height: "100vh",
        }}
      >
        <NaverMap defaultCenter={new navermaps.LatLng(parseFloat(y), parseFloat(x))}>
          <Marker
            defaultPosition={new navermaps.LatLng(parseFloat(y), parseFloat(x))}
            icon={{
              content: `<div style="width: 0px; height: 0px;"></div>`,
            }}
          />
        </NaverMap>
      </MapDiv>
    </CurationMapWrapper>
  );
}

export default CurationMap;
