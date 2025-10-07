import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import FooterNav from "../components/FooterNav";

// ✅ mock data (later replace with backend fetch)
const allEvents = [
  {
    id: 1,
    title: "City Marathon",
    subtitle: "Running Event",
    date: "March 23, 2025",
    time: "6:00 AM - 10:00 AM",
    location: "Marine Drive, Mumbai",
    description:
      "Join thousands of runners in the annual City Marathon — a celebration of endurance and community spirit. Participants will enjoy scenic views along the coastline and post-run refreshments.",
    img: "https://cdn.britannica.com/87/146287-050-2BB5E3F6/Runners-Verrazano-Narrows-Bridge-New-York-City-Marathon-2005.jpg",
  },
  {
    id: 2,
    title: "Live Concert",
    subtitle: "Music Event",
    date: "April 8, 2025",
    time: "7:00 PM - 11:00 PM",
    location: "Phoenix Arena, Hyderabad",
    description:
      "Experience an unforgettable night of music with top artists and DJs performing live. Food stalls, drinks, and amazing vibes await!",
    img: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "Food Festival",
    subtitle: "Culinary Event",
    date: "May 12–13, 2025",
    time: "12:00 PM - 9:00 PM",
    location: "Central Park, Pune",
    description:
      "A two-day food fest bringing together cuisines from around the world. Enjoy live cooking shows, contests, and music performances.",
    img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title: "Art Expo",
    subtitle: "Art Exhibition",
    date: "June 2–5, 2025",
    time: "10:00 AM - 8:00 PM",
    location: "Art House Gallery, Delhi",
    description:
      "Explore the works of over 50 artists showcasing modern and contemporary art. Workshops and art auctions will be held daily.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd4HZhuvY5OokI_mdG5tWklGNB8KUVbOos6g&s",
  },
];

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const event = allEvents.find((e) => e.id === Number(eventId));

  if (!event) {
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
  }

  const handleJoin = () => {
    alert(`Request sent to join "${event.title}" ✅`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg1 text-white font-display">
      <Helmet>
        <title>{event.title} - NearMi</title>
      </Helmet>

      <main className="flex-1">
        {/* Header image */}
        <div className="relative h-[250px] w-full overflow-hidden">
          <img src={event.img} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute top-0 left-0 p-4 bg-black/40 rounded-br-lg">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white">
              <FiArrowLeft /> Back
            </button>
          </div>
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <p className="text-sm text-gray-300">{event.subtitle}</p>
          </div>
        </div>

        {/* Event Info */}
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

        {/* Join Event Button */}
        <div className="sticky bottom-16 px-5 py-3 bg-bg1 border-t border-gray-700">
          <button
            onClick={handleJoin}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold transition-all"
          >
            Request to Join Event
          </button>
        </div>
      </main>

      <FooterNav />
    </div>
  );
};

export default EventDetails;
