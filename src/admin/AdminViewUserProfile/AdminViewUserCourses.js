import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import { FormControl, Select, MenuItem } from "@mui/material";
import Chip from "@material-ui/core/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Loader from "components/Loader";
import { toast } from "react-toastify";

import { useAuth } from "hooks/useAuth";
import { useCourse } from "hooks/useCourse";
import axios from "config/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AdminViewUserCourses({ url }) {
  const { user } = useAuth();
  const { userId } = useParams();

  const [completedCourses, setCompletedCourses] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const [otherCourses, setOtherCourses] = useState(null);
  const [coursesFilter, setCoursesFilter] = useState("completed");
  const [isUserEnrolled, setIsUserEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEnrollUserInCourse = async (courseId) => {
    try {
      const response = axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/enroll/${courseId}`,
        { userId }
      );
      toast.success("User was successfully enrolled in the course");
      setIsUserEnrolled(!isUserEnrolled);
    } catch (error) {}
  };

  const handleCoursesFilter = (event) => {
    const selectedFilter = event.target.value;
    setCoursesFilter(selectedFilter);
  };

  const fetchBundles = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/coursebundle/?publishedStatus=published`
    );
    if (response.data.success) {
      setNewBundles(response.data.courseBundles);
    }
  };

  const fetch = async () => {
    setIsLoading(true);
    // Fetching all enrolled courses
    let response1 = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/enrolled/${userId}`
    );
    const enrolledCourses = response1.data.enrolledCourses;
    setEnrolledCourses(enrolledCourses);

    // Fetching all completed courses
    let response2 = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/coursecompletion/passedCourses/${userId}`
    );

    let completed = [];
    if (response2.data && Array.isArray(response2.data.courses)) {
      for (let i = 0; i < response2.data.courses.length; i++) {
        const course = response2.data.courses[i];
        if (course) {
          completed.push(course);
        } else {
          console.log(`Course at index ${i} is missing courseId:`, course);
        }
      }
    } else {
      console.log("No courses found or incorrect data structure.");
    }
    setCompletedCourses(completed);

    // Fetching other courses
    let response3 = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/?publishedStatus=all&courseType=individual`
    );

    const allCourses = response3.data.courses;
    const enrolled = response1.data.enrolledCourses;

    console.log("completed courses:");
    console.log(completed);

    let otherCourses = allCourses.filter((course) => {
      return (
        !enrolled.some((enrolledCourse) => enrolledCourse._id === course._id) &&
        !completed.some((completedCourse) => completedCourse._id === course._id)
      );
    });

    console.log(otherCourses);

    setOtherCourses(otherCourses);
    setIsLoading(false);
  };

  console.log("completedCourses: ",completedCourses)

  useEffect(() => {
    fetch();
  }, [isUserEnrolled]);

  if (!isLoading) {
    return (
      <div style={{ backgroundColor: "white" }}>
        {/* Display courses */}
        <div className="flex flex-col items-center justify-center mt-8">
          <Typography variant="h4" className="mt-2 mb-2 w-4/5">
            User Courses Details
          </Typography>

          {/* Filter Course */}
          <div className="w-4/5 flex justify-end mb-3">
            <FormControl>
              <Select
                value={coursesFilter}
                onChange={handleCoursesFilter}
                displayEmpty
                inputProps={{ "aria-label": "Select Filter" }}
              >
                <MenuItem value="completed">Completed Courses</MenuItem>
                <MenuItem value="enrolled">Ongoing Courses</MenuItem>
                <MenuItem value="other">Not Enrolled Courses</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* Filter Course */}

          {coursesFilter === "completed" && (
            <div className="flex flex-col justify-center items-center w-full">
              {completedCourses?.map((course) => (
                <Card key={course._id} className="w-[80%] rounded-xl mt-2 mb-2">
                  <CardContent>
                    <div className="flex justify-between items-center  ">
                      <Typography variant="h5" component="h2">
                        {course.title}
                      </Typography>

                      <Chip
                        label={course.dateOfCompletion}
                        color="success"
                        variant="outlined"
                        className="italic mr-2"
                      />
                    </div>

                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {coursesFilter === "enrolled" && (
            <div className="flex flex-col justify-center items-center w-full">
              {enrolledCourses?.map((course) => (
                <Card key={course._id} className="w-[80%] rounded-xl mt-2 mb-2">
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {course.title}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {coursesFilter === "other" && (
            <div className="flex flex-col justify-center items-center w-full">
              {otherCourses?.map((course) => (
                <Card key={course._id} className="w-[80%] rounded-xl mt-2 mb-2">
                  <CardContent>
                    {" "}
                    <div className="flex justify-between my-2">
                      <Typography variant="h5" component="h2">
                        {course.title}
                      </Typography>

                      <button
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2"
                        onClick={() => {
                          handleEnrollUserInCourse(course._id);
                        }}
                      >
                        Enroll in Course
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
}
