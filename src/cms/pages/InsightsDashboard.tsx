import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, message, Spin } from "antd";
import {
  AppstoreOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { core_services } from "../../utils/api";

const InsightsDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const [categoryCount, setCategoryCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [activeEventCount, setActiveEventCount] = useState(0);

  // ================= Fetch Insights =================
  const fetchInsights = async () => {
    setLoading(true);
    try {
      // parallel API calls (fast)
      const [categoriesRes, eventsRes] = await Promise.all([
        core_services.getCategories(),
        core_services.getAllEvents(),
      ]);

      setCategoryCount(categoriesRes?.length || 0);
      setEventCount(eventsRes?.length || 0);

      // example: active events (status === 1)
      const activeEvents = eventsRes.filter(
        (e: any) => e.Status === 1
      );
      setActiveEventCount(activeEvents.length);
    } catch (err) {
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

  return (
    <div>
      <Row gutter={[16, 16]}>
        {/* Categories */}
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Categories"
              value={categoryCount}
              prefix={<AppstoreOutlined />}
            />
          </Card>
        </Col>

        {/* Events */}
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Events"
              value={eventCount}
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
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>

        {/* Placeholder (future users API) */}
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Users"
              value="—"
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

    </div>
  );
};

export default InsightsDashboard;
