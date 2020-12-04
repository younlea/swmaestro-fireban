import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DetectInfo from "../../components/Detect/DetectInfo";
import { getDetectInfo, getDetectInfoMore } from "../../store/modules/detect";
// import RecordInfo from "../../components/Record/RecordInfo";
const { kakao } = window;

const SubNavContents = [
  {
    title: "탐지결과",
    description: "요구조자 및 화재 탐지 이미지를 확인하실 수 있습니다.",
    color: "blue"
  },
  {
    title: "탐지수정",
    description: "탐지된 데이터를 수정하여 탐지율을 향상시킬 수 있습니다.",
    color: "blue"
  }
];

function InfoContainer({ onDetect, type }) {
  const imageList = useSelector(state => state.detect.imageList);
  const dispatch = useDispatch();
  const error = useSelector(state => state.detect.error);
  const loading = useSelector(state => state.loading["detect/GET_DETECT_INFO"]);
  const page = useSelector(state => state.detect.page)

  useEffect(() => {
    if (error.type !== "" && !imageList) {
      dispatch(getDetectInfo(1));
    }
  }, [dispatch, error.type, imageList]);

  const onRefresh = e => {
    e.preventDefault();
    dispatch(getDetectInfo(1));
  };

  const getDetectMore = e => {
    dispatch(getDetectInfoMore(Number(page)+1));
  }

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
    <DetectInfo
      info={imageList}
      loading={loading}
      onRefresh={onRefresh}
      onDetect={onDetect}
      searchAddrFromCoords={searchAddrFromCoords}
      type={type}
      SubNavContents={type==="edit" ? SubNavContents[1] : SubNavContents[0]}
      getDetectMore={getDetectMore}
    ></DetectInfo>
  );
}

export default InfoContainer;
