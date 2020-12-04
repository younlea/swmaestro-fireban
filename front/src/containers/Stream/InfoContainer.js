import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStreamInfo } from "../../store/modules/stream";
import StreamInfo from "../../components/Stream/StreamInfo";
const { kakao } = window;

function InfoContainer({ onStream }) {
  const streamInfo = useSelector(state => state.stream.stream);
  const dispatch = useDispatch();
  const error = useSelector(state => state.stream.error);
  const loading = useSelector(state => state.loading["stream/GET_STREAM_INFO"]);
  useEffect(() => {
    if (error.type !== "streamInfo" && !streamInfo) {
      dispatch(getStreamInfo());
    }
  }, [dispatch, error.type, streamInfo]);

  const onRefresh = e => {
    e.preventDefault();
    dispatch(getStreamInfo());
  };
  let geocoder = new kakao.maps.services.Geocoder();

  async function searchAddrFromCoords(coords) {
    if (!coords || !coords.cordinateX || !coords.cordinateY) {
      return "X1";
    }
    const result = await geocoder.coord2RegionCode(
      coords.cordinateX,
      coords.cordinateY
    );
    if (result) {
      return 2;
    } else {
      return 1;
    }
  }

  return (
    <StreamInfo
      info={streamInfo}
      loading={loading}
      onRefresh={onRefresh}
      onStream={onStream}
      searchAddrFromCoords={searchAddrFromCoords}
    >
      InfoContainer
    </StreamInfo>
  );
}

export default InfoContainer;
