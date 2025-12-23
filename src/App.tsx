import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "antd";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
// import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
// import Register from "./pages/Register";
import { NotificationProvider } from "./contexts/NotificationContext";
import '../src/utils/css/custom.css'
import { UserProvider } from "./contexts/UserContext";
// import CreateEvent from "./pages/CreateEvent";
// import MyBookings from "./pages/Bookings";
// import MessagesList from "./pages/Messages";
// import EventChat from "./components/EventsChat";
// import FooterNav from "./components/FooterNav";
// import AddVenue from "./pages/AddVenue";
// import ManageVenue from "./pages/ManageVenue";
// import EventDetails from "./pages/EventDetails";
import NearWeLandingPage from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";
import CmsHome from "./cms/cms_home";
import UserManagement from "./cms/pages/UserManagement";
import CategoryManagement from "./cms/pages/CategoryManagement";
import EventManagement from "./cms/pages/EventManagement";
import AppManagement from "./cms/pages/AppManagement";
import InsightsDashboard from "./cms/pages/InsightsDashboard";
import Announcements from "./cms/pages/Announcements";

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <NotificationProvider>
          <Router>
            <Layout className="min-h-screen bg-bg1">
              <Layout.Content>
                <Routes>
                  <Route
                    path="/cms"
                    element={
                      <ProtectedRoute>
                        <CmsHome />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to="/cms/insights" replace />} />

                    {/* INSIGHTS */}
                    <Route path="insights" element={<InsightsDashboard />} />

                    {/* EXISTING */}
                    <Route path="users" element={<UserManagement />} />
                    <Route path="categories" element={<CategoryManagement />} />
                    <Route path="events" element={<EventManagement />} />
                    <Route path="app" element={<AppManagement />} />
                    <Route path="announcements" element={<Announcements />} />
                  </Route>

                  <Route
                    path="/app_demo"
                    element={
                      <ProtectedRoute>
                        <>
                          <Navbar />
                          <Home />
                        </>
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/aboutus" element={<AboutUs />} />
                  <Route path="/cms/login" element={<Login />} />
                  <Route
                    path="/"
                    element={<NearWeLandingPage />}
                  />
                  {/* <Route 
                    path="/event/:eventId" 
                    element={
                      <ProtectedRoute>
                        <>
                          <Navbar />
                          <EventDetails />
                        </>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <>
                          <Navbar />
                          <Profile />
                        </>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/create_event" 
                    element={
                      <ProtectedRoute>
                        <>
                          <Navbar />
                          <CreateEvent />
                        </>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/bookings" 
                    element={
                      <ProtectedRoute>
                        <>
                          <Navbar />
                          <MyBookings />
                        </>
                      </ProtectedRoute>
                    } 
                  />
                  <Route
                    path="/messages"
                    element={
                      <ProtectedRoute>
                        <>
                          <Navbar />
                          <MessagesList />
                        </>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/messages/:eventId"
                    element={
                      <ProtectedRoute>
                        <>
                          <Navbar />
                          <EventChat />
                        </>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/add_venue"
                    element={
                      <ProtectedRoute>
                        <>
                          <Navbar />
                          <AddVenue />
                        </>
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/manage-venue/:venueId" element={<ManageVenue />} />
                  <Route path="/register" element={<Register />} /> */}
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