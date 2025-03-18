import axios from "config/axios";
import { useEffect, useState } from "react";
import { EnhancedTable } from "../components/SmartTable/SmartTable"; // Assuming your smart table is named SmartTable.js
import dayjs from "dayjs";
import { Button } from "@mui/material";

const UnverifiedEmails = ({ url }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUnverifiedUsers();
    }, []);

    const fetchUnverifiedUsers = async () => {
        const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/users/unverified-emails`;
        try {
            const response = await axios.get(apiUrl);
            setUsers(response.data.data || []);
        } catch (error) {
            console.error("Error fetching unverified users:", error);
        }
    };

    //   const handleDelete = async (userId) => {
    //     const deleteUrl = `${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`;
    //     try {
    //       await axios.delete(deleteUrl);
    //       setUsers(users.filter(user => user._id !== userId)); // Remove deleted user from state
    //     } catch (error) {
    //       console.error("Error deleting user:", error);
    //     }
    //   };

    const handleDelete = async (userId) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/delete/unverified-emails`, { userId });

            if (response.data.status === "success") {
                setUsers(users.filter(user => user._id !== userId)); // Remove from UI
            } else {
                console.error("Error deleting user:", response.data.message);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };


    const headers = [
        { id: "email", label: "Email", align: "left" },
        { id: "isEmailVerified", label: "Is Email Verified", align: "left" },
        { id: "createdAt", label: "Created Date", align: "left" },
        { id: "daysSinceCreation", label: "Days Since Created", align: "left" },
        { id: "action", label: "Action", align: "center", dontUseForOrder: true },
    ];

    const processedRows = users.map(user => ({
        id: user._id,
        email: user.email,
        isEmailVerified: user.isEmailVerified ? "Yes" : "No",
        createdAt: dayjs(user.createdAt).format("YYYY-MM-DD"),
        daysSinceCreation: dayjs().diff(user.createdAt, "day") + " days",
        action: (
            <Button variant="contained" color="error" onClick={() => handleDelete(user._id)}>
                Delete
            </Button>
        ),
    }));

    return (
        <EnhancedTable
            url={url}
            headers={headers}
            rows={processedRows}
            tableName="Unverified Emails"
            defaultOrder="createdAt"
            actions={() => { }}
            startIndex={1}
            endIndex={processedRows.length}
        />
    );
};

export default UnverifiedEmails;
