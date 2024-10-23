import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for inputs and eye toggle
import 'react-phone-input-2/lib/style.css'; // Import phone input CSS
import PhoneInput from 'react-phone-input-2'; // For handling phone input with country code
import logo from '../../assets/logo/smallLogo2 (3).svg'; // Adjust the path as needed

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false); // Password visibility toggle

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Password:", password);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: Form Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center bg-white">
        {/* Logo at the top-left */}
        <div className="w-full flex justify-start p-4">
          <img src={logo} alt="Prime Health Logo" className="h-12" />
        </div>

        <form className="w-full max-w-md p-8" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-5 mb-8">
            <h1 className="text-4xl font-bold tracking-tight">Reset Password</h1>
            <p className="text-center">
              Enter your details below to receive an OTP and verify your account for password reset.
            </p>
          </div>

          {/* Email input */}
          <div className="relative mb-4">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Phone input */}
          <div className="relative mb-4">
            <FaPhone className="absolute left-3 top-3 text-gray-400" />
            <PhoneInput
              country={"ng"}
              value={phone}
              onChange={phone => setPhone(phone)}
              inputClass="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Password input */}
          <div className="relative mb-6">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="absolute right-3 top-3 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>

          <p className="mt-5 text-center text-md text-gray-600">
            Don't Remember Password?{" "}
            <Link to="/login" className="font-medium text-black hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Right: Full-height Image Section */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://firebasestorage.googleapis.com/v0/b/prime-health-611ef.appspot.com/o/auth%2FTwo%20factor%20authentication-bro.svg?alt=media&token=6a41c3cb-8519-4120-8d20-55abe140d1c8)",
        }}
      ></div>
    </div>
  );
};

export default PasswordReset;
