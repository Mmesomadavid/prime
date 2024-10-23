import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for inputs
import 'react-phone-input-2/lib/style.css'; // Import phone input CSS
import PhoneInput from 'react-phone-input-2'; // For handling phone input with country code
import Logo from "../../assets/logo/smallLogo2 (3).svg"; // Adjust the path as needed


const Login: React.FC = () => {
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
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        <form className="w-full max-w-md p-8" onSubmit={handleSubmit}>
          {/* Logo */}
          <div className="absolute top-4 left-4">
            <img src={Logo} alt="Primehealth Logo" className="w-10 h-10" />
          </div>

          {/* Form Header */}
          <div className="flex flex-col items-center gap-5 mb-8">
            <h2 className="text-4xl font-bold text-center">Login To Your Account!</h2>
            <p className="text-center">Sign into Your account and take your own health into your hands</p>
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
            Log in
          </button>

          {/* Links */}
          <p className="mt-6 text-center text-md text-gray-600">
            Don't have an account?{" "}
            <Link to="/" className="font-medium text-black hover:underline">
              Sign Up
            </Link>
          </p>
          <p className="mt-2 text-center text-md text-gray-600">
            Forgot your password?{" "}
            <Link to="/reset-password" className="font-medium text-black hover:underline">
              Reset Password
            </Link>
          </p>
        </form>
      </div>

      {/* Right: Full-height Image Section */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://firebasestorage.googleapis.com/v0/b/prime-health-611ef.appspot.com/o/auth%2FSecure%20data-bro.svg?alt=media&token=bcd0ccac-8149-4d7b-a080-f1024d62f8b8)",
        }}
      ></div>
    </div>
  );
};

export default Login;
