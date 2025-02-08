import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const RootLayout = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div>
          <Outlet />
        </div>
      </main>
      {location.pathname.toLowerCase() === "/login" ||
      location.pathname.toLowerCase() === "/register" ? null : (
        <Footer />
      )}
    </div>
  );
};

export default RootLayout;
