import React from "react";
import {Button, Form, Input, Space, Row} from "antd";

type SwitchSearchFormProps = {
  ipAddress: string,
  portNumber: number | string
};

export const SwitchSearchForm: React.FC<SwitchSearchFormProps> = ({ipAddress, portNumber}) => {
  return (
    <div>
      <Form>
        <Form.Item style={{display: 'inline-block', marginRight: '5px'}}>
          <Input placeholder="IP адрес" name="ipAddress" value={ipAddress}/>
        </Form.Item>
        <Form.Item style={{display: 'inline-block'}}>
          <Input placeholder="Порт" name="portNumber" value={portNumber} style={{width: 100}}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Поиск</Button>
        </Form.Item>
      </Form>
    </div>
  )
}