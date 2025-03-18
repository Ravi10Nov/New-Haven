// import axios from "config/axios";
// import { useAuth } from "hooks/useAuth";
// import React, { useState, useEffect, useRef } from "react";
// import { QRCodeCanvas } from "qrcode.react";

// const PayPalPayment = ({
//   initialAmount,
//   courseId,
//   handlePaypalSuccess,
//   setUserOrderId,
//   paymentSuccess,
//   userOrderId,
//   paymentStart,
//   setPaymentStart,
//   type,
//   setPaymentSuccess,
// }) => {
//   const paypal = useRef(null);
//   const [existingButton, setExistingButton] = useState(null);
//   const [orderId, setOrderId] = useState(null);
//   const { user } = useAuth();
//   const userId = user._id;
//   const [isDralaModalOpen, setDralaModalOpen] = useState(false);
//   console.log("type", type);


//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("PayPal");

//   useEffect(async () => {
//     if (type === "Donation") {
//       try {
//         const response = await axios.post(
//           `${process.env.REACT_APP_BACKEND_URL}/api/transactions/make-donation`,
//           { userId, orderId, initialAmount }
//         );
//         setUserOrderId(orderId);
//         console.log("response", response);
//         console.log("made the donaction");
//       } catch (error) {
//         console.log("cant make donation", error);
//       }
//     }
//   }, [orderId]);

//   useEffect(async () => {
//     if (orderId && paymentStart) {
//       try {
//         console.log("orderid", orderId);
//         const response = await axios.post(
//           `${process.env.REACT_APP_BACKEND_URL}/api/transactions/buy-course`,
//           { userId, orderId, initialAmount, courseId }
//         );

//         console.log("orderid", orderId);
//         setPaymentStart(false);
//         setPaymentSuccess(true);
//         console.log("response", response);
//         console.log("made the donaction");
//         // handlePaypalSuccess();
//       } catch (error) {
//         console.log("cant make donation", error);
//       }
//     }
//   }, [orderId]);

//   useEffect(() => {
//     if (existingButton) {
//       existingButton.close();
//     }

//     const createPayPalOrder = async () => {
//       try {
//         const actions = window.paypal.Buttons({
//           createOrder: (data, actions, err) => {
//             return actions.order.create({
//               intent: "CAPTURE",
//               purchase_units: [
//                 {
//                   description: "Drala Spirit of Truth",
//                   amount: {
//                     currency_code: "USD",
//                     value: initialAmount,
//                   },
//                 },
//               ],
//             });
//           },
//           onApprove: async (data, actions) => {
//             const order = await actions.order.capture();
//             setOrderId(order.id);
//             console.log("order", order);
//           },
//           onError: (err) => {
//             console.log("error", err);
//           },
//         });

//         actions.render(paypal.current);
//         setExistingButton(actions);
//       } catch (error) {
//         console.error("Error creating PayPal order:", error);
//       }
//     };

//     createPayPalOrder();

//     return () => {
//       if (existingButton) {
//         existingButton.close();
//       }
//     };
//   }, [initialAmount]);

//   const handleDralaClick = () => {
//     setDralaModalOpen(true);
//   };

//   const closeDralaModal = () => {
//     setDralaModalOpen(false);
//   };

//   return (
//     <>
//       <div className="flex justify-between items-center gap-4 w-full">
//         {/* PayPal Button */}
//         <div ref={paypal} className={`${isDralaModalOpen ? "z-10" : "z-50"
//           }`}></div>

//         {/* Drala Button */}
//         <div className="flex flex-col">
//           <a
//             href="https://play.google.com/store/apps/details?id=drala.io.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 hover:text-blue-700 underline font-semibold mr-32 relative bottom-6"
//           >
//             Use Drala Wallet for payment
//           </a>
//           <button
//             onClick={handleDralaClick}
//             className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-24 rounded mr-32 relative bottom-4"
//             style={{ marginLeft: 'auto' }}
//           >
//             Drala
//           </button>
//         </div>
//       </div>

