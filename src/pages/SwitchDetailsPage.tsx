import React, {useEffect, useState} from 'react'
import {useLocation} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {Col, Row, Spin} from "antd";
import {Switch} from "../types/dataTypes";

type SwitchDetails = {
  ip: string,
  street: string,
  homeNumber: string
}

export const SwitchDetailsPage: React.FC = () => {
  const { ip } = useLocation().state as SwitchDetails;
  const { request } = useHttp();
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ sw, setSw ] = useState<Switch>()

  useEffect(() => {
    setLoading(true);
    request.post<Switch>('/api/search/switch', { ip }).then(response => {
      console.log('switch response: ', response);
      setSw(response.data);
    }).catch(reason => console.log(reason))
      .finally(() => setLoading(false))
  }, []);

  return (
    <div>
      <Row align={'middle'} justify={"center"}>
        <Col >
          {loading && <Spin/>}
        </Col>
      </Row>
    </div>
  );
}