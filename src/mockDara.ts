import {Abon, AuthData, Home, Pair, Port, Switch, User} from "./types/dataTypes";
import faker from 'faker'
import { encode} from "js-base64";

faker.setLocale('ru');

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
    .map((_): Abon => {

      const balance: number = number({min: -100, max: 100});
      const status: boolean = balance >= 0;
      const blockDate: Date | null = (status) ? null : datetime(new Date().getTime());
      let blockStart = '';

      if (blockDate) {
        blockStart = `${blockDate.getFullYear()}-${blockDate.getMonth()}-${blockDate.getDate()}`
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

export const mockTickets = {
  "new": [],
  "old": [
    {
      "id": "67640",
      "basic_account": "41329",
      "phone_number": "88005553535",
      "priority": "1",
      "assigned_at": "2022-04-28 19:00:00",
      "text": "2 симки MNP, 1 новая сим-карта , МЫ МТС+ 0/888/888/1188, если будет добавлять жену в группу \"Семья\" еще +150р кросс",
      "address": "Томск, улица, Иркутский тракт, 196, кв. 46",
      "sector_id": "18",
      "sector_title": "Октябрьский",
      "extra_sector_id": "20",
      "extra_sector_title": "Жилмассив",
      "tariff_name": "Смотри больше 2019",
      "full_name": "Имя Фаилия Отчество",
      "login": "qwerty",
      "password": "721259691",
      "service_engineer": "Гайнуллин Руслан"
    }
  ]
}
