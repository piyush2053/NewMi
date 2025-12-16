
// ================= pages/AppManagement.tsx =================
import React from "react";
import { Card, Form, Input, Switch, Button } from "antd";

const AppManagement: React.FC = () => {
  return (
    <Card title="App Management">
      <Form layout="vertical"  >
        <Form.Item label="App Name">
          <Input placeholder="Nearwe" />
        </Form.Item>
        <Form.Item label="Maintenance Mode" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Button type="primary">Save Settings</Button>
      </Form>
    </Card>
  );
};

export default AppManagement;

