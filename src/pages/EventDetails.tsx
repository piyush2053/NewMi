import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { useEffect, useState } from "react";
import FooterNav from "../components/FooterNav";
import { core_services } from "../utils/api";
import Loader from "../components/Loader";
import { useNotification } from "../contexts/NotificationContext";
import { useUser } from "../contexts/UserContext";

const EventDetails = () => {
  const { eventId } = useParams();
  const { user } = useUser();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [attendees, setAttendees] = useState([]);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  // ----------------------------------------------------------
  // LOAD EVENT + ATTENDEES ON FIRST LOAD ONLY
  // ----------------------------------------------------------
  const loadEventDetails = async () => {
    try {
      const data = await core_services.getEventById(eventId);

      setEvent({
        id: data.EventID,
        title: data.EventTitle,
        description: data.EventDesc,
        location: data.Location,
        date: new Date(data.EventTime).toDateString(),
        time: new Date(data.EventTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        img:
          "https://canapii.com/wp-content/uploads/2023/03/Blog-banner-5-C-of-event-management.png",
      });

      // Fetch attendees
      const people = await core_services.getEventAttendees(eventId);
      setAttendees(people);
    
      const joined = people.some(p => p.UserId === user?.userId);
      setAlreadyJoined(joined);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchEventInfo = async () => {
      await loadEventDetails();
    };

    fetchEventInfo();
  }, [eventId]);


  // ----------------------------------------------------------
  // JOIN EVENT — ONLY CALL API + UPDATE UI (no reload)
  // ----------------------------------------------------------
  const handleJoin = async () => {
    try {
      if (!user?.userId) {
        showNotification("Login Required", "Please login first.", "error");
        return;
      }

      await core_services.addEventAttender({
        eventId,
        userId: user.userId,
      });

      // Instantly update UI
      setAlreadyJoined(true);

      // Add user into attendees for instant UI accuracy
      setAttendees((prev) => [
        ...prev,
        {
          EventID: eventId,
          UserId: user.userId,
          CreatedAt: new Date().toISOString(),
        },
      ]);

      showNotification("Joined", `You joined ${event?.title}!`, "success");
    } catch (err) {
      console.error(err);
      showNotification("Error", "Failed to join event.", "error");
    }
  };

  // ----------------------------------------------------------
  // LOADING UI
  // ----------------------------------------------------------
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <Loader />
      </div>
    );

  if (!event)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <p className="text-lg">Event not found</p>
        <button
          className="mt-4 px-4 py-2 bg-green-600 rounded-lg"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className=" flex flex-col bg-bg1 text-white font-display">
      <Helmet>
        <title>{event.title} - NearMi</title>
      </Helmet>

      <main className="flex-1">
        <div className="relative h-[250px] w-full overflow-hidden">
          <img src={event.img} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute top-0 left-0 p-4 bg-black/40 rounded-br-lg">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white">
              <FiArrowLeft /> Back
            </button>
          </div>
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
            <h1 className="text-2xl font-bold">{event.title}</h1>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-5 space-y-3"
        >
          <p className="text-sm text-gray-300">
            📅 <span className="font-semibold">{event.date}</span>
          </p>
          <p className="text-sm text-gray-300">
            🕒 <span className="font-semibold">{event.time}</span>
          </p>
          <p className="text-sm text-gray-300">
            📍 <span className="font-semibold">{event.location}</span>
          </p>

          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">About Event</h3>
            <p className="text-gray-300 leading-relaxed">{event.description}</p>
          </div>
        </motion.div>

        {/* JOIN BUTTON */}
        <div className="sticky bottom-16 px-5 py-3 bg-bg1 border-t border-gray-700">
          <button
            onClick={alreadyJoined ? undefined : handleJoin}
            disabled={alreadyJoined}
            className={`w-full py-3 rounded-xl font-semibold transition-all
              ${alreadyJoined ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"}
            `}
          >
            {alreadyJoined ? "Already Joined" : "Request to Join Event"}
          </button>
        </div>
      </main>

      <FooterNav />
    </div>
  );
};

export default EventDetails;
