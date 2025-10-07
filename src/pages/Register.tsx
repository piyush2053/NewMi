import { Button, Input } from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../assets/gifs/nearmi.gif";
import { useState } from "react";
import Loader from "../components/Loader";
import { CNAME } from "../utils/constants";
import { core_services } from "../utils/api";
import { useNotification } from "../contexts/NotificationContext";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(""); 
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !age || !password || !confirmPassword) {
      showNotification("Error", "Please fill all required fields.", "error", 3000);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      showNotification("Error", "Please enter a valid email address (e.g., aaa@xyz.com).", "error", 3000);
      return;
    }

    const parsedAge = parseInt(age);
    if (isNaN(parsedAge) || parsedAge < 14 || parsedAge > 75) {
      showNotification("Error", "Age must be between 14 and 75.", "error", 3000);
      return;
    }

    if (password !== confirmPassword) {
      showNotification("Error", "Passwords do not match.", "error", 3000);
      return;
    }

    setLoading(true);
    try {
      await core_services.registerUser({
        name,
        age: parsedAge, // ✅ Send parsed age
        email,
        password,
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
        <label className="text-sm ml-2 mb-1 inline-block">Full Name <span className="text-red-500">*</span></label>
        <Input
          size="large"
          prefix={<UserOutlined />}
          placeholder="Full Name"
          className="mb-4 rounded-full bg-bg3 text-gray-600 border-gray-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

        <label className="text-sm ml-2 mb-1 inline-block">Age <span className="text-red-500">*</span></label>
        <Input
          size="large"
          type="number"
          placeholder="Age"
          className="mb-4 rounded-full bg-bg3 text-gray-600 border-gray-700"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label className="text-sm ml-2 mb-1 inline-block">Mobile Number</label>
        <Input
          size="large"
          prefix={<span className="text-gray-500 text-xs pl-1">+91</span>}
          placeholder="Mobile Number"
          type="tel"
          maxLength={10}
          className="mb-4 rounded-full bg-bg3 text-gray-600 border-gray-700"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
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
