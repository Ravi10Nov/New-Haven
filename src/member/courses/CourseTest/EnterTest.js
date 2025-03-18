import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import axios from "config/axios";
import { Link } from "react-router-dom";
import Loader from "components/Loader";
import { useAuth } from "hooks/useAuth";

const EnterTest = ({ url }) => {
  const [test, setTest] = useState();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionNo, setCurrentQuestionNo] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [resultDetails, setResultDetails] = useState({
    isTestCompleted: false,
    noOfCorrectAnswers: 0,
    percentageScored: 0,
    isPassed: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const { courseId, testId } = useParams();
  const { user } = useAuth();
  console.log("emter test");
  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/test/${testId}`
      );
      if (res.data.success) setTest(res.data.test);

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/test/question/all/${testId}`
      );
      console.log(response.data.questions);
      const sortedQuestions = response.data.questions.sort(
        (a, b) => a.questionNo - b.questionNo
      );
      console.log("sorted Questions:", sortedQuestions);
      setQuestions(sortedQuestions);
      const initialSelectedOptions = Array(sortedQuestions.length).fill("");
      setSelectedOptions(initialSelectedOptions);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [testId]);

  const handleOptionSelect = (event, option) => {
    const newSelectedOptions = [...selectedOptions];
    if (event.target.checked)
      newSelectedOptions[currentQuestionNo - 1] = option;
    else newSelectedOptions[currentQuestionNo - 1] = "";
    setSelectedOptions(newSelectedOptions);
  };

  const handleNext = () => {
    if (currentQuestionNo < questions.length) {
      setCurrentQuestionNo(currentQuestionNo + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionNo > 1) {
      setCurrentQuestionNo(currentQuestionNo - 1);
    }
  };

  const handleSubmission = async () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.answer) {
        correctAnswers++;
      }
    });
    const percentage = (correctAnswers / questions.length) * 100;
    let passedStatus =
      Number(percentage) >= test?.passPercentage ? true : false;

    console.log("failes", test);
    console.log("passing status :", passedStatus);
    let body = {
      userId: user._id,
      courseId: courseId,
      correctAnswers: correctAnswers,
      percentageScored: percentage,
      passingStatus: passedStatus,
    };
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/coursecompletion/create`,
      body
    );
    if (passedStatus) {
      const response = axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/unenroll/${courseId}`,
        { userId: user._id }
      );
    }
    let result = {
      isTestCompleted: true,
      noOfCorrectAnswers: correctAnswers,
      percentageScored: percentage,
      isPassed: passedStatus,
    };
    console.log(result);
    setResultDetails(result);
    //console.log(`Percentage of marks scored: ${percentage}%`);
  };

  const currentQuestion = questions[currentQuestionNo - 1];

  if (!isLoading) {
    return (
      <div className="flex items-center justify-center">
        {/* Test */}

        {!resultDetails.isTestCompleted && currentQuestion && (
          <div className="ml-5 w-4/5 border-0 shadow-2xl border-indigo-600 rounded pl-5 pb-3 mt-6 mb-6 bg-white">
            <h5 className="mt-3 mb-3 text-xl font-bold">
              Question {currentQuestion.questionNo}
            </h5>
            <p className="mt-3 mb-3">{currentQuestion.statement}</p>

            <div className="flex flex-col space-y-2">
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    name={option}
                    className="mr-2"
                    checked={selectedOptions[currentQuestionNo - 1] === option}
                    onChange={(event) => handleOptionSelect(event, option)}
                  />
                  <label htmlFor="option1">{option}</label>
                </div>
              ))}
            </div>

            <div className="w-full flex justify-around mt-5">
              {currentQuestionNo > 1 && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
              )}
              {currentQuestionNo === questions.length ? (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSubmission}
                  disabled={selectedOptions[currentQuestionNo - 1] === ""}
                >
                  Submit
                </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleNext}
                  disabled={selectedOptions[currentQuestionNo - 1] === ""}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
        {/* Test */}

        {/* Test Result */}

        {resultDetails.isTestCompleted && (
          <div className="flex justify-center items-center w-4/5 mt-6 mb-6">
            <div className="w-3/4 border rounded-lg shadow-lg">
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-4">Test Result</h2>
                <p className="text-lg mb-4">
                  Score: {resultDetails?.noOfCorrectAnswers}/{questions.length}
                </p>
                <p className="text-lg mb-4">
                  Percentage Scored:{" "}
                  {resultDetails?.percentageScored.toFixed(2)}%
                </p>
                {resultDetails?.isPassed ? (
                  <p className="text-green-600 text-lg mb-4">
                    Congratulations! You have passed the test. You can now
                    download your certificate in the Accomplishments section.
                  </p>
                ) : (
                  <p className="text-red-600 text-lg mb-4">
                    Sorry, you have not passed the test.
                  </p>
                )}
              </div>
              <div className="flex justify-between p-4">
                <Link to={`${url}/courses/enrolled/${courseId}/modules`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Back to Course
                  </button>
                </Link>
                {/* {resultDetails?.isPassed && (
                  <Link to={`${url}/courses/certificate/${user._id}/${courseId}`}>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Get Certificate
                    </button>
                  </Link>
                )} */}
              </div>
            </div>
          </div>
        )}
        {/* Test Result */}
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default EnterTest;
