import React from "react";
import { Row, Col } from 'antd';
import {SwitchSearchForm} from "./SwitchSearchForm";
import {HomeSearchForm} from "./HomeSearchForm";

type SearchFormProps = {
  address: string,
  homeNumber: string,
  ipAddress: string,
  portNumber: number | string
};

export const SearchForm: React.FC<SearchFormProps> = ({
  address,
  ipAddress,
  homeNumber,
  portNumber
}) => {

  return (
    <>
      <Row>
        <Col xs={24} xl={{span: 12, offset: 6}}>
          <SwitchSearchForm ipAddress={ipAddress} portNumber={portNumber} />
        </Col>
      </Row>
      <Row>
        <Col xs={24} xl={{span: 12, offset: 6}}>
          <HomeSearchForm address={address} homeNumber={homeNumber}/>
        </Col>
      </Row>
    </>
  );

}