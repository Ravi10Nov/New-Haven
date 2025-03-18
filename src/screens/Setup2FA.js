// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "hooks/useAuth";

// const Setup2FA = () => {
//   const { user } = useAuth();
//   const [qrCode, setQrCode] = useState("");
//   const [isGenerating, setIsGenerating] = useState(false);
//   const userId = user?._id;

//   useEffect(() => {
//     if (user?.twoFactorSecret) {
//       fetchQRCode();  // Fetch QR code if 2FA secret exists
//     }
//   }, [user]);

//   const fetchQRCode = async () => {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/api/auth/get-2fa-qrcode`,
//         { userId }
//       );
//       console.log(response);
//       setQrCode(response.data.qrCodeDataURL);  // Display QR code
//     } catch (error) {
//       console.error("Error fetching 2FA QR code:", error);
//     }
//   };

//   const generate2FA = async () => {
//     if (isGenerating) return;

//     setIsGenerating(true);
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/api/auth/get-2fa-qrcode`,  // Reuse the same endpoint to generate secret if not present
//         { userId }
//       );
//       setQrCode(response.data.qrCodeDataURL);   // Set the new QR code
//     } catch (error) {
//       console.error("Error generating 2FA secret:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center w-full min-h-[70vh] bg-gray-50">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl text-center">
//         <h1 className="text-3xl font-bold mb-4 text-gray-800">
//           Set Up Two-Factor Authentication
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Secure your account by enabling two-factor authentication. Use an
//           authenticator app to scan the QR code below.
//         </p>
//         {qrCode ? (
//           <div className="mt-4">
//             <p className="text-lg text-gray-700">
//               Scan the QR code with your authenticator app:
//             </p>
//             <img
//               src={qrCode}
//               alt="Scan this QR code"
//               className="mt-4 mx-auto border p-2"
//             />
//             <p className="text-sm text-gray-500 mt-2">
//               After scanning, use the code generated in your app for verification.
//             </p>
//           </div>
//         ) : (
//           <button
//             onClick={generate2FA}
//             className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
//           >
//             Generate QR Code
//           </button>
//         )}
//         <div className="mt-6">
//           <h2 className="text-lg font-semibold text-gray-800">
//             Don’t have an authenticator app?
//           </h2>
//           <p className="text-gray-600 text-sm mt-2">
//             Download one from the links below:
//           </p>
//           <div className="flex justify-center mt-4 space-x-4">
//             <a
//               href="https://apps.apple.com/app/google-authenticator/id388497605"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline text-sm"
//             >
//               Google Authenticator (iOS)
//             </a>
//             <a
//               href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline text-sm"
//             >
//               Google Authenticator (Android)
//             </a>
//             <a
//               href="https://1password.com/downloads/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline text-sm"
//             >
//               1Password
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Setup2FA;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "hooks/useAuth";
// import { toast } from "react-toastify";

// const Setup2FA = () => {
//   const { user } = useAuth();
//   const [qrCode, setQrCode] = useState("");
//   const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(user?.isTwoFactorEnabled || false);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const userId = user?._id;

//   useEffect(() => {
//     if (isTwoFactorEnabled && user?.twoFactorSecret) {
//       fetchQRCode(); // Fetch QR code if 2FA is enabled and the secret exists
//     }
//   }, [isTwoFactorEnabled, user]);

//   const fetchQRCode = async () => {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/api/auth/get-2fa-qrcode`,
//         { userId }
//       );
//       setQrCode(response.data.qrCodeDataURL); // Display QR code
//     } catch (error) {
//       console.error("Error fetching 2FA QR code:", error);
//       toast.error("Failed to fetch 2FA QR code");
//     }
//   };

//   const handleToggle2FA = async () => {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/api/auth/update-2fa`,
//         {
//           userId,
//           isTwoFactorEnabled: !isTwoFactorEnabled, // Toggle 2FA status
//         }
//       );

