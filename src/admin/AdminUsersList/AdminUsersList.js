import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";

import "./AdminUserList.scss";

import { UseSearchQuery } from "hooks/useSearchQuery";
import { PaginationComponent } from "features/courses/components/Paginitation";
import { EnhancedTable } from "components/SmartTable/SmartTable";
import { getUsersListForAdmin } from "services/userService";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { dayMonthYear } from "helpers/Date";

const AdminUserListOne = ({ url }) => {
  const [values, setValues] = useState();

  const {
    search,
    bindFormValue,
    setOrderByField,
    sortingOrder,
    setCount,
    setPage,
  } = UseSearchQuery();

  const [orderObject, setOrderObject] = useState({
    order: null,
    orderBy: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const [rows, setRows] = useState([]);

  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    if (search) {
      initData();
    }
  }, [search]);

  const initData = async () => {
    const response = await getUsersListForAdmin(search);

    setRows(response.data.data);
    setTotalEntries(response.data.totalCount);
    setIsLoading(false);
  };

  const renderDate = (field, row) => {
    return dayMonthYear(row[field]);
  };

  const headers = [
    { label: "User id", id: "_id", align: "start" },
    { label: "First Name", id: "name", align: "start" },
    { label: "Spiritual Name", id: "spiritual_name", align: "start" },
    { label: "City", id: "city", align: "start" },
    { label: "State", id: "state", align: "start" },
    { label: "Account status", id: "account_status", align: "start" },
    {
      label: "Join Date",
      id: "createdAt",
      formattingCallbackV2: renderDate,
      align: "start",
    },
    {
      label: "Completed courses",
      id: "completed_courses_length",
      additional_text: "Courses Completed",
      align: "start",
    },
  ];

  const handleShow = (event) => {
    event.preventDefault();
    const keys = Object.keys(values);

    for (const key of keys) {
      bindFormValue(key, values[key]);
    }
  };

  const handleChange = (prop) => (event) => {
    event.preventDefault();
    const name = prop;
    const value = event.target.value;
    const newObject = {};
    newObject[name] = value;

    setValues((current) => {
      return { ...current, ...newObject };
    });
  };

  if (!isLoading)
    return (
      <div className="w-100">
        {
          // form here
        }
        <div className="container-fluid">
          <div className="inner_AdminDashboard dashboardContentPanel h-auto">
            {/* form start */}

            <Form onSubmit={handleShow}>
              <Row xs={1} md={6}>
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label className="adminDashboard_selectTitle">
                    First Name
                  </Form.Label>
                  <Form.Control
                    onChange={handleChange("name")}
                    className="placeholder_resize"
                    placeholder="First Name"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label className="adminDashboard_selectTitle">
                    Last Name
                  </Form.Label>
                  <Form.Control
                    onChange={handleChange("last_name")}
                    className="placeholder_resize"
                    placeholder="Last Name"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridSpiritual">
                  <Form.Label className="adminDashboard_selectTitle">
                    Spiritual Name
                  </Form.Label>
                  <Form.Control
                    onChange={handleChange("spiritual_name")}
                    className="placeholder_resize"
                    placeholder="Spiritual Name"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label className="adminDashboard_selectTitle">
                    Email
                  </Form.Label>
                  <Form.Control
                    onChange={handleChange("email")}
                    className="placeholder_resize"
                    placeholder="Email"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridNumber">
                  <Form.Label className="adminDashboard_selectTitle">
                    Telephone Number
                  </Form.Label>
                  <Form.Control
                    onChange={handleChange("phone_number")}
                    className="placeholder_resize"
                    placeholder="Telephone Number"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label className="adminDashboard_selectTitle">
                    City
                  </Form.Label>
                  <Form.Control
                    onChange={handleChange("city")}
                    className="placeholder_resize"
                    placeholder="City"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState" className="pt-2">
                  <Form.Label className="adminDashboard_selectTitle">
                    State
                  </Form.Label>
                  <Form.Control
                    onChange={handleChange("state")}
                    className="placeholder_resize"
                    placeholder="State"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState" className="pt-2">
                  <Form.Label className="adminDashboard_selectTitle">
                    Country
                  </Form.Label>
                  <Form.Control
                    onChange={handleChange("country")}
                    className="placeholder_resize"
                    placeholder="Country"
                  />
                </Form.Group>
              </Row>

              <button type={"submit"} id="adminFormBtn">
                SHOW
              </button>
            </Form>

            {/* form end */}
          </div>
        </div>

        <div className="container-fluid">
          <div className="AdminDashboardContentPanel">
            <EnhancedTable
              url={url}
              tableName={"User list"}
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
};

export default AdminUserListOne;
