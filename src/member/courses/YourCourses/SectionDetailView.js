// import FastRewindIcon from "@mui/icons-material/FastRewind";
// import {
//   Button,
//   Card,
//   CardContent,
//   Container,
//   List,
//   ListItem,
//   ListItemText,
//   Typography
// } from "@mui/material";
// import Loader from "components/Loader";
// import axios from "config/axios";
// import { useAuth } from "hooks/useAuth";
// import React, { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
// import { Link, useParams } from "react-router-dom";

// const SectionDetailView = ({ url }) => {
//   const { courseId, moduleId, sectionId } = useParams();
//   const [sectionDetails, setSectionDetails] = useState(null);
//   const [sectionPdfs, setSectionPdfs] = useState([]);
//   console.log(sectionPdfs, "sectionpdfs");

//   const [isLoading, setIsLoading] = useState(false);

//   // console.log(sectionData , "sectiondata");


//   const { getPdfsofSection, getSectionById, downloadPdf, getSectionPdf } = useAuth();

//   const fetchSectionDetails = async () => {
//     setIsLoading(true);
//     const response = await getSectionById(sectionId);
//     if (response.success) setSectionDetails(response.section);
//     const res = await getSectionPdf(sectionId);
//     if (res.success) {
//       setSectionPdfs(res?.pdf?.pdfs?.pdfs);
//     }
//     setIsLoading(false);
//   };

//   const downloadFile = async () => {
//     try {
//       console.log("Inside downloadFile");
//       // Make a GET request to the backend API endpoint
//       const response = await axios.get(
//         `${process.env.REACT_APP_BACKEND_URL}/api/courses/file/get-all-files`
//       );
//       console.log(response);
//       if (!response.ok) {
//         throw new Error("Failed to fetch file");
//       }

//       // Return the response body as a blob
//       const blob = await response.blob();

//       // Create a URL for the blob object
//       const url = window.URL.createObjectURL(blob);

//       // Create a temporary <a> element to trigger the download
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "demo"; // Set the file name

//       // Append the <a> element to the document body
//       document.body.appendChild(a);

//       // Click the <a> element to trigger the download
//       a.click();

//       // Remove the <a> element from the document body
//       document.body.removeChild(a);

//       // Revoke the URL to release the object URL
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error:", error);
//       // Handle any errors that occur during the process
//     }
//   };

//   function getYouTubeVideoId(url) {
//     const regExp =
//       /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//     const match = url.match(regExp);
//     return match && match[2].length === 11 ? match[2] : null;
//   }

//   useEffect(() => {
//     fetchSectionDetails();
//   }, [sectionId]);

//   const renderPdfs = () => {
//     if (!sectionPdfs || sectionPdfs.length === 0) return null;

//     return (
//       <div>
//         <Typography variant="h6">Materials</Typography>
//         <List>
//           {sectionPdfs.map((pdf, index) => (
//             <ListItem key={index} className="flex items-start w-[35%]">
//               <ListItemText
//                 primary={`${index + 1}.${pdf.originalname}`}
//                 className="italic text-red-500"
//               />
//               {/* <Button
//               variant="contained"
//               color="primary"
//               // onClick={() => downloadPdf(pdf._id)}
//               onClick={() => downloadFile()}
//               className="rounded-xl"
//             >
//               Download
//             </Button> */}
//               <a
//                 href={`${process.env.REACT_APP_BACKEND_URL}/api/courses/file/downloadpdf/${pdf._id}`}
//                 download="filename.pdf"
//                 className="text-red-500"
//               >
//                 Download
//               </a>
//             </ListItem>
//           ))}
//         </List>
//       </div>
//     );
//   };

//   if (!isLoading) {
//     return (
//       <Container className="w-full mt-5">
//         <div className="flex justify-start items-center p-2">
//           <Link to={`${url}/courses/enrolled/${courseId}/${moduleId}/sections`}>
//             <Button
//               variant="contained"
//               className="mb-2 mt-2"
//               startIcon={<FastRewindIcon />}
//             >
//               Back
//             </Button>
//           </Link>
//         </div>

