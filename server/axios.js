import { useState, useEffect } from "react";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export const fetcher = (url) => instance.get(url).then((res) => res.data);

export const useAxios = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      instance["get"](url)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        })
        .finally(() => {
          setloading(false);
        });
    };
    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default instance;
