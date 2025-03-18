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
import { toast } from "react-toastify";
import Drala_Image from "../../../assets/Drala_Image.png";
import payment from "../../../assets/payment.PNG";

// import { useCourse } from 'hooks/useCourse';
// import CourseContext from 'contexts/CourseContext';
import { useAuth } from "hooks/useAuth";
import { useCourse } from "hooks/useCourse";
import axios from "config/axios";
import PayPalPayment from "components/paypal/PayPalPayment";

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

export default function ViewNewCourses({ url }) {
  const { user } = useAuth();
  //   const {course} = useCourse();

  const [newCourses, setNewCourses] = useState(null);
  const [newBundles, setNewBundles] = useState(null);
  const [coursesFilter, setCoursesFilter] = useState("all");
  const [isUserEnrolled, setIsUserEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openPaypal, setOpenPaypal] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentStart, setPaymentStart] = useState(false);
  const [currentCoursePrice, setCurrentCoursePrice] = useState(null);

  const handlePaypalSuccess = async () => {
    console.log("handle function");
    const response2 = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/paidEnroll/${courseId}`,
      { userId: user._id }
    );
    console.log("response2", response2);
    setOpenPaypal(false); // Close PayPal modal after successful payment
    if (response2.data.success) {
      toast.success(
        "Enrollment Successful! To begin the course visit the Your Courses section."
      );
      setIsUserEnrolled(!isUserEnrolled);
    }
  };

  useEffect(async () => {
    if (paymentSuccess) {
      await handlePaypalSuccess();
    }
  }, [paymentSuccess]);

  useEffect(() => {
    if (paymentStart) {
      setOpenPaypal(true);
    }
  }, [paymentStart]);

  const handleEnrollUserInCourse = async (courseId) => {
    try {
      const response1 = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/${courseId}`
      );
      console.log("response1", response1);
      const course = response1.data.course;

      if (course.isPaid) {
        console.log("course ud paid");
        setCourseId(courseId);
        setCurrentCoursePrice(course.coursePrice);
        setPaymentStart(true);
        return;
      }

      // setCourseId(course._id);
      // setIsPaid(course.isPaid);
      // if (course.isPaid) {
      //
      //   setOpenPaypal(true);
      //   handlePaypalSuccess();
      // }

      if (openPaypal === false || !course.isPaid) {
        const response3 = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/enroll/${courseId}`,
          { userId: user._id }
        );

        if (response3.data.success) {
          toast.success(
            "Enrollment Successful! To begin the course visit the Your Courses section."
          );
          setIsUserEnrolled(!isUserEnrolled);
        }
      }
    } catch (error) {
      console.log("couldnt enroll in the course", error);
      toast.error("Could not enroll in the course");
    }
  };

  const handleCoursesFilter = (event) => {
    const selectedFilter = event.target.value;
    setCoursesFilter(selectedFilter);
  };

  // const fetchBundles = async () =>{
  //   const response = await axios.get(
  //       `${process.env.REACT_APP_BACKEND_URL}/api/coursebundle/?publishedStatus=published`
  //   );
  //   if(response.data.success){
  //     setNewBundles(response.data.courseBundles);
  //   }
  // }

  const fetch = async () => {
    setIsLoading(true);
    // Fetching all published courses
    let response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/?publishedStatus=published`
    );
    console.log("intial response", response);
    const publishedCourses = response.data.courses;
    //getting the completed courses of the user
    response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/coursecompletion/passedCourses/${user._id}`
    );
    console.log("second", response);
    const completed = response.data.courses;
    console.log("completed coourses", completed);
    const completedCoursesIds = [];
    for (const comp of completed) {
      completedCoursesIds.push(comp?._id);
    }

    console.log("completed", completedCoursesIds);

    // filtering out courses whose prerequisites are completed
    let feasibleCourses = [];
    for (const course of publishedCourses) {
      let isfeasible = true;
      const prerequisites = course.prerequisiteCourses;
      for (const pre of prerequisites) {
        if (!completedCoursesIds.includes(pre)) {
          isfeasible = false;
          break;
        }
      }
      if (isfeasible) feasibleCourses.push(course);
    }

    //getting the enrolled courses
    response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/users/${user._id}`
    );
    const enrolledCoursesIds = response.data.user.coursesEnrolled;

    // newCourses = totalcourses - enrolled courses - completed courses
    const new_courses = feasibleCourses.filter((course) => {
      return (
        !enrolledCoursesIds.includes(course._id) &&
        !completedCoursesIds.includes(course._id)
      );
    });
    setNewCourses(new_courses);
    setIsLoading(false);
  };

  useEffect(() => {
    fetch();
  }, [isUserEnrolled]);

  if (!isLoading) {
    return (
      <div className="bg-white flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold leading-7 mb-4 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          New Courses
        </h2>

        {openPaypal && (
          <div className="paypal-modal flex items-center justify-center p-12 fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-3xl z-50">

            <div className="paypal-content bg-white rounded-lg p-0 shadow-md max-w-[60%] w-full h-[90vh] overflow-y-auto relative text-center">

              <button
                className="absolute top-4 right-4 text-black text-4xl hover:text-gray-600 focus:outline-none"
                onClick={() => setOpenPaypal(false)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="dashboardContent h-full overflow-y-auto">
                <div className="dashboardContentPanel donationSendContent ex_mar_all_24">
                  <div>
                    <p id="paragraphStyle" className="p_text p-2">
                      {" "}
                      To enroll in this course, we have a suggested donation of ${currentCoursePrice} for PayPal and ${currentCoursePrice * 0.9} for Drala. If you do not want to donate the suggested amount or wish to donate by some other means, please write us. We do not have a paid clergy, so all donations are used for the Missions of the Church.
                    </p>
                  </div>

                  <div>
                    <hr style={{ margin: "5px 0 10px 0" }} />
                  </div>

                  <div className="flex justify-between ml-10 mt-2">
                    <div className="paymentImg">
                      <img src={payment} alt="" />
                    </div>

                    <div className="w-[22%] h-[32%] mr-28 bg-transparent border border-gray-300 rounded">
                      <img
                        src={Drala_Image}
                        alt="Drala Logo"
                        className="object-fill w-full h-auto"
                        style={{ backgroundColor: 'transparent' }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="payment_submit_buttons">
                      <div className="flex justify-between">
                        <h3 className="mt-2 mb-2 ml-4">
                          Current donation amount : ${currentCoursePrice}{" "}
                        </h3>
                        <h3 className="mt-2 mb-2 mr-20 flex flex-col">
                          Current donation amount : ${currentCoursePrice * 0.9}{" "}
                        </h3>
                      </div>

                      <div className="w-full h-100 justify-center text-center align-center ml-8">
                        <PayPalPayment
                          handlePaypalSuccess={handlePaypalSuccess}
                          courseId={courseId}
                          type="Course"
                          paymentSuccess={paymentSuccess}
                          setPaymentStart={setPaymentStart}
                          paymentStart={paymentStart}
                          setPaymentSuccess={setPaymentSuccess}
                          initialAmount={currentCoursePrice}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 ms-3">
                  <p className="p_text">
                    Spirit of Truth N.A.C.<br />
                    P.O. Box 2045<br />
                    Ava, MO 65608-2045<br />
                    U.S.A.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}



        <div className="rounded overflow-hidden shadow-lg w-4/5">
          {newCourses &&
            newCourses.length > 0 &&
            newCourses.map((course) => (
              <div
                key={course?._id}
                className="px-6 py-4 flex items-center justify-between border-b"
              >
                <div className="font-bold text-xl mb-2">{course?.title}</div>

                <div className="flex items-center justify-end">
                  {!course.isPaid && (
                    <span className="inline-block bg-green-100 text-green-800 border border-green-300 px-3 py-1 text-xs font-semibold rounded-full mr-2">
                      Free
                    </span>
                  )}
                  {course.isPaid && (
                    <span className="inline-block bg-green-100 text-green-800 border border-green-300 px-3 py-1 text-xs font-semibold rounded-full mr-2">
                      Paid
                    </span>
                  )}

                  <button
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2"
                    onClick={() => {
                      handleEnrollUserInCourse(course._id);
                    }}
                  >
                    Enroll in Course
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
}









{/* {openPaypal && (
          <div className="paypal-modal flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-3xl z-50">
            <div className="paypal-content bg-white rounded-lg p-4 shadow-md">
              <button
                className="close-btn absolute top-4 right-4 text-black
                text-4xl  hover:text-gray-600 focus:outline-none"
                onClick={() => setOpenPaypal(false)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <PayPalPayment
                handlePaypalSuccess={handlePaypalSuccess}
                courseId={courseId}
                type="Course"
                paymentSuccess={paymentSuccess}
                setPaymentStart={setPaymentStart}
                paymentStart={paymentStart}
                setPaymentSuccess={setPaymentSuccess}
                initialAmount={currentCoursePrice}
              />
            </div>
          </div>
        )} */}




{/* <div className="paypal-content bg-white rounded-lg p-6 shadow-md max-w-xl w-full relative text-center">

              <button
                className="absolute top-4 right-4 text-black text-4xl hover:text-gray-600 focus:outline-none"
                onClick={() => setOpenPaypal(false)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <p className="text-gray-700 text-sm my-4">
                <h1 className="mb-4">
                  <strong className="my-4">To enroll in this course, we have a suggested donation of ${currentCoursePrice} for PayPal and ${currentCoursePrice * 0.9} for Drala.
                  </strong>
                </h1>
                <p className="mb-4">If you do not want to donate the suggested amount or wish to donate by some other means, please write us.
                  We do not have a paid clergy, so all donations are used for the Missions of the Church.
                </p>
              </p>

              <div className="flex justify-between mb-4">
                <div className="paymentImg">
                  <img src={payment} alt="" />
                </div>

                <div className="w-[14%] h-[32%] mr-40 bg-transparent border border-gray-300 rounded">
                  <img
                    src={Drala_Image}
                    alt="Drala Logo"
                    className="object-fill w-full h-auto"
                    style={{ backgroundColor: 'transparent' }}
                  />
                </div>
              </div>

              <div className="w-full flex item-center justify-between mb-2 ml-4">
                <h3 className="mt-2 mb-2">
                  Amount : ${currentCoursePrice}{" "}
                </h3>
                <h3 className="mt-2 mb-2 mr-32 flex flex-col">
                  Amount : ${currentCoursePrice * 0.9}{" "}
                </h3>
              </div>

              <PayPalPayment
                handlePaypalSuccess={handlePaypalSuccess}
                courseId={courseId}
                type="Course"
                paymentSuccess={paymentSuccess}
                setPaymentStart={setPaymentStart}
                paymentStart={paymentStart}
                setPaymentSuccess={setPaymentSuccess}
                initialAmount={currentCoursePrice}
              />

              <div className="mt-6 text-gray-600 text-sm font-semibold">
                Spirit of Truth N.A.C. <br />
                PO Box 2045 <br />
                Ava, MO 65608
              </div>
            </div> */}
