import React, { useContext, useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
import FastRewindIcon from "@mui/icons-material/FastRewind";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ReactQuill from "react-quill";
// import SnowTheme from "quill/dist/themes/snow.css";
// import ModuleDraggable from './ModuleDraggable';

import CourseDetails from "./CourseDetails";
import ModuleCard from "./ModuleCard";
import Loader from "components/Loader";
import { toast } from "react-toastify";

// import { useCourse } from 'hooks/useCourse';
// import CourseContext from 'contexts/CourseContext';
import { useAuth } from "hooks/useAuth";
import axios from "config/axios";
import "../../css/CourseLetter.css";

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
  "& .ql-editor": {
    color: "black",
  },
  "& .ql-editor p": {
    color: "black !important",
  },
};
const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "subscript",
  "superscript",
  "blockquote",
  "code-block",
  "header",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "formula",
  "color",
  "background",
  "align",
  "direction",
  "code",
  "clean",
];

const quillModules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: [1, 2, 3, 4, 5, false, 7] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      // [{ size: ["small", false, "large", "huge"] }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image", "formula"],
      ["clean"],
    ],
  },
  clipboard: {
    matchVisual: false,
  },
};

export default function CreateModule({ url }) {
  // const {createCourse} = useCourse();
  // const {createCourse} = useContext(CourseContext);
  const { createModule, getModulesofCourse } = useAuth();
  const { courseId } = useParams();
  const [coureLetterModalOpen, setCourseLetterModalOpen] = useState(false);
  const [courseCertificateModal, setCourseCertificateModal] = useState(false);
  const [moduleCreateModalOpen, setModuleCreateModalOpen] =
    React.useState(false);
  const [moduleUpdateModalOpen, setModuleUpdateModalOpen] =
    React.useState(false);

  const [moduleTitle, setModuleTitle] = React.useState("");
  const [moduleUpdateTitle, setModuleUpdateTitle] = React.useState("");
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [modules, setModules] = useState(null);
  const [isNewModuleCreated, setIsNewModuleCreated] = useState(false);
  const [isModuleUpdated, setIsModuleUpdated] = useState(false);
  const [isModulesOrderUpdated, setIsModulesOrderUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [moduleDeleteModalOpen, setModuleDeleteModalOpen] =
    React.useState(false);
  const [isModuleDeleted, setIsModuleDeleted] = useState(false);

  const [courseLetterBody, setCourseLetterBody] = useState({
    body: "",
  });
  const [courseCertificateBody, setcourseCertificateBody] = useState({
    body: "",
  });
  const initialContent = '<p style="color: black;">Your initial text here</p>';
  // Use this when setting the initial value of ReactQuill
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      image: base64,
    }));
  };

  useEffect(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/${courseId}`
      );

      setCourseLetterBody({
        body: response.data.course.draftCourseLetterBody,
      });
      setcourseCertificateBody({
        body: response.data.course.draftCourseCertificateBody,
      });
    } catch (error) {
      console.log("errror", error);
    }
  }, []);

  const fetch = async () => {
    //console.log("Inside fetch function");
    setIsLoading(true);
    const response = await getModulesofCourse(courseId);
    //console.log(response.modules);
    if (response.success) {
      const sortedModules = response.modules.sort((a, b) => a.order - b.order);
      //console.log(sortedModules);
      setModules(sortedModules);
    }
    setIsLoading(false);
  };

  const handleDeleteButtonClick = (moduleId) => {
    setModuleDeleteModalOpen(true);
    setSelectedModuleId(moduleId);
  };

  const handleModuleDelete = async () => {
    console.log("Inside module delete");
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/courses/module/${selectedModuleId}`
    );
    setModuleDeleteModalOpen(false);
    setIsModuleDeleted(!isModuleDeleted);
    toast.success("Module successfully deleted");
  };

  const moveModule = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedModules = Array.from(modules);
    const [movedModule] = updatedModules.splice(result.source.index, 1);
    updatedModules.splice(result.destination.index, 0, movedModule);
    setModules(updatedModules);
    // console.log(updatedModules);
  };

  const handleUpdateModulesOrder = async () => {
    // Create an array to store the updated order of modules
    const updatedModulesOrder = modules.map((module, index) => ({
      moduleId: module._id,
      order: index + 1,
    }));

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/module/updateModulesOrder/${courseId}`,
        { modulesOrder: updatedModulesOrder }
      );

      if (response.data.success) {
        toast.success("Modules order updated successfully");
        // console.log("Modules order updated successfully");
        // console.log(response.data.modules);
        setIsModulesOrderUpdated(!isModulesOrderUpdated);
      } else {
        toast.error("Failed to update modules order");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update modules order");
    }
  };

  useEffect(() => {
    fetch();
  }, [
    isNewModuleCreated,
    isModuleUpdated,
    isModuleDeleted,
    isModulesOrderUpdated,
  ]);

  const handleTitleChange = (e) => {
    setModuleTitle(e.target.value);
  };

  // const handleCourseLetterBodyChange = (e) => {
  //   console.log("body", courseLetterBody);
  //   setCourseLetterBody(e.target.value);
  // }

  const handleUpdateButtonClick = (title, moduleId) => {
    setModuleUpdateTitle(title);
    setModuleUpdateModalOpen(true);
    setSelectedModuleId(moduleId);
  };

  const handleTitleUpdateChange = (e) => {
    setModuleUpdateTitle(e.target.value);
  };

  const handleCreate = async () => {
    console.log(moduleTitle);
    const response = await createModule(moduleTitle, courseId);
    setIsNewModuleCreated(!isNewModuleCreated);
    if (response.success) console.log(response.module);
    setModuleCreateModalOpen(false);
  };

  const handleCreateCourseCertificate = async () => {
    const body = courseCertificateBody.body;
    console.log("certificate bidy", body);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/createCertificate`,
        { body, courseId }
      );
      console.log("response", response);
      toast.success("Successfully created course certificate");
      setCourseCertificateModal(false);
    } catch (error) {
      console.log("certoficate errror", error);
      toast.error("Something went wrong! Try again later.");
    }
  };
  const handleDraftCourseCertificate = async () => {
    const body = courseCertificateBody.body;
    console.log("certificate bidy", body);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/draftCourseCertificate`,
        { body, courseId }
      );
      console.log("response", response);
      toast.success("Successfully created course certificate");
      setCourseCertificateModal(false);
    } catch (error) {
      console.log("certoficate errror", error);
      toast.error("Something went wrong! Try again later.");
    }
  };

  const handleCreateCourseLetter = async () => {
    const body = courseLetterBody.body;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/createLetter`,
        { body, courseId }
      );
      console.log("response", response);
      toast.success("Successfully created course letter");
      setCourseLetterModalOpen(false);
    } catch (error) {
      console.log("letter errror", error);
      toast.error("Something went wrong! Try again later.");
    }
  };
  const handleDraftCourseLetter = async () => {
    const body = courseLetterBody.body;
    try {
      console.log("body", body);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/draftCourseLetter`,
        { body, courseId }
      );
      console.log("draft response", response);
      toast.success("Successfully created course letter");
      setCourseLetterModalOpen(false);
    } catch (error) {
      console.log("letter errror", error);
      toast.error("Something went wrong! Try again later.");
    }
  };

  const handleTitleUpdate = async () => {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/courses/module/${selectedModuleId}`,
      { title: moduleUpdateTitle }
    );
    setIsModuleUpdated(!isModuleUpdated);
    setModuleUpdateModalOpen(false);
    console.log(response);
  };
  if (!isLoading) {
    return (
      <DragDropContext onDragEnd={moveModule}>
        <div style={{ backgroundColor: "white" }}>
          <div className="flex justify-between gap-2 items-center p-2">
            <Link to={`${url}/courses/create`}>
              <Button
                variant="contained"
                className="mb-2 mt-2"
                startIcon={<FastRewindIcon />}
              >
                Back
              </Button>
            </Link>
            <div className="flex gap-2">
              <div className="flex items-center pr-5 justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2"
                  onClick={() => setCourseCertificateModal(true)}
                >
                  Create Course Certificate
                </button>
              </div>
              <div className="flex items-center pr-5 justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2"
                  onClick={() => setCourseLetterModalOpen(true)}
                >
                  Create Course Letter
                </button>
              </div>

              <Modal
                open={courseCertificateModal}
                onClose={() => {
                  setModuleCreateModalOpen(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="rounded-lg"
              >
                <Box
                  className={`
                  fixed
                  top-1/2
                  left-1/2
                  transform -translate-x-1/2   -translate-y-1/2 
                  w-[75%] md:w-2/4 h-full md:h-auto /* Responsive width and height */
                  bg-white
                  border border-black
                  shadow-md
                  p-4
    `}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Enter Course Certificate Body
                  </Typography>
                  <ReactQuill
                    className="w-full !text-black"
                    id="outlined-basic"
                    value={courseCertificateBody.body}
                    onChange={(value) =>
                      setcourseCertificateBody({
                        ...courseCertificateBody,
                        body: value,
                      })
                    }
                    theme="snow"
                    modules={quillModules}
                    formats={formats}
                  />

                  <div className="flex w-full justify-end items-center mt-3">
                    <Button
                      style={{ marginRight: "5px" }}
                      variant="contained"
                      onClick={handleDraftCourseCertificate}
                    >
                      Save Draft
                    </Button>
                    <Button
                      style={{ marginRight: "5px" }}
                      variant="contained"
                      onClick={handleCreateCourseCertificate}
                    >
                      Create
                    </Button>
                    <Button
                      style={{ marginLeft: "5px" }}
                      variant="contained"
                      onClick={() => setCourseCertificateModal(false)}
                    >
                      Close
                    </Button>
                  </div>
                </Box>
              </Modal>

              <Modal
                open={coureLetterModalOpen}
                onClose={() => {
                  setModuleCreateModalOpen(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="rounded-lg"
              >
                <Box
                  className={`
                  fixed
                  top-1/2
                  left-1/2
                  transform -translate-x-1/2   -translate-y-1/2 
                  w-[75%] md:w-2/4 h-full md:h-auto /* Responsive width and height */
                  bg-white
                  border border-black
                  shadow-md
                  p-4
    `}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Enter Course Letter Body
                  </Typography>
                  <ReactQuill
                    className="w-full !text-black"
                    style={{
                      color: "black",
                      fontSize: "14px",
                    }}
                    id="outlined-basic"
                    label="Course Letter Body"
                    variant="outlined"
                    multiline
                    rows={5}
                    fullWidth
                    value={courseLetterBody.body}
                    onChange={(value) =>
                      setCourseLetterBody({ ...courseLetterBody, body: value })
                    }
                    theme="snow"
                    modules={quillModules}
                    formats={formats}
                    ref={(el) => {
                      if (el) {
                        el.editor.root.style.setProperty(
                          "color",
                          "black",
                          "important"
                        );
                        el.editor.root.style.setProperty(
                          "font-size",
                          "14px",
                          "important"
                        );
                      }
                    }}
                  />
                  <div className="flex w-full justify-end items-center mt-3">
                    <Button
                      style={{ marginRight: "5px" }}
                      variant="contained"
                      onClick={handleDraftCourseLetter}
                    >
                      Save Draft
                    </Button>
                    <Button
                      style={{ marginRight: "5px" }}
                      variant="contained"
                      onClick={handleCreateCourseLetter}
                    >
                      Create
                    </Button>
                    <Button
                      style={{ marginLeft: "5px" }}
                      variant="contained"
                      onClick={() => setCourseLetterModalOpen(false)}
                    >
                      Close
                    </Button>
                  </div>
                </Box>
              </Modal>
            </div>
          </div>

          {/* Course Details */}
          <CourseDetails courseId={courseId} url={url} />
          {/* Course Details */}

          {/* Create  Module */}

          <div className="bg-white flex flex-col justify-center items-center mt-5">
            <div className="rounded overflow-hidden shadow-lg w-4/5">
              <div className="px-6 py-4 flex items-center justify-between border-b">
                <div className="font-bold text-xl mb-2">Create New Chapter</div>

                <div className="flex items-center justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2"
                    onClick={() => setModuleCreateModalOpen(true)}
                  >
                    Create Chapter
                  </button>
                </div>

                <Modal
                  open={moduleCreateModalOpen}
                  onClose={() => {
                    setModuleCreateModalOpen(false);
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
                      Enter Chapter Title
                    </Typography>
                    <TextField
                      className="w-full"
                      id="outlined-basic"
                      label="Chapter Title"
                      variant="outlined"
                      onChange={handleTitleChange}
                      value={moduleTitle}
                    />
                    <div className="flex w-full justify-end items-center mt-3">
                      <Button
                        style={{ marginRight: "5px" }}
                        variant="contained"
                        onClick={handleCreate}
                      >
                        Create
                      </Button>
                      <Button
                        style={{ marginLeft: "5px" }}
                        variant="contained"
                        onClick={() => setModuleCreateModalOpen(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </Box>
                </Modal>
              </div>
            </div>
          </div>
          {/* Create Module */}

          {/* Display modules */}
          <div className="bg-white flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mt-7">
              View Chapters
            </h2>

            <Droppable
              droppableId="modules"
              direction="vertical"
              style={{ width: "100%" }}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-[80vw]"
                >
                  {modules &&
                    modules.map((module, index) => (
                      <ModuleCard
                        key={module._id}
                        module={module}
                        index={index}
                        handleUpdateButtonClick={handleUpdateButtonClick}
                        handleDeleteButtonClick={handleDeleteButtonClick}
                        url={url}
                        handleModuleDelete={handleModuleDelete}
                        handleTitleUpdateChange={handleTitleUpdateChange}
                        handleTitleUpdate={handleTitleUpdate}
                        moduleDeleteModalOpen={moduleDeleteModalOpen}
                        moduleUpdateModalOpen={moduleUpdateModalOpen}
                        moduleUpdateTitle={moduleUpdateTitle}
                        setModuleUpdateModalOpen={setModuleUpdateModalOpen}
                        setModuleDeleteModalOpen={setModuleDeleteModalOpen}
                        courseId={courseId}
                      />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <div className="flex items-center justify-end mt-7">
              <button
                className="bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded mr-2 mt-5"
                onClick={handleUpdateModulesOrder}
              >
                Save Chapters Order
              </button>
            </div>
          </div>

          <div className="p-2">
            <Link to={`${url}/courses/create`}>
              <Button
                variant="contained"
                className="mb-2 mt-2"
                startIcon={<FastRewindIcon />}
              >
                Back
              </Button>
            </Link>
          </div>
        </div>
        {/* Display modules */}
      </DragDropContext>
    );
  } else {
    return <Loader />;
  }
}
