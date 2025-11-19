import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import FooterNav from "../components/FooterNav";
import { core_services } from "../utils/api";
import { useUser } from "../contexts/UserContext";

const EventChat = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const { user } = useUser();

    const [eventData, setEventData] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [attendees, setAttendees] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true); // 🔥 Added loader state

    const triggerInputAnimation = () => {
        setIsSending(true);
        setTimeout(() => setIsSending(false), 150);
    };

    const handleSend = () => {
        triggerInputAnimation();
        sendMessage();
    };

    // ================================
    // LOAD EVERYTHING IN ONE FUNCTION
    // ================================
    useEffect(() => {
        const loadAll = async () => {
            try {
                const events = await core_services.getAllEvents();
                const selectedEvent = events.find((ev) => ev.EventID === eventId);
                setEventData(selectedEvent);

                const msgRes = await core_services.getMessagesByEvent(eventId);
                const formattedMsgs = msgRes.map((msg: any) => ({
                    senderType: msg.UserId === selectedEvent?.UserId ? "admin" : "user",
                    text: msg.MessageText,
                    time: new Date(msg.CreatedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                }));
                setMessages(formattedMsgs);

                const att = await core_services.getEventAttendees(eventId);
                setAttendees(att || []);
                setIsLoading(false); 
            } catch (err) {
                console.error("Error loading:", err);
            }
        };

        loadAll();
    }, [eventId]);

    // ================================
    //      FULL PAGE SKELETON UI
    // ================================
    if (isLoading) {
        return (
            <div className="h-[90vh] bg-bg1 text-white flex flex-col animate-pulse p-4 space-y-4">

                {/* Header Loader */}
                <div className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-bg4"></div>
                    <div className="flex-1 h-5 bg-bg4 rounded-full"></div>
                    <div className="w-6 h-6 bg-bg1"></div>
                </div>

                {/* Members Info Loader */}
                <div className="bg-[#2C2C2C] rounded-xl p-4 space-y-3">
                    <div className="h-4 w-1/3 bg-bg4 rounded"></div>
                    <div className="w-full h-2 bg-bg4 rounded"></div>
                </div>

                {/* Messages Label Loader */}
                <div className="mx-auto w-24 h-4 bg-bg4 rounded-full"></div>

                {/* Messages List Loader */}
                <div className="flex-1 space-y-3 overflow-hidden">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-[70%] h-10 bg-bg4 rounded-full"></div>
                    ))}
                </div>
                <div className="w-full h-12 bg-bg4 rounded-full"></div>
                <FooterNav/>
            </div>
        );
    }

    // If event still null after loading
    if (!eventData) return <div className="text-center mt-10">Event not found</div>;

    const isAdmin = eventData.UserId === user?.userId;

    // ======================
    // SEND MESSAGE FUNCTION
    // ======================
    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const payload = {
                eventId,
                userId: user?.userId,
                messageText: newMessage,
            };

            await core_services.createMessage(payload);

            const now = new Date();

            setMessages([
                ...messages,
                {
                    senderType: "admin",
                    text: newMessage,
                    time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
            ]);

            setNewMessage("");
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    console.log(attendees, '@@@@@@@@@@')

    return (
        <div className="h-[90vh] bg-bg1 text-white flex flex-col font-sans scroll-hide">
            <header className="flex items-center p-4 bg-bg1 shadow-sm">
                <div onClick={() => navigate("/messages")} className="cursor-pointer">
                    <IoIosArrowBack size={24} />
                </div>
                <h1 className="flex-1 text-center text-lg font-semibold">
                    {eventData.EventTitle}
                </h1>
                <div className="w-6"></div>
            </header>

            {/* Members Info */}
            <div className="bg-[#2C2C2C] rounded-full p-3 flex flex-col space-y-2 shadow-md mx-5 mt-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FaUser />
                        <span className="text-white font-semibold">
                            {attendees.length}/{eventData.MaxMembers || 0} Members
                        </span>
                    </div>
                    <span className="text-gray-400 text-sm">
                        {(eventData.MaxMembers || 0) - attendees.length} Vacant
                    </span>
                </div>

                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#4CAF50] rounded-full transition-all"
                        style={{
                            width: `${(attendees.length / (eventData.MaxMembers || 1)) * 100}%`,
                        }}
                    ></div>
                </div>
            </div>

            {/* Messages Label */}
            <div className="flex justify-center mt-3 border-b mx-5 border-bg4 pb-3">
                <p className="text-gray-400 text-sm tracking-wide">Messages</p>
            </div>

            {/* Messages */}
            <div className="flex-1 flex flex-col overflow-hidden mt-2">
                <main className="flex-1 p-4 overflow-y-auto flex flex-col space-y-2 scrollbar-hide">
                    {messages.map((msg, idx) => (
                        <div key={idx}>
                            <div
                                className={`p-2 px-4 rounded-full max-w-[70%] 
                                    ${msg.senderType === "admin"
                                        ? "bg-[#4CAF50] text-black ml-auto"
                                        : "bg-[#2C2C2C] text-white mr-auto"
                                    }`}
                            >
                                {msg.text}
                            </div>

                            <span
                                className={`block text-[10px] text-gray-300 mt-1
                                    ${msg.senderType === "admin" ? "text-right" : "text-left"}
                                `}
                            >
                                {msg.time}
                            </span>
                        </div>
                    ))}
                </main>
                <div className="p-4 bg-bg1 flex-shrink-0">
                    {isAdmin ? (
                        <div className="flex gap-2">
                            <div
                                className={`relative flex-1 transform transition-all duration-150 
                    ${isSending ? "scale-95" : "scale-100"}`}
                            >
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="w-full p-3 pr-12 rounded-full bg-[#2C2C2C] text-white
                        focus:outline-none ring-1 ring-[#4CAF50]"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleSend();
                                    }}
                                />

                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 
                        p-2 rounded-full bg-gradient-to-r from-green-500 to-green-700 
                        shadow-green-500/40 text-white"
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
