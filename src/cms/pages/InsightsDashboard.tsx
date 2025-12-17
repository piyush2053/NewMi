import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, message, Spin } from "antd";
import type { StatisticProps } from "antd";
import {
  AppstoreOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import CountUp from "react-countup";
import { core_services } from "../../utils/api";

const InsightsDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const [categoryCount, setCategoryCount] = useState<number>(0);
  const [eventCount, setEventCount] = useState<number>(0);
  const [activeEventCount, setActiveEventCount] = useState<number>(0);

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

      const activeEvents = eventsRes.filter(
        (e: any) => e.Status === 1
      );
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
    <CountUp
      end={Number(value) || 0}
      duration={1.2}
      separator=","
    />
  );

  return (
    <div>
      <Row gutter={[16, 16]}>
        {/* Total Categories */}
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

        {/* Total Events */}
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

        {/* Active Events */}
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

        {/* Users (Future Placeholder) */}
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
    </div>
  );
};

export default InsightsDashboard;
