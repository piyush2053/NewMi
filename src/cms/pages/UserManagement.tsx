import React from "react";
import {
  Card,
  Table,
  Button,
  Grid,
  List,
  Typography,
  Space,
} from "antd";
import type { ColumnsType } from "antd/es/table";

const { useBreakpoint } = Grid;
const { Text } = Typography;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// ================= Desktop Columns =================
const columns: ColumnsType<User> = [
  { title: "Name", dataIndex: "name" },
  { title: "Email", dataIndex: "email" },
  { title: "Role", dataIndex: "role" },
];

const UserManagement: React.FC = () => {
  const screens = useBreakpoint();

  // later API se aayega
  const users: User[] = [];

  return (
    <Card
      title="User Management"
      extra={
        <Button type="primary" block={!screens.md}>
          Add User
        </Button>
      }
    >
      {/* ================= Desktop ================= */}
      {screens.md && (
        <Table<User>
          rowKey="id"
          dataSource={users}
          columns={columns}
        />
      )}

      {/* ================= Mobile ================= */}
      {!screens.md && (
        <List
          dataSource={users}
          renderItem={(user) => (
            <Card
              key={user.id}
              style={{ marginBottom: 12 }}
              title={user.name}
            >
              <Space direction="vertical" size={4}>
                <Text>
                  <Text strong>Email:</Text> {user.email}
                </Text>
                <Text>
                  <Text strong>Role:</Text> {user.role}
                </Text>
              </Space>
            </Card>
          )}
        />
      )}
    </Card>
  );
};

export default UserManagement;
