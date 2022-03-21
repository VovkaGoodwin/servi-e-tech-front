import { useState, useCallback } from "react";
import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import MockAdapter from "axios-mock-adapter";
import {mockAuth, mockUsers} from "../mockDara";
import {encode} from "js-base64";
import {User} from "../types/dataTypes";

type httpHook = {
  request: AxiosInstance
};

export const useHttp = (): httpHook => {

  const config: AxiosRequestConfig = {
    baseURL: '/',
    responseType: "json" as const
  }

  const request = axios.create(config);

  const mock =  new MockAdapter(request, { delayResponse: 1000 });

  mock.onPost('/api/auth').reply((request) => {

    const data = JSON.parse(request.data);
    console.log('data:', data);

    const user = mockUsers.find((user) => user.password === encode(data.password) && user.login === data.login);

    if (user) {
      const authData = mockAuth.find((auth) => auth.id === user.id);
      return [ 200, {user, authData} ];
    }

    return [204]
  });

  return { request };

}