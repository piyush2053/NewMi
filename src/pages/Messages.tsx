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
  const loadEvents = async () => {
    setLoading(true);
    try {
      if (!user?.userId) return;

      // 1️⃣ Fetch events user joined
      const joined = await core_services.getAlleventsJoinedbyUser(user.userId);

      const joinedEventIds = joined.map((e: any) => e.EventId);

      const joinedEventsPromises = joinedEventIds.map((eventId: string) =>
        core_services.getEventById(eventId)
      );

      const joinedEvents = await Promise.all(joinedEventsPromises);

      // 2️⃣ Fetch events user CREATED (your existing API)
      const allEvents = await core_services.getAllEvents();
      const createdEvents = allEvents.filter(
        (event: any) => event.UserId === user.userId
      );

      // 3️⃣ Combine BOTH (avoid duplicates)
      const finalEvents = [
        ...joinedEvents,
        ...createdEvents.filter(
          (e: any) => !joinedEventIds.includes(e.EventID)
        ),
      ];

      setEvents(finalEvents);
    } catch (err) {
      console.error("Error loading events:", err);
    } finally {
      setLoading(false);
    }
  };

  loadEvents();
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
