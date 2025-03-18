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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useParams } from "react-router-dom";
import {Button} from "@mui/material";
import FastRewindIcon from "@mui/icons-material/FastRewind";

const SectionDetailView = ({ url }) => {
  const { courseId, moduleId, sectionId } = useParams();
  const [sectionDetails, setSectionDetails] = useState(null);
  const [sectionPdfs, setSectionPdfs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sectionData, setSectionData] = useState({
    title: "",
    body: "",
    videoUrl: "",
    pdfs: [],
  });

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
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

  const { getPdfsofSection, getSectionById, downloadPdf, updateSection, getSectionPdf } =
    useAuth();

  const fetchSectionDetails = async () => {
    // console.log("Inside fetch section details");
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
    if (res.success) {
      setSectionPdfs(res?.pdf?.pdfs?.pdfs);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSectionDetails();
  }, [sectionId]);

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
          {/* <Link to={`${url}/createrequests`} className="mr-2">
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2">
              Go to Requests
            </button>
          </Link>

          <Link
            to={`${url}/createrequests/courses/${courseId}/${moduleId}/sections`}
          >
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2">
              Go to Sections
            </button>
          </Link> */}

          <Link to={`${url}/courses/enrolled/${courseId}/${moduleId}/sections`}>
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
      </Container>
    );
  } else {
    return <Loader />;
  }
};

export default SectionDetailView;
