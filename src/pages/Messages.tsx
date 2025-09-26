import React from "react";
import { useNavigate } from "react-router-dom";

const mockGroups = [
  { 
    id: 1, 
    eventName: "Turf Cricket", 
    lastMessage: "Hey, ready for the match?", 
    totalMembers: 8,
    maxMembers: 10,
    img: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?crop=faces&fit=crop&w=50&h=50" 
  },
  { 
    id: 2, 
    eventName: "Garba Night", 
    lastMessage: "Let's coordinate timing!", 
    totalMembers: 15,
    maxMembers: 20,
    img: "https://assets-in.bmscdn.com/nmcms/media-base-the-great-garba-dandiya-night-ub-city-2025-8-26-t-5-36-24.jpeg" 
  },
  { 
    id: 3, 
    eventName: "House Party", 
    lastMessage: "Who's bringing drinks?", 
    totalMembers: 12,
    maxMembers: 15,
    img: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?crop=faces&fit=crop&w=50&h=50" 
  },
];

const MessagesList = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg1 text-white flex flex-col font-sans">
      <header className="flex items-center p-4 bg-bg1 shadow-sm">
        <h1 className="flex-1 text-center text-lg font-semibold">Messages</h1>
      </header>

      <main className="flex-1 p-4 space-y-2 overflow-y-auto">
        {mockGroups.map((group) => (
          <div
            key={group.id}
            className="flex items-center gap-3 p-3 bg-[#2C2C2C] rounded-lg cursor-pointer hover:bg-[#3A3A3A] transition"
            onClick={() => navigate(`/messages/${group.id}`)}
          >
            <img
              src={group.img}
              alt={group.eventName}
              className="w-12 h-12 rounded-full object-cover "
            />
            <div className="flex-1">
              <p className="font-semibold text-white">{group.eventName}</p>
              <p className="text-gray-400 text-sm truncate">{group.lastMessage}</p>
            </div>
            <div className="text-gray-400 text-xs">
              {group.totalMembers}/{group.maxMembers}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default MessagesList;