//       {/* Drala Payment Modal */}
//       {isDralaModalOpen && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//           {/* <DralaPayment onClose={closeDralaModal} /> */}
//           <DralaPayment
//             onClose={closeDralaModal}
//             userId={userId}
//             amount={initialAmount}
//             onPaymentSuccess={() => {
//               setPaymentSuccess(true);
//               console.log("Drala payment completed!");
//             }}
//           />
//         </div>
//       )}
//     </>
//   );

// };

// export default PayPalPayment;


// // const DralaPayment = ({ onClose }) => {
// //   const [timeLeft, setTimeLeft] = useState(120); // Timer starts at 2 minutes (120 seconds)
// //   const address = "0xcb6eE706732Fb5A9cE6AC347b7c1b833164abF3b"; // Wallet address

// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setTimeLeft((prevTime) => {
// //         if (prevTime <= 1) {
// //           clearInterval(timer);
// //           alert("Session expired. Please try again!");
// //           onClose();
// //           return 0;
// //         }
// //         return prevTime - 1;
// //       });
// //     }, 1000);

// //     return () => clearInterval(timer); // Clean up timer on component unmount
// //   }, [onClose]);

// //   const formatTime = (seconds) => {
// //     const minutes = Math.floor(seconds / 60);
// //     const remainingSeconds = seconds % 60;
// //     return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
// //   };

// //   return (
// //     <div className="p-8 bg-white rounded shadow-lg max-w-3xl w-full">
// //       <h2 className="text-lg font-bold mb-4">Drala Payment</h2>
// //       <p className="mb-4 text-gray-600">
// //         Scan the QR code below to make your payment. This session will expire in{" "}
// //         <span className="font-bold text-red-500">{formatTime(timeLeft)}</span>.
// //       </p>

// //       {/* QR Code */}
// //       <div className="flex justify-center items-center mb-6">
// //         <QRCodeCanvas value={address} size={200} />
// //       </div>

// //       <p className="text-gray-500 text-sm text-center mb-4">
// //         Wallet Address: <span className="font-mono">{address}</span>
// //       </p>

// //       <button
// //         onClick={onClose}
// //         className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
// //       >
// //         Close
// //       </button>
// //     </div>
// //   );
// // };




