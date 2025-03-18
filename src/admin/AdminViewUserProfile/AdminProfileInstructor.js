import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

import "./AdminProfileInstructor.css";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import {
  adminUserUpdate,
  getUserCreatedCourses,
  getUserDetails,
} from "services/userService";
import { getImagePath } from "services/imageService";
import Button from "@mui/material/Button";

import { UseSearchQuery } from "hooks/useSearchQuery";
import { PaginationComponent } from "features/courses/components/Paginitation";
import { EnhancedTable } from "components/SmartTable/SmartTable";
import { getPerchauseCourses } from "services/transactionService";
import { dayMonthYear } from "helpers/Date";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";

const UsersOwnedCoursesHistoryTable = ({ userId, url }) => {
  const {
    search,
    bindFormValue,
    setOrderByField,
    sortingOrder,
    setCount,
    setPage,
  } = UseSearchQuery();
  // const [ isLoading, setIsLoading ] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [rows, setRows] = useState([]);

  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    if (search) {
      initData();
    }
  }, [search]);

  const initData = async () => {
    const response = await getPerchauseCourses(userId, search);

    setRows(response.data.data || []);
    setTotalEntries(response.data.totalCount || 0);
    setIsLoading(false);
  };

  const headers = [
    { label: "Course Name", id: "perchaused_item", align: "start" },
    {
      label: "Name",
      id: "createdAt",
      formattingCallback: dayMonthYear,
      align: "start",
    },
    {
      label: "Amount",
      id: "amount",
      defaultValue: "0",
      additional_text: "$",
      align: "start",
    },
    { label: "Payment Method", id: "payment_method", defaultValue: "Paypal" },
  ];

  if (!isLoading)
    return (
      <div className="w-100">
        <div className="container-fluid">
          <div className="AdminDashboardContentPanel">
            <EnhancedTable
              url={url}
              headers={headers}
              rows={rows}
              setOrderOnParent={(state) => {
                sortingOrder(state.order);
                setOrderByField(state.orderBy);
              }}
            />

            <PaginationComponent
              initTotalEntries={totalEntries}
              initItemsPerPageCount={5}
              initPageNumber={1}
              setParamsOnParent={({ page, itemsPerPageCount }) => {
                setPage(page);
                setCount(itemsPerPageCount);
              }}
            ></PaginationComponent>
          </div>
        </div>
      </div>
    );
  else {
    return <div>Loading.....</div>;
  }
};

const UsersCreatedCoursesHistoryTable = ({ userId, url }) => {
  const {
    search,
    bindFormValue,
    setOrderByField,
    sortingOrder,
    setCount,
    setPage,
  } = UseSearchQuery();
  // const [ isLoading, setIsLoading ] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [rows, setRows] = useState([]);

  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    if (search) {
      initData();
    }
  }, [search]);

  const initData = async () => {
    const response = await getUserCreatedCourses(userId, search);

    setRows(response.data.data || []);
    setTotalEntries(response.data.totalCount || 0);
    setIsLoading(false);
  };

  const returnStatus = (coursesStatus) => {
    console.log(coursesStatus);
    return coursesStatus ? "Available" : "Drafted";
  };

  const headers = [
    { label: "Course Name", id: "name", align: "start" },
    {
      label: "Date",
      id: "createdAt",
      formattingCallback: dayMonthYear,
      align: "start",
    },
    {
      label: "Amount",
      id: "amount",
      defaultValue: "0",
      additional_text: "$",
      align: "start",
    },
    { label: "status", id: "isLive", formattingCallback: returnStatus },
  ];

  if (!isLoading)
    return (
      <div className="w-100">
        <div className="container-fluid">
          <div className="AdminDashboardContentPanel">
            <EnhancedTable
              url={url}
              headers={headers}
              rows={rows}
              setOrderOnParent={(state) => {
                sortingOrder(state.order);
                setOrderByField(state.orderBy);
              }}
            />

            <PaginationComponent
              initTotalEntries={totalEntries}
              initItemsPerPageCount={5}
              initPageNumber={1}
              setParamsOnParent={({ page, itemsPerPageCount }) => {
                setPage(page);
                setCount(itemsPerPageCount);
              }}
            ></PaginationComponent>
          </div>
        </div>
      </div>
    );
  else {
    return <div>Loading.....</div>;
  }
};

