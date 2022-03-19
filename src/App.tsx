import React from 'react';
import './App.css';
import 'antd/dist/antd.min.css';
import {BrowserRouter} from "react-router-dom";
import {useRoutes} from "./routes";
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";

function App() {
  const routes = useRoutes({isAuthenticated: false});

  return (
    // <Layout className="content">
    //   <Content>
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      // </Content>
    // </Layout>
  );
}

export default App;
