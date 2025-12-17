import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Statistic,
  message,
  Spin,
  Progress,
  Typography,
  Divider,
} from "antd";
import type { StatisticProps } from "antd";
import {
  InfoCircleOutlined,
} from "@ant-design/icons";
import CountUp from "react-countup";
import { core_services } from "../../utils/api";
import dayjs from "dayjs";

// Recharts
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const { Text, Title } = Typography;

interface EventItem {
  EventID: string;
  EventTitle: string;
  EventDesc: string;
  EventTime: string;
  Status: number;
}

const InsightsDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const [categoryCount, setCategoryCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [activeEventCount, setActiveEventCount] = useState(0);
  const [events, setEvents] = useState<EventItem[]>([]);

  // ================= API =================
  const fetchInsights = async () => {
    setLoading(true);
    try {
      const [categoriesRes, eventsRes] = await Promise.all([
        core_services.getCategories(),
        core_services.getAllEvents(),
      ]);

      setCategoryCount(categoriesRes?.length || 0);
      setEventCount(eventsRes?.length || 0);
      setEvents(eventsRes || []);

      setActiveEventCount(
        eventsRes.filter((e: any) => e.Status === 1).length
      );
    } catch {
      message.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 80 }}>
        <Spin size="large" />
      </div>
    );
  }

  // ================= CountUp =================
  const formatter: StatisticProps["formatter"] = (value) => (
    <CountUp end={Number(value) || 0} duration={1.2} separator="," />
  );

  // ================= Event Life (Fake for now) =================
  const getEventLife = (eventTime: string) => {
    const start = dayjs(eventTime).subtract(1, "day");
    const end = start.add(4, "day");

    const total = end.diff(start, "minute");
    const passed = dayjs().diff(start, "minute");
    const progress = Math.min(Math.max((passed / total) * 100, 0), 100);

    return { start, end, progress: Math.round(progress) };
  };

  // ================= Static Analytics Data =================
  const eventTrendData = [
    { month: "Jan", events: 65, capacity: 80 },
    { month: "Feb", events: 78, capacity: 90 },
    { month: "Mar", events: 92, capacity: 95 },
    { month: "Apr", events: 88, capacity: 85 },
    { month: "May", events: 105, capacity: 110 },
    { month: "Jun", events: 130, capacity: 125 },
  ];

  const eventStatusData = [
    { name: "Active", value: activeEventCount, color: "#4096ff" },
    { name: "Upcoming", value: 28, color: "#9254de" },
    { name: "Completed", value: 67, color: "#52c41a" },
  ];

  const attendanceData = [
    { name: "Conference", attended: 890, registered: 950 },
    { name: "Workshop", attended: 380, registered: 400 },
    { name: "Meetup", attended: 150, registered: 200 },
  ];

  return (
    <div>
      {/* ================= KPIs ================= */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Card>
            <Statistic title="Total Categories" value={categoryCount} formatter={formatter} />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card>
            <Statistic title="Total Events" value={eventCount} formatter={formatter} />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card>
            <Statistic title="Active Events" value={activeEventCount} formatter={formatter} />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card>
            <Statistic title="Users" value={12500} formatter={formatter} />
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* ================= Event Growth ================= */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Event Growth Trend">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={eventTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="events" stroke="#4096ff" fill="#4096ff33" />
                <Line type="monotone" dataKey="capacity" stroke="#9254de" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Event Status">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={eventStatusData} dataKey="value" innerRadius={60} outerRadius={100}>
                  {eventStatusData.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* ================= Attendance ================= */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Attendance Analysis">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="attended" fill="#4096ff" />
                <Bar dataKey="registered" fill="#9254de" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* ================= Event Life ================= */}
        <Col xs={24} lg={12}>
          <Card title="Event Life">
            {events.slice(0, 2).map((e) => {
              const life = getEventLife(e.EventTime);
              return (
                <Card key={e.EventID} style={{ marginBottom: 12 }}>
                  <Title level={5}>{e.EventTitle}</Title>
                  <Text type="secondary">{e.EventDesc}</Text>

                  <div style={{ marginTop: 8 }}>
                    <Text strong>Start:</Text> {life.start.format("DD MMM YYYY hh:mm A")}
                  </div>
                  <div>
                    <Text strong>End:</Text> {life.end.format("DD MMM YYYY hh:mm A")}
                  </div>

                  <Progress percent={life.progress} />

                  <Text type="warning">
                    <InfoCircleOutlined /> Event will be auto-deleted after completion
                  </Text>
                </Card>
              );
            })}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default InsightsDashboard;
