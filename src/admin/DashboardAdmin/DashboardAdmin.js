import React, {
  useEffect,
  useState,
  useCallback,
  Component,
  Profiler,
} from "react";
import "chartjs-adapter-moment";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { Chart } from "react-chartjs-2";

import { Card, Col, Row } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import "./DashboardAdmin.css";
import { UseSearchQuery } from "hooks/useSearchQuery";
import { EnhancedTable } from "components/SmartTable/SmartTable";
import { getStatsForAdmin, getUsersListForAdmin } from "services/userService";
import { StatsIndicator } from "components/StatsIndicator/StatsIndicator";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { TextField } from "../../../node_modules/@mui/material/index";

const constructDataValuesArray = (date, responseValues) => {
  const returnArray = [];
  const values = responseValues.map((item, index) => {
    console.log(item, index);
    return { x: item._id.createdAt, y: item.count };
  });

  if (values.length == 0) {
    let bufferDate = new Date(date).setHours(0, 0, 0, 0);
    values.unshift({ x: new Date(bufferDate), y: 0 });
    bufferDate = new Date(date).setHours(23, 0, 0, 0);
    values.push({ x: new Date(bufferDate), y: 0 });
    return values;
  }
  if (new Date(values[0].x).getHours() != 0) {
    const bufferDate = new Date(date).setHours(0, 0, 0, 0);
    values.unshift({ x: new Date(bufferDate), y: 0 });
  }

  if (new Date(values[values.length - 1].x).getHours() != 23) {
    const bufferDate = new Date(date).setHours(23, 0, 0, 0);
    values.push({ x: new Date(bufferDate), y: 0 });
  }

  return values;
};

