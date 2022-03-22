import React from 'react'
import {Routes, Route, Navigate} from "react-router-dom";
import {SearchPage} from "./pages/SearchPage";
import {SwitchDetailsPage} from "./pages/SwitchDetailsPage";
import {HouseDetailsPage} from "./pages/HouseDetailsPage";
import {PortDetailsPage} from "./pages/PortDetailsPage";
import {LoginPage} from "./pages/LoginPage";
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";

type useRoutesProps = {
  isAuthenticated: boolean
}

export const useRoutes: React.FC<useRoutesProps> = ({isAuthenticated}) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/*" element={<SearchPage/>}>
          <Route path="switch" element={<SwitchDetailsPage/>}/>
          <Route path="port" element={<PortDetailsPage/>}/>
          <Route path="home" element={<HouseDetailsPage/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/"/>}/>

      </Routes>
    );
  }

  return (
      <Layout>
        <Content>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" />}/>
          </Routes>
        </Content>
      </Layout>
  )
}