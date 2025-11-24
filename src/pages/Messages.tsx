import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FooterNav from "../components/FooterNav";
import { useUser } from "../contexts/UserContext";
import { core_services } from "../utils/api";
import MessagesListSkeleton from "../skeletons/MessageListSkeleton";
import { useNotification } from "../contexts/NotificationContext";

const MessagesList = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { showNotification } = useNotification();
  const [showMenuFor, setShowMenuFor] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [eventToDelete, setEventToDelete] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<{ joined: any[]; my: any[] }>({
    joined: [],
    my: [],
  });

  const [activeTab, setActiveTab] = useState<"joined" | "my">("joined");

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);

      try {
        if (!user?.userId) return;

        // 1️⃣ Fetch all events (needed for admin check)
        const allEvents = await core_services.getAllEvents();

        // 2️⃣ Events where user is admin
        const myEvents = allEvents.filter(
          (event: any) => event.UserId === user.userId
        );

        // 3️⃣ Events user joined
        const joinedRaw = await core_services.getAlleventsJoinedbyUser(user.userId);
        const joinedEventIds = joinedRaw.map((e: any) => e.EventId);

        // SAFE GET EVENT BY ID (even if one fails)
        const joinedEventsPromises = joinedEventIds.map(async (eventId: string) => {
          try {
            return await core_services.getEventById(eventId);
          } catch (err) {
            console.warn("Event ID failed:", eventId, err);
            return null;
          }
        });

        const joinedResults = await Promise.all(joinedEventsPromises);

        // keep only valid events
        const joinedFetched = joinedResults.filter((e) => e !== null);

        // Remove admin events
        const joinedEvents = joinedFetched.filter(
          (event: any) => event?.UserId !== user.userId
        );

        setEvents({
          joined: joinedEvents,
          my: myEvents,
        });

      } catch (err) {
        console.error("Error loading events:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [user]);


  const listToShow = activeTab === "joined" ? events.joined : events.my;
  const deleteEvent = async () => {
    if (!eventToDelete) return;

    try {
      await core_services.deleteEvent(eventToDelete.EventID);
      setEvents((prev) => ({
        ...prev,
        my: prev.my.filter((e) => e.EventID !== eventToDelete.EventID),
      }));

      setShowConfirm(false);
      setEventToDelete(null);

    } catch (error) {
      console.error("Delete error:", error);
      showNotification("Error", "While Deleting Event", "error", 3000);
    }
  };


  return (
    <div className="min-h-screen bg-bg1 text-white flex flex-col font-sans">
      <header className="flex justify-center p-4 bg-bg1 shadow-sm">
         <div className="flex items-center justify-center gap-3 mb-2">
          <button
            onClick={() => setActiveTab("joined")}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition 
              ${activeTab === "joined"
                ? "bg-bg6 text-bg1 border-bg6"
                : "text-gray-300 border-gray-600"}`}
          >
            Events Joined
          </button>

          <button
            onClick={() => setActiveTab("my")}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition 
              ${activeTab === "my"
                ? "bg-bg6 text-bg1 border-bg6"
                : "text-gray-300 border-gray-600"}`}
          >
            My Events
          </button>
        </div>
      </header>
      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        {loading ? (
          <MessagesListSkeleton />
        ) : listToShow.length === 0 ? (
          <p className="text-center text-gray-400 mt-6">No events found.</p>
        ) : (
          listToShow.map((event: any) => {
            const isAdmin = event.UserId === user?.userId;

            return (
              <div
                key={event.EventID}
                className="flex items-center gap-3 p-3 bg-bg4 rounded-lg cursor-pointer hover:bg-bg7 transition"
                onClick={() => navigate(`/messages/${event.EventID}`)}
              >
                <div className="w-12 h-12 rounded-full bg-bg6 flex items-center justify-center text-bg1 font-bold">
                  {event.EventTitle?.charAt(0) || "E"}
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-white">{event.EventTitle}</p>
                  <p className="text-gray-400 text-sm truncate">{event.EventDesc}</p>
                </div>

                {/* ADMIN badge */}
                {isAdmin && (
                  <div className="flex items-center gap-2">

                    <span className="text-bg6 text-[10px] font-semibold border border-bg6 px-2 py-0.5 rounded">
                      ADMIN
                    </span>

                    {/* Three dots menu - only in MY EVENTS tab */}
                    {activeTab === "my" && (
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowMenuFor(showMenuFor === event.EventID ? null : event.EventID);
                          }}
                          className="text-gray-300 hover:text-white text-xl"
                        >
                          ⋮
                        </button>

                        {/* Dropdown menu */}
                        {showMenuFor === event.EventID && (
                          <div
                            className="absolute right-0 mt-2 w-32 bg-bg4 border border-gray-600 rounded-lg shadow-lg z-20"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => {
                                setEventToDelete(event);
                                setShowConfirm(true);
                                setShowMenuFor(null);
                              }}
                              className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-[#3A3A3A] rounded-lg"
                            >
                              Delete Event
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

              </div>
            );
          })
        )}
      </main>
      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-bg4 p-5 rounded-xl w-80 text-center border border-gray-600">

            <p className="text-white font-semibold text-sm">
              Are you sure you want to delete this event?
            </p>
            <p className="text-gray-400 text-xs mt-1">
              This will also delete the group created for it.
            </p>

            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-1.5 bg-gray-600 rounded-full text-white text-sm"
              >
                Cancel
              </button>

              <button
                onClick={deleteEvent}
                className="px-4 py-1.5 bg-red-600 rounded-full text-white text-sm"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}

      <FooterNav />
    </div>
  );
};

export default MessagesList;
