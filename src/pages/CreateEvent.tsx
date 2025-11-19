import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import FooterNav from "../components/FooterNav";
import { core_services } from "../utils/api";
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";

const suggestedTitles = ["Turf Cricket", "Garba Night", "House Party", "Birthday Bash", "Corporate Meetup"];

const CreateEvent = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [numTickets, setNumTickets] = useState(10);
  const [directJoin, setDirectJoin] = useState(true);
  const [eventCategory, setEventCategory] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const navigate = useNavigate()
  const [location, setLocation] = useState(""); // Auto GPS lat,lon

  const [categories, setCategories] = useState([]);

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
  // Auto Fetch GPS Location on Page Load
  // ---------------------------------------------------------
  useEffect(() => {
    fetchLocation(); // Auto-run
  }, []);

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      showNotification("Error", "Geolocation not supported!", "error", 2500);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const locStr = `${latitude}, ${longitude}`;
        setLocation(locStr);
      },
      () => {
        showNotification("Error", "Unable to fetch GPS location!", "error", 2500);
      }
    );
  };

  // ---------------------------------------------------------
  // Create Event API Call
  // ---------------------------------------------------------
  const handleCreateEvent = async () => {
    if (!eventTitle || !eventDesc || !eventCategory || !eventDate || !eventTime) {
      alert("Please fill all required fields.");
      return;
    }

    if (!location) {
      alert("Unable to fetch location. Try refreshing.");
      return;
    }

    const eventDateTime = new Date(`${eventDate}T${eventTime}:00Z`).toISOString();

    const payload = {
      eventTitle,
      eventDesc,
      categoryId: eventCategory,
      location, // Auto GPS lat,lon
      userId: user?.userId || "UNKNOWN_USER",
      eventTime: eventDateTime,
      directJoin,
      numTickets,
    };

    try {
      const response = await core_services.createEvent(payload);
      console.log("Event created:", response);
      showNotification("Success", "Event created successfully!", "success", 3000);
      navigate('/')
    } catch (err) {
      console.error("Error creating event:", err);
      showNotification("Error", "Failed to create event.", "error", 3000);
    }
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
            className="w-full p-3 rounded-lg bg-[#2C2C2C] text-white"
          />

          <div className="flex flex-wrap mt-2 gap-2">
            {suggestedTitles.map((title) => (
              <span
                key={title}
                onClick={() => setEventTitle(title)}
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

        {/* Category */}
        <section>
          <h2 className="text-md font-medium text-gray-300 mb-2">Event Category</h2>
          <select
            value={eventCategory}
            onChange={(e) => setEventCategory(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#2C2C2C] text-white"
          >
            <option value="" disabled>Select category</option>
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
            <button onClick={() => setNumTickets((prev) => Math.max(1, prev - 1))} className="bg-[#3A3A3A] px-3 py-1 rounded-lg">-</button>
            <span>{numTickets}</span>
            <button onClick={() => setNumTickets((prev) => prev + 1)} className="bg-[#3A3A3A] px-3 py-1 rounded-lg">+</button>
          </div>
        </section>

        {/* Direct Join */}
        <section>
          <h2 className="text-md font-medium text-gray-300 mb-2">Direct Join or Request to Join</h2>
          <div
            className={`w-16 h-8 rounded-full p-1 flex items-center cursor-pointer transition ${directJoin ? "bg-[#4CAF50]" : "bg-gray-600"}`}
            onClick={() => setDirectJoin(!directJoin)}
          >
            <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition ${directJoin ? "translate-x-8" : "translate-x-0"}`} />
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
