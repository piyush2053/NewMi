import React, { useState } from "react";
import image from "../assets/logo/logo-removebg.png";
import { Layout, Menu, Drawer, Grid, Button } from "antd";
import {
  UserOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  SettingOutlined,
  MenuOutlined,
  LogoutOutlined, // NEW
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { removeToken } from "../utils/function";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const menuItems = [
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
];

const CmsHome: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const selectedKey = location.pathname;

  // NEW
  const handleLogout = () => {
    removeToken();
    navigate("/cms/login", { replace: true });
  };

  const menu = (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[selectedKey]}
      onClick={(e) => {
        navigate(e.key);
        setDrawerOpen(false);
      }}
      items={menuItems}
    />
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Desktop Sidebar */}
      {screens.md && (
        <Sider collapsible theme="dark" width={270}>
          <div
            className="flex items-center gap-2"
            style={{
              height: 64,
              margin: 16,
              color: "#fff",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            <img src={image} alt="logo" className="h-7" />
            CMS
          </div>
          {menu}
        </Sider>
      )}

      {/* Mobile Drawer */}
      {!screens.md && (
        <Drawer
          placement="left"
          closable={false}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          bodyStyle={{ padding: 0 }}
          width={270}
        >
          <div
            className="flex items-center gap-2 px-4 py-4 text-white"
            style={{ background: "#001529" }}
          >
            <img src={image} alt="logo" className="h-7" />
            CMS
          </div>
          {menu}
        </Drawer>
      )}

      <Layout>
        <Header
          style={{
            background: "#081638",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="text-white"
        >
          {/* Left */}
          {!screens.md && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setDrawerOpen(true)}
              style={{ color: "#fff", fontSize: 18 }}
            />
          )}

          {/* Center */}
          <span className="font-medium">Admin Panel</span>

          {/* Right - Logout */}
          <Button
            type="text"
            size="small"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ color: "red" }}
          >
          </Button>
        </Header>

        <Content style={{ margin: 16 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default CmsHome;
