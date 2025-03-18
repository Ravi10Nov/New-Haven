import FastRewindIcon from "@mui/icons-material/FastRewind";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Loader from "components/Loader";
import { useAuth } from "hooks/useAuth";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewSectionDetails = ({ url }) => {
  const { courseId, moduleId, sectionId } = useParams();
  const [sectionDetails, setSectionDetails] = useState(null);
 
  
  const [sectionPdfs, setSectionPdfs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addedPdfs, setAddedPdfs] = useState([]);
  const [deletedPdfs, setDeletedPdfs] = useState([]);

  const [sectionData, setSectionData] = useState({
    title: "",
    body: "",
    videoUrl: "",
    pdfs: [],
  });
  const [sectionUpdateModalOpen, setSectionUpdateModalOpen] =
    React.useState(false);
  const [isSectionUpdated, setIsSectionUpdated] = useState(false);

  const { getPdfsofSection, getSectionById, downloadPdf, updateSection , getSectionPdf } =
    useAuth();

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

  const handleUpdate = async () => {
    console.log(sectionData);
    console.log(addedPdfs);
    console.log(deletedPdfs);
    setIsLoading(true);
    const response = await updateSection(
      sectionData,
      sectionId,
      addedPdfs,
      deletedPdfs
    );
    setIsSectionUpdated(!isSectionUpdated);
    setSectionUpdateModalOpen(false);
    setIsLoading(false);
  };

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
    // console.log("data:", data);
    // setSectionData(data);
    // setIsLoading(false);
    setIsLoading(true);
    const response = await getSectionById(sectionId);
    if (response.success) setSectionDetails(response.section);
    const res = await getSectionPdf(sectionId);
    if(res.success) {
      setSectionPdfs(res?.pdf?.pdfs?.pdfs);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSectionDetails();
  }, [sectionId, isSectionUpdated]);

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
        <div className="flex justify-start items-center p-2">
          <Link to={`${url}/courses/${courseId}/${moduleId}/sections/create`}>
            <Button
              variant="contained"
              className="mb-2 mt-2"
              startIcon={<FastRewindIcon />}
            >
              Back
            </Button>
          </Link>
        </div>

        {sectionDetails && (
          <Card>
            <CardContent className="rounded-3xl">
              <Typography variant="h3" gutterBottom>
                {sectionDetails.title}
              </Typography>
              <Typography variant="body1" className="text-xl" gutterBottom>
                {sectionDetails.body}
              </Typography>
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
                  src={sectionDetails.videoUrl}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Update Section */}
        {/* <div className="flex items-center justify-end mt-4">

    <Button variant="contained" color="success" onClick={() => setSectionUpdateModalOpen(true)}>
        Update Section
    </Button>
   
      <Modal
        open={sectionUpdateModalOpen}
        onClose={()=>{setSectionUpdateModalOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="rounded-lg"
      >
        <Container sx={style} maxWidth="md">
          <Typography variant="h4" gutterBottom>
            Section Update Form
          </Typography>
          <Box component="form">
            <TextField
              label="Section Title"
              name="title"
              value={sectionData?.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Section Body"
              name="body"
              value={sectionData?.body}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
            <TextField
              label="Video URL"
              name="videoUrl"
              value={sectionData?.videoUrl}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <input
              accept="application/pdf"
              type="file"
              multiple
              onChange={handleFileChange}
            />
            {sectionData?.pdfs.length > 0 && (
              <List>
                {sectionData.pdfs.map((pdf, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={pdf.originalname} />
                    <Button onClick={() => handleRemoveExistingPDF(pdf._id)}>Remove</Button>
                  </ListItem>
                ))}
              </List>
            )}
             {addedPdfs?.length > 0 && (
              <List>
                {addedPdfs.map((pdf, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={pdf.name} />
                        <Button onClick={() => handleRemoveAddedPDF(index)}>Remove</Button>
                      </ListItem>
                ))}
              </List>
            )}
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update
            </Button>
            <Button style={{marginLeft:'5px'}} variant="contained" onClick={() => setSectionUpdateModalOpen(false)}>Close</Button>
          </Box>
        </Container>
      </Modal>
        </div> */}
        {/* Update Section */}
      </Container>
    );
  } else {
    return <Loader />;
  }
};

export default ViewSectionDetails;
