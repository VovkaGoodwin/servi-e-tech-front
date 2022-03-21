import {AuthData, User} from "./types/dataTypes";
import faker from 'faker'
import { encode} from "js-base64";

// faker.setLocale("ru_RU")

export const mockUsers: User[] = Array(1)
  .fill('')
  .map((_, i) => ({
    id: i + 1,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
    password: encode('123456'),
    login: 'vovka',
    isAdmin: true
  }));

export const mockAuth: AuthData[] = [{
  id: 1,
  token: encode('jwt token 123456')
}]