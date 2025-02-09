import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Venues = () => {
  return (
    <>
      <Header />
      <main>
        <section className="venues">
          <div className="container mx-auto py-16">
            <h1 className="text-2xl font-bold">Available Venues</h1>
            {/* Venue listing goes here */}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Venues;
