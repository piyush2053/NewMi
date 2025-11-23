import { useLocation, useNavigate } from "react-router-dom";
import { HiPlus } from "react-icons/hi"; // import plus icon

const tabs = [
  { name: "Home", icon: "M224 115.55V208a16 16 0 0 1-16 16H168a16 16 0 0 1-16-16V168a8 8 0 0 0-8-8H112a8 8 0 0 0-8 8v40a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16V115.55a16 16 0 0 1 5.17-11.78l80-75.48.11-.11a16 16 0 0 1 21.53 0 .11.11 0 0 1 0 0l80 75.48A16 16 0 0 1 224 115.55Z", path: "/" },
  { name: "Bookings", icon: "M208 32H184V24a8 8 0 0 0-16 0v8H88V24a8 8 0 0 0-16 0v8H48A16 16 0 0 0 32 48v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16ZM72 48v8a8 8 0 0 0 16 0V48h80v8a8 8 0 0 0 16 0V48h24v32H48V48Z", path: "/bookings" },
  {
    name: "Host Event",
    icon: null,
    path: "/create_event",
    customIcon: true
  },
  { name: "Messages", icon: "M140 128a12 12 0 1 1-12-12 12 12 0 0 1 12 12Zm-56-12a12 12 0 1 0 12 12 12 12 0 0 0-12-12Zm88 0a12 12 0 1 0 12 12 12 12 0 0 0-12-12Zm60 12A104 104 0 0 1 79.12 219.82L45.07 231.17a16 16 0 0 1-20.24-20.24l11.35-34.05A104 104 0 1 1 232 128Zm-16 0a88 88 0 1 0-164.19 44.06a8 8 0 0 1 .66 6.54L40 216l37.4-12.47a7.85 7.85 0 0 1 2.53-.42 8 8 0 0 1 4 1.08A88 88 0 0 0 216 128Z", path: "/messages" },
  { name: "Profile", icon: "M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0C63.78 166.78 40.31 185.66 25.08 212a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56A56.06 56.06 0 0 1 72 96Z", path: "/profile" }
];

const FooterNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer className="sticky bottom-0 z-10 border-t border-gray-700">
      <div className="flex gap-2 border-t border-black/10 px-4 pb-3 pt-2 bg-bg1">
        {tabs.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.name}
              className={`flex flex-1 flex-col items-center justify-end gap-1 transition-colors duration-200 cursor-pointer ${isActive ? "text-bg2" : "text-black/50 dark:text-white/50 hover:text-bg2"
                }`}
              onClick={() => navigate(item.path)}
            >
              {item.customIcon ? (
                <div className="relative flex items-center justify-center">
                  <div className="absolute h-16 w-16 rounded-full bg-white/20 animate-pulse"></div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-t from-[#0c2050] to-[#29C9FF] shadow-[#29C9FF]/40
 text-bg1 z-10">
                    <HiPlus size={20} />
                  </div>
                </div>
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200">
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px">
                    <path d={item.icon}></path>
                  </svg>
                </div>
              )}

              <p className="text-xs font-medium">{item.name}</p>
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default FooterNav;
