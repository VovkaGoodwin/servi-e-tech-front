import React, {useContext} from 'react'
import {Button, Dropdown, Layout, PageHeader} from "antd";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {Content} from "antd/es/layout/layout";
import {AuthContext} from "../context/AuthContext";
import {AnchorButtonProps, BaseButtonProps} from "antd/es/button/button";

type buttonType = Pick<BaseButtonProps, "type" | "danger"> & Pick<AnchorButtonProps, "onClick"> & {text: string}

export const _Layout: React.FC = () => {

  const { authenticatedUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const buttons: buttonType[] = [{
    type: 'primary',
    text: 'Выход',
    danger: true,
    onClick: logout
  }];

  if (authenticatedUser !== null && authenticatedUser.isAdmin) {
    buttons.unshift({
      type: "primary",
      text: 'Пользователи',
      danger: false,
      onClick: () => navigate('/users')
    });
  }


  return (
    <Layout>
      <PageHeader
        title={<Link to="/">ServiceTech</Link>}
        subTitle={`By Vovka_Goodwin Пользователь: ${authenticatedUser !== null ? authenticatedUser.login : ''}`}
        extra={buttons.map(({type, text, danger, onClick}, i) => (
          <Button type={type} danger={danger} onClick={onClick} key={i}>{text}</Button>
        ))}
      />
      <Content>
        <Outlet/>
      </Content>
    </Layout>
  );
}