import React, {useEffect, useState} from 'react'
import {useLocation, useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {Col, Row, Spin} from "antd";
import {Switch} from "../types/dataTypes";
import {SwitchTable} from "../components/SwitchTable";

type SwitchDetails = {
  ip: string,
  street: string,
  homeNumber: string
}

export const SwitchDetailsPage: React.FC = () => {
  const { ip } = useParams<{ip: string}>();
  const { request } = useHttp();
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ sw, setSw ] = useState<Switch>([])

  useEffect(() => {
    setLoading(true);
    request.post<{ switch: Switch }>('/api/search/switch', { ip }).then(response => setSw(response.data.switch)).finally(() => setLoading(false))
  }, []);

  return (
    <div>
      <Row align={'middle'} justify={"center"}>
        <Col >
          <SwitchTable loading={loading} ip={`${ip}`} data={sw}/>
        </Col>
      </Row>
    </div>
  );
}