//       if (response.data.success) {
//         setIsTwoFactorEnabled(response.data.isTwoFactorEnabled);
//         if (!response.data.isTwoFactorEnabled) {
//           setQrCode(""); // Clear QR code when 2FA is disabled
//         } else {
//           await fetchQRCode(); // Fetch QR code when 2FA is enabled
//         }
//         toast.success(
//           response.data.isTwoFactorEnabled ? "2FA Enabled" : "2FA Disabled"
//         );
//       } else {
//         toast.error("Failed to update 2FA status");
//       }
//     } catch (error) {
//       console.error("Error toggling 2FA:", error);
//       toast.error("Error toggling 2FA");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center w-full min-h-[70vh] bg-gray-50">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl text-center">
//         <h1 className="text-3xl font-bold mb-4 text-gray-800">
//           Set Up Two-Factor Authentication
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Secure your account by enabling two-factor authentication. Use an
//           authenticator app to scan the QR code below.
//         </p>
//         <div className="flex items-center justify-center space-x-4 mb-6">
//           <span className="text-lg text-gray-600">
//             {isTwoFactorEnabled ? "2FA is Enabled" : "2FA is Disabled"}
//           </span>
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               checked={isTwoFactorEnabled}
//               onChange={handleToggle2FA}
//               className="sr-only peer"
//             />
//             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600"></div>
//             <div className="absolute top-0.5 left-[2px] w-5 h-5 bg-white border border-gray-300 rounded-full transition-all peer-checked:translate-x-full peer-checked:border-white"></div>
//           </label>
//         </div>
//         {isTwoFactorEnabled && qrCode && (
//           <div className="mt-4">
//             <p className="text-lg text-gray-700">
//               Scan the QR code with your authenticator app:
//             </p>
//             <img
//               src={qrCode}
//               alt="Scan this QR code"
//               className="mt-4 mx-auto border p-2"
//             />
//             <p className="text-sm text-gray-500 mt-2">
//               After scanning, use the code generated in your app for verification.
//             </p>
//           </div>
//         )}
//         <div className="mt-6">
//           <h2 className="text-lg font-semibold text-gray-800">
//             Don’t have an authenticator app?
//           </h2>
//           <p className="text-gray-600 text-sm mt-2">
//             Download one from the links below:
//           </p>
//           <div className="flex justify-center mt-4 space-x-4">
//             <a
//               href="https://apps.apple.com/app/google-authenticator/id388497605"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline text-sm"
//             >
//               Google Authenticator (iOS)
//             </a>
//             <a
//               href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline text-sm"
//             >
//               Google Authenticator (Android)
//             </a>
//             <a
//               href="https://1password.com/downloads/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline text-sm"
//             >
//               1Password
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Setup2FA;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "hooks/useAuth";
import { toast } from "react-toastify";

const Setup2FA = () => {
  const { user } = useAuth();
  const [qrCode, setQrCode] = useState("");
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(user?.isTwoFactorEnabled || false);
  const userId = user?._id;

  useEffect(() => {
    fetchQRCode(); // Always fetch QR code on component load
  }, []);

  const fetchQRCode = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/get-2fa-qrcode`,
        { userId }
      );
      setQrCode(response.data.qrCodeDataURL); // Display QR code
    } catch (error) {
      console.error("Error fetching 2FA QR code:", error);
      toast.error("Failed to fetch 2FA QR code");
    }
  };

  const handleToggle2FA = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/update-2fa`,
        {
          userId,
          isTwoFactorEnabled: !isTwoFactorEnabled, // Toggle 2FA status
        }
      );

      if (response.data.success) {
        setIsTwoFactorEnabled(response.data.isTwoFactorEnabled);
        toast.success(
          response.data.isTwoFactorEnabled ? "2FA Enabled" : "2FA Disabled"
        );
      } else {
        toast.error("Failed to update 2FA status");
      }
    } catch (error) {
      console.error("Error toggling 2FA:", error);
      toast.error("Error toggling 2FA");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[70vh] bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl text-center">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <span
            className={`text-lg font-semibold ${isTwoFactorEnabled ? "text-green-600" : "text-red-600"
              }`}
          >
            {isTwoFactorEnabled ? "Authentication is Enabled" : "Authentication is Disabled"}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isTwoFactorEnabled}
              onChange={handleToggle2FA}
              className="sr-only peer"
            />
            <div
              className={`w-11 h-6 rounded-full ${isTwoFactorEnabled ? "bg-green-500" : "bg-red-500"
                } peer-focus:outline-none`}
            ></div>
            <div
              className={`absolute top-0.5 left-[2px] w-5 h-5 bg-white border rounded-full transition-all ${isTwoFactorEnabled
                  ? "translate-x-full border-white"
                  : "border-gray-300"
                }`}
            ></div>
          </label>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Set Up Two-Factor Authentication
        </h1>
        <p className="text-gray-600 mb-6">
          Secure your account by enabling two-factor authentication. Use an
          authenticator app to scan the QR code below.
        </p>
        <div className="mt-4">
          <p className="text-lg text-gray-700">
            Scan the QR code with your authenticator app:
          </p>
          <img
            src={qrCode}
            alt="Scan this QR code"
            className="mt-4 mx-auto border p-2"
          />
          <p className="text-sm text-gray-500 mt-2">
            After scanning, use the code generated in your app for verification.
          </p>
        </div>
        {/* <div className="flex items-center justify-center space-x-4 mt-6">
          <span
            className={`text-lg font-semibold ${
              isTwoFactorEnabled ? "text-green-600" : "text-red-600"
            }`}
          >
            {isTwoFactorEnabled ? "2FA is Enabled" : "2FA is Disabled"}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isTwoFactorEnabled}
              onChange={handleToggle2FA}
              className="sr-only peer"
            />
            <div
              className={`w-11 h-6 rounded-full ${
                isTwoFactorEnabled ? "bg-green-500" : "bg-red-500"
              } peer-focus:outline-none`}
            ></div>
            <div
              className={`absolute top-0.5 left-[2px] w-5 h-5 bg-white border rounded-full transition-all ${
                isTwoFactorEnabled
                  ? "translate-x-full border-white"
                  : "border-gray-300"
              }`}
            ></div>
          </label>
        </div> */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Don’t have an authenticator app?
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Download one from the links below:
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <a
              href="https://apps.apple.com/app/google-authenticator/id388497605"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm"
            >
              Google Authenticator (iOS)
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm"
            >
              Google Authenticator (Android)
            </a>
            <a
              href="https://1password.com/downloads/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm"
            >
              1Password
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup2FA;


