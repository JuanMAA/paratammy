"use client"
import React, { useEffect, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Table, Layout, Menu, theme, Button, message } from 'antd';


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

const columns: any = [
  {
    title: 'Nombre',
    width: 100,
    dataIndex: 'firstName',
    key: 'firstName',
    fixed: 'left',
  },
  {
    title: 'Apellido',
    width: 100,
    dataIndex: 'lastName',
    key: 'lastName',
    fixed: 'left',
    sorter: true,
  },
  {
    title: 'Acciones',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <Button >
      Editar
    </Button>,
  },
];

export default function Home() {

  const [collapsed, setCollapsed] = useState(false);
  const [messageApi] = message.useMessage();
  const [list, setList] = useState([] as Array<any>);

  useEffect(() => {
    getUsers()
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetch('/api/getUsers');
      if (!response.ok) {
        throw new Error('La solicitud no tuvo éxito');
      }
      const data = await response.json();
      console.log("data", data)
      setList(data);
    } catch (error: any) {
      messageApi.open({
        type: 'error',
        content: error?.message ?? 'La solicitud no tuvo éxito',
      });
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout style={{ minHeight: '100vh' }} >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px', background: colorBgContainer }}>
          {/*        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
  </Breadcrumb>*/}
          <div style={{ padding: 24, minHeight: 360 }}>
            <Table columns={columns} dataSource={list} scroll={{ x: 1300 }} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </Layout>
  )
}
