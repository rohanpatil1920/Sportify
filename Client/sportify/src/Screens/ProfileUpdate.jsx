import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileUpdate = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    contact: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("id");
  const role = sessionStorage.getItem("role");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/${userId}/profile`
        );
        setUserData({
          username: response.data.username || "",
          email: response.data.email || "",
          contact: response.data.contact || "",
          password: "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error.response || error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/users/${userId}/update`,
        userData
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
        if (role === "ADMIN") {
          navigate("/admin-dashboard");
        } else if (role === "PLAYER") {
          navigate("/player-dashboard");
        } else if (role === "FACILITYOWNER") {
          navigate("/MainContent");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error.response || error);
      const errorMessage =
        error.response?.data?.message || "Error updating profile.";
      alert(errorMessage);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-8">
      <section className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contact" className="block text-sm font-semibold">
              Contact Number
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={userData.contact}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold">
              Password (optional)
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Update Profile
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ProfileUpdate;
