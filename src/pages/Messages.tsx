import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FooterNav from "../components/FooterNav";
import { useUser } from "../contexts/UserContext";
import { core_services } from "../utils/api";
import MessagesListSkeleton from "../skeletons/MessageListSkeleton";

const MessagesList = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // contains userId
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchJoinedEvents = async () => {
    setLoading(true);
    try {
      if (!user?.userId) return;

      // Step 1: fetch joined event IDs
      const joined = await core_services.getAlleventsJoinedbyUser(user.userId);

      // joined = [{ EventId: "...", ... }, ...]

      // Step 2: fetch event details for each joined event
      const eventPromises = joined.map((attend: any) =>
        core_services.getEventById(attend.EventId)
      );

      const eventDetails = await Promise.all(eventPromises);

      // Step 3: set final events data
      setEvents(eventDetails);
    } catch (err) {
      console.error("Error loading joined events:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchJoinedEvents();
}, [user]);


  return (
    <div className="min-h-screen bg-bg1 text-white flex flex-col font-sans">
      <header className="flex items-center p-4 bg-bg1 shadow-sm">
        <h1 className="flex-1 text-center text-lg font-semibold">Messages</h1>
      </header>

      <main className="flex-1 p-4 space-y-2 overflow-y-auto">
        {loading ? (
          <MessagesListSkeleton />
        ) : (
          events.map((event: any) => {

            const isAdmin = event.UserId === user?.userId;

            return (
              <div
                key={event.EventID}
                className="flex items-center gap-3 p-3 bg-bg4 rounded-lg cursor-pointer hover:bg-[#3A3A3A] transition"
                onClick={() => navigate(`/messages/${event.EventID}`)}
              >
                <div className="w-12 h-12 rounded-full bg-bg6 flex items-center justify-center text-bg1 font-bold">
                  {event.EventTitle?.charAt(0) || "E"}
                </div>

                {/* Event Details */}
                <div className="flex-1">
                  <p className="font-semibold text-white">{event.EventTitle}</p>
                  <p className="text-gray-400 text-sm truncate">{event.EventDesc}</p>
                </div>

                {/* ADMIN badge */}
                {isAdmin && (
                  <span className="text-bg6 text-[10px] font-semibold border border-bg6 px-2 py-0.5 rounded">
                    ADMIN
                  </span>
                )}
              </div>
            );
          }))}
      </main>

      <FooterNav />
    </div>
  );
};

export default MessagesList;
