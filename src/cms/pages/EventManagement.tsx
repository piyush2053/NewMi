
// ================= pages/EventManagement.tsx =================
import React from "react";
import { Card, Table, Button } from "antd";

const EventManagement: React.FC = () => {
  return (
    <Card title="Event Management" extra={<Button type="primary">Create Event</Button>}>
      <Table
        rowKey="id"
        dataSource={[]}
        columns={[
          { title: "Event Name", dataIndex: "name" },
          { title: "Date", dataIndex: "date" },
          { title: "Location", dataIndex: "location" },
        ]}
      />
    </Card>
  );
};

export default EventManagement;
