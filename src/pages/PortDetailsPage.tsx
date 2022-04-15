import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Col, Row} from "antd";
import {Port} from "../types/dataTypes";
import {useHttp} from "../hooks/http.hook";

type PortParams = {
  ip: string,
  port: string
}

export const PortDetailsPage: React.FC = () => {

  const { ip, port } = useParams<PortParams>();

  const [ loading, setLoading ] = useState<boolean>(false);
  const [ portData, setPortData ] = useState<Port>();
  const { request } = useHttp();

  console.log('port params', ip, port);

  useEffect(() => {
    setLoading(true);
    request.get<Port>(`/api/search/switch/${ip}/${port}`)
      .then(result => {

      })
      .finally(() => setLoading(false))
  }, []);

  let rows: Array<object> = [];
  if (portData) {
    if (portData.state === "Link-Up") {
      rows.push({})
    } else {

    }
  }

  return (
    <div>
      <Row align={'middle'} justify={"center"}>
        <Col>

        </Col>
      </Row>
    </div>
  );
}