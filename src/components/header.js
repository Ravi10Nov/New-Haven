import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Badge, Button ,Switch ,TextField } from "@mui/material";
import { ContextApi } from "contexts/ContextProvider";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
import { getImagePath } from "services/imageService";
import useContexts from "../hooks/useContexts";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

import "./header.css";
import { toast } from "react-toastify";
import { logOut } from "services/userService";
import AuthContext from "contexts/AuthContext";
import { useAuth } from "hooks/useAuth";
import axios from "config/axios";
import Directory from "screens/Directory";

const ProfileMenuOptions = ({ url }) => {
  const [open, setOpen] = React.useState(false);
  // const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const contextApi = useContext(ContextApi);
  const { user } = useAuth();

  const anchorRef = React.useRef(null);
  const history = useHistory();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // useEffect(() => {
  //   // Assume that isTwoFactorEnabled is stored in the user object
  //   if (user?.role === 'admin') {
  //     setIsTwoFactorEnabled(user?.isTwoFactorEnabled); // Set the 2FA status based on user data
  //   }
  // }, [user]);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleProfile = (event) => {
    history.push(`${url}/profile`);
    event.preventDefault();
  };
  // const handleClickIdCard = (event) => {
  //   history.push(`${url}/ID-CARD`);
  //   event.preventDefault();
  // };
  const handleLogOut = async (event) => {
    try {
      // const response = await logOut();
      // contextApi.destroyContext();
      history.push("/Signin");
      window.location.reload();
      toast.succes("you logged out successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleToggle2FA = async () => {
    try {
      const response = await axios.post('/api/auth/update-2fa', {
        userId: user._id,
        isTwoFactorEnabled: !isTwoFactorEnabled, 
      });
  
      if (response.data.success) {
        setIsTwoFactorEnabled(response.data.isTwoFactorEnabled);
        toast.success(isTwoFactorEnabled ? '2FA Disabled' : '2FA Enabled');
      }
    } catch (error) {
      toast.error('Error toggling 2FA');
    }
  };

  return (
    <div className="mx-2">
      <a
        ref={anchorRef}
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        id="composition-button"
        aria-expanded="true"
        role="button"
        class="dropdown-toggle nav-link"
        tabindex="0"
        href="#"
      ></a>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper className={"z-[10000]"}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  disablePortal
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  {/* <MenuItem onClick={handleClickIdCard}>ID Card</MenuItem> */}
                  <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                  <NavLink to={`${url}/changePassword`}>
                    <MenuItem>Password</MenuItem>
                  </NavLink>
                  {/* {user?.role === 'admin' && (
                    <MenuItem onClick={handleToggle2FA}>
                      {isTwoFactorEnabled ? 'Disable Google Authenticator' : 'Enable Google Authenticator'}
                    </MenuItem>
                  )} */}
                  {user?.role === 'admin' && (
                    <NavLink to={`${url}/setup-2fa`}>
                    <MenuItem>Authenticator QR</MenuItem>
                  </NavLink>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
const Header = ({ title, sub, role, url, course }) => {
  const { user } = useAuth();
  const context = useContext(ContextApi);
  const { isSideBarOpen, setSidebarOpen } = useContexts();
  const [isGettingImage, setIsGettingImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  const fetchNotificationCount = async () => {
    if (!user?._id) {
      console.log("User ID not available");
      return;
    }

    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/notifications/unseen-count/${user._id}`;

      const response = await axios.get(url);

      setNotificationCount(response.data.count);
    } catch (error) {
      console.error("Error fetching notification count:", error);
    }
  };

  useEffect(() => {
    fetchNotificationCount();
  }, [fetchNotificationCount]);
  if (!isLoading) {
    return (
      <div className="header container">
        <div className="title head_title_none">
          <h4
            className="header_notification"
            style={{ color: "#0A376E", fontSize: "24px", fontWeight: 400 }}
          >
            {title}
          </h4>
          <p style={{ color: "#8C8C8C", fontSize: "14px", fontWeight: 400 }}>
            {sub}
          </p>
        </div>

        <div className="hamburger_menu">
          <Button onClick={() => setSidebarOpen(!isSideBarOpen)}>
            <span className="material-icons-outlined">
              {isSideBarOpen ? "close" : "menu"}
            </span>
          </Button>
        </div>

        <div className="searchbox">
          <div className="">
            <NavLink to={`${url}/Notifications`}>
              <div className="" id="alarm_parent">
                <Badge
                  badgeContent={notificationCount}
                  color="error"
                  variant="dot"
                  invisible={notificationCount === 0}
                >
                  <NotificationsNoneIcon className="alarm"></NotificationsNoneIcon>
                </Badge>
              </div>
            </NavLink>
          </div>
          <div className="mr-8">
            <NavLink to={`${url}/directory`}>
              <div >
                <h1>Directory</h1>
              </div>
            </NavLink>
          </div>
          <div className="avatar lg:min-w-[140px]">
            <ProfileMenuOptions url={url} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading......</div>;
  }
};

export default Header;
