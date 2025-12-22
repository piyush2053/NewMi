import React, { useEffect, useRef, useState } from "react";
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

/* ================= TYPES ================= */
interface EventItem {
  id: string;
  eventTitle: string;
  eventDesc: string;
  categoryId: number;
  location: string;
  userId: string;
  status: number;

  maxAttendent: number;
  currentVacany: number;
  charges: number;

  startDateTime: string | null;
  endDateTime: string | null;
  eventImg?: string;
}

const EventManagement: React.FC = () => {
  const screens = useBreakpoint();
  const cancelRef = useRef(false);

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [bulkProgress, setBulkProgress] = useState(0);

  const [open, setOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  const [form] = Form.useForm();


  const getEventDuration = (start?: string | null, end?: string | null) => {
    if (!start || !end) return { invalid: true };

    const s = dayjs(start);
    const e = dayjs(end);
    const now = dayjs();

    if (now.isAfter(e)) return { isEnded: true };

    const totalMinutes = e.diff(s, "minute");
    const remainingMinutes = e.diff(now, "minute");

    const progress = Math.round(
      Math.min(Math.max((remainingMinutes / totalMinutes) * 100, 0), 100)
    );

    return {
      start: s,
      end: e,
      remainingMinutes,
      progress,
      isEnded: false,
    };
  };

  /* ================= FETCH ================= */
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
        status: item.Status,

        maxAttendent: item.MaxAttendent,
        currentVacany: item.CurrentVacany,
        charges: item.Charges,

        startDateTime: item.StartDateTime,
        endDateTime: item.EndDateTime,
        eventImg: item.EventImg,
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

  /* ================= CRUD ================= */
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

  const handleDelete = async (id: string) => {
    try {
      await core_services.deleteEvent(id);
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

  /* ================= BULK DELETE ================= */
  const handleBulkDelete = async () => {
    setBulkDeleting(true);
    cancelRef.current = false;

    const total = selectedRowKeys.length;

    for (let i = 0; i < total; i++) {
      if (cancelRef.current) break;

      await core_services.deleteEvent(selectedRowKeys[i] as string);
      setBulkProgress(Math.round(((i + 1) / total) * 100));
    }

    setBulkDeleting(false);
    setBulkProgress(0);
    setSelectedRowKeys([]);
    fetchEvents();
  };

  const cancelBulkDelete = () => {
    cancelRef.current = true;
    message.warning("Bulk delete cancelled");
  };

  /* ================= SEARCH ================= */
  const filteredEvents = events.filter((e) =>
    [e.eventTitle, e.location, e.userId]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* ================= TABLE ================= */
  const columns = [
    {
      title: "Event Title",
      dataIndex: "eventTitle",
    },
    {
      title: "Duration",
      width: 280,
      render: (_: any, record: EventItem) => {
        const d: any = getEventDuration(
          record.startDateTime,
          record.endDateTime
        );

        if (d.invalid) return <Tag>NO TIME</Tag>;
        if (d.isEnded) return <Tag color="default">ENDED</Tag>;

        return (
          <>
            <Text style={{ fontSize: 12 }}>
              <b>Ends:</b> {d.end.format("DD MMM YYYY hh:mm A")}
            </Text>

            <Progress
              percent={d.progress}
              size="small"
              showInfo={false}
              status="active"
            />

            <Text type="secondary" style={{ fontSize: 11 }}>
              {Math.floor(d.remainingMinutes / 60)}h{" "}
              {d.remainingMinutes % 60}m remaining
            </Text>
          </>
        );
      },
    },
    {
      title: "Actions",
      render: (_: any, record: EventItem) => (
        <Space>
          <Button type="default" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete this event?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="primary" danger>
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
        <Space>
          {selectedRowKeys.length > 0 && (
            <Button danger onClick={handleBulkDelete}>
              Delete Selected ({selectedRowKeys.length})
            </Button>
          )}
          <Button
            type="primary"
          onClick={() => {
              form.resetFields();
              setEditingEvent(null);
              setOpen(true);
            }}
          >
            Create Event
          </Button>
        </Space>
      }
    >
      <Input.Search
        placeholder="Search by title, location, user"
        allowClear
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 12 }}
      />

      {screens.md && (
        <Table
          rowKey="id"
          className="event-table"
          loading={loading}
          dataSource={filteredEvents}
          columns={columns}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
        />
      )}

      {!screens.md && (
        <List
          loading={loading}
          dataSource={filteredEvents}
          renderItem={(item) => {
            const d = getEventDuration(item.startDateTime, item.endDateTime);

            return (
              <Card key={item.id} style={{ marginBottom: 12 }} title={item.eventTitle}>
                {d.isEnded ? (
                  <Tag>ENDED</Tag>
                ) : (
                  <>
                    <p>Start: {d.start?.format("DD MMM YYYY hh:mm A")}</p>
                    <p>End: {d.end?.format("DD MMM YYYY hh:mm A")}</p>
                    <Progress percent={d.progress} size="small" showInfo={false} />
                  </>
                )}
              </Card>
            );
          }}
        />
      )}

      {/* BULK PROGRESS */}
      <Modal open={bulkDeleting} footer={null} closable={false}>
        <Text>Deleting events...</Text>
        <Progress percent={bulkProgress} />
        <Button danger block onClick={cancelBulkDelete}>
          Cancel
        </Button>
      </Modal>

      {/* CREATE / EDIT */}
      <Modal
        title={editingEvent ? "Edit Event" : "Create Event"}
        open={open}
        onOk={handleSubmit}
        onCancel={handleClose}
        okText={editingEvent ? "Update" : "Create"}
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
        </Form>
      </Modal>
    </Card>
  );
};

export default EventManagement;
