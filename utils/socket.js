const { io } = require("socket.io-client");

const URL = "http://192.168.1.187:8082/order-status";

const socket = io(URL);

export default socket;
