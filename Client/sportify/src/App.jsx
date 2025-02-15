import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Screens/Home";
import Contact from "./Screens/Contact";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import VenueList from "./Components/VenueList";
import Activities from "./Screens/Activities";
import VenueBookingPage from "./Screens/VenueBookingPage";
import RootLayout from "./Screens/RootLayout";
import PartnerRegistration from "./Screens/PartnerRegistration";
import AboutPage from "./Screens/About";
import BookingHistory from "./Screens/BookingHistory";
import ProfileUpdate from "./Screens/ProfileUpdate";
import UpdateBookingPage from "./Screens/UpdateBooking";
import LandingPage from "./Screens/LandingPage";
import { Sidebar } from "lucide-react";
import MainContent from "./Screens/MainContent";
import RegisterVenue from "./Screens/RegisterVenue";
import AddCourts from "./Screens/AddCourts";
import UpdateVenueForm from "./Screens/UpdateVenueForm";
import UpdateCourtForm from "./Screens/UpdateCourtForm";
import VenueListByLocality from "./Components/VenueListByLocality";
import VenueListBySports from "./Components/VenueListBySports";
import AdminDashboard from "./Screens/Admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index path="/" element={<LandingPage />} />
            <Route index path="/player-dashboard" element={<HomePage />} />
            <Route path="/venues" element={<VenueList />} />
            <Route
              path="/venuelistbylocality"
              element={<VenueListByLocality />}
            />
            <Route path="/venuelistbysports" element={<VenueListBySports />} />
            <Route path="/venue/:venueId" element={<VenueBookingPage />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/partner-registration"
              element={<PartnerRegistration />}
            />
            <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
            <Route
              path="/edit-booking/:bookingId"
              element={<UpdateBookingPage />}
            />
            <Route path="/profile-update" element={<ProfileUpdate />} />
            <Route path="/history" element={<BookingHistory />} />
            <Route path="/about" element={<AboutPage />}></Route>
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/maincontent" element={<MainContent />} />
            <Route path="/registervenue" element={<RegisterVenue />} />{" "}
            <Route path="/AddCourts" element={<AddCourts />} />{" "}
            <Route
              path="/update-venue/:venueId"
              element={<UpdateVenueForm />}
            />
            <Route
              path="/update-court/:courtId"
              element={<UpdateCourtForm />}
            />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
