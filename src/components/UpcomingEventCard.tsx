import { Button } from "antd";
import Card from "antd/es/card/Card";
import { useNotification } from "../contexts/NotificationContext";
import { useState } from "react";

const UpcomingEventCard = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const formatDateTime = (gmtString) => {
    const date = new Date(gmtString);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata"
    });
  };

  const handleSetReminder = async () => {
    try {
      setLoading(true);
      // Here you can later call an API to actually save the reminder
      showNotification(
        "Success",
        `Reminder set for ${match.teamA} vs ${match.teamB} on ${formatDateTime(
          match.dateTimeGMT
        )}`,
        "success"
      );
    } catch (error) {
      showNotification(
        "Error",
        error?.message || "Failed to set reminder",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card
      key={match.id}
      className="bg-white/10 backdrop-blur-md border border-white/20 shadow-md text-white rounded-xl"
    >
      <div className="flex justify-between items-center mb-2">
        <div>
          <div className="font-bold team-names">
            {match.teamA} vs {match.teamB}
          </div>
          <div className="text-sm text-gray-300">{match.series}</div>
          <div className="text-xs text-gray-400">
            {formatDateTime(match.dateTimeGMT)}
          </div>
        </div>
        <Button
          type="default"
          className="rounded-full bg-pBlue border-none text-white set-reminder-btn"
          onClick={handleSetReminder}
          loading={loading}
        >
          Set Reminder
        </Button>
      </div>
    </Card>
  );
};

export default UpcomingEventCard;
