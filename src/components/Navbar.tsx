import { useEffect, useState } from "react";
import { Button, Layout, Popover } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { GoLocation } from "react-icons/go";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [city, setCity] = useState<string>("Fetching location...");
  const [locationData, setLocationData] = useState<any>(null);

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
          setLocationData(data);

          setCity(
            data?.address?.city ||
            data?.address?.town ||
            data?.address?.village ||
            "Unknown city"
          );
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

  const popoverContent = (
    <div className="text-xs text-white space-y-2">
      <p>
        <strong>Full Address:</strong><br />
        {locationData?.display_name || "N/A"}
      </p>

      <p>
        <strong>City:</strong> {locationData?.address?.city || "N/A"}
      </p>

      <p>
        <strong>State:</strong> {locationData?.address?.state || "N/A"}
      </p>

      <p>
        <strong>Pincode:</strong> {locationData?.address?.postcode || "N/A"}
      </p>

      <p>
        <strong>Country:</strong> {locationData?.address?.country || "N/A"}
      </p>
    </div>
  );


  return (
    <Layout.Header className="flex justify-between items-center border-b border-gray-700 bg-bg1 text-white px-4 shadow-gray-800 shadow-sm animate-fade">
      <Popover
        content={popoverContent}
        trigger="click"
        overlayInnerStyle={{
          backgroundColor: "#020f2cf3",
          color: "white",
          padding: "10px",
          marginLeft: "10px",
          borderRadius: "10px",
          width: "220px",
          maxHeight: "250px",
          overflowY: "auto",
        }}
      >
        <div className="flex items-center text-sm font-medium gap-1 text-white cursor-pointer active:scale-95 transition">
          <GoLocation />
          <span>{city}</span>
        </div>
      </Popover>


      {isAuthenticated && (
        <button
          className="bg-bg4 p-2 rounded-full border-none text-bg6 flex items-center gap-1 hover:text-bg1 hover:bg-bg2"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <BiLogOut />
        </button>
      )}
    </Layout.Header>
  );
};

export default Navbar;
