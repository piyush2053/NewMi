import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import { NotificationProvider } from "./contexts/NotificationContext";
import '../src/utils/css/custom.css'
import { UserProvider } from "./contexts/UserContext";
import AdminPanel from "./pages/Adminpanel";
import CreateEvent from "./pages/CreateEvent";
import MyBookings from "./pages/Bookings";
import MessagesList from "./pages/Messages";
import EventChat from "./components/EventsChat";
import FooterNav from "./components/FooterNav";

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <NotificationProvider>
          <Router>
            <Layout className="min-h-screen bg-bg1">
              <Layout.Content>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Navbar />
                        <Home />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/profile" element={<ProtectedRoute><Navbar /><Profile /></ProtectedRoute>} />
                  <Route path="/create_event" element={<ProtectedRoute><Navbar /><CreateEvent /></ProtectedRoute>} />
                  <Route path="/bookings" element={<ProtectedRoute><Navbar /><MyBookings /></ProtectedRoute>} />
                  <Route
                    path="/messages"
                    element={
                      <ProtectedRoute>
                        <Navbar />
                        <MessagesList />
                        <FooterNav />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/messages/:eventId"
                    element={
                      <ProtectedRoute>
                        <Navbar />
                        <EventChat />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/register" element={<Register />} />
                  <Route path="/admin " element={<AdminPanel />} />
                </Routes>
              </Layout.Content>
            </Layout>
          </Router>
        </NotificationProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
