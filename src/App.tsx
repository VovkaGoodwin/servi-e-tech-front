import React from 'react';
import './App.scss';
import {BrowserRouter} from "react-router-dom";
import {useRoutes} from "./routes";
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";

function App() {
  const routes = useRoutes({isAuthenticated: false});

  return (
      <BrowserRouter>
        {routes}
      </BrowserRouter>
  );
}

export default App;
