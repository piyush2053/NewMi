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
  AppstoreOutlined,
  CalendarOutlined,
  UserOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import CountUp from "react-countup";
import { core_services } from "../../utils/api";
import dayjs from "dayjs";

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

  const [categoryCount, setCategoryCount] = useState<number>(0);
  const [eventCount, setEventCount] = useState<number>(0);
  const [activeEventCount, setActiveEventCount] = useState<number>(0);
  const [events, setEvents] = useState<EventItem[]>([]);

  // ================= Fetch Insights =================
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

      const activeEvents = eventsRes.filter((e: any) => e.Status === 1);
      setActiveEventCount(activeEvents.length);
    } catch {
      message.error("Failed to load insights");
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

  // ================= CountUp Formatter =================
  const formatter: StatisticProps["formatter"] = (value) => (
    <CountUp end={Number(value) || 0} duration={1.2} separator="," />
  );

  // ================= Helper: Fake Event Life =================
  const getEventLifeData = (eventTime: string) => {
    const start = dayjs(eventTime).subtract(
      Math.floor(Math.random() * 3) + 1,
      "day"
    );
    const end = start.add(
      Math.floor(Math.random() * 5) + 2,
      "day"
    );

    const total = end.diff(start, "minute");
    const passed = dayjs().diff(start, "minute");
    const progress = Math.min(Math.max((passed / total) * 100, 0), 100);

    return {
      start,
      end,
      progress: Math.round(progress),
    };
  };

  return (
    <div>
      {/* ================= Top Stats ================= */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Categories"
              value={categoryCount}
              formatter={formatter}
              prefix={<AppstoreOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Events"
              value={eventCount}
              formatter={formatter}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Active Events"
              value={activeEventCount}
              formatter={formatter}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Users"
              value={0}
              formatter={formatter}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* ================= Event Life Section ================= */}
      <Divider />
      <Title level={4}>Event Life</Title>

      <Row gutter={[16, 16]}>
        {events.slice(0, 2).map((event) => {
          const life = getEventLifeData(event.EventTime);

          return (
            <Col xs={24} md={12} key={event.EventID}>
              <Card>
                <Title level={5}>{event.EventTitle}</Title>
                <Text type="secondary">{event.EventDesc}</Text>

                <div style={{ marginTop: 12 }}>
                  <Text strong>Start:</Text>{" "}
                  {life.start.format("DD MMM YYYY, hh:mm A")}
                </div>

                <div>
                  <Text strong>End:</Text>{" "}
                  {life.end.format("DD MMM YYYY, hh:mm A")}
                </div>

                <div style={{ marginTop: 12 }}>
                  <Progress
                    percent={life.progress}
                    status={life.progress >= 100 ? "success" : "active"}
                  />
                </div>

                <div style={{ marginTop: 8 }}>
                  <Text type="warning">
                    <InfoCircleOutlined /> This event will be deleted soon and
                    the owner of the event will be notified.
                  </Text>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default InsightsDashboard;
