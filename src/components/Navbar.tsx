import { useEffect, useState } from "react";
import { Button, Layout } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { GoLocation } from "react-icons/go"; // location icon

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [city, setCity] = useState<string>("Fetching location...");

  useEffect(() => {
    if (!navigator.geolocation) {
      setCity("Location not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          setCity(data.address.city || data.address.town || data.address.village || "Unknown city");
        } catch (err) {
          console.error(err);
          setCity("Unable to fetch city");
        }
      },
      (err) => {
        console.error(err);
        setCity("Location denied");
      }
    );
  }, []);

  return (
    <Layout.Header className="flex justify-between items-center border-b border-gray-700 bg-bg1 text-white px-4 shadow-gray-800 shadow-sm animate-fade">
      <div className="flex items-center text-sm font-medium gap-1 text-white">
        <GoLocation />
        <span>{city}</span>
      </div>
      {isAuthenticated && (
        <Button
          className="bg-bg4 rounded-full border-none text-bg5 flex items-center gap-1"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <BiLogOut />
          Logout
        </Button>
      )}
    </Layout.Header>
  );
};

export default Navbar;
