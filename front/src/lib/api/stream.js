import { accessClient } from "./client";

export const streamInfo = () => accessClient.get("/stream/info", {});

// export const streamStatus = ({key}) => accessClient.get("App")

export const streamCheck = stream_key =>
  accessClient.post("/stream/check", { stream_key });

export const getGpsInfo = ({ target }) => {
  return Promise.resolve(
    accessClient.get("/hw/gps/check/" + target, { target })
  );
};
