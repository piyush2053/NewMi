import React, { useMemo, useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Table,
  Typography,
  Grid,
  Select,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { APP_ROUTE_OPTIONS } from "../../utils/constants";
import { core_services } from "../../utils/api";

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

/* ---------------- TYPES ---------------- */
interface User {
  id: string;
  name: string;
  email: string;
}

/* ---------------- MOCK USERS ---------------- */
const mockUsers: User[] = [
  { id: "1", name: "Piyush Patel", email: "piyush@gmail.com" },
  { id: "2", name: "Amit Sharma", email: "amit@gmail.com" },
  { id: "3", name: "Neha Verma", email: "neha@gmail.com" },
];

/* ---------------- COMPONENT ---------------- */
const Announcements: React.FC = () => {
  const screens = useBreakpoint();
  const [form] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [sending, setSending] = useState(false);

  /* ---------------- TABLE CONFIG ---------------- */
  const columns: ColumnsType<User> = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        render: (_, record) => (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-medium">
              {record.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <Text>{record.name}</Text>
          </div>
        ),
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Status",
        render: (_, record) => (
          <span
            className={`px-2 py-1 rounded-full text-xs ${record.id === "3"
                ? "bg-gray-100 text-gray-500"
                : "bg-green-100 text-green-700"
              }`}
          >
            {record.id === "3" ? "Offline" : "Active"}
          </span>
        ),
      },
    ],
    []
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  };

  /* ---------------- SUBMIT ---------------- */
  const onSubmit = async (values: any) => {
    if (!selectedRowKeys.length) {
      message.warning("Please select at least one user");
      return;
    }

    const payload = {
      userIds: selectedRowKeys as string[],
      title: values.title,
      body: values.body,
      data: {
        route: values.route,
      },
    };

    try {
      setSending(true);
      await core_services.sendPushNotification(payload);
      message.success("Announcement sent successfully");

      form.resetFields();
      setSelectedRowKeys([]);
    } catch (error: any) {
      message.error(error?.message || "Failed to send announcement");
    } finally {
      setSending(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div>
      {/* PAGE TITLE */}
      <Title level={3} className="mb-4">
        New Announcement
      </Title>

      {/* ---------------- SELECT USERS CARD ---------------- */}
      <Card
        className="mb-6"
        title={
          <div className="flex items-center justify-between">
            <div>
              <Text strong>Select Users</Text>
              <div className="text-xs text-gray-500">
                Choose recipients for this announcement
              </div>
            </div>
            <Input.Search
              placeholder="Search users..."
              style={{ width: 220 }}
              allowClear
            />
          </div>
        }
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={mockUsers}
          pagination={false}
          rowSelection={rowSelection}
        />

        <div className="flex justify-between text-xs text-gray-500 mt-3">
          <span>Showing {mockUsers.length} of 124 users</span>
          <div className="flex gap-2">
            <Button size="small" disabled>
              Previous
            </Button>
            <Button size="small">Next</Button>
          </div>
        </div>
      </Card>

      {/* ---------------- CONTENT DETAILS CARD ---------------- */}
      <Card
        title={
          <div>
            <Text strong>Content Details</Text>
            <div className="text-xs text-gray-500">
              Fill in the information below to create the notification
            </div>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
          style={{ maxWidth: screens.md ? 500 : "100%" }}
        >
          <Form.Item
            label="Announcement Title"
            name="title"
            rules={[
              { required: true, message: "Enter title" },
              { max: 20, message: "Title can be maximum 20 characters" },
            ]}
          >
            <Input
              placeholder="Maintenance Alert"
              maxLength={20}
              showCount
            />
          </Form.Item>
          <Form.Item
            label="Body Content"
            name="body"
            rules={[
              { required: true, message: "Enter message body" },
              { max: 60, message: "Body can be maximum 60 characters" },
            ]}
          >
            <Input.TextArea
              rows={4}
              maxLength={40}
              showCount
              placeholder="App will be on maintenance till 12 PM."
            />
          </Form.Item>


          <Form.Item
            label="Where should user land?"
            name="route"
            rules={[{ required: true, message: "Select a destination" }]}
          >
            <Select
              placeholder="Select app screen"
              options={APP_ROUTE_OPTIONS}
              allowClear
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={sending}
            disabled={!selectedRowKeys.length}
          >
            Send Announcement
          </Button>

          {!selectedRowKeys.length && (
            <Text type="secondary" className="block mt-2">
              Select at least one user
            </Text>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default Announcements;
