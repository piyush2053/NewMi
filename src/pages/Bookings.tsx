import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import FooterNav from "../components/FooterNav";

const mockCreatedEvents = [
  { id: 1, title: "Turf Cricket", date: "2025-10-05", time: "10:00 AM", category: "Sports" },
  { id: 2, title: "Garba Night", date: "2025-10-10", time: "07:00 PM", category: "Music" },
];

const mockJoinedEvents = [
  { id: 1, title: "House Party", date: "2025-10-08", time: "08:00 PM", category: "Party" },
  { id: 2, title: "Birthday Bash", date: "2025-10-12", time: "06:00 PM", category: "Party" },
];

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("created");

  return (
    <div className="min-h-screen bg-bg1 text-white flex flex-col font-sans">
      <main className="flex-1 p-4 space-y-6">
        <div className="flex gap-4 mb-4">
          <button
            className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeTab === "created" ? "bg-[#4CAF50] text-white" : "bg-[#2C2C2C] text-gray-400"
            }`}
            onClick={() => setActiveTab("created")}
          >
            Events I Created
          </button>
          <button
            className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeTab === "joined" ? "bg-[#4CAF50] text-white" : "bg-[#2C2C2C] text-gray-400"
            }`}
            onClick={() => setActiveTab("joined")}
          >
            Upcoming / Joined Events
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === "created" &&
            mockCreatedEvents.map((event) => (
              <div key={event.id} className="bg-[#2C2C2C] p-4 rounded-lg flex flex-col gap-1">
                <h2 className="font-semibold text-lg">{event.title}</h2>
                <p className="text-gray-400 text-sm">{event.category}</p>
                <p className="text-gray-400 text-sm">{event.date} | {event.time}</p>
              </div>
            ))}

          {activeTab === "joined" &&
            mockJoinedEvents.map((event) => (
              <div key={event.id} className="bg-[#2C2C2C] p-4 rounded-lg flex flex-col gap-1">
                <h2 className="font-semibold text-lg">{event.title}</h2>
                <p className="text-gray-400 text-sm">{event.category}</p>
                <p className="text-gray-400 text-sm">{event.date} | {event.time}</p>
              </div>
            ))}
        </div>
      </main>

      <FooterNav />
    </div>
  );
};

export default MyBookings;
