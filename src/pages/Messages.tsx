import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FooterNav from "../components/FooterNav";
import { useUser } from "../contexts/UserContext";
import { core_services } from "../utils/api";

const MessagesList = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // contains userId
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await core_services.getAllEvents();
        setEvents(res || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-bg1 text-white flex flex-col font-sans">
      <header className="flex items-center p-4 bg-bg1 shadow-sm">
        <h1 className="flex-1 text-center text-lg font-semibold">Messages</h1>
      </header>

      <main className="flex-1 p-4 space-y-2 overflow-y-auto">
        {events.map((event: any) => {
          const isAdmin = event.UserId === user?.userId;

          return (
            <div
              key={event.EventID}
              className="flex items-center gap-3 p-3 bg-[#2C2C2C] rounded-lg cursor-pointer hover:bg-[#3A3A3A] transition"
              onClick={() => navigate(`/messages/${event.EventID}`)}
            >
              {/* Event icon */}
              <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
                {event.EventTitle?.charAt(0) || "E"}
              </div>

              {/* Event Details */}
              <div className="flex-1">
                <p className="font-semibold text-white">{event.EventTitle}</p>
                <p className="text-gray-400 text-sm truncate">{event.EventDesc}</p>
              </div>

              {/* ADMIN badge */}
              {isAdmin && (
                <span className="text-green-400 text-[10px] font-semibold border border-green-400 px-2 py-0.5 rounded">
                  ADMIN
                </span>
              )}
            </div>
          );
        })}
      </main>

      <FooterNav />
    </div>
  );
};

export default MessagesList;
