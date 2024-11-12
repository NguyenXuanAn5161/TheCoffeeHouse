import axios from "axios";

const URL = "http://192.168.1.187:8082";

const instance = axios.create({
  baseURL: URL,
  headers: { "X-Custom-Header": "foobar" },
});

export default instance;
