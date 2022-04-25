import React, {useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {Port} from "../types/dataTypes";
import {Button, Col, Row, Space, Spin, Table} from "antd";
import {getPortCellColor} from "../helpers/cableFunctions";

type ControlPanelProps = {
  ip: string | undefined,
  portNumber: string | number | undefined
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ip, portNumber}) => {

  const { request } = useHttp();

  const [ crcLoading, setCrcLoading ] = useState<boolean>(false);
  const [ crcCount, setCrcCount ] = useState<string>();
  const [ portData, setPortData ] = useState<Port>({
    number: 0,
    state: "Link-UP",
    description: '',
    pair1: {
      state: '',
      length: 0
    },
    pair2: {
      state: '',
      length: 0
    },
    crcCount: '0',
    l2data: {
      vlan: '',
      mac: [ '' ]
    },
    speed: ''
  });
  const [ loading, setLoading ] = useState<boolean>(false);

  const rebootPortHandler = () => {
    setLoading(true);
    request.post('/api/control/port/reboot', { ip, portNumber }).finally(() => setLoading(false));
  }

  const clearCrcHandler = () => {
    setCrcLoading(true);
    request.post<{success: boolean}>('/api/control/port/clear', { ip, portNumber})
      .then(response => {
        if (response.data.success) {
          setCrcCount('0');
        }
      })
      .finally(() => setCrcLoading(false))
  }

  useEffect(() => {
    setLoading(true);
    request.get<{ port: [ Port ] }>(`/api/search/switch/${ip}/${portNumber}`)
      .then(response => {
        const { data: { port: [ port ] } } = response;
        setPortData(port)
        setCrcCount(port.crcCount)
      })
      .finally(() => setLoading(false));
  }, []);

  const rowsConfig = [{
    title: '',
    dataIndex: 'title',
    key: 'title',
  }, {
    title: '',
    dataIndex: 'data',
    key: 'data',
    onCell: (row: any) => {
      const { title } = row;
      if (title === 'Статус') {
        return {
          className: getPortCellColor(portData.state)
        }
      }
      return {};
    }
  }];

  const rows = [{
    title: 'Статус',
    data: (
      <Space>
        {portData.state}
        <Button
          type={"primary"}
          danger
          onClick={rebootPortHandler}
        >
          Перезагрузить порт
        </Button>
      </Space>
    )
  }, {
    title: 'Скорость',
    data: portData.speed
  }, {
    title: 'Длина',
    data: portData.pair1.length
  }, {
    title: `Vlan ${portData.l2data.vlan}s MAC:`,
    data: portData.l2data.mac.join(', ')
  }, {
    title: 'CRC',
    data: (
      <Space>
        <span id={`${portData.number}-crc`}>{crcCount}</span>
        <Button
          type={"primary"}
          onClick={clearCrcHandler}
          loading={crcLoading}
        >
          Очистить CRC
        </Button>
      </Space>
    ),
  }, {
    title: 'Описание',
    data: portData.description
  }]

  return (
    <div>
      <Row align={'middle'} justify={"center"}>
        <Col>
          <Table
            columns={rowsConfig}
            dataSource={rows}
            pagination={false}
            loading={loading}
          />
        </Col>
      </Row>
    </div>
  );
}