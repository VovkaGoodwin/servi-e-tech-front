import React from 'react'
import {Layout, PageHeader} from "antd";
import {Link, Outlet} from "react-router-dom";
import {Content} from "antd/es/layout/layout";

export const _Layout: React.FC = () => {
  return (
    <Layout>
      <PageHeader
        title={<Link to="/">ServiceTech</Link>}
        subTitle="By Vovka_Goodwin"
      />
      <Content>
        <Outlet/>
      </Content>
    </Layout>
  );
}