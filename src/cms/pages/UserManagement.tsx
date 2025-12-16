import React from "react";
import { Card, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const columns: ColumnsType<User> = [
  { title: "Name", dataIndex: "name" },
  { title: "Email", dataIndex: "email" },
  { title: "Role", dataIndex: "role" },
];

const UserManagement: React.FC = () => {
  return (
    <Card
      title="User Management"
      extra={<Button type="primary">Add User</Button>}
    >
      <Table<User>
        rowKey="id"
        dataSource={[]}
        columns={columns}
      />
    </Card>
  );
};

export default UserManagement;
