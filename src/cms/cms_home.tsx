import React, { useState } from "react";
import { Avatar, Popover, Button, Divider, Typography } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import image from "../assets/logo/logo-removebg.png";
import { Layout, Menu, Drawer, Grid } from "antd";
import {
  AppstoreOutlined,
  CalendarOutlined,
  SettingOutlined,
  MenuOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { removeToken } from "../utils/function";
import { Mic } from "lucide-react";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const menuItems = [
  {
    key: "/cms/insights",
    icon: <DashboardOutlined />,
    label: "Insights",
  },
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
  {
    key: "/cms/announcements",
    icon: <SettingOutlined />,
    label: "Announcements",
  },
];

const CmsHome: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const selectedKey = location.pathname;

  const handleLogout = () => {
    removeToken();
    navigate("/cms/login", { replace: true });
  };
  const { Text } = Typography;

  const adminPopoverContent = (
    <div
      style={{
        width: 240,
        borderRadius: 12,
        background: "#fff",
        padding: 16,
      }}
    >
   <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
  }}
>
  <Avatar
    size={32}
    style={{
      backgroundColor: "#E0E7FF",
      color: "#3B82F6",
    }}
    icon={<UserOutlined />}
  />

  {/* Show text ONLY on md and above */}
  {screens.md && (
    <div style={{ lineHeight: 1.2 }}>
      <div style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>
        Admin User
      </div>
      <div style={{ color: "#9CA3AF", fontSize: 11 }}>
        admin@example.com
      </div>
    </div>
  )}
</div>


      <Divider style={{ margin: "12px 0" }} />

      <Button
        type="text"
        danger
        block
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        style={{
          textAlign: "left",
          padding: "6px 8px",
          borderRadius: 8,
        }}
      >
        Logout
      </Button>
    </div>
  );

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
      {screens.md && (
        <Sider collapsible theme="dark" width={270}>
          <div
            className="flex justify-center"
            style={{
              height: 64,
              margin: 16,
              color: "#fff",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            <img src={image} alt="logo" className="h-7" />
          </div>
          {menu}
        </Sider>
      )}

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
            className="flex justify-center"
            style={{ background: "#001529" }}
          >
            <img src={image} alt="logo" className="h-7" />
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
        >
          {!screens.md && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setDrawerOpen(true)}
              style={{ color: "#fff", fontSize: 18 }}
            />
          )}

          <span className="text-white font-medium">Admin Panel</span>

          <Popover
            content={adminPopoverContent}
            trigger="click"
            placement="bottomRight"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <Avatar
                size={32}
                style={{
                  backgroundColor: "#E0E7FF",
                  color: "#3B82F6",
                }}
                icon={<UserOutlined />}
              />
              <div style={{ lineHeight: 1.2 }}>
                <div style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>
                  Admin User
                </div>
                <div style={{ color: "#9CA3AF", fontSize: 11 }}>
                  admin@example.com
                </div>
              </div>
            </div>
          </Popover>
        </Header>


        <Content style={{ margin: 16 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default CmsHome;
