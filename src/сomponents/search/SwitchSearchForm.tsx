import React from "react";
import {Button, Form, Input, Space, Row} from "antd";
import {useHttp} from "../../hooks/http.hook";
import {useNavigate} from "react-router-dom";

type SwitchSearchFormProps = {
  ipAddress: string,
  portNumber: number | string
};

type formData = {
  ip: string,
  portNumber: string
}

export const SwitchSearchForm: React.FC<SwitchSearchFormProps> = ({ipAddress, portNumber}) => {

  const { request } = useHttp();
  const navigate = useNavigate();

  const onFormSubmitHandler = ({ ip, portNumber }: formData) => {
    let url: string = `/api/search/switch/${ip}`;
    if (portNumber) {
      url += `/${portNumber}`;
    }
    request.get(url).then(response => {
      console.log('Search response: ', response.data);
      if (response.status === 200) {
        navigate('/home', { state: response.data })
      }
    });
  }

  return (
    <div>
      <Form
        onFinish={onFormSubmitHandler}
      >
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