// const DralaPayment = ({ onClose, userId, amount, onPaymentSuccess }) => {
//   const [timeLeft, setTimeLeft] = useState(120); // Timer starts at 2 minutes
//   const walletAddress = "0xcb6eE706732Fb5A9cE6AC347b7c1b833164abF3b"; // Wallet address
//   const [paymentStatus, setPaymentStatus] = useState("pending"); // Tracks payment status

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => {
//         if (prevTime <= 1) {
//           clearInterval(timer);
//           alert("Session expired. Please try again!");
//           onClose();
//           return 0;
//         }
//         return prevTime - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer); // Clean up timer on component unmount
//   }, [onClose]);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
//   };

//   const checkPaymentStatus = async () => {
//     try {
//       // Example: Polling backend to check payment status
//       const response = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/api/transactions/drala-payment`,
//         { userId, amount, walletAddress }
//       );
//       if (response.data.status === "success") {
//         setPaymentStatus("success");
//         alert("Payment successful!");
//         onPaymentSuccess();
//         onClose();
//       }
//     } catch (error) {
//       console.error("Error checking payment status:", error);
//     }
//   };

//   useEffect(() => {
//     if (paymentStatus === "pending") {
//       const interval = setInterval(() => {
//         checkPaymentStatus();
//       }, 5000); // Poll every 5 seconds

//       return () => clearInterval(interval); // Clean up interval on unmount
//     }
//   }, [paymentStatus]);

//   return (
//     <div className="p-8 bg-white rounded shadow-lg max-w-3xl w-full">
//       <h2 className="text-lg font-bold mb-4">Drala Payment</h2>
//       <p className="mb-4 text-gray-600">
//         Scan the QR code below to make your payment. This session will expire in{" "}
//         <span className="font-bold text-red-500">{formatTime(timeLeft)}</span>.
//       </p>

//       {/* QR Code */}
//       <div className="flex justify-center items-center mb-6">
//         <QRCodeCanvas value={walletAddress} size={200} />
//       </div>

//       <p className="text-gray-500 text-sm text-center mb-4">
//         Wallet Address: <span className="font-mono">{walletAddress}</span>
//       </p>

//       <button
//         onClick={onClose}
//         className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
//       >
//         Close
//       </button>
//     </div>
//   );
// };






import React, { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "config/axios";
import { useAuth } from "hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const PayPalPayment = ({
  initialAmount,
  courseId,
  handlePaypalSuccess,
  setUserOrderId,
  paymentSuccess,
  userOrderId,
  paymentStart,
  setPaymentStart,
  type,
  setPaymentSuccess,
}) => {
  const paypal = useRef(null);
  const [existingButton, setExistingButton] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const { user } = useAuth();
  const userId = user._id;
  const [selectedMethod, setSelectedMethod] = useState("PayPal");
  const [isDralaModalOpen, setDralaModalOpen] = useState(false);
  const walletAddress = "0xcb6eE706732Fb5A9cE6AC347b7c1b833164abF3b";

  const handleDralaClick = () => {
    setSelectedMethod("Drala");
    setDralaModalOpen(true);
  };

  const closeDralaModal = () => {
    console.log("Setting modal to false...");
    setDralaModalOpen(false);
  };

  const handlePayPalClick = () => {
    setSelectedMethod("PayPal");
    setDralaModalOpen(false);
  };

  useEffect(async () => {
    if (type === "Donation") {
      try {
        console.log("orderid :", userId, orderId, initialAmount,selectedMethod );
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/transactions/make-donation`,
          { userId, orderId, initialAmount,selectedMethod }
        );
        setUserOrderId(orderId);
        console.log("response", response);
        console.log("made the donaction");
      } catch (error) {
        console.log("cant make donation", error);
      }
    }
  }, [orderId]);

  useEffect(async () => {
    if (orderId && paymentStart && type === "Course") {
      try {
        console.log("orderid", userId, orderId, initialAmount, courseId,selectedMethod );
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/transactions/buy-course`,
          { userId, orderId, initialAmount, courseId,selectedMethod }
        );

        console.log("orderid", orderId);
        setPaymentStart(false);
        setPaymentSuccess(true);
        console.log("response", response);
        console.log("made the donaction");
        // handlePaypalSuccess();
      } catch (error) {
        console.log("cant make donation", error);
      }
    }
  }, [orderId]);

  // Initialize PayPal Button
  useEffect(() => {
    if (selectedMethod === "PayPal") {
      if (existingButton) {
        existingButton.close();
      }

      const createPayPalOrder = async () => {
        try {
          const actions = window.paypal.Buttons({
            createOrder: (data, actions, err) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: "Drala Spirit of Truth",
                    amount: {
                      currency_code: "USD",
                      value: initialAmount,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              setOrderId(order.id);
              console.log("order", order);
              setPaymentSuccess(true);
            },
            onError: (err) => {
              console.log("error", err);
            },
          });

          actions.render(paypal.current);
          setExistingButton(actions);
        } catch (error) {
          console.error("Error creating PayPal order:", error);
        }
      };

      createPayPalOrder();
    }

    return () => {
      if (existingButton) {
        existingButton.close();
      }
    };
  }, [selectedMethod, initialAmount]);

  return (
    <>
      <div className="flex justify-between items-center gap-4 w-full">
        {/* PayPal Button */}
        <div ref={paypal} className={`${isDralaModalOpen ? "hidden" : "block"} z-50`}></div>

        <div className="flex flex-col">
          <a
            // href="https://play.google.com/store/apps/details?id=drala.io.com"
            href="https://www.drala.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline font-semibold mr-32 relative bottom-6"
          >
            What is the Drala?
          </a>
          <button
            onClick={handleDralaClick}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-14 rounded mr-32 relative bottom-4"
            style={{ marginLeft: 'auto' }}
          >
            Donate Drala
          </button>
        </div>

      </div>

      {/* Drala Payment Modal */}
      {selectedMethod === "Drala" && isDralaModalOpen && (
        <DralaPayment
          onClose={() => {
            console.log("Closing modal..."); // Debugging log
            closeDralaModal();
          }}
          userId={userId}
          setOrderId = {setOrderId}
          amount={initialAmount * 0.9}
          onPaymentSuccess={() => {
            setPaymentSuccess(true);
            handlePaypalSuccess();
            closeDralaModal();
            console.log("Drala payment completed!");
          }}
          setUserOrderId={setUserOrderId}
        />
      )}
    </>
  );
};


