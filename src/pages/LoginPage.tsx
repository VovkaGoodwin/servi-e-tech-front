import React, {useContext} from "react";
import {Form, Input, Button, Checkbox, Layout, Row, Col} from 'antd';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const LoginPage: React.FC = () => {

  const auth = useContext(AuthContext);

  const onFinish = (values: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { request } = useHttp();
    console.log(values);

    request.post('/api/auth', values).then((response) => {
      if (response.status === 200) {
        const { user, authData } = response.data;
        auth.login(authData.token, authData.id);
        auth.setAuthenticatedUser(user);
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="content-center">
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