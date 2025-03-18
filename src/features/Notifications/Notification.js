import React, { useEffect, useState } from "react";
import { useAuth } from "hooks/useAuth";
import "./AdminNotification.css";
import axios from "config/axios";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ViewWelcomeLetter } from "member/accomplishments/YourAccomplishments/ViewWelcomeLetter";
import { generateWelcomeCertificate } from "member/accomplishments/YourAccomplishments/generateWelcomeLetter";
import { ViewExemptionLetter } from "member/accomplishments/YourAccomplishments/ExemptionLetter";
import { generateExemptionLetter } from "member/accomplishments/YourAccomplishments/generateExemptionLetter";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "script",
  "subscript",
  "superscript",
  "blockquote",
  "code-block",
  "header",
  "list",
  "bullet",
  "indent",
  "outdent",
  "link",
  "image",
  "formula",
  "color",
  "background",
  "align",
  "direction",
  "code",
  "clean",
];

const quillModules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      [{ header: [1, 2, 3, 4, 5] }],
    ],
  },
  clipboard: {
    matchVisual: false,
  },
};

const Notification = ({ url, dashboardUrl }) => {
  const [notifications, setNotifications] = useState([]);
  const [sendNotificationsModal, setSendNotificationsModal] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationContent, setNotificationContent] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const { user } = useAuth();

  const [moduleCreateModalOpen, setModuleCreateModalOpen] =
    React.useState(false);

  const [welcomeLaterModel, setWelcomeLaterModel] = useState(false);
  const [exemptedLaterModel, setExemptionLaterModel] = useState(false);
  const [welcomeLaterBody, setwelcomeLaterBody] = useState({
    body: "",
  });

  const [exemptionLaterBody, setExemptionLaterBody] = useState({
    body: "",
  });

  const [laterBody, setLaterBody] = useState(null);
  console.log(laterBody);

  const quillModules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: [1, 2, 3, 4, 5, false, 7] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        // [{ size: ["small", false, "large", "huge"] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["link", "image", "formula"],
        ["clean"],
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  };
  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "subscript",
    "superscript",
    "blockquote",
    "code-block",
    "header",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "formula",
    "color",
    "background",
    "align",
    "direction",
    "code",
    "clean",
  ];

  useEffect(() => {
    fetchUser();
    fetchNotifications();
    fetchWelcomeAndExemptionLater();
  }, []);

  const fetchUser = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/users/${user._id}`
      );
      const fetchedUser = response.data.user;

      response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/get-profile`,
        { email: fetchedUser.email }
      );

      setUserDetails(response.data.profile);
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to fetch user details");
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/notifications/get-notifications/${user._id}`
      );
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Failed to fetch notifications");
    }
  };

  const handleSendNotification = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/notifications/create-notification`,
        { notificationTitle, notificationContent }
      );
      setSendNotificationsModal(false);
      toast.success("Notification sent successfully.");
      fetchNotifications();
    } catch (error) {
      console.error("Error creating notification:", error);
      toast.error("Something went wrong! Try again later.");
    }
  };

  const handleNotificationSeen = async (notificationId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/notifications/mark-as-seen/${user._id}`,
        { notificationId }
      );
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as seen:", error);
      toast.error("Failed to mark notification as seen");
    }
  };

  const handleDeleteAllNotifications = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/notifications/delete-all`
      );
      toast.success("All notifications deleted successfully.");
      fetchNotifications();
    } catch (error) {
      console.error("Error deleting all notifications:", error);
      toast.error("Failed to delete all notifications");
    }
  };

  const handleDraftWelcomeLater = async () => {
    const draftWelcomeLaterbody = welcomeLaterBody.body;
    console.log("Welcome Later Body : ", draftWelcomeLaterbody);

    try {

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/welcomeAndExemptionLater/draftWelcomeLetter`,
        { draftWelcomeLaterbody }
      );
      console.log("response Draft: ", response);
      toast.success(response.data.message);
      setWelcomeLaterModel(false);

    } catch (error) {
      console.log("Welcome later errror", error);
      toast.error("Something went wrong! Try again later.");
    };

  };

  const handleCreateWelcomeLater = async () => {
    const welcomeLaterbody = welcomeLaterBody.body;
    console.log("Welcome Later Body : ", welcomeLaterbody);

    try {

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/welcomeAndExemptionLater/createWelcomeLetter`,
        { welcomeLaterbody }
      );
      console.log("response create: ", response);
      toast.success(response.data.message);
      setWelcomeLaterModel(false);

    } catch (error) {
      console.log("Welcome later errror", error);
      toast.error("Something went wrong! Try again later.");
    }
  }

  const handleDraftExemptionLater = async () => {
    const draftExemptionLaterbody = exemptionLaterBody.body;
    console.log(draftExemptionLaterbody);

    try {

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/welcomeAndExemptionLater/draftExemptionLater`,
        { draftExemptionLaterbody }
      );
      console.log("response Draft: ", response);
      toast.success(response.data.message);
      setExemptionLaterModel(false);

    } catch (error) {
      console.log("Exemption later errror", error);
      toast.error("Something went wrong! Try again later.");
    }

  }

  const handleCreateExemptionLater = async () => {
    const exemptionLaterbody = exemptionLaterBody.body;
    console.log(exemptionLaterbody);

    try {

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/welcomeAndExemptionLater/createExemptionLetter`,
        { exemptionLaterbody }
      );
      console.log("response create: ", response);
      toast.success(response.data.message);
      setExemptionLaterModel(false);

    } catch (error) {
      console.log("Exemption later errror", error);
      toast.error("Something went wrong! Try again later.");
    }
  }

  const fetchWelcomeAndExemptionLater = async () => {
    try {

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/welcomeAndExemptionLater/getWelcomeAndExemptionLater`
      );
      console.log(response);
      setwelcomeLaterBody({
        body: response?.data?.data?.welcomeLetterBody
      });
      setExemptionLaterBody({
        body: response?.data?.data?.exemptionCertificateBody
      });
      setLaterBody(response?.data?.data);

    } catch (error) {
      console.log("Welcome later errror", error);
      toast.error("Something went wrong! Try again later.");
    }
  }

  return (
    <div className="px-3">
      <div className="dashboardContentPanel h-auto">
        <div className="notificationContent">
          <div className="subheader flex justify-between mr-5">
            <h4>Notification Update</h4>
            {user.role === "admin" && (
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2"
                  onClick={() => setSendNotificationsModal(true)}
                >
                  Send Notifications
                </button>
                <button
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                  onClick={handleDeleteAllNotifications}
                >
                  Delete All Notifications
                </button>
              </div>
            )}
          </div>

          <div className="subheader flex justify-between mr-5">
            {user.role === "admin" && <h4>Create Welcome and Exemption Letter</h4>}
            {user.role === "admin" && (
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2"
                  onClick={() => setWelcomeLaterModel(true)}
                >
                  Create Welcome Letter
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  onClick={() => setExemptionLaterModel(true)}
                >
                  Create Exemption Letter
                </button>
              </div>
            )}
            <Modal
              open={welcomeLaterModel}
              onClose={() => {
                setModuleCreateModalOpen(false);
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className="rounded-lg"
            >
              <Box
                className={`
                  fixed
                  top-1/2
                  left-1/2
                  transform -translate-x-1/2   -translate-y-1/2 
                  w-[75%] md:w-2/4 h-[80%] md:h-auto /* Adjust height */
                  bg-white
                  border border-black
                  shadow-md
                  p-4
    `}
              >
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Enter Welcome Later Body
                </Typography>
                <ReactQuill
                  className="w-full !text-black"
                  id="outlined-basic"
                  value={welcomeLaterBody.body}
                  onChange={(value) =>
                    setwelcomeLaterBody({
                      ...welcomeLaterBody,
                      body: value,
                    })
                  }
                  theme="snow"
                  modules={quillModules}
                  formats={formats}
                />

                {/* Styling for only the text area */}
                <style jsx>{`
                            .ql-container {
                              color: #000000;
                              height: 300px; /* Set fixed height for the editor */
                            }
                            .ql-editor {
                              height: 100%;
                              overflow-y: auto; /* Scrollable text area */
                            }
                `}</style>

                <div className="flex w-full justify-end items-center mt-3">
                  <Button
                    style={{ marginRight: "5px" }}
                    variant="contained"
                    onClick={handleDraftWelcomeLater}
                  >
                    Save Draft
                  </Button>
                  <Button
                    style={{ marginRight: "5px" }}
                    variant="contained"
                    onClick={handleCreateWelcomeLater}
                  >
                    Create
                  </Button>
                  <Button
                    style={{ marginLeft: "5px" }}
                    variant="contained"
                    onClick={() => setWelcomeLaterModel(false)}
                  >
                    Close
                  </Button>
                </div>
              </Box>
            </Modal>
            <Modal
              open={exemptedLaterModel}
              onClose={() => {
                setModuleCreateModalOpen(false);
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className="rounded-lg"
            >
              <Box
                className={`
                fixed
                top-1/2
                left-1/2
                transform -translate-x-1/2 -translate-y-1/2
                w-[75%] md:w-2/4 h-[80%] md:h-auto /* Adjust height */
                bg-white
                border border-black
                shadow-md
                p-4
    `}
              >
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Enter Exemption Later Body
                </Typography>

                <ReactQuill
                  className="w-full !text-black"
                  id="outlined-basic"
                  value={exemptionLaterBody.body}
                  onChange={(value) =>
                    setExemptionLaterBody({
                      ...exemptionLaterBody,
                      body: value,
                    })
                  }
                  theme="snow"
                  modules={quillModules}
                  formats={formats}
                />

                {/* Styling for only the text area */}
                <style jsx>{`
                            .ql-container {
                              color: #000000;
                              height: 300px; /* Set fixed height for the editor */
                            }
                            .ql-editor {
                              height: 100%;
                              overflow-y: auto; /* Scrollable text area */
                            }
                `}</style>

                <div className="flex w-full justify-end items-center mt-3">
                  <Button
                    style={{ marginRight: "5px" }}
                    variant="contained"
                    onClick={handleDraftExemptionLater}
                  >
                    Save Draft
                  </Button>
                  <Button
                    style={{ marginRight: "5px" }}
                    variant="contained"
                    onClick={handleCreateExemptionLater}
                  >
                    Create
                  </Button>
                  <Button
                    style={{ marginLeft: "5px" }}
                    variant="contained"
                    onClick={() => setExemptionLaterModel(false)}
                  >
                    Close
                  </Button>
                </div>
              </Box>
            </Modal>

          </div>

          <div className="rounded my-3 overflow-hidden mx-auto shadow-md w-4/5">
            <div className="px-6 py-4 flex items-center justify-between border-b">
              <div className="font-bold text-xl mb-2">Welcome Letter</div>
              <div className="flex items-center justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2"
                  onClick={() =>
                    ViewWelcomeLetter(
                      userDetails?.firstname,
                      userDetails?.spiritualname,
                      userDetails?.lastname,
                      userDetails?.joiningDate ||userDetails?.createdAt,
                      laterBody?.welcomeLetterBody
                    )
                  }
                >
                  View Letter
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  onClick={() =>
                    generateWelcomeCertificate(
                      userDetails?.firstname,
                      userDetails?.spiritualname,
                      userDetails?.lastname,
                      userDetails?.joiningDate ||userDetails?.createdAt,
                      laterBody?.welcomeLetterBody
                    )
                  }
                >
                  Download
                </button>
              </div>
            </div>
          </div>

          <div className="rounded my-3 overflow-hidden mx-auto shadow-md w-4/5">
            <div className="px-6 py-4 flex items-center justify-between border-b">
              <div className="font-bold text-xl mb-2">Exemption Letter</div>
              <div className="flex items-center justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2"
                  onClick={() =>
                    ViewExemptionLetter(
                      userDetails?.firstname,
                      userDetails?.spiritualname,
                      userDetails?.lastname,
                      userDetails?.joiningDate ||userDetails?.createdAt,
                      laterBody?.exemptionCertificateBody
                    )
                  }
                >
                  View Letter
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  onClick={() =>
                    generateExemptionLetter(
                      userDetails?.firstname,
                      userDetails?.spiritualname,
                      userDetails?.lastname,
                      userDetails?.joiningDate ||userDetails?.createdAt,
                      laterBody?.exemptionCertificateBody
                    )
                  }
                >
                  Download
                </button>
              </div>
            </div>
          </div>

          {notifications.map((notification) => (
            <div
              key={notification._id}
              className="rounded my-3 overflow-hidden mx-auto shadow-md w-4/5"
            >
              <div className="px-6 py-4 flex items-center justify-between border-b">
                <div>
                  <div className="font-bold text-xl mb-2">
                    {notification.notificationTitle}
                  </div>
                  <div
                    className="text-gray-700 text-base"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        notification.notificationContent
                      ),
                    }}
                  />
                </div>
                {!notification.isSeen && (
                  <button
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    onClick={() => handleNotificationSeen(notification._id)}
                  >
                    Mark as Seen
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {user.role === "admin" && (
        <Modal
          open={sendNotificationsModal}
          onClose={() => setSendNotificationsModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="rounded-lg"
        >
          <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[75%] md:w-2/4 h-full md:h-auto bg-white border border-black shadow-md p-4 flex flex-col">
            <Typography variant="h6" className="text-gray-600">
              Enter Notification Title
            </Typography>
            <TextField
              className="w-full mb-3"
              label="Notification Title"
              variant="outlined"
              onChange={(e) => setNotificationTitle(e.target.value)}
              value={notificationTitle}
            />

            <Typography variant="h6" className="text-gray-600">
              Enter Notification Content
            </Typography>
            <ReactQuill
              className="w-full !text-black"
              id="outlined-basic"
              label="Course Letter Body"
              variant="outlined"
              multiline
              rows={5}
              fullWidth
              onChange={(content) => setNotificationContent(content)}
              value={notificationContent}
              theme="snow"
              modules={quillModules}
              formats={formats}
            />
            <div className="flex w-full justify-end items-center mt-3">
              <Button
                variant="contained"
                onClick={handleSendNotification}
                style={{ marginRight: "5px" }}
              >
                Send
              </Button>
              <Button
                variant="contained"
                onClick={() => setSendNotificationsModal(false)}
                style={{ marginLeft: "5px" }}
              >
                Close
              </Button>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Notification;
