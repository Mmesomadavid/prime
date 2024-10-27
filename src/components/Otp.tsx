import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { contextData } from "../context/AuthContext";
import logo from "../assets/logo/smallLogo2 (3).svg";
import Alert from "./UI/Alert";

interface OtpProps {
  email: string;
}

const Otp: React.FC<OtpProps> = ({ email }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string | null>(""); 
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = contextData();
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
  
  // Create an array of refs for each input
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    
    // Ensure the value is a digit or empty
    if (/^\d?$/.test(value)) { 
      newOtp[index] = value;

      // Move to the next input if the current one is filled
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      setOtp(newOtp);
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      // Clear the current field
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      // Focus the previous input if the current one is empty
      if (index > 0 && newOtp[index - 1] === "") {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleResendOtp = async (): Promise<void> => {
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch(`${url}/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) setSuccess("OTP sent successfully!");
      else throw new Error(data.message);
    } catch (err: any) {
      setError(err.message);
    }
    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${url}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: otp.join(""), email }),
      });
      const data = await res.json();
      if (res.ok) {
        await login(data);
        data.accountType === "doctor"
          ? navigate("/dashboard/doctor/")
          : navigate("/dashboard/patient");
      } else throw new Error(data.message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-white flex flex-col items-center p-8">
        {/* Logo */}
        <div className="self-start mb-8">
          <Link to="/">
            <img className="h-16 w-auto" alt="logo" src={logo} draggable="false"/>
          </Link>
        </div>

        {/* Image above input */}
        <img 
          src="https://firebasestorage.googleapis.com/v0/b/prime-health-611ef.appspot.com/o/auth%2Fpassword.png?alt=media&token=f2eb486b-9c11-475d-9450-7e3e7eeec1e6" 
          alt="Secure Verification" 
          className="h-48 w-auto mb-6" 
          draggable="false"
        />

        {/* OTP Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
          <div className="flex justify-between gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text" // Change type to text
                placeholder="-"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputRefs.current[index] = el)} // Assign ref
                autoComplete="off" // Prevent autocomplete
                className="w-12 h-16 text-center border border-gray-300 rounded-md text-2xl font-bold focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            ))}
          </div>

          {/* Verify OTP Button */}
          <button
            type="submit"
            className="w-full py-3 mb-4 bg-black text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify One-time-passcode"}
          </button>

          {/* Error and Success Alerts */}
          {error && <Alert type="danger" message={error as string} />}
          {success && <Alert type="success" message={success as string} />}

          {/* Resend OTP Button */}
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-900 focus:outline-none"
            >
              Resend
            </button>
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8">
        <p className="text-gray-700 text-4xl font-semibold text-left">
          Enter the 6-digit OTP sent to your email to verify your account.
        </p>
      </div>
    </div>
  );
};

export default Otp;
