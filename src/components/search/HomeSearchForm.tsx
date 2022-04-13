import React from "react";
import {Button, Form, Input} from "antd";
import {useHttp} from "../../hooks/http.hook";
import {useNavigate, useSearchParams} from "react-router-dom";

type HomeSearchFormProps = {
  address: string,
  homeNumber: string
}

type formData = {
  street: string,
  homeNumber: string
}

export const HomeSearchForm: React.FC<HomeSearchFormProps> = ({ address, homeNumber }) => {

  const navigate = useNavigate();

  const onFormSubmitHandler = (values: formData) => {
    // request.post('/api/search/home', values).then(response => {
    //   console.log('Search response: ', response.data);
    //   if (response.status === 200) {
    //     navigate('/home', { state: response.data })
    //   }
    // });

    navigate(`/home/${values.street}?number=${values.homeNumber}`);
  }

  return (
    <div>
      <Form
        onFinish={onFormSubmitHandler}
      >
        <Form.Item
          style={{display: 'inline-block', marginRight: '5px'}}
          rules={[{ required: true, message: 'Введите Улицу!' }]}
          name='street'
        >
          <Input placeholder="Улица" name="street" value={address}/>
        </Form.Item>
        <Form.Item
          style={{display: 'inline-block'}}
          rules={[{ required: true, message: 'Введите номер дома!' }]}
          name='homeNumber'
        >
          <Input placeholder="Дом" name="homeNumber" value={homeNumber} style={{width: 100}}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Поиск</Button>
        </Form.Item>
      </Form>
    </div>
  );
}