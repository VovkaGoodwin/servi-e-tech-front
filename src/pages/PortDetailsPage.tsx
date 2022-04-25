import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, Col, Row, Space, Table} from "antd";
import {Port} from "../types/dataTypes";
import {useHttp} from "../hooks/http.hook";
import {getPairCellColor, getPortCellColor} from "../helpers/cableFunctions";
import {ControlPanel} from "../components/controlPanel";

type PortParams = {
  ip: string,
  port: string
}

export const PortDetailsPage: React.FC = () => {

  const { ip, port: portNumber } = useParams<PortParams>();

  const [ loading, setLoading ] = useState<boolean>(false);
  const [ portData, setPortData ] = useState<Port>();
  const { request } = useHttp();

  useEffect(() => {
    setLoading(true);
    console.log('use effect');
    request.get<{ port: [ Port ] }>(`/api/search/switch/${ip}/${portNumber}`)
      .then(result => {
        const { data: { port: [ port ] } } = result;
        setPortData(port);
      })
      .finally(() => setLoading(false))
  }, []);

  let rows: any[] = [];
  let rowsConfig: any[] = [];//: ColumnsType<{ title: string, data: any, link: string, pair: string, state: string, length: string | number }> = [];
  if (portData) {
    if (portData.state === "Link-UP") {
      return (<ControlPanel ip={ip} portNumber={portNumber} />);
    } else {
      rowsConfig = [{
        title: 'Линк',
        dataIndex: 'link',
        key: 'link',
      }, {
        title: 'Пары',
        dataIndex: 'pair',
        key: 'pair'
      }, {
        title: 'Статус',
        dataIndex: 'state',
        key: 'state',
        onCell: (row: any) => {
          const { state } = row;
          return {
            className: getPairCellColor(state)
          }
        }
      }, {
        title: 'Длина',
        dataIndex: 'length',
        key: 'length'
      }];
      rows = [{
        link: portData.state,
        pair: 'Pair 1',
        state: portData.pair1.state,
        length: portData.pair1.length
      }, {
        link: '',
        pair: 'Pair 2',
        state: portData.pair2.state,
        length: portData.pair2.length
      }]
    }
  }

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