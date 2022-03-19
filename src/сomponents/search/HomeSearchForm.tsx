import React from "react";
import {Button, Form, Input} from "antd";

type HomeSearchFormProps = {
  address: string,
  homeNumber: string
}

export const HomeSearchForm: React.FC<HomeSearchFormProps> = ({ address, homeNumber }) => {
  return (
    <Form>
      <Form.Item wrapperCol={{span: 12, offset: 6}} style={{marginBottom: 0}}>
        <Form.Item style={{display: 'inline-block', marginRight: '5px', marginBottom: 0}}>
          <Input placeholder="Улица" name="street" value={address}/>
        </Form.Item>
        <Form.Item style={{display: 'inline-block', marginBottom: 0}}>
          <Input placeholder="Дом" name="homeNumber" value={homeNumber} style={{width: 100}}/>
        </Form.Item>
      </Form.Item>
      <Form.Item wrapperCol={{span: 1, offset: 10}}>
        <Button type="primary" htmlType="submit">Поиск</Button>
      </Form.Item>
    </Form>
  );
}