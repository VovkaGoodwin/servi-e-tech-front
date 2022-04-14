import React from 'react'
import {Switch} from "../types/dataTypes";
import {Table} from "antd";
import {ColumnsType} from "antd/lib/table";

type SwitchTableProps = {
  data: Switch,
  loading: boolean,
  ip: string
}

type SwitchRow = {
  portNumber: number | string,
  portState: string,
  pairNumber: number,
  cableLength: string | number,
  cableState: string,
};

export const SwitchTable: React.FC<SwitchTableProps> = ({ data, loading, ip}) => {

  const rows: SwitchRow[] = [];
  console.log(data);

  data.forEach(port => {
    rows.push({
      portNumber: port.number,
      portState: port.state,
      pairNumber: 1,
      cableLength: port.pair1.length,
      cableState: port.pair1.state,
    });

    if (port.state === "Link-Down") {
      rows.push({
        portNumber: '',
        portState: '',
        pairNumber: 2,
        cableLength: port.pair2.length,
        cableState: port.pair2.state,
      });
    }
  });

  const columns: ColumnsType<SwitchRow> = [{
    title: '#',
    dataIndex: 'portNumber',
    key: 'portNumber',
  }, {
    title: 'Порт',
    dataIndex: 'portState',
    key: 'portState'
  }, {
    title: 'Пары',
    dataIndex: 'pairNumber',
    key: 'pairNumber'
  }, {
    title: 'Статус',
    dataIndex: 'cableState',
    key: 'cableState',
    onCell: ({ cableState }) => {
      const newProps = {
        className: ''
      };

      switch (cableState) {
        case 'Open':
          newProps.className = '.open-pairs';
          break;
        case 'Нет кабеля':
          newProps.className = 'no-cable'
          break;
        case 'Short':
          newProps.className = 'short-pairs'
          break;
        case 'OK':
          newProps.className = 'ok-port'
      }

      return newProps;
    }
  }, {
    title: 'Длины',
    dataIndex: 'cableLength',
    key: 'cableLength',
  }]

  return (
    <Table
      columns={columns}
      dataSource={rows}
      loading={loading}
      pagination={false}
    >

    </Table>
  );
}