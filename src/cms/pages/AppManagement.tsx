// ================= pages/AppManagement.tsx =================
import React from "react";
import {
  Card,
  Form,
  Input,
  Switch,
  Button,
  Grid,
  Space,
  Typography,
} from "antd";

const { useBreakpoint } = Grid;
const { Text } = Typography;

const AppManagement: React.FC = () => {
  const screens = useBreakpoint();

  return (
    <Card title="App Management">
      <Form
        layout="vertical"
        style={{
          maxWidth: screens.md ? 500 : "100%",
          margin: screens.md ? "0" : "0 auto",
        }}
      >
        <Form.Item
          label="App Name"
          name="appName"
          rules={[{ required: true, message: "Enter app name" }]}
        >
          <Input placeholder="Nearwe" />
        </Form.Item>

        {/* Maintenance switch */}
        <Form.Item label="Maintenance Mode" valuePropName="checked">
          <Space align="center">
            <Switch />
            <Text type="secondary">
              Disable app access for maintenance
            </Text>
          </Space>
        </Form.Item>

        {/* Action */}
        <Form.Item>
          <Button
            type="primary"
            block={!screens.md}
            style={{ marginTop: 12 }}
          >
            Save Settings
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AppManagement;
