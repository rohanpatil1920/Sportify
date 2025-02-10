import React from "react";
import { Link } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import { useNavigate } from "react-router-dom";
import { login } from "../Services/loginService";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(email, password); // API call
      const { role } = response; // Extract role from response
      setUserRole(role); // Store role in state

      const { id, username, isActive } = response;

      sessionStorage.setItem("id", id);
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("isActive", isActive);
      sessionStorage.setItem("role", role);

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "player") {
        navigate("/player-dashboard");
      } else if (role === "manager") {
        navigate("/manager-dashboard");
      } else {
        navigate("/"); // Default fallback
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <section className="  bg-white light:bg-neutral-700">
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-3/5 ">
            <div className="block rounded-lg bg-neutral-200 shadow-lg light:bg-neutral-800">
              <div className="g-0  lg:flex lg:flex-wrap">
                {/* <!-- Left column container--> */}
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
                    <div className="bg-neutral-200 border-gray-800">
                      <form>
                        {/* <!--Username input--> */}
                        <input
                          type="text"
                          placeholder="Email"
                          className="w-72 mb-4 border-b-2 p-2 border-gray-300 rounded-md filter shadow-md outline-none "
                          style={{ backgroundColor: "white", color: "black" }}
                          onChange={(e) => setEmail(e.target.value)}
                        ></input>

                        {/* <!--Password input--> */}
                        <input
                          type="password"
                          placeholder="Password"
                          className="w-72 mb-4 border-b-2 p-2 border-gray-300 rounded-md filter shadow-md outline-none"
                          style={{ backgroundColor: "white", color: "black" }}
                          onChange={(e) => setPassword(e.target.value)}
                        ></input>

                        {/* <!--Submit button--> */}
                        <div className="mb-12 pb-1 pt-1 text-center">
                          <Link
                            to="/login"
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="button"
                            style={{
                              background:
                                "linear-gradient(130deg, rgba(11,185,1,1) 0%, rgba(41,121,9,1) 45%, rgba(2,102,6,1) 100%)",
                              color: "#ffffff",
                            }}
                            onClick={handleLogin}
                          >
                            Log in
                          </Link>

                          {/* <!--Forgot password link--> */}
                          <Link
                            to="/forgot-password"
                            className="text-black hover:underline hover:text-neutral-950"
                          >
                            Forgot password?
                          </Link>
                        </div>

                        {/* <!--Register button--> */}
                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2 text-black">
                            Don't have an account?
                          </p>
                            <Link
                              to="/register"
                              type="button"
                              className="inline-block outline-none rounded px-6 pb-2 pt-2.5 text-xs font-bold uppercase leading-normal text-green-900 transition duration-500 ease-in-out hover:bg-lime-700 hover:outline-none hover:text-primary focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:hover:bg-neutral-950 dark:hover:bg-opacity-100"
                            >
                              Register
                            </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* <!-- Right column container with background and description--> */}
                <div
                  className="flex items-start rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-full"
                  style={{
                    background:
                      "linear-gradient(130deg, rgba(11,185,1,1) 0%, rgba(41,121,9,1) 45%, rgba(2,102,6,1) 100%)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h3 className="mb-2 text-3xl font-bold">
                      Welcome to Sportify
                    </h3>
                    <h4 className="mb-6 text-xl font-bold">
                      Your Gateway to Urban Sports!
                    </h4>
                    <p className="text-sm">
                      Book cricket, football, tennis turfs, or your favorite
                      outdoor arena in seconds, right from the heart of the
                      city. Say goodbye to endless calls and hassles, discover
                      real-time availability, instant confirmations, and
                      seamless playtime. Gear up, claim your turf, and let the
                      games begin!
                    </p>
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
