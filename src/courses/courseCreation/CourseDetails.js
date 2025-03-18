import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "config/axios";
import ViewCourseInstructors from "./ViewCourseInstructors";
import AssignInstructors from "./AssignInstructors";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Loader from "components/Loader";
import { useAuth } from "hooks/useAuth";
import { toast } from "react-toastify";
const CourseDetails = ({ url, courseId }) => {
  const [courseDetails, setCourseDetails] = useState(null);
  const [assignedInstructors, setAssignedInstructors] = useState([]);
  const [otherInstructors, setOtherInstructors] = useState([]);
  const [courseCreator, setCourseCreator] = useState(null);
  const [isInstructorAssigned, setIsInstructorAssigned] = useState(false);
  const [testCreateModalOpen, setTestCreateModalOpen] = useState(false);
  const [testTitle, setTestTitle] = useState("");
  const [passPercentage, setPassPercentage] = React.useState(80);
  const [testId, setTestId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [instructorsViewModalOpen, setInstructorsViewModalOpen] =
    React.useState(false);

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

  const { user } = useAuth();

  const fetchAssignedInstructors = async (instructorIds) => {
    const instructorsDetails = [];

    try {
      for (const instructorId of instructorIds) {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/instructors/profiles/${instructorId}`
        );

        const instructorDetail = response.data.instructor;
        instructorsDetails.push(instructorDetail);
      }

      return instructorsDetails;
    } catch (error) {
      console.error("Error fetching instructor details:", error);
      return [];
    }
  };

  const getCourseCreator = async (creatorId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/users/${creatorId}`
      );
      if (response.data.success) return response.data.user;
      return null;
    } catch (error) {
      console.error("Error fetching instructor details:", error);
      return null;
    }
  };

  const getOtherInstructors = async (assignedinstructors) => {
    let others = [];
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/instructors/profiles`
      );

      const totalInstructors = response.data.instructorProfiles;

      // Filtering out instructors who are not in assignedInstructors
      totalInstructors.forEach((instructor) => {
        let flag = false;
        for (const assigned of assignedinstructors) {
          if (instructor._id === assigned._id) {
            flag = true;
            break;
          }
        }
        if (!flag) others.push(instructor);
      });

      return others;
    } catch (error) {
      console.error("Error fetching instructor details:", error);
      return [];
    }
  };

  const handleTestTitleChange = (e) => {
    setTestTitle(e.target.value);
  };

  const handleTestCreate = async () => {
    try {
      setIsLoading(true);

      if (passPercentage < 0 || passPercentage > 100) {
        toast.error("Percentage shoould be between 0 and 100");

        setIsLoading(false);
        return;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/test/create`,
        {
          title: testTitle,
          creatorId: user._id,
          courseId: courseId,
          passPercentage: passPercentage,
        }
      );
      // console.log("Response:", response.data);
      setTestId(response.data.test._id);
      setTestCreateModalOpen(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchCourseDetails = async () => {
    try {
      setIsLoading(true);
      //fetching course details
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/${courseId}`
      );

      const course = response.data.course;
      setCourseDetails(course);

      //Fetching course instructors

      const assignedinstructors = await fetchAssignedInstructors(
        course.instructors
      );

      setAssignedInstructors(assignedinstructors);
      //Fetching course creator
      const creator = await getCourseCreator(course.creatorId);
      setCourseCreator(creator);

      //Fetching other instructors
      const otherinstructors = await getOtherInstructors(assignedinstructors);
      setOtherInstructors(otherinstructors);

      //Fetching course Test
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/test/get-by-course/${courseId}`
      );
      if (res.data.success) {
        setTestId(res.data.test._id);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

  const handlePassPercentageChange = (e) => {
    setPassPercentage(e.target.value);
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [isInstructorAssigned]);

  if (!isLoading) {
    return (
      <div className="bg-white flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Course Details
        </h2>

        <div className="rounded overflow-hidden shadow-lg w-4/5">
          <div className="px-6 py-4 flex items-center justify-between border-b">
            <div className="flex flex-col items-start justify-center">
              {courseDetails && (
                <div className="font-bold text-xl mb-2">
                  Course Title : {courseDetails.title}
                </div>
              )}
              {courseCreator && (
                <div className="font-bold text-xl mb-2 italic">
                  Creator :{" "}
                  <span className="text-green-600">{courseCreator.email}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end">
              <button
                className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded mr-2"
                onClick={() => setInstructorsViewModalOpen(true)}
              >
                View Instructors
              </button>

              <ViewCourseInstructors
                assignedInstructors={assignedInstructors}
                instructorsViewModalOpen={instructorsViewModalOpen}
                setInstructorsViewModalOpen={setInstructorsViewModalOpen}
              />

              <AssignInstructors
                courseId={courseId}
                assignedInstructors={assignedInstructors}
                otherInstructors={otherInstructors}
                isInstructorAssigned={isInstructorAssigned}
                setIsInstructorAssigned={setIsInstructorAssigned}
              />

              {testId && (
                <Link to={`${url}/courses/${courseId}/test/${testId}`}>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2">
                    View Test
                  </button>
                </Link>
              )}

              {!testId && (
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2"
                  onClick={() => setTestCreateModalOpen(true)}
                >
                  Create Test
                </button>
              )}
              <Modal
                open={testCreateModalOpen}
                onClose={() => {
                  setTestCreateModalOpen(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="rounded-lg"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Enter Test Details
                  </Typography>

                  <TextField
                    className="w-full"
                    id="outlined-basic"
                    label="Test Title"
                    variant="outlined"
                    onChange={handleTestTitleChange}
                    value={testTitle}
                  />

                  <TextField
                    className="w-full mt-3"
                    id="outlined-basic"
                    label="Passing Percentage"
                    type="number"
                    variant="outlined"
                    onChange={handlePassPercentageChange}
                    value={passPercentage}
                  />

                  <div className="flex w-full justify-end items-center mt-3">
                    <Button
                      style={{ marginRight: "5px" }}
                      variant="contained"
                      onClick={handleTestCreate}
                    >
                      Create
                    </Button>
                    <Button
                      style={{ marginLeft: "5px" }}
                      variant="contained"
                      onClick={() => setTestCreateModalOpen(false)}
                    >
                      Close
                    </Button>
                  </div>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default CourseDetails;
