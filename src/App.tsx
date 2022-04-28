import React from 'react';
import './App.scss';
import {BrowserRouter} from "react-router-dom";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";

function App() {
  const { token, login, logout, userId, ready, setAuthenticatedUser, authenticatedUser } = useAuth();
  const isAuthenticated: boolean = !!token
  const routes = useRoutes({isAuthenticated});

  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated, setAuthenticatedUser, authenticatedUser }}
    >
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
