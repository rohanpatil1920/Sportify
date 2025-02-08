import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext"; // Adjust the path as necessary
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomePage from "./Screens/Home";
import About from "./Screens/About";
import Contact from "./Screens/Contact";
import Login from "./Screens/Login";
import VenueList from "./Components/VenueList";
import Activities from "./Screens/Activities";
import VenueBookingPage from "./Screens/VenueBookingPage";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/venues" element={<VenueList />} />
              <Route path="/venue/:id" element={<VenueBookingPage />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
