import React, {useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {User} from "../types/dataTypes";
import {Button, Col, Popconfirm, Row, Space, Table} from "antd";
import {ColumnsType} from "antd/lib/table/interface";
import {useNavigate} from "react-router-dom";

export const UsersPage: React.FC = () => {

  const { request } = useHttp();
  const [ loading, setLoading ] = useState<boolean>();
  const [ users, setUsers ] = useState<User[]>();
  const navigate = useNavigate();

  const onDeleteHandler = (id: string | number) => {
    setLoading(true);
    request.delete(`/api/users/${id}`).then(resp => console.log(resp)).finally(() => setLoading(false))
  }

  useEffect(() => {
    setLoading(true);
    request.get<{mockUsers: User[]}>('/api/users').then(response => {
      setUsers(response.data.mockUsers);
    }).finally(() => setLoading(loading));
  }, []);

  const columns: ColumnsType<User> = [{
    title: '#',
    dataIndex: 'id',
    key: 'id'
  }, {
    title: 'Логин',
    dataIndex: 'login',
    key: 'login'
  }, {
    title: 'Фамилия',
    dataIndex: 'firstName',
    key: 'firstName'
  }, {
    title: 'Имя',
    dataIndex: 'lastName',
    key: 'lastName'
  }, {
    title: 'Дайствие',
    key: 'action',
    render: (_, record) => (
      <Space>
        <Button type={"primary"} onClick={() => navigate(`/users/${record.id}`)}>Редактировать</Button>
        <Popconfirm
          title={"Вы уверены?"}
          onConfirm={() => onDeleteHandler(record.id)}
          okText={"Да"}
          cancelText={"Нет"}
        >
          <Button type={"primary"} danger>Удалить</Button>
        </Popconfirm>
      </Space>
    )
  }];

  return (
    <div>
      <Row justify={"center"}>
        <Col>
          <Table
            loading={loading}
            columns={columns}
            dataSource={users}
            pagination={false}
          />
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col>
          <Button type={"primary"} onClick={() => navigate('/users/0')}>Добавить пользователя</Button>
        </Col>
      </Row>
    </div>
  );
}