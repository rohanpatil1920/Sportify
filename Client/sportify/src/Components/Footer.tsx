import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function App() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      alert(`Subscribed with email: ${email}`);
      setEmail(""); // Clear the input after submission
    } else {
      alert("Please enter a valid email address.");
    }
  };
  return (
    <footer
      style={{
        background:
          "linear-gradient(130deg, rgba(11,185,1,1) 0%, rgba(41,121,9,1) 45%, rgba(2,102,6,1) 100%)",
      }}
    >
      {/* <!-- Main container div: holds the entire content of the footer, including four sections --> */}
      <div className="mx-6 text-center md:text-left text-white ">
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* <!-- Elements section --> */}
          <div className="">
            <h6 className=" flex items-center text-3xl ml-10 font-racing font-extrabold underline justify-center uppercase md:justify-start">
              <img
                src="/public/sportify.png"
                alt="Sportify Logo"
                className="h-20"
              />
              Sportify
            </h6>
            <p className="mb-4 mx-16 font-semibold">
              Book. Play. Repeat. 🏏⚽🎾
            </p>
            <h4 className="font-bold ml-16 text-2xl mb-2 ">About Us</h4>
            <p className="ml-16 mb-2 ">
              At Sportify, we’re passionate about bringing players and turfs
              together. Our platform simplifies booking outdoor sports
              facilities like cricket, football, and tennis turfs, making it
              easier for urban athletes to play and partners to thrive. Join us
              in creating a healthier, more active world—one game at a time!
            </p>
          </div>
          {/* <!-- Products section --> */}
          <div className="ml-40 mt-6">
            <h6 className="mb-4 flex font-bold uppercase md:justify-start">
              Quick Links
            </h6>
            <p className="mb-4">
              <Link
                to="/"
                className="text-white hover:text-white hover:underline dark:text-neutral-200 focus:text-white"
              >
                Play
              </Link>
            </p>
            <p className="mb-4">
              <Link
                to="/venues"
                className="text-white hover:text-white hover:underline dark:text-neutral-200 focus:text-white"
              >
                Venues
              </Link>
            </p>
            <p className="mb-4">
              <Link
                to="/contact"
                className="text-white hover:text-white hover:underline dark:text-neutral-200 focus:text-white"
              >
                Contact
              </Link>
            </p>
            <p className="mb-4">
              <Link
                to="/about"
                className="text-white hover:text-white hover:underline dark:text-neutral-200 focus:text-white"
              >
                About
              </Link>
            </p>
          </div>
          {/* <!-- Useful links section --> */}
<div className="mt-6">
  <h6 className="mb-4 flex font-bold uppercase md:justify-start">
    Popular Sports
  </h6>
  {["Football", "Cricket", "Basketball", "Tennis"].map((sport) => (
    <p key={sport} className="mb-4">
      <Link
        to={`/venues?sport=${sport.toUpperCase()}`}
        className="text-white hover:text-white hover:underline dark:text-neutral-200 focus:text-white"
      >
        {sport}
      </Link>
    </p>
  ))}
</div>
          <div className="mt-6">
            <h2 className="text-left mb-4 font-semibold text-lg">
              Subscribe to our Newsletter
            </h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 rounded-xl focus:outline-none transition-all ease-out duration-500 focus:ring-4 focus:ring-sky-600 focus:ring-opacity-75 bg-zinc-900 text-white"
            />
            <Link
              to="/"
              onClick={handleSubscribe}
              className=" flex-grow h-2/4 px-4 py-2  ml-4 rounded-lg text-white hover:underline hover:text-white focus:outline-none transition-all ease-out duration-500 "
              type="button"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center border-b-2 border-neutral-50 py-6 dark:border-neutral-50 sm:justify-end">
        <div className="mr-5 text-white hidden lg:block ">
          <span>Get connected with us on social networks :</span>
        </div>
        {/* <!-- Social network icons container --> */}
        <div className="flex justify-center">
          <a className="mr-6 text-neutral-600 hover:text-cyan-600 hover:transition ease-linear duration-500 dark:text-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 hover:h-6 hover:w-6 hover:transition-all ease-in-out duration-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>
          <a className="mr-6 text-neutral-600 dark:text-neutral-200 hover:text-red-600 hover:transition ease-linear duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 hover:h-7 hover:w-7 hover:transition-all ease-in-out duration-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a className="mr-6 text-neutral-600 dark:text-neutral-200 hover:text-pink-400 hover:transition ease-linear duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 hover:h-6 hover:w-6 hover:transition-all ease-in-out duration-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>
      {/* <!--Copyright section--> */}
      <div
        className="p-3 text-center"
        style={{
          background:
            "linear-gradient(130deg, rgba(11,185,1,1) 0%, rgba(41,121,9,1) 45%, rgba(2,102,6,1) 100%)",
        }}
      >
        <span className="text-white"> &copy; 2025 Copyright reserved to </span>
        <a
          className="font-semibold text-neutral-50 dark:text-neutral-50 hover:text-white hover:underline"
          href="https://tw-elements.com/"
        >
          Sportify
        </a>
      </div>
    </footer>
  );
}
