import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "hooks/useAuth";

export default function Admin2FA() {
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const history = useHistory();
  const { user } = useAuth();

  const verify2FACode = async () => {
    if (!user?._id) {
      toast.error("User information is missing. Please log in again.");
      return;
    }

    if (code.length !== 6) {
      toast.error("Please enter a valid 6-digit code.");
      return;
    }

    setIsVerifying(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/verify-2fa`,
        { userId: user._id, token: code } // Include the user-provided code
      );

      if (response.data.success) {
        toast.success("2FA verified successfully!");
        history.push("/admins");
      } else {
        toast.error(response.data.message || "Invalid 2FA code. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying 2FA code:", error);
      toast.error("Failed to verify 2FA code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Two-Factor Authentication
        </h2>
        <p className="text-gray-600 mb-6">
          Please enter the 6-digit code from your authenticator app.
        </p>
        <input
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={6}
          placeholder="Enter 6-digit code"
        />
        <button
          className={`w-full py-2 text-white font-bold rounded-lg transition ${
            code.length === 6 && !isVerifying
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          onClick={verify2FACode}
          disabled={code.length !== 6 || isVerifying}
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  );
}
    