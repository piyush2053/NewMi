import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import FooterNav from "../components/FooterNav";
import { core_services } from "../utils/api";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";

const suggestedTitles = ["Turf Cricket", "Garba Night", "House Party", "Birthday Bash", "Corporate Meetup"];

const CreateEvent = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [numTickets, setNumTickets] = useState(10);
  const [directJoin, setDirectJoin] = useState(true);
  const [eventCategory, setEventCategory] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [location, setLocation] = useState(""); // Will store "lat, lon" string
  const [categories, setCategories] = useState([]);

  const [coords, setCoords] = useState({ lat: "", lon: "" }); // ---------> NEW

  const { user } = useUser();
  const { showNotification } = useNotification();

  // ---------------------------------------------------------
  // Load Categories
  // ---------------------------------------------------------
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await core_services.getCategories();
        setCategories(res || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // ---------------------------------------------------------
  // Fetch Live GPS Location
  // ---------------------------------------------------------
  const fetchLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setCoords({ lat: latitude.toString(), lon: longitude.toString() });

        // We store lat,lon as string — this is what will go to the API
        const finalString = `${latitude}, ${longitude}`;
        setLocation(finalString);

        showNotification("Location Updated", "GPS location captured successfully!", "success", 2000);
      },
      () => {
        alert("Failed to get current location.");
      }
    );
  };

  // ---------------------------------------------------------
  // Create Event API Call
  // ---------------------------------------------------------
  const handleCreateEvent = async () => {
    if (!eventTitle || !eventDesc || !eventCategory || !eventDate || !eventTime || !location) {
      alert("Please fill all required fields.");
      return;
    }

    const eventDateTime = new Date(`${eventDate}T${eventTime}:00Z`).toISOString();

    const payload = {
      eventTitle,
      eventDesc,
      categoryId: eventCategory,
      location: location, // sending "lat, lon"
      userId: user?.userId || "UNKNOWN_USER",
      eventTime: eventDateTime,
      directJoin,
      numTickets,
    };

    try {
      const response = await core_services.createEvent(payload);
      console.log("✅ Event Created:", response);
      showNotification("Success", "Event created successfully!", "success", 3000);
    } catch (err) {
      console.error("❌ Error creating event:", err);
      alert("Failed to create event. Check console for details.");
    }
  };

  const handleTitleClick = (title: string) => {
    setEventTitle(title);
  };

  return (
    <div className="min-h-screen bg-bg1 text-white flex flex-col font-sans">
      <header className="flex items-center p-4 bg-bg1 shadow-sm">
        <IoIosArrowBack size={24} />
        <h1 className="flex-1 text-center text-lg font-semibold">Create Event</h1>
        <div className="w-6"></div>
      </header>

      <main className="flex-1 p-4 space-y-6">
        
        {/* Title */}
        <section>
          <h2 className="text-md font-medium text-gray-300 mb-2">Event Title</h2>
          <input
            type="text"
            placeholder="Enter event title (max 50 chars)"
            maxLength={50}
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#2C2C2C] text-white placeholder-gray-500"
          />

          <div className="flex flex-wrap mt-2 gap-2">
            {suggestedTitles.map((title) => (
              <span
                key={title}
                onClick={() => handleTitleClick(title)}
                className="cursor-pointer bg-[#4CAF50] text-black px-3 py-1 rounded-full text-sm"
              >
                {title}
              </span>
            ))}
          </div>
        </section>

        {/* Description */}
        <section>
          <h2 className="text-md font-medium text-gray-300 mb-2">Event Description</h2>
          <textarea
            placeholder="Enter event description (max 80 chars)"
            maxLength={80}
            value={eventDesc}
            onChange={(e) => setEventDesc(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#2C2C2C] text-white"
            rows={3}
          />
        </section>

        {/* Location */}
        <section>
          <h2 className="text-md font-medium text-gray-300 mb-2">Location</h2>

          <input
            type="text"
            placeholder="Lat, Lon will appear here"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#2C2C2C] text-white"
          />

          <button
            onClick={fetchLocation}
            className="mt-2 px-3 py-1 bg-green-600 rounded-lg text-black text-sm hover:bg-green-700"
          >
            Use My Current Location
          </button>
        </section>

        {/* Category Dropdown */}
        <section>
          <h2 className="text-md font-medium text-gray-300 mb-2">Event Category</h2>
          <select
            value={eventCategory}
            onChange={(e) => setEventCategory(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#2C2C2C] text-white"
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((cat: any) => (
              <option key={cat.CategoryId} value={cat.CategoryId}>
                {cat.CategoryName}
              </option>
            ))}
          </select>
        </section>

        {/* Date + Time */}
        <section>
          <h2 className="text-md font-medium text-gray-300 mb-2">Date & Time</h2>
          <div className="flex gap-4">
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-[#2C2C2C] text-white"
            />

            <input
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-[#2C2C2C] text-white"
            />
          </div>
        </section>

        {/* Tickets */}
        <section>
          <h2 className="text-md font-medium text-gray-300 mb-2">Number of Passes / Tickets</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setNumTickets((prev) => Math.max(1, prev - 1))}
              className="bg-[#3A3A3A] px-3 py-1 rounded-lg"
            >
              -
            </button>
            <span>{numTickets}</span>
            <button
              onClick={() => setNumTickets((prev) => prev + 1)}
              className="bg-[#3A3A3A] px-3 py-1 rounded-lg"
            >
              +
            </button>
          </div>
        </section>

        {/* Direct Join Toggle */}
        <section>
          <h2 className="text-md font-medium text-gray-300 mb-2">Direct Join or Request to Join</h2>
          <div
            className={`w-16 h-8 rounded-full p-1 flex items-center cursor-pointer transition-colors ${
              directJoin ? "bg-[#4CAF50]" : "bg-gray-600"
            }`}
            onClick={() => setDirectJoin(!directJoin)}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                directJoin ? "translate-x-8" : "translate-x-0"
              }`}
            ></div>
          </div>
          <div className="mt-1 text-sm text-gray-400">
            {directJoin ? "Direct Join" : "Request to Join"}
          </div>
        </section>
      </main>

      <footer className="p-4 bg-bg1 flex justify-center">
        <button
          onClick={handleCreateEvent}
          className="bg-[#4CAF50] py-3 rounded-full px-5 font-semibold text-sm hover:bg-[#45a049]"
        >
          Create Event
        </button>
      </footer>

      <FooterNav />
    </div>
  );
};

export default CreateEvent;
