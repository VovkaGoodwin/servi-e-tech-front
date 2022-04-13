import React from 'react'
import {Abon} from "../types/dataTypes";
import {Link} from "react-router-dom";
import {Table} from "antd";

type AbonsTableProps = {
  abons: Abon[]
}

export const AbonsTable: React.FC<AbonsTableProps> = ({ abons}) => {
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
          to={`/switch/${rowData.switch}`}
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
          to={`/switch/${rowData.switch}/${port}`}
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

  return (
    <div>
      <Table
        dataSource={abons}
        columns={columns}
        pagination={false}
        rowClassName={((record) => {
          if (!record.status) {
            return 'blocked-abon';
          }
          return '';
        })}
      />
    </div>
  )
}