import React from "react";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      alert("Message Sent! We'll get back to you soon.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      alert("There was an issue sending your message.");
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Our Location",
      details: "123 Sports Avenue, Pune, Maharashtra 411001",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Number",
      details: "+91 98765 43210",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Address",
      details: "contact@sportify.com",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Working Hours",
      details: "Mon - Sat: 9:00 AM - 8:00 PM",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border p-6 rounded-lg shadow-lg">
          <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Get in Touch
          </span>
          <h2 className="text-2xl font-bold mt-4">Contact Us</h2>
          <p className="text-gray-600">
            Fill out the form and we'll get back to you.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <label className="block font-medium">Name</label>
            <input
              className="w-full p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="block font-medium">Email</label>
            <input
              className="w-full p-2 border rounded"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="block font-medium">Subject</label>
            <input
              className="w-full p-2 border rounded"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />

            <label className="block font-medium">Message</label>
            <textarea
              className="w-full p-2 border rounded"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded mt-2"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-blue-500 mb-2">
            Contact Information
          </h2>
          <p className="text-gray-600">
            Reach out to us through these channels.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md flex items-start space-x-4"
              >
                <div className="rounded-full bg-blue-100 p-3 text-blue-500">
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{info.title}</h3>
                  <p className="text-sm text-gray-600">{info.details}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.6701311745182!2d73.70573!3d18.5889047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb7d0345f01f%3A0x6e8c20c647a06f47!2sSunbeam%20Infotech%20Private%20Limited!5e0!3m2!1sen!2sin!4v1738874681221!5m2!1sen!2sin"
              
              width="100%"
              height="300"
              className="rounded-lg"
              title="Sportify Location"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
