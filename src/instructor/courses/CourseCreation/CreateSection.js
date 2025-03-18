import FastRewindIcon from "@mui/icons-material/FastRewind";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Loader from "components/Loader";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ReactQuill from "react-quill";
import { Link, useParams } from "react-router-dom";
import SectionCard from "./SectionCard";

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

export default function CreateSection({ url }) {
  // const {createCourse} = useCourse();
  // const {createCourse} = useContext(CourseContext);
  const { getSectionsofModule, createSection } = useAuth();
  const { courseId, moduleId } = useParams();

  const [sectionCreateModalOpen, setSectionCreateModalOpen] =
    React.useState(false);
  const [sections, setSections] = useState(null);
  const [isNewSectionCreated, setIsNewSectionCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const modules = {
  //   toolbar: [
  //     [{ header: "1" }, { header: "2" }, { header: "3" }],
  //     ["bold", "italic", "underline", "strike"],
  //     [{ list: "ordered" }, { list: "bullet" }],
  //     ["link", "image"],
  //     ["clean"],
  //   ],
  // };

  // const formats = [
  //   "header",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "strike",
  //   "list",
  //   "bullet",
  //   "link",
  //   "image",
  // ];
  const formats = [
    // Include all desired formatting options here
    "bold",
    "italic",
    "underline",
    "strike",
    "script",
    "subscript",
    "superscript",
    "blockquote",
    "code-block",
    "header",
    "list",
    "bullet",
    "indent",
    "outdent",
    "link",
    "image",
    "formula",
    "color",
    "background",
    "align",
    "direction",
    "code",
    "clean", // Keep 'clean' for basic formatting removal
  ];

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { header: "3" }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }], // Indentation control
      [{ align: [] }], // Text alignment (left, center, right, justify)
      ["link", "image", "formula"], // Formula editor (if desired)
      ["color", { color: [] }], // Custom color picker
      ["background", { color: [] }], // Custom background color picker
      ["clean"], // Basic formatting removal
    ],
  };

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
    let videoUrl = "";
    if (sectionData.videoUrl.trim() !== "") {
      videoUrl = convertYouTubeLink(sectionData.videoUrl);
    }
    let data = {
      title: sectionData.title,
      description: sectionData.description,
      videoUrl: videoUrl,
      pdfs: sectionData.pdfs,
    };
    const response = await createSection(data, moduleId);
    setIsNewSectionCreated(!isNewSectionCreated);
    setSectionCreateModalOpen(false);
  };

  if (!isLoading) {
    return (
      // <div style={{backgroundColor:"white"}}>

      //   <div className="flex justify-start items-center p-2">
      //     <Link to={`${url}/courses/${courseId}/modules/create`}>
      //     <Button variant="contained" className="mb-2 mt-2" startIcon={<FastRewindIcon />}>
      //         Back
      //     </Button>
      //     </Link>
      //   </div>

      //   {/* Create  Section */}
      //   <div className="flex flex-col items-center justify-center mt-4">
      //   <Card sx={{ minWidth: 275 }} className="w-4/5">
      //     <CardContent className="flex justify-between items-center">
      //     <Typography variant="h4" className="font-semibold">Create New Section</Typography>
      //     <Button variant="contained" color="success" onClick={() => setSectionCreateModalOpen(true)}>
      //       Create Section
      //     </Button>
      //     </CardContent>

      //     <Modal
      //       open={sectionCreateModalOpen}
      //       onClose={()=>{setSectionCreateModalOpen(false)}}
      //       aria-labelledby="modal-modal-title"
      //       aria-describedby="modal-modal-description"
      //       className="rounded-lg"
      //     >
      //       <Container sx={style} maxWidth="md">
      //         <Typography variant="h4" gutterBottom>
      //           Section Form
      //         </Typography>
      //         <Box component="form">
      //           <TextField
      //             label="Section Title"
      //             name="title"
      //             value={sectionData.title}
      //             onChange={handleChange}
      //             fullWidth
      //             margin="normal"
      //           />
      //           <TextField
      //             label="Section Description"
      //             name="description"
      //             value={sectionData.description}
      //             onChange={handleChange}
      //             fullWidth
      //             multiline
      //             rows={4}
      //             margin="normal"
      //           />
      //           <TextField
      //             label="Video URL"
      //             name="videoUrl"
      //             value={sectionData.videoUrl}
      //             onChange={handleChange}
      //             fullWidth
      //             margin="normal"
      //           />
      //           <input
      //             accept="application/pdf"
      //             type="file"
      //             multiple
      //             onChange={handleFileChange}
      //           />
      //           {sectionData.pdfs.length > 0 && (
      //             <List>
      //               {sectionData.pdfs.map((pdf, index) => (
      //                 <ListItem key={index}>
      //                   <ListItemText primary={pdf.name} />
      //                   <Button onClick={() => handleRemovePDF(index)}>Remove</Button>
      //                 </ListItem>
      //               ))}
      //             </List>
      //           )}
      //           <Button variant="contained" color="primary" onClick={handleCreate}>
      //             Create
      //           </Button>
      //           <Button style={{marginLeft:'5px'}} variant="contained" onClick={() => setSectionCreateModalOpen(false)}>Close</Button>
      //         </Box>
      //       </Container>
      //     </Modal>

      //   </Card>
      //   </div>
      // {/* Create Section */}

      // {/* Display sections */}
      // <div className="flex flex-col items-center justify-center mt-8">
      // <Typography variant="h4" className="mt-2 mb-2 w-4/5">View Sections</Typography>

      // <div className="flex flex-col justify-center items-center w-full">
      //   {sections && sections.map(section => (
      //     <Card key={section._id} className="w-[80%] rounded-xl mt-2 mb-2">
      //       <CardContent>
      //         <Typography variant="h5" component="h2">
      //           {section.title}
      //         </Typography>
      //         <div className='flex justify-end '>
      //         <Link to={`${url}/courses/${courseId}/${moduleId}/sections/${section._id}/details`}>
      //           <Button variant="outlined" className="rounded-lg" endIcon={<SendIcon />}>
      //             View Section
      //           </Button>
      //         </Link>
      //         </div>
      //       </CardContent>
      //     </Card>
      //   ))}
      // </div>

      // </div>
      // {/* Display sections */}

      // </div>

      <DragDropContext onDragEnd={moveSection}>
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

          {/* Create  Section */}

          <div className="bg-white flex flex-col justify-center items-center mt-5">
            <div className="rounded overflow-hidden shadow-lg w-4/5">
              <div className="px-6 py-4 flex items-center justify-between border-b">
                <div className="font-bold text-xl mb-2">Create New Section</div>

                <div className="flex items-center justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2"
                    onClick={() => setSectionCreateModalOpen(true)}
                  >
                    Create Section
                  </button>
                </div>

                <Modal
                  open={sectionCreateModalOpen}
                  onClose={() => {
                    setSectionCreateModalOpen(false);
                  }}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  className="rounded-lg"
                >
                  <Container sx={style} maxWidth="md">
                    <Typography variant="h4" gutterBottom>
                      Section Form
                    </Typography>
                    <Box component="form">
                      <TextField
                        label="Section Title"
                        name="title"
                        value={sectionData.title}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                      />
                      {/* <TextField
                  label="Section Description"
                  name="description"
                  value={sectionData.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                /> */}
                      <ReactQuill
                        value={sectionData.description}
                        onChange={(value) =>
                          setSectionData({ ...sectionData, description: value })
                        }
                        modules={modules}
                        formats={formats}
                      />
                      <TextField
                        label="Video URL"
                        name="videoUrl"
                        value={sectionData.videoUrl}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                      />
                      <div class=" mx-auto bg-white p-6 rounded-md shadow-md">
                        <h3>How to add youtube video URL</h3>
                        <ol class="list-decimal space-y-4">
                          <li>
                            Visit{" "}
                            <a
                              href="https://www.youtube.com/"
                              class="text-blue-500"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Youtube
                            </a>
                          </li>
                          <li class="pl-4">
                            Go to a video
                            <ul class="list-disc pl-6">
                              <li>Click on "Share"</li>
                              <li>
                                Click on "Embed" and simply copy the content
                                within the src attribute.
                              </li>
                              <li>
                                {" "}
                                For example, if the embed code contains:
                                src="https://www.youtube.com/embed/VMvBkuKOAgM?si=G6CXwWz0dn4z4q1y"
                              </li>
                              <li>
                                Just Copy the part :
                                https://www.youtube.com/embed/VMvBkuKOAgM?si=G6CXwWz0dn4z4q1y
                              </li>
                              <li>
                                Copy the link of this format: "https://www.youtube.com/embed/XXXXXXXX"
                                </li>
                            </ul>
                          </li>
                          <li>Put the link in the Video Url</li>
                        </ol>
                      </div>

                      <input
                        accept="application/pdf"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                      />
                      {sectionData.pdfs.length > 0 && (
                        <List>
                          {sectionData.pdfs.map((pdf, index) => (
                            <ListItem key={index}>
                              <ListItemText primary={pdf.name} />
                              <Button onClick={() => handleRemovePDF(index)}>
                                Remove
                              </Button>
                            </ListItem>
                          ))}
                        </List>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreate}
                      >
                        Create
                      </Button>
                      <Button
                        style={{ marginLeft: "5px" }}
                        variant="contained"
                        onClick={() => setSectionCreateModalOpen(false)}
                      >
                        Close
                      </Button>
                    </Box>
                  </Container>
                </Modal>
              </div>
            </div>
          </div>
          {/* Create Section */}

          {/* Display sections */}
          <div className="flex flex-col items-center justify-center mt-8">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mt-7">
              View Sections
            </h2>

            <Droppable
              droppableId="sections"
              direction="vertical"
              className="w-full"
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-[80vw]"
                >
                  {sections &&
                    sections.map((section, index) => (
                      <SectionCard
                        key={section._id}
                        section={section}
                        index={index}
                        //handleUpdateButtonClick={handleUpdateButtonClick}
                        //handleDeleteButtonClick={handleDeleteButtonClick}
                        url={url}
                        courseId={courseId}
                        moduleId={moduleId}
                        //handleSectionDelete={handleSectionDelete}
                        //sectionDeleteModalOpen={sectionDeleteModalOpen}
                        //setSectionDeleteModalOpen={setSectionDeleteModalOpen}
                      />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* <div className='flex items-center justify-end'>
            <button className="bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded mr-2 mt-5" onClick={handleUpdateSectionsOrder}
            >
              Save Sections Order
            </button>
      </div> */}
          </div>
          {/* Display sections */}
        </div>
      </DragDropContext>
    );
  } else {
    return <Loader />;
  }
}
