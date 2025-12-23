import React, { useMemo, useState } from "react";
import {
    Card,
    Form,
    Input,
    Button,
    Table,
    Space,
    Typography,
    Grid,
    Select,
    message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { APP_ROUTE_OPTIONS } from "../../utils/constants";
import { core_services } from "../../utils/api";

const { Text } = Typography;
const { useBreakpoint } = Grid;

/* ---------------- TYPES ---------------- */
interface User {
    id: string;
    name: string;
    email: string;
}

/* ---------------- MOCK USERS (replace with API later) ---------------- */
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
                key: "name",
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "email",
            },
        ],
        []
    );

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
    };

    /* ---------------- ACTIONS ---------------- */
    const selectAllUsers = () =>
        setSelectedRowKeys(mockUsers.map((u) => u.id));

    const deselectAllUsers = () => setSelectedRowKeys([]);

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

            // Reset UI
            form.resetFields();
            setSelectedRowKeys([]);
        } catch (error: any) {
            message.error(
                error?.message || "Failed to send announcement"
            );
        } finally {
            setSending(false);
        }
    };

    /* ---------------- UI ---------------- */
    return (
        <Card title="Announcements">
            {/* ---------------- USERS TABLE ---------------- */}
            <div className="mb-6">
                <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
                    <Text strong className="text-lg">Users</Text>
                </div>

                <Table
                    rowKey="id"
                    size="small"
                    columns={columns}
                    dataSource={mockUsers}
                    pagination={false}
                    rowSelection={rowSelection}
                    className="event-table"
                />
            </div>

            {/* ---------------- ANNOUNCEMENT FORM ---------------- */}
            <Form
                form={form}
                layout="vertical"
                onFinish={onSubmit}
                style={{
                    maxWidth: screens.md ? 500 : "100%",
                }}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: "Enter title" }]}
                >
                    <Input placeholder="Maintainance" />
                </Form.Item>

                <Form.Item
                    label="Body"
                    name="body"
                    rules={[{ required: true, message: "Enter message body" }]}
                >
                    <Input.TextArea
                        rows={4}
                        placeholder="App will be on maintainance till 12 PM."
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

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block={!screens.md}
                        loading={sending}
                        disabled={selectedRowKeys.length === 0}
                        className="mt-2"
                    >
                        Send Announcement
                    </Button>

                    {selectedRowKeys.length === 0 && (
                        <Text type="secondary" className="block mt-2">
                            Select at least one user
                        </Text>
                    )}
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Announcements;
