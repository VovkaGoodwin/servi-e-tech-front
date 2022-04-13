export type User = {
  id: number,
  firstName: string,
  lastName: string,
  phone: string,
  password: string,
  login: string,
  isAdmin: boolean
}

export type AuthData = {
  id: number | string,
  token: string
}

export type Abon = {
  ls: string | number,
  login: string,
  flat: string | number,
  tariff: string,
  balance: string | number,
  switch: string,
  port: string | number,
  blockStart: string,
  status: boolean
}

export type Home = {
  street: string,
  number: number | string,
  abons: Abon[]
}

export type Pair = {
  state: string,
  length: string | number
}

export type Port = {
  number: number | string,
  state: string,
  description: string,
  pair1: Pair,
  pair2: Pair,
  crcCount: string,
  l2data: {
    vlan: string,
    mac: string[]
  },
  speed: string
}

export type Switch = Port[];

type a = {
  [string] : number
}