function BasicDatePicker({ setChangedDateOnParent }) {
  const [selectedDate, handleDateChange] = useState(new Date());

  useEffect(() => {
    setChangedDateOnParent(selectedDate);
  }, [selectedDate]);
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DesktopDatePicker
        label="Date desktop"
        inputFormat="MM/DD/YYYY"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

function AdminChart({ initData, setSelectedDateOnParent }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState(initData);

  useEffect(() => {
    if (selectedDate) {
      setSelectedDateOnParent(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    console.log(initData);
    setData(initData);
  }, [initData]);
  return (
    // A react-chart hyper-responsively and continuusly fills the available
    // space of its parent element automatically
    <div className="p-10">
      <BasicDatePicker
        setChangedDateOnParent={setSelectedDate}
      ></BasicDatePicker>
      <Line
        data={data}
        options={{
          response: true,
          scales: {
            x: {
              type: "time",
              unit: "hour",
              display: 0,
              ticks: {
                min: "00",
                max: "23",
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}

const AdminUserListOne = ({ url }) => {
  const { search, setOrderByField, sortingOrder } = UseSearchQuery();
  const [isLoading, setIsLoading] = useState(true);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    initData();
  }, [search]);

  // console.log()
  const initData = async () => {
    const response = await getUsersListForAdmin(search);

    setRows(response.data.data);
    setIsLoading(false);
  };

  const headers = [
    { label: "User id", id: "_id", align: "start" },
    { label: "First Name", id: "name", align: "start" },
    { label: "Spiritual Name", id: "spirtual_name", align: "start" },
    { label: "City", id: "city", align: "start" },
    { label: "State", id: "state", align: "start" },
    {
      label: "Completed courses",
      id: "completed_courses_length",
      additional_text: "Courses Completed",
      align: "start",
    },
    { label: "Account status", id: "account_status", align: "start" },
    {
      label: "Completed courses",
      id: "completed_courses_length",
      additional_text: "Courses Completed",
      align: "start",
    },
  ];

  if (!isLoading)
    return (
      <div className="w-100">
        {
          // form here
        }

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
          </div>
        </div>
      </div>
    );
};

const DashboardAdmin = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [coursesStats, setCoursesStats] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);

  console.log("re rendred");
  useEffect(() => {
    if (selectedDate && firstLoad) {
      setFirstLoad(false);
    }
    if (selectedDate && !firstLoad) {
      initData(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    initData(`${new Date()}`);
  }, []);

  const initData = async (selectedDate) => {
    const response = await getStatsForAdmin(selectedDate);
    setCoursesStats(response.data.data.coursesStats);
    setUserStats(response.data.data.membersStatis);

    //const completionDataBuffer = constructDataValuesArray(selectedDate,response.data.data.completedCoursesGraphData);
    //
    //
    //const loginDataBuffer = constructDataValuesArray(selectedDate,response.data.data.loginGraphData);

    const loginDataBuffer = constructDataValuesArray(
      selectedDate,
      response.data.data.loginGraphData
    );

    const completionDataBuffer = constructDataValuesArray(
      selectedDate,
      response.data.data.completedCoursesGraphData
    );

    const dataBuffer = {
      datasets: [
        {
          fill: true,
          backgroundColor: "rgb(127,255,0)",
          borderColor: "rgb(127,255,0)",
          tension: 0.5,
          label: "Completion",
          borderWidth: "5",
          data: completionDataBuffer,
        },
        {
          fill: true,
          backgroundColor: "rgb(30,144,255)",
          borderColor: "rgb(30,144,255)",
          tension: 0.5,
          label: "Login",
          borderWidth: "5",
          data: loginDataBuffer,
        },
      ],
    };
    setData(dataBuffer);
    console.log(response.data);
    setIsLoading(false);
  };

  if (!isLoading) {
    return (
      <Profiler id="Navigation">
        <>
          <div className="dashboardContentPanel h-auto">
            <Row
              xs={1}
              md={3}
              className="gx-5 gy-3"
              style={{ marginTop: "26px", marginLeft: "5px" }}
            >
              <Col>
                <Card className="timeline_card">
                  <Card.Body>
                    <Card.Title className="timeline_title">
                      {coursesStats.completedCoursesCount}
                    </Card.Title>
                    <div className="timeline_parent">
                      <h6>Courses Completed</h6>

                      <StatsIndicator
                        indicatorValue={coursesStats.completedIndicator}
                      ></StatsIndicator>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col className="AdminDashboard_parent_col">
                <Card className="timeline_card" id="time_after">
                  <Card.Body>
                    <Card.Title className="timeline_title">
                      {coursesStats.onGoingCoursesCount}
                    </Card.Title>
                    <div className="timeline_parent">
                      <h6>Courses In Progress</h6>
                      <StatsIndicator
                        indicatorValue={coursesStats.onGoingndicator}
                      ></StatsIndicator>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="instructor_parent_col">
                <Card className="timeline_card" id="time_after">
                  <Card.Body>
                    <Card.Title className="timeline_title">
                      {userStats.registredMemebersCount}
                    </Card.Title>
                    <div className="timeline_parent">
                      <h6>Registred Members</h6>
                      <StatsIndicator
                        indicatorValue={userStats.membersIndicator}
                      ></StatsIndicator>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {/* Admin Chart area start */}
            <div className="AdminDashboardContentPanel mx-auto !w-[98%]">
              <div className="container-fluid  px-2 mt-5">
                <AdminChart
                  initData={data}
                  setSelectedDateOnParent={(state) => {
                    setSelectedDate(state);
                  }}
                />
              </div>
            </div>
            {/* Admin Chart area End */}
          </div>

          <div className="container-fluid">
            <div className="inner_timeline_progress pb-0">
              <div className="created_course created_course_ins">
                <h3>Newest Users</h3>
                <NavLink to={`${url}/users`}>
                  <button className="see_more_btn">
                    See More Users <i class="fa-solid fa-angle-right"></i>
                  </button>
                </NavLink>
              </div>
            </div>
            <AdminUserListOne></AdminUserListOne>
          </div>
        </>
      </Profiler>
    );
  }
};

export default DashboardAdmin;
