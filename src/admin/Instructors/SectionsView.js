import React, { useContext, useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactQuill from "react-quill";
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
import Loader from "components/Loader";

// import { useCourse } from 'hooks/useCourse';
// import CourseContext from 'contexts/CourseContext';
import { useAuth } from "hooks/useAuth";

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

export default function SectionView({ url }) {
  // const {createCourse} = useCourse();
  // const {createCourse} = useContext(CourseContext);
  const { getSectionsofModule, createSection } = useAuth();
  const { courseId, moduleId } = useParams();

  const [sectionCreateModalOpen, setSectionCreateModalOpen] =
    React.useState(false);
  const [sections, setSections] = useState(null);
  const [isNewSectionCreated, setIsNewSectionCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { header: "3" }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const [sectionData, setSectionData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    pdfs: [],
  });

  function convertYouTubeLink(link) {
    const url = new URL(link);
    let videoId = url.pathname.substr(1);
    const paramIndex = videoId.indexOf("?");
    if (paramIndex !== -1) {
      videoId = videoId.substring(0, paramIndex);
    }
    const embedLink = `https://www.youtube.com/embed/${videoId}${url.search}`;
    return embedLink;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionData({
      ...sectionData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSectionData({
      ...sectionData,
      pdfs: [...sectionData.pdfs, ...files],
    });
  };

  const handleRemovePDF = (index) => {
    const updatedPdfs = sectionData.pdfs.filter((_, i) => i !== index);
    setSectionData({
      ...sectionData,
      pdfs: updatedPdfs,
    });
  };

  const fetch = async () => {
    setIsLoading(true);
    const response = await getSectionsofModule(moduleId);
    if (response.success) setSections(response.sections);
    setIsLoading(false);
  };

  const moveSection = (result) => {
    if (!result.destination) {
      return;
    }
    const updatedSections = Array.from(sections);
    const [movedSection] = updatedSections.splice(result.source.index, 1);
    updatedSections.splice(result.destination.index, 0, movedSection);
    setSections(updatedSections);
    // console.log(updatedModules);
  };

  const handleUpdateSectionsOrder = async () => {
    const updatedSectionsOrder = sections.map((section, index) => ({
      sectionId: section._id,
      order: index + 1,
    }));

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/section/updateSectionsOrder/${moduleId}`,
        { sectionsOrder: updatedSectionsOrder }
      );

      if (response.data.success) {
        toast.success("Sections order updated successfully");
        // console.log("Modules order updated successfully");
        // console.log(response.data.modules);
        setIsSectionsOrderUpdated(!isSectionsOrderUpdated);
      } else {
        toast.error("Failed to update sections order");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update sections order");
    }
  };

  useEffect(() => {
    fetch();
  }, [isNewSectionCreated]);

  const handleCreate = async () => {
    let data = {
      title: sectionData.title,
      description: sectionData.description,
      videoUrl: convertYouTubeLink(sectionData.videoUrl),
      pdfs: sectionData.pdfs,
    };
    const response = await createSection(data, moduleId);
    setIsNewSectionCreated(!isNewSectionCreated);
    setSectionCreateModalOpen(false);
  };

  if (!isLoading) {
    return (
      //   <DragDropContext onDragEnd={moveSection}>
      <div style={{ backgroundColor: "white" }}>
        <div className="flex justify-start items-center p-2">
          <Link to={`${url}/createrequests`} className="mr-3">
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2">
              Go to Requests
            </button>
          </Link>

          <Link to={`${url}/createrequests/courses/${courseId}/modules`}>
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2">
              Go to Chapters
            </button>
          </Link>
        </div>

        {/* Display sections */}
        <div className="flex flex-col items-center justify-center mt-8">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mt-7">
            View Sections
          </h2>

          <div className="w-[80vw]">
            {sections &&
              sections.map((section, index) => (
                // <SectionCard
                //   key={section._id}
                //   section={section}
                //   index={index}
                //   //handleUpdateButtonClick={handleUpdateButtonClick}
                //   //handleDeleteButtonClick={handleDeleteButtonClick}
                //   url={url}
                //   courseId={courseId}
                //   moduleId={moduleId}
                //   //handleSectionDelete={handleSectionDelete}
                //   //sectionDeleteModalOpen={sectionDeleteModalOpen}
                //   //setSectionDeleteModalOpen={setSectionDeleteModalOpen}
                // />

                <div
                  key={section._id}
                  className="w-full flex flex-col items-center justify-center"
                >
                  <div className="rounded overflow-hidden shadow-lg w-4/5">
                    <div className="px-6 py-4 flex flex-col items-center justify-between border-b">
                      {/* Row 1 */}
                      <div className="px-6 py-4 flex items-center justify-between border-b w-full">
                        <div className="font-bold text-xl mb-2">
                          {section?.title}
                        </div>

                        <div className="flex items-center justify-end">
                          {section.approvedStatus ? (
                            <div className="flex justify-end">
                              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 italic">
                                Approved
                              </span>
                            </div>
                          ) : (
                            <div className="flex justify-end my-2">
                              <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm mr-2 italic">
                                Pending
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Row 1 */}

                      {/* Row 2 */}
                      <div className="px-6 py-4 flex items-center justify-end border-b w-full">
                        <div className="flex items-center justify-end">
                          {/* View Section */}
                          <Link
                            to={`${url}/createrequests/courses/${courseId}/${moduleId}/sections/${section._id}/details`}
                          >
                            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2">
                              View Section
                            </button>
                          </Link>
                          {/* View Section */}
                        </div>
                      </div>
                      {/* Row 2 */}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* Display sections */}
      </div>
      //   </DragDropContext>
    );
  } else {
    return <Loader />;
  }
}
