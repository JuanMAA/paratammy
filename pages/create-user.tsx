"use client"
import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { message, Layout, Menu, theme, Button, Col, Row, DatePicker, Select } from 'antd';
import { Checkbox, Form, Input } from 'antd';


const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Usuarios', '1', <UserOutlined />),
  //getItem('Option 2', '2', <DesktopOutlined />),
  //getItem('User', 'sub1', <UserOutlined />, [
  //  getItem('Tom', '3'),
  //  getItem('Bill', '4'),
  //  getItem('Alex', '5'),
  //]),
  //getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  //getItem('Files', '9', <FileOutlined />),
];


interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: any = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
    sorter: true,
  },
  { title: 'Column 1', dataIndex: 'address', key: '1' },
  { title: 'Column 2', dataIndex: 'address', key: '2' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <Button >
      Editar
    </Button>,
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
];

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function Home() {

  const [messageApi] = message.useMessage();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onFinish = (form: any) => {
    fetch('/api/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((_) => {
        messageApi.open({
          type: 'success',
          content: 'Usuario creado correctamente !!',
        });
      })
      .catch((error) => {
        messageApi.open({
          type: 'error',
          content: error,
        });
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    messageApi.open({
      type: 'error',
      content: 'Debe rellenar los campos correctamente!',
    });
  };

  return (
    <Layout style={{ minHeight: '100vh' }} >
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px', background: colorBgContainer, padding: 50 }}>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Row gutter={16}>
              <Col xs={24} md={12} xl={8}>
                <Form.Item<FieldType>
                  label="Nombre"
                  name="firstName"
                  rules={[
                    { required: true, message: 'Campo obligatorio' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={8}>
                <Form.Item<FieldType>
                  label="Apellido"
                  name="lastName"
                  rules={[
                    { required: true, message: 'Campo obligatorio' }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={8}>
                <Form.Item<FieldType>
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Campo obligatorio' }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={8}>
                <Form.Item<FieldType>
                  label="Telefono"
                  name="phoneNumber"
                  rules={[
                    { required: true, message: 'Campo obligatorio' }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={8}>
                <Form.Item<FieldType>
                  label="RUT"
                  name="identificationNumber"
                  rules={[
                    { required: true, message: 'Campo obligatorio' }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={8}>
                <Form.Item<FieldType>
                  label="Fecha Nacimiento"
                  name="phoneNumber"
                  style={{ width: "100%" }}
                  rules={[
                    { required: true, message: 'Campo obligatorio' }
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={8}>
                <Form.Item<FieldType>
                  label="Edad"
                  name="age"
                  rules={[
                    { required: true, message: 'Campo obligatorio' }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={8}>
                <Form.Item<FieldType>
                  label="Genero"
                  name="gender"
                  rules={[
                    { required: true, message: 'Campo obligatorio' }
                  ]}
                >
                  <Select>
                    <Select.Option value="male">Hombre</Select.Option>
                    <Select.Option value="female">Mujer</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={8}>
                <Form.Item<FieldType>
                  label="Contraseña"
                  name="password"
                  rules={[
                    { required: true, message: 'Campo obligatorio' }
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={8}>
                <Button htmlType="submit" block >
                  Registrarse
                </Button>
              </Col>
            </Row>
          </Form>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}
