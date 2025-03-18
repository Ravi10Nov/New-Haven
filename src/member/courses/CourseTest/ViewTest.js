import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "config/axios";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import Loader from "components/Loader";

const ViewTest = ({ url }) => {
  const { courseId } = useParams();
  const [testDetails, setTestDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log("member view test");
  const fetchTestDetails = async () => {
    try {
      //fetching test details
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/test/get-by-course/${courseId}`
      );
      const test = response.data.test;
      setTestDetails(test);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

  useEffect(() => {
    fetchTestDetails();
  }, []);

  if (!isLoading) {
    return (
      <div className="bg-white flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Test Details
        </h2>

        <div className="rounded overflow-hidden shadow-lg w-4/5">
          {testDetails && (
            <div className="px-6 py-4 flex items-center justify-between border-b">
              <div className="font-bold text-xl mb-2">
                Test Title : {testDetails.title}
              </div>

              <div className="flex items-center justify-end">
                <Link
                  to={`${url}/courses/test/${courseId}/enter/${testDetails._id}`}
                >
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2">
                    Start Test
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default ViewTest;
