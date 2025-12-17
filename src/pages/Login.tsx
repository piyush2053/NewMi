import { Button, Input } from "antd";
import {
  MailOutlined,
  LockOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";
import { useState } from "react";
import { CNAME } from "../utils/constants";
import { useNotification } from "../contexts/NotificationContext";
import { core_services } from "../utils/api";
import { useUser } from "../contexts/UserContext";

/* ---------------- JWT Decode ---------------- */
const decodeJwt = (token: string) => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const pad = payload.length % 4;
    const padded = payload + (pad ? "=".repeat(4 - pad) : "");
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
};

const HARDCODED_OTP = "202000";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { setUserFromToken } = useUser();
  const { showNotification } = useNotification();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ OTP MUST BE ARRAY
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"login" | "otp">("login");
  const [pendingAuth, setPendingAuth] = useState<any>(null);

  /* ---------------- OTP HANDLERS ---------------- */
  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }

    // ✅ ENTER submits OTP
    if (e.key === "Enter") {
      handleVerifyOtp();
    }
  };

  /* ---------------- LOGIN ---------------- */
  const handleLogin = async () => {
    if (!email || !password) {
      showNotification("Error", "Please provide email and password", "warning", 3000);
      return;
    }

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      showNotification("Error", "Invalid email address", "error", 3000);
      return;
    }

    setLoading(true);
    try {
      const data = await core_services.loginUser({ email, password });
      const token = data?.token || data?.accessToken;
      if (!token) throw new Error("No token received");

      const payload = decodeJwt(token);

      const user = {
        id: payload?.id || payload?.userId,
        name: payload?.name || payload?.username,
        email: payload?.email || email,
        role: payload?.role || "admin",
      };

      const expiresIn =
        payload?.exp && payload?.iat ? payload.exp - payload.iat : 0;

      setPendingAuth({ token, user, expiresIn });
      setStep("otp");

      showNotification("OTP Sent", "Enter OTP to continue", "success", 2000);
    } catch (err: any) {
      showNotification(
        "Error",
        err?.response?.data?.message || "Login failed",
        "error",
        3000
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- VERIFY OTP ---------------- */
  const handleVerifyOtp = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length < 6) {
      showNotification("Error", "Enter complete OTP", "warning", 3000);
      return;
    }

    if (enteredOtp !== HARDCODED_OTP) {
      showNotification("Invalid OTP", "Try again", "error", 3000);
      return;
    }

    login(pendingAuth);
    setUserFromToken(pendingAuth.token);

    showNotification("Success", "Login successful", "success", 2000);
    navigate("/cms");
  };

  return (
    <div className="min-h-screen bg-bg1 flex items-center justify-center relative">
      {loading && (
        <div className="absolute inset-0 bg-bg1 bg-opacity-80 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}

      {/* ---------------- LOGIN SCREEN ---------------- */}
      {step === "login" && (
        <div
          className="w-full max-w-xs text-center"
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        >
          <h1 className="text-4xl font-bold mb-8 text-white">CMS Login</h1>

          <Input
            size="large"
            prefix={<MailOutlined className="text-gray-400" />}
            placeholder="Admin email"
            className="mb-4 rounded-full bg-bg1 shadow-bg7 shadow-lg border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input.Password
            size="large"
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Password"
            className="mb-6 rounded-full bg-bg1 shadow-bg7 shadow-lg border-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            icon={<ArrowRightOutlined />}
            size="large"
            onClick={handleLogin}
            className="bg-bg7 border-bg6 text-gray-300 w-full rounded-full"
          >
            Login
          </Button>

          <p className="text-xs text-gray-500 mt-8">
            © {CNAME} {new Date().getFullYear()}
          </p>
        </div>
      )}

      {/* ---------------- OTP SCREEN ---------------- */}
      {step === "otp" && (
        <div className="w-full max-w-xs text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">Verify OTP</h1>

          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl rounded-lg bg-bg3 text-white border border-gray-700 focus:border-bg2 outline-none"
              />
            ))}
          </div>

          <Button
            size="large"
            onClick={handleVerifyOtp}
            className="bg-bg2 w-full rounded-full"
          >
            Verify & Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default Login;
