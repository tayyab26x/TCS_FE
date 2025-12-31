// src/pages/Login.jsx
import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", form);
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
        />
        <InputField
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
        />
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
  );
};

export default Login;
