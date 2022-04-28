import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {User} from "../types/dataTypes";
import {useHttp} from "../hooks/http.hook";
import {Button, Checkbox, Col, Form, Input, Row} from "antd";
import {AxiosPromise} from "axios";

type formValuesType = {
  login: string,
  password: string,
  firstName: string,
  name: string,
  isAdmin: boolean
};

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
  const [ form ] = Form.useForm();
  const navigate = useNavigate();

  const isNewUser: boolean = id == '0';

  const onFormSubmitHandler = (values: formValuesType) => {
    setLoading(true);
    let promise: AxiosPromise;
    if (isNewUser) {
      promise = request.post<{user: User}>('/api/users', { values });
    } else {
      promise = request.put<{user: User}>(`/api/users/${id}`, { values });
    }

    promise.then(() => navigate('/users')).finally(() => setLoading(false))

  }

  useEffect(() => {
    if (!isNewUser) {
      setLoading(true)
      request.get<{user: User}>(`/api/users/${id}`)
        .then(response => setUser(response.data.user))
        .finally(() => setLoading(false));
    }
  }, []);

  form.setFieldsValue({
    firstName: user.firstName,
    name: user.lastName,
    login: user.login,
    isAdmin: user.isAdmin
  });

  console.log('user', user);

  return (
    <div>
      <Row justify={"center"}>
        <Col>
          <Form
            form={form}
            onFinish={onFormSubmitHandler}
          >
            <Form.Item label={"ID"}>
              <span>{user.id}</span>
            </Form.Item>
            <Form.Item name={'login'} label="Логин" rules={[{ required: isNewUser, message: 'Введите логин' }]}>
              <Input readOnly={!isNewUser}/>
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
              <Input />
            </Form.Item>
            <Form.Item name={'name'} label="Имя" rules={[{ required: true, message: 'Введите имя' }]} >
              <Input />
            </Form.Item>
            <Form.Item name={'isAdmin'} label="Администратор">
              <Checkbox />
            </Form.Item>
            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}