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
import Container from "@mui/material/Container";
import SendIcon from "@mui/icons-material/Send";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Loader from "components/Loader";
import axios from "config/axios";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ViewTest({ url }) {
  const { courseId, testId } = useParams();

  const [testDetails, setTestDetails] = React.useState({
    title: "",
    passPercentage: "",
  });
  const [testUpdateDetails, setTestUpdateDetails] = React.useState({
    title: "",
    passPercentage: "",
  });
  const [testUpdateModalOpen, setTestUpdateModalOpen] = useState(false);

  const [questionCreateModalOpen, setQuestionCreateModalOpen] =
    React.useState(false);
  const [questions, setQuestions] = useState(null);
  const [questionStatement, setQuestionStatement] = useState(null);
  const [option1, setOption1] = useState(null);
  const [option2, setOption2] = useState(null);
  const [option3, setOption3] = useState(null);
  const [option4, setOption4] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [questionNo, setQuestionNo] = useState(0);
  const [isNewQuestionCreated, setIsNewQuestionCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnswerChange = (event, option) => {
    if (event.target.checked) {
      setAnswer(option);
    } else {
      setAnswer(null);
    }
  };

  const handleInputChange = (e) => {
    const name = e.target.name; // Access name directly
    const value = e.target.value;
    setTestUpdateDetails((prev) => ({ ...prev, [name]: value }));
    console.log("name", name, "value", value);
    console.log("testUpdateDetails", testUpdateDetails);
  };

  const handleTestUpdate = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/test/${testId}`,
        {
          title: testUpdateDetails.title,
          passPercentage: testUpdateDetails.passPercentage,
        }
      );
      console.log("test response", response);

      if (response.data.success) {
        toast.success("Test details updated successfully");
      }
    } catch (error) {
      toast.success("Error updating test details");
    }
    setTestUpdateModalOpen(false);
  };

  const fetch = async () => {
    setIsLoading(true);
    // Fetching the test details
    let response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/courses/test/${testId}`
    );
    if (response.data.success) {
      let test = {
        title: response.data.test.title,
        passPercentage: response.data.test.passPercentage,
      };
      setTestDetails(test);
      setTestUpdateDetails(test);
    }
    // Fetching test questions

    response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/courses/test/question/all/${testId}`
    );
    if (response.data.success) {
      const sortedQuestions = response.data.questions.sort(
        (a, b) => a.questionNo - b.questionNo
      );
      setQuestions(sortedQuestions);
    }
    setIsLoading(false);
  };


  const handleDeleteQuestion = async (questionId) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/test/question/${questionId}`
      );
  
      // Extract `data` from response
      const { success, message } = response.data; 
  
      if (success) {
        toast.success(message);
        fetch();
      } else {
        toast.error(message || "Something went wrong!");
      }
  
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("Failed to delete question.");
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetch();
  }, [isNewQuestionCreated]);

  const handleCreate = async () => {
    let options = [];
    if (option1 !== null) options.push(option1);
    if (option2 !== null) options.push(option2);
    if (option3 !== null) options.push(option3);
    if (option4 !== null) options.push(option4);
    let correctAnswer;
    if (answer === "option1") correctAnswer = option1;
    else if (answer === "option2") correctAnswer = option2;
    else if (answer === "option3") correctAnswer = option3;
    else if (answer === "option4") correctAnswer = option4;
    const body = {
      statement: questionStatement,
      options: options,
      answer: correctAnswer,
      questionNo: questionNo,
      testId: testId,
    };
    console.log(body);
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/courses/test/question/add`,
      body
    );
    setIsNewQuestionCreated(!isNewQuestionCreated);
    setQuestionCreateModalOpen(false);
  };

  const isValid = !(
    questionStatement &&
    option1 &&
    option2 &&
    option3 &&
    option4 &&
    answer
  );

  if (!isLoading) {
    return (
      <div style={{ backgroundColor: "white" }}>
        <div className="flex justify-start items-center p-2">
          <Link to={`${url}/courses/${courseId}/modules/create`}>
            <Button
              variant="contained"
              className="mb-2 mt-2"
              startIcon={<FastRewindIcon />}
            >
              Back
            </Button>
          </Link>
        </div>
        {/* Test Details */}
        <div className="flex items-center my-3 justify-center">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mt-7">
            Test Details
          </h2>
        </div>

        <div className="bg-white flex flex-col justify-center items-center">
          <div className="rounded overflow-hidden shadow-lg w-4/5">
            <div className="px-6 py-4 flex items-center justify-between border-b">
              <div className="font-bold text-xl mb-2">{testDetails?.title}</div>
              <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                onClick={() => setTestUpdateModalOpen(true)}
              >
                Edit
              </button>
            </div>

            {/* Updating Test Details */}

            <Modal
              open={testUpdateModalOpen}
              onClose={() => {
                setTestUpdateModalOpen(false);
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className="rounded-lg w-full"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Enter Test Details
                </Typography>

                {/* <label className="block text-sm font-medium text-gray-700">
                  Test Title
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  label="Title"
                  name="title"
                  onChange={(e) => handleInputChange(e)}
                  value={testUpdateDetails?.title}
                /> */}

                <TextField
                  className="w-full"
                  id="outlined-basic"
                  label="Test Title"
                  variant="outlined"
                  name="title"
                  onChange={(e) => handleInputChange(e)}
                  value={testUpdateDetails?.title}
                />

                <TextField
                  className="w-full mt-3"
                  id="outlined-basic"
                  label="Passing Percentage"
                  type="number"
                  name="passPercentage"
                  variant="outlined"
                  onChange={(e) => handleInputChange(e)}
                  value={testUpdateDetails?.passPercentage}
                />

                <div className="flex w-full justify-end items-center mt-3">
                  <Button
                    style={{ marginRight: "5px" }}
                    variant="contained"
                    onClick={handleTestUpdate}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{ marginLeft: "5px" }}
                    variant="contained"
                    onClick={() => setTestUpdateModalOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </Box>
            </Modal>

            {/* Updating Test Details */}
          </div>
        </div>
        {/* Test Details */}
        {/* Add Question */}
        <div className="bg-white flex flex-col justify-center items-center mt-5">
          <div className="rounded overflow-hidden shadow-lg w-4/5">
            <div className="px-6 py-4 flex items-center justify-between border-b">
              <div className="font-bold text-xl mb-2">Add New Question</div>
              <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                onClick={() => setQuestionCreateModalOpen(true)}
              >
                Add Question
              </button>
            </div>

            <Modal
              open={questionCreateModalOpen}
              onClose={() => {
                setQuestionCreateModalOpen(false);
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className="rounded-lg"
            >
              <Container sx={style} maxWidth="md">
                <Typography variant="h4" gutterBottom>
                  Question Form
                </Typography>
                <Box component="form">
                  <TextField
                    label="Question Statement"
                    name="questionStatement"
                    value={questionStatement}
                    onChange={(e) => {
                      setQuestionStatement(e.target.value);
                    }}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Option 1"
                    name="option1"
                    value={option1}
                    onChange={(e) => {
                      setOption1(e.target.value);
                    }}
                    fullWidth
                    multiline
                    margin="normal"
                  />

                  <TextField
                    label="Option 2"
                    name="option2"
                    value={option2}
                    onChange={(e) => {
                      setOption2(e.target.value);
                    }}
                    fullWidth
                    multiline
                    margin="normal"
                  />

                  <TextField
                    label="Option 3"
                    name="option3"
                    value={option3}
                    onChange={(e) => {
                      setOption3(e.target.value);
                    }}
                    fullWidth
                    multiline
                    margin="normal"
                  />

                  <TextField
                    label="Option 4"
                    name="option4"
                    value={option4}
                    onChange={(e) => {
                      setOption4(e.target.value);
                    }}
                    fullWidth
                    multiline
                    margin="normal"
                  />

                  <Box>
                    <Typography variant="h5">Select Answer</Typography>
                    <Box display="flex" flexDirection="row">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              onChange={(event) =>
                                handleAnswerChange(event, "option1")
                              }
                              checked={answer === "option1"}
                            />
                          }
                          label="Option 1"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              onChange={(event) =>
                                handleAnswerChange(event, "option2")
                              }
                              checked={answer === "option2"}
                            />
                          }
                          label="Option 2"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              onChange={(event) =>
                                handleAnswerChange(event, "option3")
                              }
                              checked={answer === "option3"}
                            />
                          }
                          label="Option 3"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              onChange={(event) =>
                                handleAnswerChange(event, "option4")
                              }
                              checked={answer === "option4"}
                            />
                          }
                          label="Option 4"
                        />
                      </FormGroup>
                    </Box>
                  </Box>

                  <TextField
                    label="Question Number"
                    name="questionNo"
                    value={questionNo}
                    onChange={(e) => {
                      setQuestionNo(e.target.value);
                    }}
                    fullWidth
                    margin="normal"
                    type="number"
                  />

                  <Button
                    disabled={isValid}
                    variant="contained"
                    color="primary"
                    onClick={handleCreate}
                  >
                    Add
                  </Button>
                  <Button
                    style={{ marginLeft: "5px" }}
                    variant="contained"
                    onClick={() => setQuestionCreateModalOpen(false)}
                  >
                    Close
                  </Button>
                </Box>
              </Container>
            </Modal>
          </div>
        </div>
        {/* Add Question */}
        {/* Display questions */}
        <div className="bg-white flex flex-col justify-center items-center mt-5">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            View Questions
          </h2>

          {/* <div className="rounded overflow-hidden shadow-lg w-4/5">
            {questions &&
              questions.length > 0 &&
              questions.map((question) => (
                <div
                  key={question?._id}
                  className="px-6 py-4 flex items-center justify-between border-b"
                >
                  <div className="font-bold text-xl mb-2">
                    {question.statement}
                  </div>

                  <div className="flex items-center justify-end">
                    <Link
                      to={`${url}/courses/${courseId}/test/${testId}/question/${question._id}`}
                    >
                      <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2">
                        View Question
                      </button>
                    </Link>
                  </div>

                  <div className="flex items-center justify-end">
                    <Link
                      to={`${url}/courses/${courseId}/test/${testId}/question/${question._id}`}
                    >
                      <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2">
                        Delete 
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div> */}

          <div className="rounded overflow-hidden shadow-lg w-4/5">
            {questions && questions.length > 0 && questions.map((question) => (
              <div key={question?._id} className="px-6 py-4 flex items-center justify-between border-b">
                <div className="font-bold text-xl mb-2">{question.statement}</div>

                <div className="flex items-center space-x-4">
                  <Link to={`${url}/courses/${courseId}/test/${testId}/question/${question._id}`}>
                    <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-6 border-b-4 border-blue-700 hover:border-blue-500 rounded h-12 min-w-[120px] flex items-center justify-center">
                      View Question
                    </button>
                  </Link>

                  <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-6 border-b-4 border-red-700 hover:border-red-500 rounded h-12 min-w-[120px] flex items-center justify-center" onClick={() => handleDeleteQuestion(question._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
        {/* Display questions */}
      </div>
    );
  } else {
    return <Loader />;
  }
}
