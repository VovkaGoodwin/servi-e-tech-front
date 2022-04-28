import React from 'react'
import {Col, Form, Row} from "antd";
import {SwitchSearchForm} from "../components/search/SwitchSearchForm";
import {HomeSearchForm} from "../components/search/HomeSearchForm";
import {Tickets} from "../components/Tickets";

export const SearchPage: React.FC = () => {

  return (
    <div>
      <Row justify={"center"}>
        <Col>
          <SwitchSearchForm ipAddress={''} portNumber={''}/>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col>
          <HomeSearchForm address={""} homeNumber={""}/>
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col>
          <Tickets/>
        </Col>
      </Row>
    </div>
  )
}