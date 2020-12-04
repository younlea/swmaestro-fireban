import { accessClient } from "./client";

export const getTicRecordInfo = (page) => accessClient.get("/record/tic/"+page, {});
export const getStreamRecordInfo = (page) => accessClient.get("/record/stream/"+page, {});
// export const streamStatus = ({key}) => accessClient.get("App")


export const getTicDetail = (target) => accessClient.get("/record/tic/detail/"+target);

export const getStreamDetail = (target) => accessClient.get("/record/stream/detail/"+target);


export const getTargetGps = ({mac, createdAt}) => accessClient.post("/hw/gps/record", {mac, createdAt});