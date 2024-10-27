import React, { useState, ChangeEvent, FormEvent } from "react";
import Logo from "../../assets/logo/smallLogo2 (3).svg";
import { BsEye, BsEyeSlash, BsCheckCircle } from "react-icons/bs";
import { Phone, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import Otp from "../../components/Otp";
import { contextData } from "../../context/AuthContext";
import Alert from "../../components/UI/Alert";

const SignupForm: React.FC = () => {
  const [fullname, setfullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>(""); // Removed the default "+234"
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [accountType, setAccountType] = useState<string>("none");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const { user } = contextData();

  const validateForm = (): string => {
    if (accountType === "none") return "Please select an account type";
    if (!email.includes("@") || email.length < 5) return "Please enter a valid email address";
    if (fullname.trim().length < 3) return "Your first name must be at least 3 characters";
    if (password.length < 5) return "Your password must be at least 5 characters";
    if (password !== confirmPassword) return "Passwords do not match";
    return "success";
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setError(null);
    const { id, value } = e.target;
    switch (id) {
      case "accountType":
        setAccountType(value);
        break;
      case "email":
        setEmail(value.toLowerCase());
        break;
      case "fullname":
        setfullName(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      case "phone":
        setPhoneNumber(value);
        break;
    }
  };

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const validationMessage = validateForm();
    if (validationMessage !== "success") return setError(validationMessage);

    setLoading(true);
    try {
      const res = await fetch(`${url}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fullname,
          password,
          phoneNumber,
          accountType
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSuccess(data.message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isAtLeast8Chars = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const isPasswordMatch = password === confirmPassword;

  if (success) return <Otp email={email} />;

  return (
    !user && (
      <div className="flex min-h-screen bg-gray-100">
        <div className="m-auto flex w-full overflow-hidden rounded-lg bg-white shadow-lg">
          {/* Left side - Registration form */}
          <div className="w-full p-8 lg:w-1/2">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <img src={Logo} alt="Primehealth logo" draggable="false" className="w-9 h-8" />
                <span className="ml-2 text-xl font-semibold">Primehealth</span>
              </div>
            </div>
            <h2 className="mb-6 text-4xl font-bold mt-8">Welcome! Create account</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Account Type Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Account Type*</label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className={`w-full p-2 text-center border rounded-md transition-colors duration-200 ${
                      accountType === "patient" ? "border-gray-500 bg-black text-white" : "border-gray-300"
                    }`}
                    onClick={() => setAccountType("patient")}
                  >
                    patient
                  </button>
                  <button
                    type="button"
                    className={`w-full p-2 text-center border rounded-md transition-colors duration-200 ${
                      accountType === "hospital" ? "border-gray-500 bg-black text-white" : "border-gray-300"
                    }`}
                    onClick={() => setAccountType("hospital")}
                  >
                    Hospital
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name*</label>
                <div className="flex items-center border border-gray-300 rounded p-2">
                  <User className="text-gray-500 mr-2" />
                  <input
                    id="fullname"
                    type="text"
                    placeholder="First Name"
                    value={fullname}
                    onChange={handleChange}
                    required
                    className="w-full focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email*</label>
                <div className="flex items-center border border-gray-300 rounded p-2">
                  <Mail className="text-gray-500 mr-2" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                    required
                    className="w-full focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number*</label>
                <div className="flex items-center border border-gray-300 rounded p-2">
                  <Phone className="text-gray-500 mr-2" />
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full focus:outline-none"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password*</label>
                <div className="flex items-center border border-gray-300 rounded p-2">
                  <Lock className="text-gray-500 mr-2" />
                  <input
                    id="password"
                    placeholder="Create password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handleChange}
                    required
                    className="w-full focus:outline-none"
                  />
                  <div onClick={handlePasswordVisibility} className="cursor-pointer text-gray-500 ml-2">
                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                  </div>
                </div>
                <div className="mt-2 space-y-1 text-sm">
                  <div className={`flex items-center ${isAtLeast8Chars ? "text-green-500" : "text-gray-500"}`}>
                    <BsCheckCircle className={`mr-2 ${isAtLeast8Chars ? "text-green-500" : "text-gray-500"}`} />
                    8 or more characters
                  </div>
                  <div className={`flex items-center ${hasSpecialChar ? "text-green-500" : "text-gray-500"}`}>
                    <BsCheckCircle className={`mr-2 ${hasSpecialChar ? "text-green-500" : "text-gray-500"}`} />
                    Contains a special character
                  </div>
                  <div className={`flex items-center ${hasDigit ? "text-green-500" : "text-gray-500"}`}>
                    <BsCheckCircle className={`mr-2 ${hasDigit ? "text-green-500" : "text-gray-500"}`} />
                    Contains a number
                  </div>
                  <div className={`flex items-center ${isPasswordMatch ? "text-green-500" : "text-gray-500"}`}>
                    <BsCheckCircle className={`mr-2 ${isPasswordMatch ? "text-green-500" : "text-gray-500"}`} />
                    Passwords match
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
                    onChange={handleChange}
                    required
                    className="w-full focus:outline-none"
                  />
                </div>
              </div>

              {error && <Alert message={error} type="error" />}
              <button
                type="submit"
                className="w-full mt-6 py-3 px-4 bg-black hover:bg-gray-900 text-white font-semibold rounded-lg focus:outline-none transition duration-200"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
            </p>
          </div>
          {/* Right side */}
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
    )
  );
};

export default SignupForm;
