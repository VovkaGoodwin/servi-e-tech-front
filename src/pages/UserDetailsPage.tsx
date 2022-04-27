import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {User} from "../types/dataTypes";
import {useHttp} from "../hooks/http.hook";
import {Button, Checkbox, Col, Form, Input, InputNumber, Row} from "antd";
import {encode} from "js-base64";

export const UserDetailsPage: React.FC = () => {

  const { id } = useParams<{id: string}>();
  const { request } = useHttp();
  const [ user, setUser ] = useState<User>({
    id: 0,
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    login: '',
    isAdmin: false
  });
  const [ loading, setLoading ] = useState<boolean>(false);

  const isNewUser: boolean = id == '0';

  useEffect(() => {
    if (!isNewUser) {
      setLoading(true)
      request.get<{user: User}>(`/api/users/${id}`)
        .then(response => setUser(response.data.user))
        .finally(() => setLoading(false));
    }
  }, [])

  console.log('user', user);

  return (
    <div>
      <Row justify={"center"}>
        <Col>
          <Form>
            <Form.Item label={"ID"}>
              <span>{user.id}</span>
            </Form.Item>
            <Form.Item name={'login'} label="Логин" rules={[{ required: isNewUser, message: 'Введите логин' }]}>
              <Input readOnly={!isNewUser} defaultValue={user.login}/>
            </Form.Item>
            <Form.Item name={'password'} label="Пароль" rules={[{ required: isNewUser, message: 'Введите пароль' }]}>
              <Input.Password/>
            </Form.Item>
            <Form.Item
              name={'rePassword'}
              label="Подтвердите пароль"
              rules={[
                {
                  required: isNewUser,
                  message: 'Подтвердите пароль'
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Пароли должны быть одинаковыми'))
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name={'firstName'} label="Фамилия" rules={[{ required: true, message: 'Введите фамилию' }]} initialValue={user.lastName}>
              <Input defaultValue={user.lastName}/>
            </Form.Item>
            <Form.Item name={'name'} label="Имя" rules={[{ required: true, message: 'Введите имя' }]}>
              <Input value={user.firstName}/>
            </Form.Item>
            <Form.Item name={'isAdmin'} label="Администратор">
              <Checkbox checked={user.isAdmin}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}