const NormalFormValue = ({ value, fieldName, label }) => {
  return (
    <div className="col-lg-6 col-md-6 col-sm-6 !mt-8 !max-w-[420px]">
      <div className={`row first_name`}>
        <label className={`!min-w-[180px]`}> {label} </label>
        <input
          type="text"
          id={fieldName}
          name={fieldName}
          disabled={true}
          value={value}
        />
      </div>
    </div>
  );
};

const AdminProfileInstructor = ({ url, role }) => {
  // const [ isLoading, setIsLoading ] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [adminNote, setAdminNote] = useState(null);
  const [progressBarValue, setProgressBarBalue] = useState(0);
  const fieldsToShow = [
    "name",
    "middle_name",
    "last_name",
    "birth_date",
    "spirtual_name",
    "sex",
    "adresse_line_1",
    "adresse_line_2",
    "state",
    "city",
    "zip_code",
    "country",
    "phone_number",
    "email",
    "dralla_wallet_adress",
  ];

  const { userId } = useParams();

  useEffect(() => {
    initData(userId);
  }, []);
  const history = useHistory();

  const initData = async (userId) => {
    const response = await getUserDetails(userId);
    const imageBuffer = await getImagePath(response.data.data.details.image);
    const userDetailsBuffer = response.data.data.details;

    setAvatarImage(imageBuffer);
    setUserDetails(response.data.data.details);
    // setAdminNote(response.data.data.details.admin_note)
    // setSelectedRole(response.data.data.details.role);
    // const progressBar = Number(userDetailsBuffer.completed_courses_length) >= Number(Number(userDetailsBuffer.on_going_courses_length) + Number(userDetailsBuffer.completed_courses_length)) ? 100 : (Number( userDetailsBuffer.completed_courses_length ) /Number( userDetailsBuffer.completed_courses_length != 0 ? (Number(userDetailsBuffer.completed_courses_length) + Number(userDetailsBuffer.on_going_courses_length)) : Infinity) ) * 100
    // console.log(progressBar);
    // setProgressBarBalue(progressBar);

    setIsLoading(false);
  };

  const handleStatusChange = (role) => {
    setSelectedRole(role);
  };

  const handleSaveButton = async () => {
    const data = { role: selectedRole, admin_note: adminNote };
    try {
      const response = await adminUserUpdate(userId, data);
      toast.success("Changes are successfully commited");
    } catch (error) {
      toast.error(
        "Something went wrong! Contact admin@spiritoftruthnativeamericanchurch.org with your specific change request."
      );
    }
  };

  const handleCancelButton = () => {
    console.log("cancled");
  };
  if (!isLoading) {
    return (
      <div className="admin_user_info_container mt-4 px-4">
        <div className="container admin_personal_info create_f_width">
          <h3 className="content_title con_title_cor_ad">
            Personal Information
          </h3>

          <div>
            <hr />
          </div>
          <div className="inner_admin_avatar_area">
            <div className="admin_avatar_parent">
              <div className="admin_avatar_img ">
                <img src={avatarImage} alt="" />
                <div className="avatar_edit_button">
                  <button>
                    <i className="fas fa-pen-to-square"></i>
                  </button>
                </div>
              </div>
              <div className="admin_avatar_text my-auto">
                <h3>{userDetails.last_name + " " + userDetails.name}</h3>
                <p>
                  {userDetails.completed_courses_length} Completed Courses .{" "}
                  {userDetails.on_going_courses_length} Course In Progress
                </p>
                <button>
                  {userDetails.role == "Instructor"
                    ? "Instructor"
                    : userDetails.role == "admin"
                    ? "Admin"
                    : "Member"}
                </button>
              </div>
            </div>
            <div className="admin_progress">
              <ProgressBar variant="success" now={progressBarValue} />
              <div className="progress_point">
                <p>
                  Completed {userDetails.completed_courses_length} Courses out
                  of{" "}
                  {Number(userDetails.completed_courses_length) +
                    Number(userDetails.on_going_courses_length)}
                  .
                </p>
                <h6>{progressBarValue}%</h6>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 col-sm-12 user_form">
              <form className="row mx-auto flex flex-row justify-between px-32">
                {fieldsToShow.map((formField) => {
                  if (formField == "birth_date") {
                    return (
                      <NormalFormValue
                        value={userDetails[formField]}
                        fieldName={`${formField.replace("_", " ")} `}
                        label={`${formField.replace("_", " ")} (yyyy-mm-dd)`}
                      >
                        {" "}
                      </NormalFormValue>
                    );
                  }

                  return (
                    <NormalFormValue
                      value={userDetails[formField]}
                      fieldName={`${formField.replace("_", " ")} `}
                      label={`${formField.replace("_", " ")} `}
                    >
                      {" "}
                    </NormalFormValue>
                  );
                })}

                {role == "instructor" || (
                  <>
                    <div className="col-lg-6 col-md-6 col-sm-6 !mt-8 !max-w-[420px]">
                      <div className="row ">
                        <label htmlFor="notes">Change Privilege</label>
                        <PopupState variant="popover" popupId="demo-popup-menu">
                          {(popupState) => (
                            <React.Fragment>
                              <Box textAlign="start">
                                {selectedRole != "admin" || (
                                  <Button
                                    {...bindTrigger(popupState)}
                                    variant="contained"
                                    sx={{ margin: "auto" }}
                                    color={"error"}
                                  >
                                    {" "}
                                    Admin{" "}
                                  </Button>
                                )}
                                {selectedRole != "instructor" || (
                                  <Button
                                    {...bindTrigger(popupState)}
                                    variant="contained"
                                    sx={{ margin: "auto" }}
                                    color={"warning"}
                                  >
                                    {" "}
                                    Instructor{" "}
                                  </Button>
                                )}
                                {selectedRole != "member" || (
                                  <Button
                                    {...bindTrigger(popupState)}
                                    variant="contained"
                                    sx={{ margin: "auto" }}
                                    color={"success"}
                                  >
                                    {" "}
                                    Member{" "}
                                  </Button>
                                )}
                              </Box>
                              <Menu {...bindMenu(popupState)}>
                                <MenuItem
                                  onClick={() => {
                                    handleStatusChange("admin");
                                    popupState.close();
                                  }}
                                >
                                  Admin
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    handleStatusChange("instructor");
                                    popupState.close();
                                  }}
                                >
                                  {" "}
                                  Instructor
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    handleStatusChange("member");
                                    popupState.close();
                                  }}
                                >
                                  Member
                                </MenuItem>
                              </Menu>
                            </React.Fragment>
                          )}
                        </PopupState>
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12 inputs_group me-0 adm_text_full">
                      <div className="row user_country">
                        <label htmlFor="notes">Notes</label>
                        <textarea
                          value={adminNote}
                          onChange={(event) => setAdminNote(event.target.value)}
                          class="form-control adm_max_w"
                          id="exampleFormControlTextarea1"
                          rows="3"
                        ></textarea>
                      </div>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>

          <div>
            <h3 className="api_hed mt-10">Course History</h3>
            <UsersOwnedCoursesHistoryTable userId={userId}>
              {" "}
            </UsersOwnedCoursesHistoryTable>
          </div>
          {role == "instructor" || (
            <div>
              <h3 className="api_hed">Created Courses History</h3>
              <UsersCreatedCoursesHistoryTable userId={userId}>
                {" "}
              </UsersCreatedCoursesHistoryTable>
            </div>
          )}
          {role == "instructor" || (
            <div>
              <Button
                onClick={handleSaveButton}
                className="instPro_CloseBtn m-3"
                variant="primary"
              >
                Save
              </Button>{" "}
              <Button
                onClick={handleCancelButton}
                className="instPro_CloseBtn m-3"
                variant="primary"
              >
                Cancel
              </Button>{" "}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <div>Loading.....</div>;
  }
};

export default AdminProfileInstructor;
