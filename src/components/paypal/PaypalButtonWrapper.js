import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "../../config/axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Dialog } from "@headlessui/react";
import { CheckIcon, ExclamationIcon } from "@heroicons/react/outline";
import Modal from "./PaypalModalWrapper";
import { toast } from "react-toastify";

const PaypalButtonWrapper = ({
  type,
  id = 0,
  initialAmount,
  currency = "USD",
  setPaymentStatusOnParent,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [modalText, setModalText] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("PENDING");

  const amountRef = useRef();

  useEffect(() => {
    amountRef.current = initialAmount;
  }, [initialAmount]);

  useEffect(() => {
    const amount = amountRef.current;
    if (setPaymentStatusOnParent) {
      if (type === "donation") {
        setPaymentStatusOnParent({ status: paymentStatus, amount: amount });
      }

      if (type === "course") {
        setPaymentStatus({ status: paymentStatus, amoun: amount });
      }
    }
  }, [paymentStatus]);

  const generateOrder = async (id, currency, type) => {
    let response;
    try {
      const amount = amountRef.current;
      console.log("current amount is", amount);
      if (type === "donation") {
        response = await axios.post(`/transactions/orders`, {
          amount,
          type,
          currency,
        });
      }
      if (type === "course") {
        response = await axios.post(`/transactions/orders`, {
          id,
          type,
          currency,
        });
      }
      return response.data.data.id;
    } catch (error) {
      throw error;
    }
  };

  const recievePayment = async (orderId, paymentId) => {
    const response = await axios.post(`/transactions/payments`, {
      orderId,
      paymentId,
    });
    return response.data;
  };

  const initialOptions = {
    "client-id": process.env.REACT_APP_UPLOADS_PAYPAL,
    currency: "USD",
  };

  return (
    <div className="relative z-0 flex-1">
      <Modal
        open={modalOpen}
        closeHandler={() => {
          setModalOpen(false);
        }}
        modalTitle="Payment Status"
        modalDescription=""
      >
        <div>
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
            {paymentStatus === "Success" ? (
              <CheckIcon
                className="w-6 h-6 text-green-600"
                aria-hidden="true"
              />
            ) : (
              <ExclamationIcon
                className="w-6 h-6 text-green-600"
                aria-hidden="true"
              />
            )}
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              {modalText}
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Order ID : {orderId}</p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            onClick={() => setModalOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>

      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={async (data, actions) => {
            try {
              const orderId = await generateOrder(id, currency, type);
              setOrderId(orderId);
              return orderId;
            } catch (error) {
              if (error.status == 423) {
                toast.error(error.response.data);
              }
              return "";
            }
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(async (details) => {
              // This function shows a transaction success message to your buyer.
              let messageFromServer = "";
              if (details.purchase_units[0].payments.captures) {
                try {
                  const resFromServer = await recievePayment(
                    details.id,
                    details.purchase_units[0].payments["captures"][0].id
                  );
                  // @ts-ignore
                  messageFromServer = resFromServer.message;
                  // Make Calls to backend to changes in react state corresponding to successful payment here
                  setPaymentStatus("SUCCESS");
                  setModalText("Payment successful.");
                  setModalOpen(true);
                } catch {
                  toast.error(
                    "Error enrolling student, please contact tech@xyz.com"
                  );
                }
              } else {
                setPaymentStatus("FAIL");
                setModalText(
                  "Payment failed. Please contact tech@xyz.com if money is deducted!"
                );
                setModalOpen(true);
              }
            });
          }}
          onError={(err) => {
            setPaymentStatus("FAIL");
            setModalText(
              "Payment failed from Paypal's end! Please try again after sometime."
            );
            setModalOpen(true);
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaypalButtonWrapper;
