import React from "react";
import {Form, Input, Button, Checkbox, Layout, Row, Col} from 'antd';

export const LoginPage: React.FC = () => {
  return (
    <Row justify="space-around" align="middle">
      <Col>
        <Form
          name="basic"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 8 }}
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}