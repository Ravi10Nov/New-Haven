

import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useAuth } from "hooks/useAuth";
import axios from "config/axios";
import { useHistory } from "react-router-dom";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { user } = useAuth();
    const history = useHistory();

    const user_id = user?._id;
    const role = user?.role;

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("New password and confirmation do not match.");
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/changes/change-password`,
                {
                    user_id: user_id,
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword,
                }
            );

            if (response.data.success) {
                toast.success("Password changed successfully!");
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setTimeout(() => {
                    if (role === "admin") {
                        history.push("/admins");
                    } else if (role === "user") {
                        history.push("/user-dashboard");
                    } else {
                        history.push("/instructors");
                    };
                }, 3000)
            }
        } catch (err) {
            console.error("Error changing password:", err);
            if (err.response && err.response.data.error) {
                toast.error(err.response.data.error);
            } else {
                toast.error("Something went wrong. Please try again later.");
            }
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 400,
                margin: "auto",
                mt: 4,
                p: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Password
            </Typography>
            <form onSubmit={handleChangePasswordSubmit}>
                <TextField
                    label="Old Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePasswordVisibility}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePasswordVisibility}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Confirm New Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePasswordVisibility}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Change Password
                </Button>
            </form>
        </Box>
    );
};

export default ChangePassword;