//         {sectionDetails && (
//           <Card>
//             <CardContent className="rounded-3xl">
//               <Typography variant="h3" gutterBottom>
//                 {sectionDetails.title}
//               </Typography>
//               {/* <Typography variant="body1" className="text-xl" gutterBottom>
//                 {sectionDetails.body}
//               </Typography> */}
//               <ReactQuill
//                 value={sectionDetails.body}
//                 modules={{ toolbar: false }}
//                 readOnly
//               />
//               {renderPdfs()}
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   marginTop: 20,
//                   flexWrap: "wrap",
//                 }}
//               >
//                 <iframe
//                   width="560"
//                   height="315"
//                   src={`https://www.youtube.com/embed/${getYouTubeVideoId(
//                     sectionDetails.videoUrl
//                   )}`}
//                   title="YouTube video player"
//                   frameborder="0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                   allowfullscreen
//                 ></iframe>
//               </div>
//             </CardContent>
//             {/* You can add additional actions or buttons in CardActions */}
//             {/* <CardActions>
//               <Button variant="contained" color="primary">
//                 Action
//               </Button>
//             </CardActions> */}
//           </Card>
//         )}
//         <div className="p-2">
//           <Link to={`${url}/courses/enrolled/${courseId}/${moduleId}/sections`}>
//             <Button
//               variant="contained"
//               className="mb-2 mt-2"
//               startIcon={<FastRewindIcon />}
//             >
//               Back
//             </Button>
//           </Link>
//         </div>
//       </Container>
//     );
//   } else {
//     return <Loader />;
//   }
// };

// export default SectionDetailView;




import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import Loader from "components/Loader";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { useAuth } from "hooks/useAuth";

const SectionDetailView = ({ url }) => {
  const { courseId, moduleId, sectionId } = useParams();
  const history = useHistory();
  const [sectionDetails, setSectionDetails] = useState(null);
  const [sectionPdfs, setSectionPdfs] = useState([]);
  const [sections, setSections] = useState([]); // List of all sections for the module
  const [isLoading, setIsLoading] = useState(false);

  const { getSectionById, getSectionPdf, getSectionsofModule } = useAuth();

  const fetchSectionDetails = async () => {
    setIsLoading(true);
    const response = await getSectionById(sectionId);
    if (response.success) setSectionDetails(response.section);
    const res = await getSectionPdf(sectionId);
    if (res.success) {
      // adjust this as needed based on your response structure
      setSectionPdfs(res?.pdf?.pdfs?.pdfs);
    }
    setIsLoading(false);
  };

  // Fetch the list of sections for the current module
  const fetchSectionsList = async () => {
    const res = await getSectionsofModule(moduleId);
    if (res.success && res.sections) {
      setSections(res.sections);
    }
  };

  useEffect(() => {
    fetchSectionDetails();
    fetchSectionsList();
  }, [sectionId, moduleId]);

  // Handler for the Next button
  const handleNextSection = () => {
    // Find the index of the current section in the sections list
    const currentIndex = sections.findIndex((sec) => sec._id === sectionId);
    if (currentIndex !== -1 && currentIndex < sections.length - 1) {
      const nextSectionId = sections[currentIndex + 1]._id;
      history.push(`${url}/courses/enrolled/${courseId}/${moduleId}/section/${nextSectionId}/details`);
    } else {
      toast.info("No next section available", { position: "top-right" });
      history.push(`${url}/courses/enrolled/${courseId}/modules`);
    }
  };

  // Render PDF list, video iframe, etc.
  const renderPdfs = () => {
    if (!sectionPdfs || sectionPdfs.length === 0) return null;

    return (
      <div>
        <Typography variant="h6">Materials</Typography>
        <List>
          {sectionPdfs.map((pdf, index) => (
            <ListItem key={index} className="flex items-start w-[35%]">
              <ListItemText
                primary={`${index + 1}. ${pdf.originalname}`}
                className="italic text-red-500"
              />
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
  };

  function getYouTubeVideoId(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  if (!isLoading) {
    return (
      <Container className="w-full mt-5">
        {/* Top Navigation with Back and Next buttons */}
        <div className="flex justify-between items-center p-2">
          <Link to={`${url}/courses/enrolled/${courseId}/${moduleId}/sections`}>
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
                value={sectionDetails.body}
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

        {/* <div className="p-2">
          <Link to={`${url}/courses/enrolled/${courseId}/${moduleId}/sections`}>
            <Button variant="contained" className="mb-2 mt-2" startIcon={<FastRewindIcon />}>
              Back
            </Button>
          </Link>
        </div> */}

        <div className="flex justify-between items-center p-2">
          <Link to={`${url}/courses/enrolled/${courseId}/${moduleId}/sections`}>
            <Button variant="contained" className="mb-2 mt-2" startIcon={<FastRewindIcon />}>
              Back
            </Button>
          </Link>
          <Button variant="contained" className="mb-2 mt-2" onClick={handleNextSection} endIcon={<FastForwardIcon />}>
            Next
          </Button>
        </div>
      </Container>
    );
  } else {
    return <Loader />;
  }
};

export default SectionDetailView;

