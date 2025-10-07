import { Helmet } from "react-helmet-async";
import FooterNav from "../components/FooterNav";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const events = [
  { id: 1, title: "City Marathon", subtitle: "Running Event", img: "https://cdn.britannica.com/87/146287-050-2BB5E3F6/Runners-Verrazano-Narrows-Bridge-New-York-City-Marathon-2005.jpg" },
  { id: 2, title: "Live Concert", subtitle: "Music Event", img: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=400&q=80" },
  { id: 3, title: "Food Festival", subtitle: "Culinary Event", img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80" },
  { id: 4, title: "Art Expo", subtitle: "Art Exhibition", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd4HZhuvY5OokI_mdG5tWklGNB8KUVbOos6g&s" },
];

// 👇 mock hosted venues (should be fetched from backend later)
const hostedVenues = [
  { id: 101, name: "Carlton Banquet Hall", desc: "Luxury indoor hall", img: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=400&q=80" },
  { id: 102, name: "Green Turf Ground", desc: "Cricket Box - Turf", img: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=400&q=80" },
  { id: 103, name: "Blue Lagoon Resort", desc: "Pool + Party venue", img: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=400&q=80" },
  { id: 104, name: "The Roof Deck", desc: "Open sky cafe event space", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80" },
];

const Home = () => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  // show first 2 venues if not expanded
  const visibleVenues = showMore ? hostedVenues : hostedVenues.slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col font-display bg-bg1 text-white">
      <Helmet>
        <title>NearMi</title>
      </Helmet>

      <main className="p-4 flex-1 space-y-8">
        <section>
          <h2 className="text-lg font-bold mb-4">Nearby Events</h2>
          <div className="flex gap-4 p-3 overflow-x-auto scrollbar-hide">
            {events?.map((event) => (
              <div
                key={event.id}
                onClick={() => navigate(`/event/${event.id}`)}
                className="h-[200px] w-[200px] rounded-lg overflow-hidden flex-shrink-0 cursor-pointer transform transition-transform duration-200 hover:scale-110 relative"
              >
                <img src={event.img} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 w-full bg-black/40 backdrop-blur-sm text-white p-3">
                  <p className="font-bold text-sm">{event.title}</p>
                  <p className="text-xs">{event.subtitle}</p>
                </div>
              </div>
            ))}

          </div>
        </section>
        <section>
          <h2 className="text-lg font-bold mb-4">Want to host an event?</h2>
          <div className="flex gap-4">
            <div
              className="w-28 h-28 rounded-lg flex items-center justify-center cursor-pointer transform transition-transform duration-200 hover:scale-110 relative overflow-hidden"
              onClick={() => navigate("/create_event")}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-green-400/50 to-green-600/50"></div>
              <div className="relative z-10">
                <FiPlus size={24} color="white" />
              </div>
            </div>
          </div>
        </section>

        {/* Add Venue Section */}
        <section>
          <h2 className="text-lg font-bold mb-4">
            Have a space for hosting events?{" "}
            <span className="text-green-400">List it & earn money!</span>
          </h2>

          {/* Add new venue */}
          <div className="flex gap-4 mb-4">
            <div
              className="w-28 h-28 rounded-lg flex items-center justify-center cursor-pointer transform transition-transform duration-200 hover:scale-110 relative overflow-hidden"
              onClick={() => navigate("/add_venue")}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/50 to-yellow-600/50"></div>
              <div className="relative z-10">
                <FiPlus size={24} color="white" />
              </div>
            </div>

            {/* Hosted Venues */}
            {visibleVenues.map((venue) => (
              <div
                key={venue.id}
                className="w-28 h-28 rounded-lg overflow-hidden relative cursor-pointer transform hover:scale-110 transition-transform duration-200"
                onClick={() => navigate(`/manage-venue/${venue.id}`)}
              >
                <img src={venue.img} alt={venue.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 w-full bg-black/40 text-xs p-1 text-center">
                  {venue.name}
                </div>
              </div>
            ))}
          </div>

          {/* Show more / less toggle */}
          {hostedVenues.length > 2 && (
            <div className="text-right">
              <button
                onClick={() => setShowMore((prev) => !prev)}
                className="text-green-400 text-sm underline"
              >
                {showMore ? "Show less ▲" : "Show more ▼"}
              </button>
            </div>
          )}
        </section>
      </main>

      <FooterNav />
    </div>
  );
};

export default Home;
