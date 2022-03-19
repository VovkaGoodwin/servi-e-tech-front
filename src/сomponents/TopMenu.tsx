import React from "react";
import { PageHeader, Dropdown, Menu, Button } from "antd";
import { DownOutlined } from '@ant-design/icons'

type TopMenuProps = {
  userName: string
  isAdmin: boolean
}

export const TopMenu: React.FC<TopMenuProps> = ({ userName, isAdmin }) => {

  const menuButtons = [
    <Button>Выход</Button>
  ];

  if (isAdmin) {
    menuButtons.push(<Button>Пользователи</Button>)
  }

  const menu = (
    <Menu>
      {menuButtons.map((button, i) => {
        return (
          <Menu.Item key={i}>
            {button}
          </Menu.Item>
        )
      })}
    </Menu>
  );
  return (
    <div className="site-page-header-ghost-wrapper top-bar">
      <PageHeader
        title={<a href="/">ServiceTech</a>}
        subTitle="By Vovka_Goodwin"
        extra={[
          <Dropdown overlay={menu}>
            <Button onClick={event => event.preventDefault()}>{userName}<DownOutlined/></Button>
          </Dropdown>
        ]}
      />
    </div>
  );
};