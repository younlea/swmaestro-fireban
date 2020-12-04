import React, { useRef, useState } from "react";

import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { getTargetGps } from "../../store/modules/video";
import KakaoMap from "../KakaoMap/KakaoMap";
function RecordPlayer({ streamUrl, targetInfo }) {

  function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    var hour = date.getHours()
    hour = hour >= 10 ? hour : '0' + hour;
    var min = date.getMinutes()
    min = min >= 10 ? min : '0' + min;
    var sec = date.getSeconds()
    sec = sec >= 10 ? sec : '0' + sec;
    return  year + '-' + month + '-' + day + ' ' + hour+':'+min+':'+sec;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

  const dispatch= useDispatch();
  const [duration, setDuration] = useState(null);
  const [secondsElapsed, setSecondsElapsed] = useState(null);
  let currentTime = useRef(0);

  const gpsInfo = useSelector(state => state.video.targetGps)

  const targetDate = targetInfo.createdAt.replace(/-/g,"").replace(" ", "").replace(/:/g, "");

  const initialDate = new Date(targetDate.substring(0, 4), targetDate.substring(4, 6)-1, targetDate.substring(6, 8), targetDate.substring(8, 10), targetDate.substring(10, 12), targetDate.substring(12, 14))

  currentTime.current = initialDate;
  console.log(initialDate.getTime())

  const mac = targetInfo.target.mac;
  
  const onDuration = duration => {
    setDuration({ duration });
  };
  const onProgress = progress => {
    if (!duration) {
      return;
    }

    const test = Number(progress.played) * Number(duration.duration);
    
    currentTime.current = (currentTime.current/1000 - duration.duration+test)*1000
    dispatch(getTargetGps(mac,  getFormatDate(new Date(currentTime.current))))



    if (test !== secondsElapsed) {
      setSecondsElapsed({ test });
    }
  };
  const url = "http://www.fireban.kr" + streamUrl;

  return (
    <>
      <ReactPlayer
        className="react-player"
        url={url}
        width="100%"
        height="50vh"
        // onReady="true"
        controls={true}
        onDuration={onDuration}
        onProgress={onProgress}
      />
      <KakaoMap
            // className={classes.mainPanel}
            cordinateX={
              gpsInfo && gpsInfo.cordinateX ? gpsInfo.cordinateX : "37.504234"
              // gpsInfo.cordinateX
            }
            cordinateY={
              gpsInfo && gpsInfo.cordinateY ? gpsInfo.cordinateY : "127.047812"
              // gpsInfo.cordinateY
            }
          ></KakaoMap>
    </>
  );
}

export default RecordPlayer;
