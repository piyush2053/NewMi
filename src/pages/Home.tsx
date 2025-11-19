import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import FooterNav from "../components/FooterNav";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import VenueSection from "../components/VenueSection";
import { core_services } from "../utils/api";
import Loader from "../components/Loader";
import EventCardSkeleton from "../skeletons/EventsCardSkeleton";

const hostedVenues = [
  { id: 101, name: "Carlton Banquet Hall", desc: "Luxury indoor hall", img: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=400&q=80" },
  { id: 102, name: "Green Turf Ground", desc: "Cricket Box - Turf", img: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=400&q=80" },
  { id: 103, name: "Blue Lagoon Resort", desc: "Pool + Party venue", img: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=400&q=80" },
  { id: 104, name: "The Roof Deck", desc: "Open sky cafe event space", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80" },
  { id: 105, name: "Bhukkad Dhabha", desc: "Dinner with Strangers", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80" },
  { id: 106, name: "Skyline", desc: "Open sky cafe event space", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80" },
];

const Home = () => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [userCoords, setUserCoords] = useState<{ lat: number; lon: number } | null>(null);

  const { user } = useUser();

  const visibleVenues = showMore ? hostedVenues : hostedVenues.slice(0, 2);

  // ---------------------------------------------------------
  // Get User Location
  // ---------------------------------------------------------
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationEnabled(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationEnabled(true);
        setUserCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => setLocationEnabled(false)
    );
  }, []);

  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationEnabled(true);
        setUserCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => setLocationEnabled(false)
    );
  };

  // ---------------------------------------------------------
  // Fetch Events
  // ---------------------------------------------------------
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const data = await core_services.getAllEvents();
        setEvents(data || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // ---------------------------------------------------------
  // Calculate Distance — Haversine Formula
  // ---------------------------------------------------------
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c).toFixed(1); // 1 decimal km
  };

  return (
    <div className="min-h-screen flex flex-col font-display bg-bg1 text-white relative">
      <Helmet>
        <title>NearMi</title>
      </Helmet>

      {!locationEnabled && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-start bg-black/30 backdrop-blur-sm">
          <div className="mt-4 px-6 py-3 bg-yellow-500 text-black font-bold rounded-full shadow-lg flex items-center gap-3">
            <span>Please enable location and hit refresh to continue</span>
            <button
              onClick={requestLocation}
              className="bg-black/20 px-3 py-1 rounded text-white font-semibold hover:bg-black/40"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <main className={`p-4 flex-1 space-y-8 ${!locationEnabled ? "blur-sm pointer-events-none" : ""}`}>

        {/* -------------------- NEARBY EVENTS -------------------- */}
        <section>
          <h2 className="text-lg font-bold mb-4">Nearby Events</h2>
          {loading ? (
            <div className="flex gap-4 p-3 overflow-x-auto scrollbar-hide">
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : events.length > 0 ? (

            <div className="flex gap-4 p-3 overflow-x-auto scrollbar-hide">
              {events.map((event: any) => (
                <div
                  key={event.EventID}
                  onClick={() => navigate(`/event/${event.EventID}`)}
                  className="h-[200px] w-[200px] rounded-lg overflow-hidden flex-shrink-0 cursor-pointer transform transition-transform duration-200 hover:scale-110 relative"
                >
                  <img
                    src={"https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=400&q=80"}
                    alt={event.EventTitle}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute bottom-0 left-0 w-full bg-black/40 backdrop-blur-sm text-white p-3">
                    <p className="font-bold text-sm">{event.EventTitle}</p>
                    <p className="text-xs">{event.EventDesc}</p>

                    <p className="text-[10px] mt-1">{new Date(event.EventTime).toLocaleString()}</p>

                    {/* -------------------- DISTANCE FROM USER -------------------- */}
                    <p className="text-[10px] text-gray-300">
                      {(() => {
                        if (!userCoords) return "Calculating distance...";

                        const [lat, lon] = (event.Location || "").split(",").map(Number);
                        if (!lat || !lon) return "Location unavailable";

                        const dist = calculateDistance(userCoords.lat, userCoords.lon, lat, lon);
                        return `${dist} km away`;
                      })()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">No events found.</p>
          )}

          {/* Filters */}
          <div className="mt-5 px-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Filters</p>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {["Sports", "Dance", "Music", "Food"].map((category) => (
                <div
                  key={category}
                  className="px-3 py-1 bg-bg2 dark:bg-bg4 text-bg1 dark:text-bg2 rounded-full text-[10px] font-medium cursor-pointer transition-all hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------- HOSTED VENUES -------------------- */}
        <VenueSection hostedVenues={visibleVenues} navigate={navigate} />
      </main>

      <FooterNav />
    </div>
  );
};

export default Home;
