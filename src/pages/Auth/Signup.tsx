import { useState } from "react";
import Logo from "../../assets/logo/smallLogo2 (3).svg";
import { BsEye, BsEyeSlash, BsCheckCircle } from "react-icons/bs";
import { Phone, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+234"); // Default Nigerian country code
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(""); // New state for role selection

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isAtLeast8Chars = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const isPasswordMatch = password && confirmPassword && password === confirmPassword;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="m-auto flex w-full overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Left side - Registration form */}
        <div className="w-full p-8 lg:w-1/2">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <img src={Logo} alt="primehealth logo" draggable="false" className="w-9 h-8" />
              <span className="ml-2 text-xl font-semibold">Primehealth</span>
            </div>
          </div>
          <h2 className="mb-6 text-4xl font-bold mt-8">Welcome! Create account</h2>
          <form className="space-y-4">
            {/* Select Role (Patient / Hospital) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Role*</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`w-full p-2 text-center border rounded-md transition-colors duration-200 ${
                    role === "patient" ? "border-gray-500 bg-black text-white" : "border-gray-300"
                  }`}
                  onClick={() => setRole("patient")}
                >
                  Patient
                </button>
                <button
                  type="button"
                  className={`w-full p-2 text-center border rounded-md transition-colors duration-200 ${
                    role === "hospital" ? "border-gray-500 bg-black text-white" : "border-gray-300"
                  }`}
                  onClick={() => setRole("hospital")}
                >
                  Hospital
                </button>
              </div>
            </div>

            {/* First Name Field */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name*</label>
              <div className="flex items-center border border-gray-300 rounded p-2">
                <User className="text-gray-500 mr-2" />
                <input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full focus:outline-none"
                />
              </div>
            </div>

            {/* Last Name Field */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name*</label>
              <div className="flex items-center border border-gray-300 rounded p-2">
                <User className="text-gray-500 mr-2" />
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full focus:outline-none"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email*</label>
              <div className="flex items-center border border-gray-300 rounded p-2">
                <Mail className="text-gray-500 mr-2" />
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full focus:outline-none"
                />
              </div>
            </div>

            {/* Phone Number Field with default Nigerian code */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number*</label>
              <div className="flex items-center border border-gray-300 rounded p-2">
                <Phone className="text-gray-500 mr-2" />
                <input
                  id="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="w-full focus:outline-none"
                />
              </div>
            </div>

            {/* Password and Confirm Password Fields */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password*</label>
              <div className="flex items-center border border-gray-300 rounded p-2">
                <Lock className="text-gray-500 mr-2" />
                <input
                  id="password"
                  placeholder="Create password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full focus:outline-none"
                />
                <div onClick={handlePasswordVisibility} className="cursor-pointer text-gray-500 ml-2">
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </div>
              </div>

              {/* Password Validation Instructions */}
              <div className="mt-2 space-y-1 text-sm">
                <div className={`flex items-center ${isAtLeast8Chars ? "text-green-500" : "text-gray-500"}`}>
                  <BsCheckCircle className={`mr-2 ${isAtLeast8Chars ? "text-green-500" : "text-gray-400"}`} />
                  At least 8 characters
                </div>
                <div className={`flex items-center ${hasSpecialChar ? "text-green-500" : "text-gray-500"}`}>
                  <BsCheckCircle className={`mr-2 ${hasSpecialChar ? "text-green-500" : "text-gray-400"}`} />
                  Contains a special character (!@#$%^&*)
                </div>
                <div className={`flex items-center ${hasDigit ? "text-green-500" : "text-gray-500"}`}>
                  <BsCheckCircle className={`mr-2 ${hasDigit ? "text-green-500" : "text-gray-400"}`} />
                  Contains a digit
                </div>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password*</label>
              <div className="flex items-center border border-gray-300 rounded p-2">
                <Lock className="text-gray-500 mr-2" />
                <input
                  id="confirmPassword"
                  placeholder="Confirm password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full focus:outline-none"
                />
              </div>
              {!isPasswordMatch && confirmPassword && (
                <p className="text-red-500 text-sm">Passwords do not match.</p>
              )}
            </div>

            <button className="w-full bg-black text-white hover:bg-gray-800 py-2 rounded">Create account</button>
          </form>
          <p className="mt-6 text-center text-md text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-black hover:underline">Log in</Link>
          </p>
        </div>

        {/* Right side - Blue background with text and comment card */}
        <div className="hidden md:block relative w-1/2 h-full bg-blue-500">
          <h1 className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold text-center">Join the Prime Health Community!</h1>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Your Health Matters</h2>
            <p className="text-sm text-gray-600">
              Sign up now and take the first step towards better health. Connect with professionals and get personalized care!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
