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
  const userId = sessionStorage.getItem("id"); // Replace with the actual logged-in userId (you can retrieve this from context or localStorage)

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
        try {
          // Fetch user profile with the correct URL
          const response = await fetch(`http://localhost:8080/users/${userId}/profile`);
          
          // Check if the response status is OK (status code 200)
          if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
      
          // Parse the response as JSON
          const data = await response.json();
          setUserData(data); // Set the profile data to the state
          setLoading(false); // Stop the loading spinner
        } catch (error) {
          console.error("Error fetching profile:", error);
          setLoading(false); // Stop loading in case of error
        }
      };

    fetchUserProfile();
  }, [userId]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission for updating the profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/users/${userId}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        navigate("/home"); // Redirect to the home page after successful update
      } else {
        const result = await response.json();
        alert(result.message || "Error updating profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
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
