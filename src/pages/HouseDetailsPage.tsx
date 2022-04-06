import React from 'react'
import {Link, useLocation} from "react-router-dom";
import {Abon, Home} from "../types/dataTypes";
import {Table} from "antd";

export const HouseDetailsPage: React.FC = () => {
  const { state } = useLocation();
  const { home } = state as {home: Home };
  const columns = [
    {
      title: 'ЛС',
      dataIndex: 'ls',
      key: 'ls',
    },{
      title: 'Логин',
      dataIndex: 'login',
      key: 'login',
    },{
      title: 'КВ',
      dataIndex: 'flat',
      key: 'flat'
    },{
      title: 'Тариф',
      dataIndex: 'tariff',
      key: 'tariff'
    },{
      title: 'Баланс',
      dataIndex: 'balance',
      key: 'balance',
    },{
      title: 'Свитч',
      dataIndex: 'switch',
      key: 'switch',
      render: (ip: string, rowData: Abon) => (
        <Link
          to={'/switch'}
          state={{ ip: rowData.switch, port: rowData.port, street: home.street, homeNumber: home.number }}
        >
          {ip}
        </Link>
      )
    },{
      title: 'Порт',
      dataIndex: 'port',
      key: 'port',
      render: (port: string, rowData: Abon) => (
        <Link
          to={'/port'}
          state={{ ip: rowData.switch, port: rowData.port, street: home.street, homeNumber: home.number }}
        >
          {port}
        </Link>
      )
    },{
      title: 'Старт блокировки',
      dataIndex: 'blockStart',
      key: 'blockStart'
    },
  ]

  console.log(home);

  return (
    <Table
      dataSource={home.abons}
      columns={columns}
      pagination={false}
      rowClassName={((record) => {
        if (!record.status) {
          return 'blocked-abon';
        }
        return '';
      })}
    />
  )
}