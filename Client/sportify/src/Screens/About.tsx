import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto bg-white shadow-2xl rounded-lg p-8 transform transition-all hover:shadow-2xl hover:-translate-y-1">
        {/* Heading */}
        <h1 className="text-5xl font-bold text-center font-racing text-gray-800 mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          About Sportify
        </h1>

        {/* Introduction */}
        <section className="mb-16">
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Welcome to <span className="font-semibold text-green-600">Sportify</span>, your one-stop solution for seamless turf booking and management! Our mission is to revolutionize the way players, facility owners, and administrators interact with sports facilities by providing a user-friendly, efficient, and feature-rich web application.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you're a player looking to book a turf, a facility owner managing your venues, or an admin overseeing the platform, Sportify is designed to make your experience smooth and hassle-free.
          </p>
        </section>

        {/* What We Offer Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            What We Offer
          </h2>
          <div className="space-y-6">
            {/* Players Section */}
            <div className="p-6 bg-green-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-semibold text-green-800 mb-3">For Players</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Book Turfs: Easily browse and book turfs for your favorite sports.</li>
                <li>Manage Bookings: Update, view, or cancel your bookings with just a few clicks.</li>
                <li>Payment Integration: Secure and convenient payment options for hassle-free transactions.</li>
              </ul>
            </div>

            {/* Facility Owners Section */}
            <div className="p-6 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-semibold text-blue-800 mb-3">For Facility Owners</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Add Turfs and Venues: List your turfs and venues on the platform with detailed information.</li>
                <li>Update Information: Keep your turf details, availability, and pricing up to date.</li>
                <li>Dashboard: Access a dedicated dashboard to view and manage all bookings for your facilities.</li>
              </ul>
            </div>

            {/* Admins Section */}
            <div className="p-6 bg-purple-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-semibold text-purple-800 mb-3">For Admins</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Platform Oversight: Monitor and manage users, turfs, and bookings across the platform.</li>
                <li>Support: Resolve issues and ensure the platform runs smoothly for all users.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Our Vision
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At Sportify, we believe in making sports accessible and enjoyable for everyone. Our platform bridges the gap between players and facility owners, ensuring transparency, convenience, and efficiency. With features like payment integration and real-time booking updates, we aim to create a seamless experience for all users.
          </p>
        </section>

        {/* Why Choose Sportify Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Why Choose Sportify?
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>User-Friendly Interface: Designed with simplicity and ease of use in mind.</li>
            <li>Secure Payments: Integrated payment gateway for safe and reliable transactions.</li>
            <li>Real-Time Updates: Stay informed with instant booking confirmations and updates.</li>
            <li>Dedicated Support: Our team is here to assist you every step of the way.</li>
          </ul>
        </section>

        {/* Join Us Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Join Us Today!
          </h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Whether you're a player looking to book a turf, a facility owner wanting to expand your reach, or an admin ensuring the platform's success, Sportify is here to help. Join us today and be a part of the future of turf booking and management!
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            For any inquiries or feedback, feel free to reach out to us at{' '}
            <a href="mailto:support@Sportify.com" className="text-green-600 hover:underline font-semibold">
              support@Sportify.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;