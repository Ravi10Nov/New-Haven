import React, { useContext, useState, useEffect } from "react";
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

// import { useCourse } from 'hooks/useCourse';
// import CourseContext from 'contexts/CourseContext';
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

export default function ViewCompletedCourses({ url }) {
  const { user } = useAuth();
  //   const {course} = useCourse();

  const [completedCourses, setCompletedCourses] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCompletedCourses = async () => {
    setIsLoading(true);
    let response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/coursecompletion/passedCourses/${user._id}`
    );
    console.log("response", response);
    console.log("response", response.data.courses);
    let completed = [];
    for (let i = 0; i < response.data.courses?.length; i++) {
      console.log(response.data.courses[i]);
      completed.push(response.data.courses[i]);
    }
    setCompletedCourses(completed);
    setIsLoading(false);
  };

  console.log("completedcourse", completedCourses);

  useEffect(() => {
    fetchCompletedCourses();
  }, []);

  if (!isLoading) {
    return (
      <div className="bg-white flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Completed Courses
        </h2>

        <div className="rounded overflow-hidden shadow-lg w-4/5">
          {completedCourses &&
            completedCourses?.length >= 1 &&
            completedCourses?.map((course) => (
              <div
                key={course?._id}
                className="px-6 py-4 flex items-center justify-between border-b"
              >
                {course?.title && (
                  <>
                    <div className="font-bold text-xl mb-2">
                      {course?.title}
                    </div>
                    <div className="flex items-center justify-end">
                      <Link
                        to={`${url}/courses/enrolled/${course?._id}/modules`}
                      >
                        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2">
                          View Course
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
}
