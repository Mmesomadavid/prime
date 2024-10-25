import { useState } from "react";
import Logo from "../../assets/logo/smallLogo2 (3).svg";
import { BsEye, BsEyeSlash, BsCheckCircle } from "react-icons/bs";
import { Phone, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+234");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Use confirm password
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isAtLeast8Chars = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const isPasswordMatch = password === confirmPassword; // Check if passwords match

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
            {/* Role Selection */}
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

            {/* First Name */}
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

            {/* Last Name */}
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

            {/* Email */}
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

            {/* Phone Number */}
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

            {/* Password */}
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

              {/* Password Validation */}
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

            {/* Confirm Password */}
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
              {/* Password Match Message */}
              {!isPasswordMatch && confirmPassword && (
                <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
              )}
            </div>

            <button className="w-full bg-black text-white hover:bg-gray-800 py-2 rounded">Create account</button>
          </form>
          <p className="mt-6 text-center text-md text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-black hover:underline">Login</Link>
          </p>
        </div>

        {/* Right section */}
        <div className="hidden lg:flex w-1/2 relative rounded-l-2xl bg-transparent flex-col items-center justify-center pt-15">
          {/* Glassmorphic Background */}
          <div className="absolute inset-0 bg-white/10 rounded-l-2xl backdrop-blur-lg border border-white/20 z-10"></div>
          {/* Scattered Circles */}
          <div className="absolute w-48 h-48 bg-gradient-to-br from-gray-900 to-black rounded-full opacity-50 -top-10 -left-0"></div>
          <div className="absolute w-64 h-64 bg-gradient-to-br from-gray-900 to-black rounded-full opacity-50 top-20 right-20"></div>
          <div className="absolute w-40 h-40 bg-gradient-to-br from-gray-900 to-black-800 rounded-full opacity-50 bottom-10 left-24"></div>
          {/* Content */}
          <h1 className="relative text-left justify-center font-semibold text-6xl text-gray-800 z-20 px-8">
            Join the Health Revolution: Where Care Meets Innovation!
          </h1>
        </div>
      </div>
    </div>
  );
}
