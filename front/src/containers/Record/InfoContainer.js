import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTICInfo, getStreamInfo, getTICInfoMore, getStreamInfoMore, changeTic } from "../../store/modules/video";
import RecordInfo from "../../components/Record/RecordInfo";
import { useHistory } from "react-router-dom";
const { kakao } = window;

const SubNavContents = [
  {
    title: "열화상 녹화 영상",
    description: "녹화된 영화상 영상을 확인하실 수 있습니다.",
    color: "red"
  },
  {
    title: "일반 녹화 영상",
    description: "녹화된 일반 영상을 확인하실 수 있습니다.",
    color: "green"
  }
];

function InfoContainer() {
  const videoInfo = useSelector(state => state.video.video);
  const page = useSelector(state => state.video.page)
  const dispatch = useDispatch();
  const error = useSelector(state => state.stream.error);
  const ticLoading = useSelector(state => state.loading["video/GET_TIC_INFO"]);
  const streamLoading = useSelector(
    state => state.loading["video/GET_STREAM_INFO"]
  );

  const isTic = useSelector(state => state.video.isTic)

  
  const history = useHistory();

  useEffect(() => {
    if (error.type !== "" && !videoInfo) {
      if (isTic === true) {
        dispatch(getTICInfo(1));
      } else {
        dispatch(getStreamInfo(1));
      }
    }
  }, [dispatch, error.type, isTic, videoInfo]);

  const onStream = useCallback(
    //submit
    async e => {
      e.preventDefault();
      try {
        const target = e.currentTarget.dataset.index;
        if (isTic === true) {
          history.push("/video/tic/" + target);
        } else {
          history.push("/video/stream/" + target);
        }
      } catch (e) {
        alert("잠시 후 다시 시도해주세요.");
      }
    },
    [history, isTic]
  );

  const onRefresh = e => {
    e.preventDefault();
    if (isTic === true) {
      dispatch(getTICInfo(1));
    } else {
      dispatch(getStreamInfo(1));
    }
  };


  const onRecordMore = e => {
    e.preventDefault();
    if (isTic === true) {
      dispatch(getTICInfoMore(Number(page)+1));
    } else {
      dispatch(getStreamInfoMore(Number(page)+1));
    }
  };

  const onChangeViedoType = e => {
    e.preventDefault();
    if (isTic === false) {
      dispatch(getTICInfo());
    } else {
      dispatch(getStreamInfo());
    }
    dispatch(changeTic());
    
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
    <RecordInfo
      info={videoInfo}
      loading={ticLoading || streamLoading}
      onRefresh={onRefresh}
      onStream={onStream}
      onChangeViedoType={onChangeViedoType}
      searchAddrFromCoords={searchAddrFromCoords}
      SubNavContents={isTic ? SubNavContents[0] : SubNavContents[1]}
      isTic={isTic}
      onRecordMore={onRecordMore}
    >
      InfoContainer
    </RecordInfo>
  );
}

export default InfoContainer;
