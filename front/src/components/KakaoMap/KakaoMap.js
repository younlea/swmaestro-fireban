import React, { useEffect, useState } from "react";
import styled from "styled-components";
const { kakao } = window;

const MapDiv = styled.div`
  /* width: 100vw; */
  height: 50vh;
`;

function KakaoMap({ cordinateX, cordinateY }) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(cordinateX, cordinateY),
      level: 3
    };
    var markerPosition = new kakao.maps.LatLng(cordinateX, cordinateY);
    let map = new kakao.maps.Map(container, options);
    // if (isMapLoaded === false) {
    let marker = new kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);
    setIsMapLoaded(true);
    map.setZoomable(false);
    
    

  }, [setIsMapLoaded, cordinateX, cordinateY, isMapLoaded]);

  return (
    <>
      <MapDiv id="map" />
    </>
  );
}

export default KakaoMap;
