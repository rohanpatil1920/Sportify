import React from "react";

const Login = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <form>
        <input
          type="email"
          placeholder="Email"
          className="mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
