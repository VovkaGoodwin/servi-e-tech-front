import {Abon, AuthData, Home, Pair, Port, Switch, User} from "./types/dataTypes";
import faker from 'faker'
import { encode} from "js-base64";

const {
  datatype: { number, datetime, string },
  internet: { userName, ip, mac },
  name: { firstName, lastName },
  phone: { phoneNumber },
  random: { arrayElement: randomArrayEl }
} = faker;


export const mockUsers: User[] = Array(1)
  .fill('')
  .map((_, i) => ({
    id: i + 1,
    firstName: firstName(),
    lastName: lastName(),
    phone: phoneNumber(),
    password: encode('123456'),
    login: 'vovka',
    isAdmin: true
  }));

export const mockAuth: AuthData[] = [{
  id: 1,
  token: encode('jwt token 123456')
}]

export const mockHomes: Home[] = [{
  number: 1,
  street: "Мокрушина",
  abons: Array(5)
    .fill('')
    .map((_, i): Abon => {

      const balance: number = number({min: -100, max: 100});
      const status: boolean = balance >= 0;
      const blockDate: Date | null = (status) ? null : datetime();
      let blockStart = '';

      if (blockDate) {
        blockStart = `${blockDate.getDate()}-${blockDate.getMonth()}-${blockDate.getFullYear()}`
      }

      return {
        ls: number({min: 24000, max: 45000, precision: 1}),
        login: userName(firstName(), lastName()),
        flat: number({min: 1, max: 120, precision: 1}),
        tariff: "Смотри больше 2019",
        balance,
        switch: '10.196.90.21',
        port: number({min: 1, max: 24, precision: 1}),
        blockStart,
        status
      }
    })
}];

const mockSwitch: Switch = Array(24)
  .fill('')
  .map((_, i): Port => {

    const pair1: Pair = {
      state: randomArrayEl([ 'Нет кабеля', 'OK' ]),
      length: number({ min: 0, max: 100})
    };

    const pair2: Pair = {
      state: randomArrayEl(pair1.state === 'OK' ? [ 'OK' ] : [ 'Нет кабеля', 'OK' ]),
      length: number({ min: 0, max: 100})
    }

    const state: string = pair1.state === 'OK' && pair2.state === 'OK' ? 'Link-UP' : 'Link-Down'

    const l2data = {
      vlan: '',
      mac: [ '' ]
    }

    if (state === 'Link-UP') {
      l2data.vlan = number({ min: 100, max: 150 }).toString();
      l2data.mac = [ mac(':') ];
    }

    return {
      number: i+1,
      state,
      description: string(20),
      pair1,
      pair2,
      crcCount: number({ min: 0, max: 10000}).toString(),
      l2data,
      speed: randomArrayEl([ '100', '10' ])
    }
  });

export const mockSwitches: {[key: string]: Switch} = {
  '10.196.90.21': mockSwitch
}