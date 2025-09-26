import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import FooterNav from '../components/FooterNav';

const suggestedTitles = ['Turf Cricket', 'Garba Night', 'House Party', 'Birthday Bash', 'Corporate Meetup'];
const categories = ['Sports', 'Music', 'Party', 'Workshop', 'Other'];

const CreateEvent = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [numTickets, setNumTickets] = useState(10);
  const [directJoin, setDirectJoin] = useState(true); // true = direct join, false = request
  const [eventCategory, setEventCategory] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');

  const handleCreateEvent = () => {
    console.log({ eventTitle, eventDesc, numTickets, directJoin: directJoin ? 'yes' : 'no', eventCategory, eventDate, eventTime });
    alert('Event Created! Check console for details.');
  };

  const handleTitleClick = (title) => {
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
        <section>
          <h2 className="text-md font-medium text-gray-300 mb-2">Event Title</h2>
          <input
            type="text"
            placeholder="Enter event title (max 50 chars)"
            maxLength={50}
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#2C2C2C] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
          />
          <div className="flex flex-wrap mt-2 gap-2">
            {suggestedTitles.map((title) => (
              <span
                key={title}
                onClick={() => handleTitleClick(title)}
                className="cursor-pointer bg-[#4CAF50] text-black px-3 py-1 rounded-full text-sm hover:bg-[#45a049] transition"
              >
                {title}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-md font-medium text-gray-300 mb-2">Event Description</h2>
          <textarea
            placeholder="Enter event description (max 80 chars)"
            maxLength={80}
            value={eventDesc}
            onChange={(e) => setEventDesc(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#2C2C2C] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
            rows={3}
          />
        </section>

        <section>
          <h2 className="text-md font-medium text-gray-300 mb-2">Event Category</h2>
          <select
            value={eventCategory}
            onChange={(e) => setEventCategory(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#2C2C2C] text-white focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
          >
            <option value="" disabled>Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </section>

        <section>
          <h2 className="text-md font-medium text-gray-300 mb-2">Date & Time</h2>
          <div className="flex gap-4">
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-[#2C2C2C] text-white focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
            />
            <input
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-[#2C2C2C] text-white focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
            />
          </div>
        </section>

        <section>
          <h2 className="text-md font-medium text-gray-300 mb-2">Number of Passes / Tickets</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setNumTickets((prev) => Math.max(1, prev - 1))}
              className="bg-[#3A3A3A] px-3 py-1 rounded-lg hover:bg-[#4CAF50] transition"
            >
              -
            </button>
            <span>{numTickets}</span>
            <button
              onClick={() => setNumTickets((prev) => prev + 1)}
              className="bg-[#3A3A3A] px-3 py-1 rounded-lg hover:bg-[#4CAF50] transition"
            >
              +
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-md font-medium text-gray-300 mb-2">Direct Join or Request to Join</h2>
          <div
            className={`w-16 h-8 rounded-full p-1 flex items-center cursor-pointer transition-colors duration-300 ${
              directJoin ? 'bg-[#4CAF50]' : 'bg-gray-600'
            }`}
            onClick={() => setDirectJoin(!directJoin)}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                directJoin ? 'translate-x-8' : 'translate-x-0'
              }`}
            ></div>
          </div>
          <div className="mt-1 text-sm text-gray-400">
            {directJoin ? 'Direct Join' : 'Request to Join'}
          </div>
        </section>
      </main>

      <footer className="p-4 bg-bg1 flex justify-center">
        <button
          onClick={handleCreateEvent}
          className="bg-[#4CAF50] transform transition-transform duration-200 hover:scale-110 relative py-3 rounded-full text-bg1 px-5 font-semibold text-sm hover:bg-[#45a049] transition-colors"
        >
          Create Event
        </button>
      </footer>
      <FooterNav />
    </div>
  );
};

export default CreateEvent;
