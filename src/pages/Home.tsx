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
  { id: 101, name: "Carlton Banquet Hall", desc: "Luxury indoor hall", img: "https://assets.simpleviewinc.com/sv-visit-irving/image/upload/c_limit,h_1200,q_75,w_1200/v1/cms_resources/clients/irving-redesign/Events_Page_Header_2903ed9c-40c1-4f6c-9a69-70bb8415295b.jpg" },
  { id: 102, name: "Green Turf Ground", desc: "Cricket Box - Turf", img: "https://assets.simpleviewinc.com/sv-visit-irving/image/upload/c_limit,h_1200,q_75,w_1200/v1/cms_resources/clients/irving-redesign/Events_Page_Header_2903ed9c-40c1-4f6c-9a69-70bb8415295b.jpg" },
  { id: 103, name: "Blue Lagoon Resort", desc: "Pool + Party venue", img: "https://assets.simpleviewinc.com/sv-visit-irving/image/upload/c_limit,h_1200,q_75,w_1200/v1/cms_resources/clients/irving-redesign/Events_Page_Header_2903ed9c-40c1-4f6c-9a69-70bb8415295b.jpg" },
  { id: 104, name: "The Roof Deck", desc: "Open sky cafe event space", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80" },
  { id: 105, name: "Bhukkad Dhabha", desc: "Dinner with Strangers", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80" },
  { id: 106, name: "Skyline", desc: "Open sky cafe event space", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80" },
];

const Home = () => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [searchText, setSearchText] = useState("");

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
  // Sort Events by Distance (Nearest First)
  // ---------------------------------------------------------
  useEffect(() => {
    if (!userCoords || events.length === 0) return;

    const sorted = [...events].sort((a, b) => {
      const [latA, lonA] = (a.Location || "").split(",").map(Number);
      const [latB, lonB] = (b.Location || "").split(",").map(Number);

      const validA = !isNaN(latA) && !isNaN(lonA);
      const validB = !isNaN(latB) && !isNaN(lonB);

      if (!validA && !validB) return 0;
      if (!validA) return 1;
      if (!validB) return -1;

      const distA = parseFloat(
        calculateDistance(userCoords.lat, userCoords.lon, latA, lonA)
      );
      const distB = parseFloat(
        calculateDistance(userCoords.lat, userCoords.lon, latB, lonB)
      );

      return distA - distB;
    });

    setEvents(sorted);
  }, [userCoords, events.length]);

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
  const filteredEvents = events.filter((e) =>
    e.EventTitle.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col font-display bg-bg1 text-white relative">
      <span style={{ display: "none" }}>Dhan Dhan Gurji</span>
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
          <div className="relative w-full mb-2">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search nearby events..."
              className="w-full px-3 py-2 pr-10 text-sm rounded-full bg-bg1 text-white focus:outline-none focus:ring-2 focus:ring-bg6 border border-bg6"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="white"
              className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 opacity-70"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 13.65z"
              />
            </svg>
          </div>


          {loading ? (
            <div className="flex gap-4 p-3 overflow-x-auto scrollbar-hide">
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : events.length > 0 ? (

            <div className="flex gap-4 p-3 overflow-x-auto scrollbar-hide">
              {filteredEvents.map((event: any) => (
                <div
                  key={event.EventID}
                  onClick={() => navigate(`/event/${event?.EventID}`)}
                  className="h-[200px] w-[200px] rounded-lg overflow-hidden flex-shrink-0 cursor-pointer transform transition-transform duration-200 hover:scale-110 relative"
                >
                  <img
                    src={"https://assets.simpleviewinc.com/sv-visit-irving/image/upload/c_limit,h_1200,q_75,w_1200/v1/cms_resources/clients/irving-redesign/Events_Page_Header_2903ed9c-40c1-4f6c-9a69-70bb8415295b.jpg"}
                    alt={event.EventTitle}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute bottom-0 left-0 w-full bg-black/40 backdrop-blur-sm text-white p-3">
                    <p className="font-bold text-sm">{event.EventTitle}</p>
                    {/* <p className="text-xs">{event.EventDesc}</p> */}
                    <p className="text-[13px] mt-1">
                      {(() => {
                        const eventDate = new Date(event.EventTime);
                        const now = new Date();

                        const diffMs = eventDate.getTime() - now.getTime();
                        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

                        if (diffDays >= 1 && diffDays <= 6) {
                          return `in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
                        }

                        // 7+ days → show date + time
                        return eventDate.toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                      })()}
                    </p>

                    <p className="text-[17px] font-semibold text-white mt-1">
                      {(() => {
                        if (!userCoords) return "Calculating distance...";

                        const [lat, lon] = (event.Location || "").split(",").map(Number);
                        if (!lat || !lon) return "N/A";

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
