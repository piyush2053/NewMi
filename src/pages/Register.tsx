import { Button, Input } from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../assets/gifs/NearWe.gif";
import { useState } from "react";
import Loader from "../components/Loader";
import { CNAME } from "../utils/constants";
import { core_services } from "../utils/api";
import { useNotification } from "../contexts/NotificationContext";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  // Updated fields to match new API
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword || !location) {
      showNotification("Error", "Please fill all required fields.", "error", 3000);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      showNotification("Error", "Please enter a valid email address (e.g., aaa@xyz.com).", "error", 3000);
      return;
    }

    if (password !== confirmPassword) {
      showNotification("Error", "Passwords do not match.", "error", 3000);
      return;
    }

    setLoading(true);
    try {
      // ✅ Using new API function
      await core_services.registerUser({
        username,
        email,
        password,
        location,
      });

      showNotification("Success", "Account created successfully!", "success", 3000);
      navigate("/login");
    } catch (error: any) {
      showNotification("Error", error.message || "Registration failed", "error", 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg1 text-gray-200 flex flex-col items-center justify-center relative">
      {loading && (
        <div className="absolute inset-0 bg-bg1 bg-opacity-80 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
      <img src={logo} alt="logo" className="h-[100px] my-3" />
      <div className="w-full max-w-xs text-left">
        <label className="text-sm ml-2 mb-1 inline-block">Username <span className="text-red-500">*</span></label>
        <Input
          size="large"
          prefix={<UserOutlined />}
          placeholder="Username"
          className="mb-4 rounded-full bg-bg3 text-gray-600 border-gray-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="text-sm ml-2 mb-1 inline-block">Email <span className="text-red-500">*</span></label>
        <Input
          size="large"
          prefix={<MailOutlined />}
          placeholder="Email"
          className="mb-4 rounded-full bg-bg3 text-gray-600 border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-sm ml-2 mb-1 inline-block">Location <span className="text-red-500">*</span></label>
        <Input
          size="large"
          placeholder="Location"
          className="mb-4 rounded-full bg-bg3 text-gray-600 border-gray-700"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label className="text-sm ml-2 mb-1 inline-block">Password <span className="text-red-500">*</span></label>
        <Input.Password
          size="large"
          prefix={<LockOutlined />}
          placeholder="Create a password"
          className="mb-4 rounded-full bg-bg3 text-gray-600 border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="text-sm ml-2 mb-1 inline-block">Confirm Password <span className="text-red-500">*</span></label>
        <Input.Password
          size="large"
          prefix={<LockOutlined />}
          placeholder="Confirm password"
          className="mb-4 rounded-full bg-bg3 text-gray-600 border-gray-700"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          icon={<ArrowRightOutlined />}
          size="large"
          onClick={handleRegister}
          className="bg-bg2 min-w-full rounded-full border-none text-bg1"
          disabled={loading}
        >
          Create Account
        </Button>

        <div className="flex justify-center mt-6 text-sm text-gray-400">
          <span
            className="hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </span>
        </div>

        <p className="text-xs text-gray-500 text-center mt-8">
          © {CNAME} {new Date().getFullYear()} &nbsp;|&nbsp; Play responsibly. Subject to risk.
        </p>
      </div>
    </div>
  );
};

export default Register;
