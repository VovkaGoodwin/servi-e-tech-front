import {Abon, AuthData, Home, User} from "./types/dataTypes";
import faker from 'faker'
import { encode} from "js-base64";

faker.setLocale('ru');

const {
  datatype: { number, datetime },
  internet: { userName, ip },
  name: { firstName, lastName },
  phone: { phoneNumber }
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
        switch: ip(),
        port: number({min: 1, max: 24, precision: 1}),
        blockStart,
        status
      }
    })
}]