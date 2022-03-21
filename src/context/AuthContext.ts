import {Context, createContext} from "react";

function noop () {}

type authContext = {
  login: (jwtToken: string, id: number | string) => void
  logout: () => void,
  token: string | null,
  userId: string | number | null,
  isAuthenticated: boolean
}

export const AuthContext: Context<authContext> = createContext<authContext>({
  logout: noop,
  login: noop,
  token: null,
  userId: null,
  isAuthenticated: false
})