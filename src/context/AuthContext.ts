import {Context, createContext} from "react";
import {User} from "../types/dataTypes";

function noop () {}

type authContext = {
  login: (jwtToken: string, id: number | string, user: User | null) => void
  logout: () => void,
  token: string | null,
  userId: string | number | null,
  isAuthenticated: boolean,
  authenticatedUser: User | null,
  setAuthenticatedUser: (user: User | null) => void
}

export const AuthContext: Context<authContext> = createContext<authContext>({
  logout: noop,
  login: noop,
  token: null,
  userId: null,
  isAuthenticated: false,
  authenticatedUser: null,
  setAuthenticatedUser: noop
})