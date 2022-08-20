import socketio from "socket.io-client";
import React, { useState } from "react";
import { notifications } from "./components/Notification/data";

const token = localStorage.getItem("token");
export const socket = new WebSocket(
  "ws://192.168.8.101:8000/ws/socket-server/?token=" + token
);
export const SocketContext = React.createContext();


