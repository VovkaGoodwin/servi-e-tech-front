import React from 'react'
import {Col, Form, Row} from "antd";
import {SwitchSearchForm} from "../сomponents/search/SwitchSearchForm";
import {HomeSearchForm} from "../сomponents/search/HomeSearchForm";

export const SearchPage: React.FC = () => {

  return (
    <div>
      <Row justify={"center"}>
        <Col xs={24} xl={6}>
          <SwitchSearchForm ipAddress={''} portNumber={''}/>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col xs={24} xl={6}>
          <HomeSearchForm address={""} homeNumber={""}/>
        </Col>
      </Row>
    </div>
  )
}