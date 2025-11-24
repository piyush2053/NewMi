import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import FooterNav from "../components/FooterNav";
import { core_services } from "../utils/api";
import { useUser } from "../contexts/UserContext";
import MessageWindowSkeleton from "../skeletons/MessageWindowSkeleton";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd";
import ProgressBar from "./chunks/ProgressBar";

const EventChat = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const { user } = useUser();

    const [eventData, setEventData] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [attendees, setAttendees] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const triggerInputAnimation = () => {
        setIsSending(true);
        setTimeout(() => setIsSending(false), 150);
    };

    const handleSend = () => {
        triggerInputAnimation();
        sendMessage();
    };

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

    const refreshMessages = async () => {
        try {
            setIsRefreshing(true);

            const msgRes = await core_services.getMessagesByEvent(eventId);

            const formattedMsgs = msgRes.map((msg: any) => ({
                senderType: msg.UserId === eventData?.UserId ? "admin" : "user",
                text: msg.MessageText,
                time: new Date(msg.CreatedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            }));

            setMessages(formattedMsgs);
        } catch (err) {
            console.error("Error refreshing messages:", err);
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        if (!eventData) return;
        const interval = setInterval(() => {
            refreshMessages();
        }, 5000);
        return () => clearInterval(interval);
    }, [eventData]);

    if (isLoading) {
        return <MessageWindowSkeleton />;
    }

    if (!eventData) return <div className="text-center mt-10">Event not found</div>;

    const isAdmin = eventData.UserId === user?.userId;

    return (
        <div className="min-h-screen bg-bg1 text-white flex flex-col font-sans scroll-hide">
            <header className="flex items-center p-4 bg-bg1 shadow-sm">
                <div onClick={() => navigate("/messages")} className="cursor-pointer w-6 flex justify-start">
                    <IoIosArrowBack size={24} />
                </div>
                <div className="flex flex-row items-center justify-center gap-2 flex-1">
                    <h1 className="text-lg font-semibold">{eventData.EventTitle}</h1>
                    {isRefreshing && <Spin indicator={<LoadingOutlined spin />} size="small" />}
                </div>
                <div className="w-6"></div>

            </header>

            <ProgressBar attendees={attendees} eventData={eventData} />

            <div className="flex justify-center mt-3 border-b mx-5 border-bg4 pb-3">
                <p className="text-gray-400 text-sm tracking-wide">Messages</p>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden mt-2">
                <main className="flex-1 p-4 overflow-y-auto flex flex-col space-y-2 scrollbar-hide">
                    {messages.map((msg, idx) => (
                        <div key={idx}>
                            <div
                                className={`p-2 px-4 rounded-full max-w-[70%] ${msg.senderType === "admin"
                                    ? "bg-bg6 text-black ml-auto"
                                    : "bg-bg4 text-white mr-auto"
                                    }`}
                            >
                                {msg.text}
                            </div>

                            <span
                                className={`block text-[10px] text-gray-300 mt-1 ${msg.senderType === "admin" ? "text-right" : "text-left"
                                    }`}
                            >
                                {msg.time}
                            </span>
                        </div>
                    ))}
                </main>

                <div className="p-4 bg-bg1 sticky bottom-[60px] z-40">
                    {isAdmin ? (
                        <div className="flex gap-2">
                            <div
                                className={`relative flex-1 transform transition-all duration-150 ${isSending ? "scale-95" : "scale-100"
                                    }`}
                            >
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="w-full p-3 pr-12 rounded-full bg-bg1 text-white focus:outline-none ring-1 ring-bg6"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleSend();
                                    }}
                                />

                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gradient-to-t from-[#0c2050] to-[#29C9FF] shadow-[#29C9FF]/40 text-white"
                                >
                                    <FiSend size={18} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-400 text-sm italic text-center">Only admin can send messages.</p>
                    )}
                </div>
            </div>

            <FooterNav />
        </div>
    );
};

export default EventChat;
