
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5001", {
	autoConnect: Boolean(import.meta.env.VITE_SOCKET_URL) || import.meta.env.DEV
});

export default socket;
