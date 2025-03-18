import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "config/axios";
import Loader from "components/Loader";
import { generateAdoptionCertificate } from "./generateAdoptionCertificate";
import { ViewAdoptionCertificate } from "./ViewAdoptionCertificate";
import { ViewCourseCertificate } from "./ViewCourseCertificate";
import { generateCourseCertificate } from "./generateCourseCertificate";
import { ViewCourseLetter } from "./ViewCourseLetter";
import { generateCourseLetter } from "./generateCourseLetter";

const CoursesAndCertificates = ({ url }) => {
  const [passedCourses, setPassedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  const fetchPassedCourses = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/coursecompletion/passedCourses/${userId}`
      );
      // console.log(response);
      let completedCourses = response.data.passedCourses;
      let originalCourse = response.data.courses;
      console.log(completedCourses);
      let arr = [];
      for (let i = 0; i < completedCourses.length; i++) {
        let courseObject = {
          course: originalCourse[i],
          lastTestTaken: completedCourses[i].lastTestTaken,
        };
        arr.push(courseObject);
      }
      console.log("Passed courses are:", arr);
      setPassedCourses(arr);
    } catch (error) {
      console.error("Error fetching passed courses:", error);
    }
  };

  const fetchUser = async () => {
    let response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/users/${userId}`
    );
    const user = response.data.user;

    response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/get-profile`,
      { email: user.email }
    );

    setIsLoading(false);
    setUserDetails(response.data.profile);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchPassedCourses();
    fetchUser();
  }, [userId]); // Fetch courses whenever userId changes
  console.log("passed courses", passedCourses);
  if (!isLoading) {
    return (
      <>
        <div className="bg-white flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Completed Courses
          </h2>

          <div className="rounded overflow-hidden shadow-md w-4/5">
            {passedCourses &&
              passedCourses.length > 0 &&
              passedCourses.map((courseObject) => (
                <div
                  key={courseObject?.course?._id}
                  className="px-6 py-4 flex items-center justify-between border-b"
                >
                  <div className="font-bold text-xl mb-2">
                    {courseObject?.course?.title}
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex  border-1 p-2 border-blue-400 items-center justify-end">
                      <button
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2"
                        onClick={() =>
                          ViewCourseCertificate(
                            userDetails?.firstname,
                            userDetails?.spiritualname,
                            userDetails?.lastname,
                            courseObject?.lastTestTaken,
                            courseObject?.course?.courseCertificateBody
                          )
                        }
                      >
                        View Certificate
                      </button>

                      {/* <Link to={`${url}/courses/certificate/${userId}/${course?._id}`}> */}
                      <button
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                        onClick={() =>
                          generateCourseCertificate(
                            userDetails?.firstname,
                            userDetails?.spiritualname,
                            userDetails?.lastname,

                            courseObject?.lastTestTaken,
                            courseObject?.course?.courseCertificateBody
                          )
                        }
                      >
                        Download
                      </button>
                      {/* </Link> */}
                    </div>
                    <div className="flex border-[1px] p-2 border-blue-400 items-center justify-end">
                      {/* {console.log(courseObject?.course?.courseLetterBody)}
                      {console.log("courseObject", courseObject)} */}
                      <button
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2"
                        onClick={() =>
                          ViewCourseLetter(
                            userDetails?.firstname,
                            userDetails?.spiritualname,
                            userDetails?.lastname,
                            courseObject?.lastTestTaken,
                            courseObject?.course?.courseLetterBody
                          )
                        }
                      >
                        View Letter
                      </button>
                      {/* <Link to={`${url}/courses/certificate/${userId}/${course?._id}`}> */}
                      <button
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                        onClick={() =>
                          generateCourseLetter(
                            userDetails?.firstname,
                            userDetails?.spiritualname,
                            userDetails?.lastname,
                            courseObject?.lastTestTaken,
                            courseObject?.course?.courseLetterBody
                          )
                        }
                      >
                        Download
                      </button>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="bg-white flex flex-col pt-5 justify-center items-center">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Adoption Certificate
          </h2>

          {userDetails?.verifiedByAdmin && (
            <div className="rounded overflow-hidden shadow-md w-4/5">
              {/* {passedCourses &&
              passedCourses.length > 0 &&
              passedCourses.map((courseObject) => ( */}
              <div
                // key={courseObject?.course?._id}
                className="px-6 py-4 flex items-center justify-between border-b"
              >
                <div className="font-bold text-xl mb-2">
                  Kindly view and downlaoad your adoption certificate.
                </div>

                <div className="flex items-center justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2"
                    onClick={() =>
                      ViewAdoptionCertificate(
                        userDetails?.firstname,
                        userDetails?.spiritualname,
                        userDetails?.lastname,
                        userDetails?.joiningDate ||userDetails?.createdAt,
                      )
                    }
                  >
                    View Certificate
                  </button>

                  {/* <Link to={`${url}/courses/certificate/${userId}/${course?._id}`}> */}
                  <button
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    onClick={() =>
                      generateAdoptionCertificate(
                        userDetails?.firstname,
                        userDetails?.spiritualname,
                        userDetails?.lastname,
                        userDetails?.joiningDate ||userDetails?.createdAt,
                      )
                    }
                  >
                    Download
                  </button>
                  {/* </Link> */}
                </div>
              </div>
              {/* ))} */}
            </div>
          )}
        </div>
      </>
    );
  } else {
    return <Loader />;
  }
};

export default CoursesAndCertificates;
