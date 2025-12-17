import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Space,
  Popconfirm,
  Collapse,
  Typography,
  Grid,
  List,
  Progress,
  Tag,
} from "antd";
import dayjs from "dayjs";
import { core_services } from "../../utils/api";

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface EventItem {
  id: string;
  eventTitle: string;
  eventDesc: string;
  categoryId: number;
  location: string;
  userId: string;
  eventTime: string;
  status: number;
}

const EventManagement: React.FC = () => {
  const screens = useBreakpoint();

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  const [form] = Form.useForm();

  // ================= Helpers =================
  const isLatLng = (location: string) =>
    /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/.test(location);

  const renderLocation = (location: string) => {
    if (!isLatLng(location)) return location;

    return (
      <div>
        <Text strong>Pinned Location</Text>
        <Collapse
          ghost
          size="small"
          items={[
            {
              key: "raw",
              label: <Text type="warning">Show raw</Text>,
              children: (
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {location}
                </Text>
              ),
            },
          ]}
        />
      </div>
    );
  };

  // ================= Duration Logic =================
  const getEventDuration = (eventTime: string) => {
    const start = dayjs(eventTime);
    const end = start.add(3, "day"); // hardcoded end date

    const total = end.diff(start, "minute");
    const passed = dayjs().diff(start, "minute");

    const isEnded = dayjs().isAfter(end);

    const progress = isEnded
      ? 100
      : Math.min(Math.max((passed / total) * 100, 0), 100);

    return {
      start,
      end,
      progress: Math.round(progress),
      isEnded,
    };
  };

  // ================= Fetch =================
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await core_services.getAllEvents();

      const mapped: EventItem[] = res.map((item: any) => ({
        id: item.EventID,
        eventTitle: item.EventTitle,
        eventDesc: item.EventDesc,
        categoryId: item.CategoryId,
        location: item.Location,
        userId: item.UserId,
        eventTime: item.EventTime,
        status: item.Status,
      }));

      setEvents(mapped);
    } catch {
      message.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ================= CRUD =================
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingEvent) {
        await core_services.updateEvent(editingEvent.id, values);
        message.success("Event updated");
      } else {
        await core_services.createEvent(values);
        message.success("Event created");
      }

      handleClose();
      fetchEvents();
    } catch (err: any) {
      message.error(err?.message || "Something went wrong");
    }
  };

  const handleEdit = (record: EventItem) => {
    setEditingEvent(record);
    form.setFieldsValue(record);
    setOpen(true);
  };

  const handleDelete = async (eventId: string) => {
    try {
      await core_services.deleteEvent(eventId);
      message.success("Event deleted");
      fetchEvents();
    } catch {
      message.error("Delete failed");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingEvent(null);
    form.resetFields();
  };

  // ================= Table Columns =================
  const columns = [
    {
      title: "Event Title",
      dataIndex: "eventTitle",
    },
    {
      title: "Duration",
      dataIndex: "eventTime",
      width: 260,
      render: (v: string) => {
        const d = getEventDuration(v);

        if (d.isEnded) {
          return <Tag color="default">ENDED</Tag>;
        }

        return (
          <div>
            <Text style={{ fontSize: 12 }}>
              <b>Start:</b> {d.start.format("DD MMM YYYY hh:mm A")}
            </Text>
            <br />
            <Text style={{ fontSize: 12 }}>
              <b>End:</b> {d.end.format("DD MMM YYYY hh:mm A")}
            </Text>

            <div style={{ marginTop: 4 }}>
              <Progress
                percent={d.progress}
                size="small"
                showInfo={false}
              />
            </div>
          </div>
        );
      },
    },
    {
      title: "Location",
      dataIndex: "location",
      render: (v: string) => renderLocation(v),
    },
    {
      title: "Actions",
      render: (_: any, record: EventItem) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete this event?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Event Management"
      extra={
        <Button
          type="primary"
          block={!screens.md}
          onClick={() => {
            form.resetFields();
            setEditingEvent(null);
            setOpen(true);
          }}
        >
          Create Event
        </Button>
      }
    >
      {/* ================= Desktop ================= */}
      {screens.md && (
        <Table
          rowKey="id"
          loading={loading}
          dataSource={events}
          columns={columns}
          rowClassName={(record) =>
            getEventDuration(record.eventTime).isEnded
              ? "ended-row"
              : ""
          }
        />
      )}

      {/* ================= Mobile ================= */}
      {!screens.md && (
        <List
          loading={loading}
          dataSource={events}
          renderItem={(item) => {
            const d = getEventDuration(item.eventTime);

            return (
              <Card
                key={item.id}
                style={{
                  marginBottom: 12,
                  background: d.isEnded ? "#e5e7eb" : undefined, // gray-600-ish
                }}
                title={item.eventTitle}
              >
                {d.isEnded ? (
                  <Tag color="default">ENDED</Tag>
                ) : (
                  <>
                    <p>
                      <Text strong>Start:</Text>{" "}
                      {d.start.format("DD MMM YYYY hh:mm A")}
                    </p>
                    <p>
                      <Text strong>End:</Text>{" "}
                      {d.end.format("DD MMM YYYY hh:mm A")}
                    </p>
                    <Progress
                      percent={d.progress}
                      size="small"
                      showInfo={false}
                    />
                  </>
                )}

                <p style={{ marginTop: 8 }}>
                  <Text strong>Location:</Text>{" "}
                  {renderLocation(item.location)}
                </p>

                <Space direction="vertical" style={{ width: "100%" }}>
                  <Button block disabled={d.isEnded} onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                  <Popconfirm
                    title="Delete this event?"
                    onConfirm={() => handleDelete(item.id)}
                  >
                    <Button block danger>
                      Delete
                    </Button>
                  </Popconfirm>
                </Space>
              </Card>
            );
          }}
        />
      )}

      {/* ================= Modal ================= */}
      <Modal
        title={editingEvent ? "Edit Event" : "Create Event"}
        open={open}
        onOk={handleSubmit}
        onCancel={handleClose}
        okText={editingEvent ? "Update" : "Create"}
        width={screens.md ? 600 : "100%"}
        style={!screens.md ? { top: 0 } : undefined}
        bodyStyle={!screens.md ? { minHeight: "75vh" } : undefined}
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Event Title" name="eventTitle" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="eventDesc" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item label="Location" name="location" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Event Time" name="eventTime" rules={[{ required: true }]}>
            <Input placeholder="2025-08-12T20:09:00Z" />
          </Form.Item>

          <Form.Item label="Category ID" name="categoryId" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="User ID" name="userId" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* ================= Row Style ================= */}
      <style>
        {`
          .ended-row td {
            background-color: #e5e7eb !important;
          }
        `}
      </style>
    </Card>
  );
};

export default EventManagement;