const DralaPayment = ({ onClose, userId, amount, onPaymentSuccess, setUserOrderId ,setOrderId}) => {
  const [timeLeft, setTimeLeft] = useState(360); // Timer starts at 1 hour
  const walletAddress = "0x46CA37dE90166427CCbfb7f483D32111Ede23AD6"; // Wallet address
  const [paymentStatus, setPaymentStatus] = useState("pending"); // Tracks payment status
  const [sessionId, setSessionId] = useState(null);

  // Create session on component mount
  useEffect(() => {
    const createSession = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/transactions/sessions/create`,
          { userId, amount, walletAddress }
        );
        setSessionId(response.data.sessionId);
      } catch (error) {
        console.error("Error creating session:", error);
        alert("Failed to initialize payment session. Please try again.");
        onClose();
      }
    };

    createSession();
  }, [userId, amount, walletAddress, onClose]);

  // Timer countdown for session expiration
  useEffect(() => {
    if (paymentStatus === "pending") {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            alert("Session expired. Please try again!");
            onClose();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [paymentStatus, onClose]);

  // Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Only generate the QR code and start payment status check when sessionId is set
  const qrValue = sessionId ? `${walletAddress}:${amount}:${sessionId}` : null;

  useEffect(() => {
    if (paymentStatus === "pending" && sessionId) {
      const interval = setInterval(async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/transactions/drala-payment`,
            { walletAddress, sessionId, amount }
          );

          console.log(response);
          if (response.data.status === "success") {
            setPaymentStatus("success");
            toast.success("Payment completed successfully!");

            setOrderId(response.data.orderId);
            setPaymentSuccess(true);
            onPaymentSuccess();


            console.log("Payment success! Stopping timer and closing modal...");
            clearInterval(interval); // Stop checking for payment status
          }
        } catch (error) {
          console.error("Error checking payment status:", error);
        }
      }, 5000);

      return () => clearInterval(interval); // Clean up interval on component unmount
    }
  }, [paymentStatus, sessionId, onPaymentSuccess, setUserOrderId, amount, walletAddress]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="p-8 bg-white rounded shadow-lg max-w-3xl w-full relative">
        <h2 className="text-lg font-bold mb-4">Drala Payment</h2>

        {paymentStatus === "pending" ? (
          <>
            <p className="mb-2 text-gray-600">
              Scan the QR code from your Drala Wallet to make your donation. This session will expire in{" "}
              <span className="font-bold text-red-500">{formatTime(timeLeft)}</span>.
            </p>

            <p className="mb-4 text-black"><span className="text-gray-600">Amount : </span> ${amount}</p>

            {/* Only show the QR Code when sessionId is available */}
            {qrValue && (
              <div className="flex justify-center items-center mb-6">
                <QRCodeCanvas value={qrValue} size={200} />
              </div>
            )}

            <p className="text-gray-500 text-sm text-center mb-4">
              Wallet Address: <span className="font-mono">{walletAddress}</span>
            </p>
          </>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-bold text-lg mb-4">
              🎉 Payment Completed Successfully!
            </p>
            <p className="text-gray-500 text-sm mb-4">
              Thank you for your donation. You can now close this window.
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
        >
          ✕
        </button>

        {/* Close Button at Bottom Center */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};




export default PayPalPayment;
