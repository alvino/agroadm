import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export const fetcher = (url) => instance.get(url).then((res) => res.data);

export default instance;
