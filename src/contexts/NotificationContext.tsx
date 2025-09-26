import React, {
    ReactNode,
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    useRef
} from "react";
import popSound from '../assets/sounds/pop.wav'

type NotificationType = "success" | "error" | "warning";

type Notification = {
    id: number;
    title: string;
    description: string;
    type: NotificationType;
};

const NotificationContext = createContext({
    showNotification: (
        title: string,
        desc: string,
        type: NotificationType,
        duration: number
    ) => { },
});
interface NotificationProviderProps {
  children: ReactNode;
}
export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context)
        throw new Error("useNotification must be used inside NotificationProvider");
    return context;
};

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const audioRef: any = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio(popSound);
        audioRef.current.volume = 0.1;
    }, []);
    const removeNotification = useCallback((id: number) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const showNotification = useCallback(
        (
            title: string,
            description: string,
            type: NotificationType,
            duration = 3000
        ) => {
            const id = Date.now();
            const newNotification: Notification = {
                id,
                title,
                description,
                type,
            };

            setNotifications((prev) => [...prev, newNotification]);
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
            setTimeout(() => {
                removeNotification(id);
            }, duration);
        },
        [removeNotification]
    );

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 items-center w-full px-4">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`relative px-5 py-2 rounded-full shadow-lg text-white w-full max-w-sm text-left transition-all duration-300 animate-bounceIn
              bg-bg1 border
              ${notification.type === "success" && "border-green-400"
                            } ${notification.type === "error" && "border-red-400"} ${notification.type === "warning" && "border-yellow-400"
                            }`}
                    >
                        <button
                            onClick={() => removeNotification(notification.id)}
                            className="absolute right-2 bg-bg2 mt-3 px-1 rounded-full text-white text-sm hover:text-red-400 my-auto mr-3"
                        >
                            ✕
                        </button>

                        <div className="font-semibold text-md">{notification.title}</div>
                        <div className="text-sm text-white/90">{notification.description}</div>
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
};
