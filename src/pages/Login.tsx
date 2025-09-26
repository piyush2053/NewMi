import { Button, Input } from "antd";
import { MailOutlined, LockOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from '../assets/gifs/predictplus.gif';
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";
import { useState } from "react";
import { CNAME } from "../utils/constants";
import { useNotification } from "../contexts/NotificationContext";
import { core_services } from "../utils/api";
import { useUser } from "../contexts/UserContext";

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserFromToken } = useUser();

  const handleLogin = async () => {
    if (!email || !password) {
      showNotification("Error", `Please Provide Correct Email and Password`, "error", 3000);
      return;
    }

    setLoading(true);
    try {
      const res = {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "user": {
          "id": "12345",
          "name": "John Doe",
          "email": "john@example.com",
          "role": "admin"
        },
        "expiresIn": 3600
      }

      login(res);
      setUserFromToken(res.token);
      navigate("/");
    } catch (err: any) {
      showNotification("Error", `Login failed`, "error", 3000);
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

      <div className="w-full max-w-xs">
        <Input
          size="large"
          prefix={<MailOutlined />}
          placeholder="Enter your email"
          className="mb-4 rounded-full bg-bg3 text-gray-600 border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input.Password
          size="large"
          prefix={<LockOutlined />}
          placeholder="Enter your password"
          className="mb-6 rounded-full bg-bg3 text-gray-600 border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center mb-1 text-sm text-gray-400 hover:underline cursor-pointer">
          Need help?
        </div>
        <div
          className="flex justify-center mb-6 text-gray-400 hover:underline cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register
        </div>
        <Button
          icon={<ArrowRightOutlined />}
          size="large"
          onClick={handleLogin}
          className="bg-bg2 min-w-full rounded-full border-none text-bg1"
          disabled={loading}
        >Sign-In</Button>

        <p className="text-xs text-gray-500 text-center mt-8">
          © {CNAME} {new Date().getFullYear()} &nbsp;|&nbsp; Play at your own risk. It’s addictive. Subject to risks.
        </p>
      </div>
    </div>
  );
};

export default Login;
