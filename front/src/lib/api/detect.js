import { accessClient } from "./client";

export const getDetectInfoList = (page) => accessClient.get("/detect/list/"+page, {});
export const getDetectInfoDetail = target =>
  accessClient.get("/detect/info/" + target, {});
export const updateDetectInfoDetail = ({target,targetKey}) => accessClient.post("/detect/update/", {target:target, targetKey:targetKey})