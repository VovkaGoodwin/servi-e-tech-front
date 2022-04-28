import React, {useContext} from "react";
import {Form, Input, Button} from 'antd';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const LoginPage: React.FC = () => {

  const auth = useContext(AuthContext);
  const { request } = useHttp();

  const onFinish = (values: any) => {

    request.post('/api/auth', values).then((response) => {
      if (response.status === 200) {
        const { user, authData } = response.data;
        auth.login(authData.token, authData.id, user);
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
  };

  return (
    <div className="content__center">
        <Form
          name="login"
          labelCol={{ span: 8 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          // autoComplete="off"
          // className="login-form"
        >
          <Form.Item
            label="Логин"
            name="login"
            rules={[{ required: true, message: 'Введите логин!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введите пароль!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Вход
            </Button>
          </Form.Item>
        </Form>
    </div>
  );
}