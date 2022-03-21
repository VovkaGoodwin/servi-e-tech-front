import {useCallback, useEffect, useState} from "react";

type authHook = {
  login: (jwtToken: string, id: number | string) => void
  logout: () => void,
  token: string | null,
  userId: string | number | null
  ready: boolean
}

type authData = Pick<authHook, "token" | "userId">

const storageName: string = 'authData';

export const useAuth = (): authHook => {
  const [ token, setToken ] = useState <string | null> (null);
  const [ ready, setReady ] = useState <boolean> (false);
  const [ userId, setUserId ] = useState <number | string | null>  (null);

  const login = useCallback((jwtToken: string, id: number | string | null): void => {
    setToken(jwtToken);
    setUserId(id);

    const authData: authData = {
      userId: id,
      token: jwtToken
    }

    localStorage.setItem(storageName, JSON.stringify(authData))
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data: authData | null = JSON.parse(localStorage.getItem(storageName) ?? 'null');
    if (data && data.token) {
      login(data.token, data.userId);
    }
    setReady(true);
  }, [ login ]);

  return { login, logout, userId, token, ready };
}