import React from "react";
import {Button, Form, Input, Space, Row} from "antd";

type SwitchSearchFormProps = {
  ipAddress: string,
  portNumber: number | undefined
};

export const SwitchSearchForm: React.FC<SwitchSearchFormProps> = ({ipAddress, portNumber}) => {
  return (
    <Form>
      <Form.Item wrapperCol={{span: 12, offset: 6}} style={{marginBottom: 0}}>
        <Form.Item style={{display: 'inline-block', marginRight: '5px', marginBottom: 0}}>
          <Input placeholder="IP адрес" name="ipAddress" value={ipAddress}/>
        </Form.Item>
        <Form.Item style={{display: 'inline-block', marginBottom: 0}}>
          <Input placeholder="Порт" name="portNumber" value={portNumber} style={{width: 100}}/>
        </Form.Item>
      </Form.Item>
      <Form.Item wrapperCol={{span: 1, offset: 10}}>
        <Button type="primary" htmlType="submit">Поиск</Button>
      </Form.Item>
    </Form>
  )
}