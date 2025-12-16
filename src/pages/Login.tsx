import { Button, Input } from "antd";
import { MailOutlined, LockOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";
import { useState } from "react";
import { CNAME } from "../utils/constants";
import { useNotification } from "../contexts/NotificationContext";
import { core_services } from "../utils/api";
import { useUser } from "../contexts/UserContext";

const decodeJwt = (token: string) => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const pad = payload.length % 4;
    const padded = payload + (pad ? "=".repeat(4 - pad) : "");
    const decoded = atob(padded);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { setUserFromToken } = useUser();
  const { showNotification } = useNotification();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      showNotification("Error", "Please provide email and password", "warning", 3000);
      return;
    }

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      showNotification(
        "Error",
        "Please enter a valid email address",
        "error",
        3000
      );
      return;
    }

    setLoading(true);
    try {
      const data = await core_services.loginUser({ email, password });
      const token: string = data?.token || data?.accessToken || "";
      if (!token) throw new Error("No token returned from server");

      const payload = decodeJwt(token);

      const user = {
        id: payload?.userId || payload?.id || null,
        name: payload?.username || payload?.name || "",
        email: payload?.email || email,
        role: payload?.role || "admin",
      };

      const expiresIn =
        typeof payload?.exp === "number" && typeof payload?.iat === "number"
          ? payload.exp - payload.iat
          : data?.expiresIn || 0;

      login({ token, user, expiresIn });
      setUserFromToken(token);

      showNotification("Success", "Logged in successfully", "success", 2000);
      navigate("/cms");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || "Login failed";
      showNotification("Error", msg, "error", 3000);
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

      {/* CMS Heading */}
      <h1 className="text-4xl font-bold mb-8 text-white tracking-wide">
        CMS Login
      </h1>

      <div className="w-full max-w-xs">
        <Input
          size="large"
          prefix={<MailOutlined />}
          placeholder="Admin email"
          className="mb-4 rounded-full bg-bg3 text-gray-600 border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input.Password
          size="large"
          prefix={<LockOutlined />}
          placeholder="Password"
          className="mb-6 rounded-full bg-bg3 text-gray-600 border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          icon={<ArrowRightOutlined />}
          size="large"
          onClick={handleLogin}
          className="bg-bg2 min-w-full rounded-full border-none text-bg1"
          disabled={loading}
        >
          Login
        </Button>

        <p className="text-xs text-gray-500 text-center mt-8">
          © {CNAME} {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Login;
