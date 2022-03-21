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