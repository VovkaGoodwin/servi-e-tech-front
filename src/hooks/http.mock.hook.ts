import MockAdapter from "axios-mock-adapter";
import {mockAuth, mockHomes, mockSwitches, mockUsers} from "../mockDara";
import {encode} from "js-base64";
import {useHttp} from "./http.hook";
import axios, {AxiosRequestConfig} from "axios";
import {Switch} from "../types/dataTypes";


export const useMockHttp = () => {

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

  mock.onPost('/api/search/home').reply((request) => {

    const data = JSON.parse(request.data);

    // eslint-disable-next-line eqeqeq
    const home = mockHomes.find(home => home.number == data.homeNumber && home.street == data.street )

    if (home) {
      return [ 200, { home }]
    }

    return [ 404 ];
  });

  mock.onPost('/api/search/switch').reply((request) => {

    const { ip } = JSON.parse(request.data);

    const sw = mockSwitches[ ip ] ?? null;

    if (sw !== null) {
      return [200, { switch: sw }]
    }

    return [ 404 ];
  });

  mock.onGet(/\/api\/search\/switch\/(.+)\/(.+)/, ).reply(req => {
    const [ ip, portNumber ] = req.url?.replace('/api/search/switch/', '').split('/') ?? [ '', ''];

    console.log(ip, portNumber);

    const sw: Switch = mockSwitches[ ip ] ?? null;

    if (sw !== null) {
      const port = sw.filter(el => `${el.number}` === portNumber);
      return [ 200, {port} ];
    }

    return [ 404 ];
  })

  return { request }
}