import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Loader from "components/Loader";
import { useAuth } from "hooks/useAuth";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const ViewSectionDetails = ({ url }) => {
  const { courseId, moduleId, sectionId } = useParams();
  const [sectionDetails, setSectionDetails] = useState(null);
  const [sections, setSections] = useState([]); // List of all sections for the module

  const [sectionPdfs, setSectionPdfs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addedPdfs, setAddedPdfs] = useState([]);
  const [deletedPdfs, setDeletedPdfs] = useState([]);
  const history = useHistory();

  const [sectionData, setSectionData] = useState({
    title: "",
    body: "",
    videoUrl: "",
    pdfs: [],
  });
  console.log(sectionData, "sectionData");

  // const modules = {
  //   toolbar: [
  //     [{ header: "1" }, { header: "2" }],
  //     ["bold", "italic", "underline", "strike"],
  //     [{ list: "ordered" }, { list: "bullet" }],
  //     ["link", "image"],
  //     ["clean"],
  //   ],
  // };

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        [{ header: [1, 2, 3, 4, 5] }],
        ["image"],
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
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
    "clean",
  ];

  const [sectionUpdateModalOpen, setSectionUpdateModalOpen] =
    React.useState(false);
  const [isSectionUpdated, setIsSectionUpdated] = useState(false);

  const {
    getPdfsofSection,
    getSectionById,
    downloadPdf,
    updateSection,
    getSectionPdf,
    getSectionsofModule
  } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionData({
      ...sectionData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setAddedPdfs([...addedPdfs, ...files]);
  };

  const handleRemoveAddedPDF = (index) => {
    const updatedPdfs = addedPdfs.filter((_, i) => i !== index);
    setAddedPdfs(updatedPdfs);
  };

  const handleRemoveExistingPDF = (pdfId) => {

    let arr = [];
    arr.push(pdfId);
    setDeletedPdfs([...deletedPdfs, ...arr]);
    setSectionData((prevData) => ({
      ...prevData,
      pdfs: prevData.pdfs.filter((pdf) => pdf._id !== pdfId),
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true);
    console.log("Starting update process");
    try {
      console.log("Sending data:", {
        sectionData,
        sectionId,
        addedPdfs,
        deletedPdfs,
      });
      const result = await updateSection(
        sectionData,
        sectionId,
        addedPdfs,
        deletedPdfs,
      );
      console.log("Update result:", result);
      if (result.success) {
        console.log("Update successful");
        setIsSectionUpdated(!isSectionUpdated);
        setSectionUpdateModalOpen(false);
        // Show a success message to the user
        alert("Section updated successfully");
      } else {
        console.error("Update failed:", result.message);
        // Show an error message to the user
        alert("Failed to update section: " + result.message);
      }
    } catch (error) {
      console.error("Error in handleUpdate:", error);
      // Show an error message to the user
      alert("An error occurred while updating the section");
    } finally {
      setIsLoading(false);
    }
  };
  function getYouTubeVideoId(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  const fetchSectionDetails = async () => {
    // setIsLoading(true);
    // const response = await getSectionById(sectionId);
    // if (response.success) setSectionDetails(response.section);
    // const res = await getPdfsofSection(response.section._id);
    // if (res.success) setSectionPdfs(res.pdfs);
    // let data = {
    //   title: response.section.title,
    //   body: response.section.body,
    //   videoUrl: response.section.videoUrl,
    //   pdfs: res.pdfs,
    // };
    // // console.log("data:", data);

    // setSectionData(data);
    // setIsLoading(false);
    setIsLoading(true);
    const response = await getSectionById(sectionId);
    if (response.success) setSectionDetails(response.section);
    const res = await getSectionPdf(sectionId);
    console.log(res, "resss");

    if (res.success) {
      setSectionPdfs(res?.pdf?.pdfs?.pdfs);
      let data = {
        title: res.pdf.pdfs.title,
        body: res.pdf.pdfs.body,
        videoUrl: res.pdf.pdfs.videoUrl,
        pdfs: res.pdf.pdfs.pdfs,
      };
      // console.log("data:", data);

      setSectionData(data);
    }
    setIsLoading(false);
  };

  const fetchSectionsList = async () => {
    const res = await getSectionsofModule(moduleId);
    if (res.success && res.sections) {
      setSections(res.sections);
    }
  };

  useEffect(() => {
    fetchSectionDetails();
    fetchSectionsList();
  }, [sectionId, isSectionUpdated, , moduleId]);

  const handleNextSection = () => {
    // Find the index of the current section in the sections list
    const currentIndex = sections.findIndex((sec) => sec._id === sectionId);
    if (currentIndex !== -1 && currentIndex < sections.length - 1) {
      const nextSectionId = sections[currentIndex + 1]._id;
      history.push(`${url}/courses/${courseId}/${moduleId}/sections/${nextSectionId}/details`);
    } else {
      toast.info("No next section available", { position: "top-right" });
      history.push(`${url}/courses/${courseId}/modules/create`);
    }
  };

  const renderPdfs = () => {
    if (sectionPdfs && sectionPdfs.length !== 0) {
      return (
        <div>
          <Typography variant="h6">Materials</Typography>
          <List>
            {sectionPdfs.map((pdf, index) => (
              <ListItem key={index} className="flex items-start w-[35%]">
                <ListItemText
                  primary={`${index + 1}.${pdf.originalname}`}
                  className="italic text-red-500"
                />
                {/* <Button
                variant="contained"
                color="primary"
                onClick={() => downloadPdf(pdf._id)}
                className="rounded-xl"
              >
                Download
              </Button> */}
                <a
                  href={`${process.env.REACT_APP_BACKEND_URL}/api/courses/file/downloadpdf/${pdf._id}`}
                  download="filename.pdf"
                  className="text-red-500"
                >
                  Download
                </a>
              </ListItem>
            ))}
          </List>
        </div>
      );
    }
  };

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

  if (!isLoading) {
    return (
      <Container className="w-full mt-5">
        {/* <div className="flex justify-between items-center p-2">
          <Link to={`${url}/courses/${courseId}/${moduleId}/sections/create`}>
            <Button
              variant="contained"
              className="mb-2 mt-2"
              startIcon={<FastRewindIcon />}
            >
              Back
            </Button>

            <Button variant="contained" className="mb-2 mt-2" onClick={handleNextSection}>
              Next
            </Button>
          </Link>
        </div> */}

        <div className="flex justify-between items-center p-2">
          <Link to={`${url}/courses/${courseId}/${moduleId}/sections/create`}>
            <Button variant="contained" className="mb-2 mt-2" startIcon={<FastRewindIcon />}>
              Back
            </Button>
          </Link>
          <Button variant="contained" className="mb-2 mt-2" onClick={handleNextSection} endIcon={<FastForwardIcon />}>
            Next
          </Button>
        </div>

        {sectionDetails && (
          <Card>
            <CardContent className="rounded-3xl">
              <Typography variant="h3" gutterBottom>
                {sectionDetails.title}
              </Typography>

              <ReactQuill
                value={sectionData.body}
                modules={{ toolbar: false }}
                readOnly
              />
              {renderPdfs()}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                  flexWrap: "wrap",
                }}
              >
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                    sectionDetails.videoUrl
                  )}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Update Section */}
        <div className="flex items-center justify-end mt-4">
          <Button
            variant="contained"
            color="success"
            onClick={() => setSectionUpdateModalOpen(true)}
          >
            Edit
          </Button>

          {/* <div className='flex justify-center items-center'> */}
          <Modal
            open={sectionUpdateModalOpen}
            onClose={() => {
              setSectionUpdateModalOpen(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="rounded-lg h-4/5 flex items-center justify-center"
          >
            <Container
              className="h-[90%]"
              sx={style}
              maxWidth="md"
              style={{ overflowY: "auto" }}
            >
              <Typography variant="h4" gutterBottom>
                Section Edit Form
              </Typography>

              <Box component="form" style={{ overflowY: "auto" }}>
                <TextField
                  label="Section Title"
                  name="title"
                  value={sectionData?.title}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />

                <ReactQuill
                  className="h-[200px] overflow-auto"
                  value={sectionData?.body}
                  onChange={(value) =>
                    setSectionData({ ...sectionData, body: value })
                  }
                  modules={modules}
                  formats={formats}
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

                <TextField
                  label="Video URL"
                  name="videoUrl"
                  value={sectionData?.videoUrl}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />

                <label htmlFor="pdfInput" className="mr-2">
                  Choose PDF Files
                  <input
                    id="pdfInput"
                    accept="application/pdf"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                  />
                </label>
                {sectionData.pdfs?.length > 0 && (
                  <List>
                    {sectionData.pdfs.map((pdf, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={pdf.originalname} />
                        <Button
                          onClick={() => handleRemoveExistingPDF(pdf._id)}
                        >
                          Remove
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                )}
                {addedPdfs?.length > 0 && (
                  <List>
                    {addedPdfs.map((pdf, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={pdf.name} />
                        <Button onClick={() => handleRemoveAddedPDF(index)}>
                          Remove
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdate}
                >
                  SAVE
                </Button>
                <Button
                  style={{ marginLeft: "5px" }}
                  variant="contained"
                  onClick={() => setSectionUpdateModalOpen(false)}
                >
                  Close
                </Button>
              </Box>
            </Container>
          </Modal>
          {/* </div> */}
        </div>

        {/* <div className="p-2">
          <Link to={`${url}/courses/${courseId}/${moduleId}/sections/create`}>
            <Button
              variant="contained"
              className="mb-2 mt-2"
              startIcon={<FastRewindIcon />}
            >
              Back
            </Button>
          </Link>
        </div> */}

        <div className="flex justify-between items-center p-2">
          <Link to={`${url}/courses/${courseId}/${moduleId}/sections/create`}>
            <Button variant="contained" className="mb-2 mt-2" startIcon={<FastRewindIcon />}>
              Back
            </Button>
          </Link>
          <Button variant="contained" className="mb-2 mt-2" onClick={handleNextSection} endIcon={<FastForwardIcon />}>
            Next
          </Button>
        </div>
        {/* Update Section */}
      </Container>
    );
  } else {
    return <Loader />;
  }
};

export default ViewSectionDetails;
