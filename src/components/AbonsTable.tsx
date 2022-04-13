import React from 'react'
import {Abon} from "../types/dataTypes";
import {Link} from "react-router-dom";
import {Table} from "antd";
import {ColumnsType} from "antd/lib/table";

type AbonsTableProps = {
  abons: Abon[],
  loading: boolean
}

export const AbonsTable: React.FC<AbonsTableProps> = ({ abons, loading}) => {
  const columns: ColumnsType<Abon> = [
    {
      title: 'ЛС',
      dataIndex: 'ls',
      key: 'ls',
      responsive: [ 'lg' ]
    },{
      title: 'Логин',
      dataIndex: 'login',
      key: 'login',
      responsive: [ 'lg' ]
    },{
      title: 'КВ',
      dataIndex: 'flat',
      key: 'flat',
      render: (flat: string | number, rowData: Abon) => {
        if (rowData.login.match(/_otkl$/)) {
          return (
            <span>
              {flat} <b>O</b>
            </span>
          )
        }
        return flat;
      }
    },{
      title: 'Тариф',
      dataIndex: 'tariff',
      key: 'tariff',
      render: (tariff: string, rowData) => {

        if (!rowData.status) {
          const now = new Date();
          const blockStart = new Date(rowData.blockStart);
          const timeDelta = now.getTime() - blockStart.getTime();

          console.log('timeDelta', timeDelta);

          if (timeDelta >= 3600 * 24 * 30 * 6) {
            return  (
              <span>
              {tariff} <b>X</b>
            </span>
            );
          }
        }

        return tariff;
      }
    },{
      title: 'Баланс',
      dataIndex: 'balance',
      key: 'balance',
      responsive: [ 'lg' ]
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
      key: 'blockStart',
      responsive: [ "lg" ]
    },
  ];

  return (
    <div>
      <Table
        dataSource={abons}
        columns={columns}
        pagination={false}
        loading={loading}
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