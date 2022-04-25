import React from "react";
import {Button, Form, Input, Space, Row, Col} from "antd";
import {useHttp} from "../../hooks/http.hook";
import {useNavigate} from "react-router-dom";

type SwitchSearchFormProps = {
  ipAddress: string,
  portNumber: number | string
};

type formData = {
  ip: string,
  port: string
}

export const SwitchSearchForm: React.FC<SwitchSearchFormProps> = ({ipAddress, portNumber}) => {

  const navigate = useNavigate();

  const onFormSubmitHandler = ({ip, port}: formData) => {
    let url = `/switch/${ip}`;
    if (port) {
      url += `/${port}`;
    }
    navigate(url);
  }

  return (
    <div>
      <Form
        onFinish={onFormSubmitHandler}
      >
        <Form.Item
          style={{display: 'inline-block', marginRight: '5px'}}
          rules={[{ required: true, message: 'Введите IP!' }]}
          name={"ip"}
        >
          <Input placeholder="IP адрес" name="ip" value={ipAddress}/>
        </Form.Item>
        <Form.Item
          style={{display: 'inline-block'}}
          name={"port"}
        >
          <Input placeholder="Порт" name="port" value={portNumber} style={{width: 100}}/>
        </Form.Item>
        <Form.Item>
          <Row justify={"center"}>
            <Col>
              <Button type="primary" htmlType="submit">Поиск</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  )
}