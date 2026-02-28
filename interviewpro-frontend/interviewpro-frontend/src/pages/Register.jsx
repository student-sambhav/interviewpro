import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../api/axios";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered successfully!");

      navigate("/login");

    } catch {

      alert("Registration failed");

    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-80 flex flex-col gap-4"
      >

        <h2 className="text-2xl font-bold text-center text-blue-600">
          InterviewPro
        </h2>

        <input
          placeholder="Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-blue-600 text-white py-2 rounded">
          Register
        </button>

        <p className="text-sm text-center">
          Already have account?{" "}
          <Link className="text-blue-600" to="/login">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
}
