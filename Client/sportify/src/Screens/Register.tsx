import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import { useState } from "react";
import { register } from "../Services/registerService";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await register(username, email, password, contact); // API call
      const { role } = response; // Extract role from response
      setRole(role); // Store role in state

      alert(response.message);

      navigate("/login");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <section className="h-full bg-white light:bg-neutral-700">
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-3/5">
            <div className="block rounded-lg bg-neutral-200 shadow-lg light:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* <!-- Left column container--> */}
                <div
                  className="flex items-end rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-tr-full"
                  style={{
                    background:
                      "linear-gradient(130deg, rgba(11,185,1,1) 0%, rgba(41,121,9,1) 45%, rgba(2,102,6,1) 100%)",
                  }}
                >
                  <div className="px-2 py-6 mb-20 text-white md:mx-6 md:p-6">
                    <h3 className="mb-4 text-3xl font-bold">
                      "Book, Play, Repeat !"
                    </h3>
                    <h6 className="mb-4 text-lg font-bold">
                      Start your sports journey with seamless turf bookings.
                    </h6>
                    <p className="text-sm">
                      Ready to play? Create your account in seconds and gain
                      access to the best turfs in your city. From cricket to
                      football and tennis, we make booking outdoor sports
                      facilities quick, easy, and fun. Register now and let the
                      games begin!
                    </p>
                  </div>
                </div>

                {/* <!-- Right column container with form--> */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
                    <div className="text-center mb-6">
                      <img
                        className="mx-auto w-80"
                        src="/sportify_logo.png"
                        alt="logo"
                      />
                    </div>
                    <div className=" border-gray-800">
                      <form>
                        {/* <!--Username input--> */}
                        <input
                          type="text"
                          placeholder="Name"
                          className="w-72 mb-4 border-b-2 p-2 border-gray-300 rounded-md filter shadow-md outline-none"
                          style={{ backgroundColor: "white", color: "black" }}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        {/* <!--Email input--> */}
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-72 mb-4 border-b-2 p-2 border-gray-300 rounded-md filter shadow-md outline-none"
                          style={{ backgroundColor: "white", color: "black" }}
                          onChange={(e) => setEmail(e.target.value)}
                        />

                        {/* <!--Password input--> */}
                        <input
                          type="password"
                          placeholder="Password"
                          className="w-72 mb-4 border-b-2 p-2 border-gray-300 rounded-md filter shadow-md outline-none"
                          style={{ backgroundColor: "white", color: "black" }}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* <!--Contact No. input--> */}
                        <input
                          type="number"
                          placeholder="Contact No."
                          className="w-72 mb-4 border-b-2 p-2 border-gray-300 rounded-md filter shadow-md outline-none"
                          style={{ backgroundColor: "white", color: "black" }}
                          // Hide increment and decrement buttons
                          onWheel={(e) => e.currentTarget.blur()}
                          onChange={(e) => setContact(e.target.value)}
                        />
                        <style>
                          {`
                            /* Hide increment and decrement buttons */
                            input[type=number]::-webkit-inner-spin-button,
                            input[type=number]::-webkit-outer-spin-button {
                              -webkit-appearance: none;
                              margin: 0;
                            }
                            input[type=number] {
                              -moz-appearance: textfield;
                            }
                          `}
                        </style>

                        {/* <!--Submit button--> */}
                        <div className="mb-12 pb-1 pt-1 text-center w-40">
                          <Link
                            to="/login"
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="button"
                            style={{
                              background:
                                "linear-gradient(130deg, rgba(11,185,1,1) 0%, rgba(41,121,9,1) 45%, rgba(2,102,6,1) 100%)",
                              color: "#ffffff",
                            }}
                            onClick={handleRegister}
                          >
                            Sign Up
                          </Link>
                        </div>

                        {/* <!--Register button--> */}
                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2 text-black">
                            Already have an account?
                          </p>
                          <TERipple rippleColor="light">
                          <Link
                            to="/login"
                            type="button"
                            className="inline-block outline-none rounded px-6 pb-2 pt-2.5 text-xs font-bold uppercase leading-normal text-green-900 transition duration-500 ease-in-out hover:bg-lime-700 hover:outline-none hover:text-primary focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:hover:bg-neutral-950 dark:hover:bg-opacity-100"
                          >
                            Login
                            </Link>
                            </TERipple>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}