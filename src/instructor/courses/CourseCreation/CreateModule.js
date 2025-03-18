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
import FastRewindIcon from "@mui/icons-material/FastRewind";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ModuleCard from "./ModuleCard";

import CourseDetails from "./CourseDetails";
import Loader from "components/Loader";

// import { useCourse } from 'hooks/useCourse';
// import CourseContext from 'contexts/CourseContext';
import { useAuth } from "hooks/useAuth";
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

export default function CreateModule({ url }) {
  // const {createCourse} = useCourse();
  // const {createCourse} = useContext(CourseContext);
  const { createModule, getModulesofCourse } = useAuth();
  const { courseId } = useParams();

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
  const [isLoading, setIsLoading] = useState(false);

  const fetch = async () => {
    setIsLoading(true);
    const response = await getModulesofCourse(courseId);
    console.log("modules are:", response.modules);
    if (response.success) setModules(response.modules);
    setIsLoading(false);
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
  }, [isNewModuleCreated, isModuleUpdated]);

  const handleTitleChange = (e) => {
    setModuleTitle(e.target.value);
  };

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
      // <div style={{backgroundColor:"white"}}>

      //   <div className="flex justify-start items-center p-2">
      //     <Link to={`${url}/courses/create`}>
      //     <Button variant="contained" className="mb-2 mt-2" startIcon={<FastRewindIcon />}>
      //         Back
      //     </Button>
      //     </Link>
      //   </div>

      //   {/* Course Details */}
      //   {/* <CourseDetails courseId={courseId} url={url}/> */}
      //   {/* Course Details */}

      //   {/* Create  Module */}
      //   <div className="flex flex-col items-center justify-center mt-4">
      //   <Card sx={{ minWidth: 275 }} className="w-4/5">
      //     <CardContent className="flex justify-between items-center">
      //     <Typography variant="h4" className="font-semibold">Create New Chapter</Typography>
      //     <Button variant="contained" color="success" onClick={() => setModuleCreateModalOpen(true)}>
      //       Create Chapter
      //     </Button>
      //     </CardContent>

      //     <Modal
      //       open={moduleCreateModalOpen}
      //       onClose={()=>{setModuleCreateModalOpen(false)}}
      //       aria-labelledby="modal-modal-title"
      //       aria-describedby="modal-modal-description"
      //       className="rounded-lg"
      //     >
      //       <Box sx={style}>
      //         <Typography id="modal-modal-title" variant="h6" component="h2">
      //           Enter Chapter Title
      //         </Typography>
      //         <TextField className="w-full" id="outlined-basic" label="Chapter Title" variant="outlined" onChange={handleTitleChange} value={moduleTitle}/>
      //         <div className="flex w-full justify-end items-center mt-3">
      //           <Button style={{marginRight:'5px'}} variant="contained" onClick={handleCreate}>Create</Button>
      //           <Button style={{marginLeft:'5px'}} variant="contained" onClick={() => setModuleCreateModalOpen(false)}>Close</Button>
      //         </div>
      //       </Box>
      //     </Modal>

      //   </Card>
      //   </div>
      // {/* Create Module */}

      // {/* Display modules */}
      // <div className="flex flex-col items-center justify-center mt-8">
      // <Typography variant="h4" className="mt-2 mb-2 w-4/5">View Chapters</Typography>

      // <div className="flex flex-col justify-center items-center w-full">
      //   {modules && modules.map(module => (
      //     <Card key={module._id} className="w-[80%] rounded-xl mt-2 mb-2">
      //       <CardContent>
      //         <Typography variant="h5" component="h2">
      //           {module.title}
      //         </Typography>
      //         <div className='flex justify-end '>

      //         {/* Updating Module */}
      //         {/* <Button variant="contained" color="success" style={{marginRight:"10px"}} onClick={() => handleUpdateButtonClick(module.title,module._id)}>
      //           Update
      //         </Button> */}

      //         {/* <Modal
      //           open={moduleUpdateModalOpen}
      //           onClose={()=>{setModuleUpdateModalOpen(false)}}
      //           aria-labelledby="modal-modal-title"
      //           aria-describedby="modal-modal-description"
      //           className="rounded-lg"
      //       >
      //         <Box sx={style}>
      //           <Typography id="modal-modal-title" variant="h6" component="h2">
      //             Enter Chapter Title
      //           </Typography>
      //           <TextField className="w-full" id="outlined-basic" label="Chapter Title" variant="outlined" onChange={handleTitleUpdateChange} value={moduleUpdateTitle}/>
      //           <div className="flex w-full justify-end items-center mt-3">
      //             <Button style={{marginRight:'5px'}} variant="contained" onClick={handleTitleUpdate}>Update</Button>
      //             <Button style={{marginLeft:'5px'}} variant="contained" onClick={() => setModuleUpdateModalOpen(false)}>Close</Button>
      //           </div>
      //         </Box>
      //         </Modal> */}
      //         {/* Updating Module */}

      //           <Link to={`${url}/courses/${courseId}/${module._id}/sections/create`}>
      //         <Button variant="outlined" className="rounded-lg" endIcon={<SendIcon />}>
      //           View Chapter
      //         </Button>
      //         </Link>
      //         </div>
      //       </CardContent>
      //     </Card>
      //   ))}
      // </div>

      // </div>
      // {/* Display modules */}

      // </div>

      <DragDropContext onDragEnd={moveModule}>
        <div style={{ backgroundColor: "white" }}>
          <div className="flex justify-start items-center p-2">
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

          {/* Course Details */}
          {/* <CourseDetails courseId={courseId} url={url}/> */}
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
                        // handleUpdateButtonClick={handleUpdateButtonClick}
                        // handleDeleteButtonClick={handleDeleteButtonClick}
                        url={url}
                        // handleModuleDelete={handleModuleDelete}
                        // handleTitleUpdateChange={handleTitleUpdateChange}
                        // handleTitleUpdate={handleTitleUpdate}
                        // moduleDeleteModalOpen={moduleDeleteModalOpen}
                        // moduleUpdateModalOpen={moduleUpdateModalOpen}
                        // moduleUpdateTitle={moduleUpdateTitle}

                        courseId={courseId}
                      />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* <div className='flex items-center justify-end mt-7'>
            <button className="bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded mr-2 mt-5" onClick={handleUpdateModulesOrder}
                >
                Save Chapters Order
            </button>
          </div> */}
          </div>
          {/* Display modules */}
        </div>
      </DragDropContext>
    );
  } else {
    return <Loader />;
  }
}
