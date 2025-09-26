import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import FooterNav from "../components/FooterNav";

const mockGroups = [
    {
        id: 1,
        eventName: "Turf Cricket",
        totalMembers: 8,
        maxMembers: 10,
        hostId: 1,
        messages: [{ sender: "You", text: "Hey, ready?", time: "10:15 AM" }],
    },
    {
        id: 2,
        eventName: "Garba Night",
        totalMembers: 15,
        maxMembers: 20,
        hostId: 2,
        messages: [{ sender: "You", text: "Let's coordinate!", time: "8:30 PM" }],
    },
    {
        id: 3,
        eventName: "House Party",
        totalMembers: 12,
        maxMembers: 15,
        hostId: 3,
        messages: [{ sender: "You", text: "Who's bringing drinks?", time: "6:45 PM" }],
    },
];

const currentUser = { id: 3, name: "Admin User" };

const EventChat = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const group = mockGroups.find((g) => g.id === Number(eventId));
    const [messages, setMessages] = useState(group?.messages || []);
    const [newMessage, setNewMessage] = useState("");

    const isHost = group?.hostId === currentUser.id;

    const formatTime = () => {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    const sendMessage = () => {
        if (!newMessage.trim()) return;
        const updatedMessages = [
            ...messages,
            { sender: "You", text: newMessage, time: formatTime() },
        ];
        setMessages(updatedMessages);
        setNewMessage("");
    };

    if (!group) return <div>Event not found</div>;

    return (
        <div className="h-[90vh] bg-bg1 text-white flex flex-col font-sans scroll-hide">
            {/* Header */}
            <header className="flex items-center p-4 bg-bg1 shadow-sm">
                <div onClick={() => navigate("/messages")} className="cursor-pointer">
                    <IoIosArrowBack size={24} />
                </div>
                <h1 className="flex-1 text-center text-lg font-semibold">
                    {group.eventName}
                </h1>
                <div className="w-6"></div>
            </header>

            {/* Members Info */}
            <div className="bg-[#2C2C2C] rounded-full p-3 flex flex-col space-y-2 shadow-md mx-5 mt-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FaUser />
                        <span className="text-white font-semibold">
                            {group.totalMembers}/{group.maxMembers} Members
                        </span>
                    </div>
                    <span className="text-gray-400 text-sm">
                        {group.maxMembers - group.totalMembers} Vacant
                    </span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#4CAF50] rounded-full transition-all"
                        style={{
                            width: `${(group.totalMembers / group.maxMembers) * 100}%`,
                        }}
                    ></div>
                </div>
            </div>
            <div className="flex justify-center mt-3 border-b mx-5 border-bg4 pb-3">
                <p className="text-gray-400 text-sm tracking-wide">Messages</p>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden mt-2">
                <main className="flex-1 p-4 overflow-y-auto flex flex-col space-y-2 scrollbar-hide">
                    {messages.map((msg, idx) => (
                        <div>
                            <div
                                key={idx}
                                className={`p-2 px-4 rounded-full max-w-[50%] text-end relative ${msg.sender === "You"
                                    ? "bg-[#4CAF50] text-black ml-auto"
                                    : "bg-[#2C2C2C] text-white"
                                    }`}
                            >
                                <p>{msg.text}</p>
                            </div>
                            <span className="block text-[10px] text-gray-300 text-right mt-1">
                                {msg.time}
                            </span>
                        </div>
                    ))}
                </main>
                <div className="p-4 bg-bg1 flex-shrink-0">
                    {isHost ? (
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="w-full p-3 pr-12 rounded-full bg-[#2C2C2C] text-white focus:outline-none ring-1 ring-[#4CAF50] shadow-2xl shadow-green-500/40"
                                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                />
                                <button
                                    onClick={sendMessage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gradient-to-r from-green-500 to-green-700 shadow-2xl shadow-green-500/40 text-white hover:from-green-600 hover:to-green-800 transition flex items-center justify-center"
                                >
                                    <FiSend size={18} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-400 text-sm italic">
                            Only admin can send messages.
                        </p>
                    )}
                </div>
            </div>

            <FooterNav />
        </div>
    );
};

export default EventChat;
