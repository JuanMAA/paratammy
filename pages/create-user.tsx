"use client"
import React from 'react';
import {
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { message, Layout, theme, Button, Col, Row, DatePicker, Select, Form, Input } from 'antd';

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
                <Form.Item
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
                <Form.Item
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
                <Form.Item
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
                <Form.Item
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
                <Form.Item
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
                <Form.Item
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
                <Form.Item
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
                <Form.Item
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
                <Form.Item
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
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </Layout>
  )
}
