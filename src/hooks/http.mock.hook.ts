import MockAdapter from "axios-mock-adapter";
import {mockAuth, mockHomes, mockSwitches, mockUsers} from "../mockDara";
import {encode} from "js-base64";
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

  mock.onPost('/api/control/port/clear').reply(request => {
    console.log(request)
    const { ip, portNumber } = JSON.parse(request.data);
    const sw = mockSwitches[ ip ] ?? null;


    if (sw !== null) {
      mockSwitches[ ip ] = sw.map(port => {
        if (port.number == portNumber) {
          console.log(port)
          port.crcCount = '0';
        }
        return port;
      });

      return [ 200, { success: true }];
    }

    return [ 404 ]
  });

  mock.onGet(/\/api\/search\/switch\/(.+)\/(.+)/, ).reply(req => {
    const [ ip, portNumber ] = req.url?.replace('/api/search/switch/', '').split('/') ?? [ '', ''];

    const sw: Switch = mockSwitches[ ip ] ?? null;

    if (sw !== null) {
      const port = sw.filter(el => `${el.number}` === portNumber);
      return [ 200, {port} ];
    }

    return [ 404 ];
  });

  mock.onGet('/api/users').reply(() => {
    return [ 200, {mockUsers} ];
  });

  mock.onGet(/\/api\/users\/(.+)/).reply(req => {
    const [ id ] = req.url?.replace('/api/users/', '').split('') ?? [ '' ];
    // @ts-ignore
    const user = mockUsers.filter(({ id: userId }) => userId == id )[0];

    if (user) {
      return [ 200, {user} ];
    }

    return [ 404 ];
  })

  mock.onDelete(/\/api\/users\/(.+)/).reply(req => {
    const [ id ] = req.url?.replace('/api/users/', '').split('') ?? [ '' ];

    // @ts-ignore
    const user = mockUsers.filter(({ id: userId }) => userId == id );

    if (user) {
      return [ 200, {user} ];
    }

    return [ 404 ];
  });

  mock.onPost('/api/users').reply(request => {
    console.log(request);
    return [ 200 ];
  });

  mock.onPut(/\/api\/users\/(.+)/).reply(request => {
    const [ id ] = request.url?.replace('/api/users/', '').split('') ?? [ '' ];
    console.log(request, id);
    return [ 200 ];
  });

  return { request }
}