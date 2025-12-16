import React from "react";
import image from '../assets/logo/logo.png'
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const CmsHome: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey = location.pathname;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible theme="dark">
        <div
          style={{
            height: 64,
            margin: 16,
            color: "#fff",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          <img src={image} alt="logo"></img> CMS
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={(e) => navigate(e.key)}
          items={[
            {
              key: "/cms/users",
              icon: <UserOutlined />,
              label: "User Management",
            },
            {
              key: "/cms/categories",
              icon: <AppstoreOutlined />,
              label: "Category Management",
            },
            {
              key: "/cms/events",
              icon: <CalendarOutlined />,
              label: "Event Management",
            },
            {
              key: "/cms/app",
              icon: <SettingOutlined />,
              label: "App Management",
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          Admin Panel
        </Header>
        <Content style={{ margin: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default CmsHome;
