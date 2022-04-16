import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {useMockHttp} from "./http.mock.hook";

type httpHook = {
  request: AxiosInstance
};

export const useHttp = (): httpHook => {

  // const config: AxiosRequestConfig = {
  //   baseURL: '/',
  //   responseType: "json" as const
  // }
  //
  // const request = axios.create(config);

  const { request } = useMockHttp();

  return { request };

}