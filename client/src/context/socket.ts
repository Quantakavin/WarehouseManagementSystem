import { createContext } from "react";
import { io } from "socket.io-client";
import config from "../config/config";

export const socket = io(config.serverURL);

socket.on("connect", () => {
  /* eslint-disable-next-line no-console */
  console.log("connected socket is ", socket.id);
});

export const SocketContext = createContext(socket);
