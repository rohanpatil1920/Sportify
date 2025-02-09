//import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext"; // Adjust the path as necessary
import HomePage from "./Screens/Home";
import Contact from "./Screens/Contact";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import VenueList from "./Components/VenueList";
import Activities from "./Screens/Activities";
import VenueBookingPage from "./Screens/VenueBookingPage";
import RootLayout from "./Screens/RootLayout";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/venues" element={<VenueList />} />
            <Route path="/venue/:id" element={<VenueBookingPage />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
