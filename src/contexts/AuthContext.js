import axios from "config/axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [user, setUser] = useState(null); // user info
  const [userDetails, setUserDetails] = useState(null); //profile info of user
  const [userStatus, setUserStatus] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const createUser = async (email, password) => {
    try {
      const userData = { email, password };
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`,
        userData
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      if (
        (error.response && error.response.status === 409) ||
        error.response.statusText === "CONFLICT"
      ) {
        // Handle conflict error (email already exists)
        return { error: "Email already exists" };
      }
      //  else if (error.response.status === 403) {
      //   return {
      //     error:
      //       "Your account has been blocked. Please contact Admin from our Contact page to resolve this issue.",
      //   };
      // }
      else {
        console.error("Error:", error);
        throw error;
      }
    }
  };

  const checkProfile = async (email , user) => {
    try {
      const userData = { email };
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/get-profile`,
        userData
      );

      if (response.data.success) {
        setUserDetails(response.data.profile);
        return true;
      } else {
        console.log("will return false");
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const loginUser = async (email, password, captchaToken) => {
    try {
      const userData = { email, password, captchaToken };

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        userData
      );

      if (response.data.success && response.data.status !== 403) {
        localStorage.setItem("token", response.data.token);
        setUserEmail(response.data.user.email);
        setUser(response.data.user);
        setUserRole(response.data.user.role);
        // await checkProfile(response.data.user.email);

        // console.log(
        //   "athcontext before status",
        //   response.data.user.accountStatus
        // );
        const isProfileCreated = await checkProfile(response.data.user.email);

        if (isProfileCreated) {
          setUserStatus("finished");
        }
        //   return {
        //     success: true,
        //     user: response.data.user,
        //     status: "profile_created",
        //   };
        // } else
        //   return {
        //     success: true,
        //     user: response.data.user,
        //     status: "profile_not_created",
        //   };

        setUserStatus(response.data.user.accountStatus);
        return { success: true, user: response.data.user };
      } else {
        if (error.response?.status === 403) {
          return toast.error(
            "Your account has been blocked. Please contact Admin from our Contact page to resolve this issue.     "
          );
        }
        return { success: false };
      }
    } catch (error) {
      console.log("Error:", error);
      console.log(error.response.status);
      if (error.response?.status === 403) {
        console.log("returning from here");
        return toast.error(
          "Your account has been blocked. Please contact Admin from our Contact page to resolve this issue.     "
        );
      }
      return false;
    }
  };

  const createProfile = async (profileDetails, selectedImage) => {
    try {
      const profile = {
        ...profileDetails,
        email: user.email,
        user: user._id,
        profileImage: selectedImage,
      };
      // console.log(profile);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/create-profile`,
        profile
      );
      // console.log("Response:", response.data);
      if (response.data.success) {
        setUserDetails(response.data.profile);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendPasswordResetMail = async (email) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/reset-password`,
        email
      );
      // console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resetPassword = async (userId, token, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/reset-password/${userId}/${token}`,
        password
      );
      // console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchProfiles = async () => {

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/get-all-profiles`
      );
   
      // console.log("Response:", response.data);
      return {
        success: true,
        profiles: response.data.profiles,
        totalProfiles: response.data.totalProfiles,
      };
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
   
  };

  const fetchProfile = async (userId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/get-userprofile/${userId}`
      );

      return { success: true, profile: response.data };
    } catch (error) {
      console.error("couldnt get profile:", error);
      return { success: false };
    }
  };

  const blockUser = async (userId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/blockuser/${userId}`
      );
      // console.log("Response:", response.data);
      return { success: true, user: response.data };
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

  const unblockUser = async (userId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/unblockuser/${userId}`
      );
      // console.log("Response:", response.data);
      return { success: true, user: response.data };
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

  const createProfileUpdateRequest = async (userData, selectedImage) => {
    // console.log(userData);
    // console.log(selectedImage);
    try {
      const profile = {
        ...userData,
        loggedUser: user.email,
        user: user._id,
        profileImage: selectedImage,
      };
      // console.log(profile);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/changes/edit-profile/new-request`,
        profile
      );

      if (response.data.success) {
        return { success: true, status: response.status };
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.status === 403) {
        console.log(
          "An edit profile request for this account is already pending"
        );
        return { success: false, status: error.response.status };
      }
    }
  };

  const getUserChangeRequests = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/changes/edit-profile/requests`
      );
      // console.log("Response:", response.data);
      return {
        success: true,
        requests: response.data.requests,
        totalEntries: response.data.totalEntries,
      };
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

  const getUserEditRequest = async (userId) => {
    try {
      const originalProfile = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/get-userprofile/${userId}`
      );
      const newProfile = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/changes/edit-profile/requests/${userId}`
      );

      // let response={
      //   old_values:{
      //     firstname:originalProfile.firstname,
      //     lastname:originalProfile.lastname,
      //     middlename:originalProfile.middlename,
      //     spiritualname:originalProfile.spiritualname,
      //     birthdate:originalProfile.birthdate,
      //     email:originalProfile.email,
      //     phone:originalProfile.phone,
      //     sex:originalProfile.sex,
      //     addressline1:originalProfile.addressline1,
      //     addressline2:originalProfile.addressline2,
      //     city:originalProfile.city,
      //     state:originalProfile.state,
      //     country:originalProfile.country,
      //     zipcode:originalProfile.zipcode,
      //     dralawalletaddress:originalProfile.dralawalletaddress,
      //   },
      //   new_values:{
      //     firstname:newProfile.firstname,
      //     lastname:newProfile.lastname,
      //     middlename:newProfile.middlename,
      //     spiritualname:newProfile.spiritualname,
      //     birthdate:newProfile.birthdate,
      //     email:newProfile.email,
      //     phone:newProfile.phone,
      //     sex:newProfile.sex,
      //     addressline1:newProfile.addressline1,
      //     addressline2:newProfile.addressline2,
      //     city:newProfile.city,
      //     state:newProfile.state,
      //     country:newProfile.country,
      //     zipcode:newProfile.zipcode,
      //     dralawalletaddress:newProfile.dralawalletaddress,

      //   }
      // }
      let response = {
        old_values: { ...originalProfile.data },
        new_values: { ...newProfile.data },
      };

      return response;
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

  const approveUserEditRequest = async (userId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/changes/edit-profile/approve/${userId}`
      );

      return { success: true, updatedProfile: response.data };
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

  const disapproveUserEditRequest = async (userId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/changes/edit-profile/disapprove/${userId}`
      );

      return { success: true, disapprovedRequest: response };
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

  //Courses
  const createCourse = async (
    title,
    creatorId,
    userRole,
    courseType,
    coursePrice
  ) => {
    try {
      const courseData = {
        title,
        creatorId,
        userRole,
        courseType,
        coursePrice,
      };
      //console.log(localStorage.getItem("token"));
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/create`,
        courseData,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      return { success: true, course: response.data };
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

  const fetchAllCourses = async (publishedStatus) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/?publishedStatus=${publishedStatus}`
      );
      // console.log("Response:", response.data);
      return { success: true, courses: response.data.courses };
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

  const getCoursesByCreator = async (creatorId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/fetch-by-creator/${creatorId}`
      );
      // console.log("Response:", response.data);
      return { success: true, courses: response.data.courses };
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

  const getModulesofCourse = async (courseId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/module/fetch/${courseId}`
      );
      // console.log("Response:", response.data);
      return { success: true, modules: response.data.modules };
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

  const createModule = async (title, courseId) => {
    try {
      const moduleData = { title };
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/module/create/${courseId}`,
        moduleData,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      // console.log("Response:", response.data);
      return { success: true, module: response.data };
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

  const getSectionsofModule = async (moduleId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/section/fetch/${moduleId}`
      );
      // console.log("Response:", response.data);
      return { success: true, sections: response.data.sections };
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

  const createSection = async (sectionData, moduleId) => {
    try {
      // console.log("started");
      const data = {
        title: sectionData.title,
        body: sectionData.description,
        videoUrl: sectionData.videoUrl,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/section/create/${moduleId}`,
        data,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      for (const pdf of sectionData.pdfs) {
        const formData = new FormData();
        formData.append("file", pdf);

        const pdfUploadResponse = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/courses/file/upload/${response.data.section._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        // console.log(pdfUploadResponse);
      }
      // console.log("Response:", response.data);
      return { success: true, section: response.data };
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

  const getSectionPdf = async (sectionId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/section/pdf/${sectionId}`
      );
      console.log("Response:", response.data);
      return { success: true, pdf : response.data};
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

  const getSectionById = async (sectionId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/section/${sectionId}`
      );
      // const pdfs = await getSectionPdf(sectionId);
      // console.log("Response:", pdfs);
      return { success: true, section: response.data.section };
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

 

  const getPdfsofSection = async (sectionId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/file/fetch/${sectionId}`
      );
      // console.log("Response:", response.data);
      return { success: true, pdfs: response.data.pdfs };
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

  const publishCourse = async (courseId) => {
    try {
      // console.log("Inside publishCourse function");
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/publish/${courseId}`
      );
      // console.log("Response:", response.data);
      return { success: true, courses: response.data.course };
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

  const unpublishCourse = async (courseId) => {
    try {
      // console.log("Inside unpublishCourse function");
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/course/unpublish/${courseId}`
      );
      // console.log("Response:", response.data);
      return { success: true, courses: response.data.course };
    } catch (error) {
      console.error("Error:", error);
      return { success: false };
    }
  };

  const downloadPdf = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/file/get-all-files`
      );
      // const response = await axios.get(
      //   `${process.env.REACT_APP_BACKEND_URL}/api/courses/file/downloadpdf/${id}`
      // );
      // console.log(response);
      if (response.ok) {
        let fileName = response.headers.get("file-Name");
        // console.log(fileName);
        const blob = await response.blob();

        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = fileName;
        downloadLink.click();
        URL.revokeObjectURL(downloadLink.href);
      } else {
        console.error("Error: " + response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const updateSection = async (
  //   sectionData,
  //   sectionId,
  //   addedPdfs,
  //   deletedPdfs
  // ) => {
  //   console.log("updateSection called with:", {
  //     sectionData,
  //     sectionId,
  //     addedPdfs,
  //     deletedPdfs,
  //   });
  //   console.log(addedPdfs , "ADDED PDF");
  //   console.log(deletedPdfs , "DELETED PDF")
    
  //   try {
  //     // Update section details
  //     const userData = {
  //       title: sectionData.title,
  //       body: sectionData.body,
  //       videoUrl: sectionData.videoUrl,
  //     };

  //     console.log("Updating section details...");
  //     const updateResponse = await axios.put(
  //       `${process.env.REACT_APP_BACKEND_URL}/api/courses/section/update/${sectionId}`,
  //       userData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "auth-token": localStorage.getItem("token"),
  //         },
  //       }
  //     );
  //     console.log("Section update response:", updateResponse.data);

  //     if (!updateResponse.data.success) {
  //       throw new Error(
  //         `Failed to update section details: ${JSON.stringify(
  //           updateResponse.data
  //         )}`
  //       );
  //     }
  //     // Handle PDF uploads
  //     console.log("Uploading new PDFs...");
  //     if(addedPdfs.length > 0) {
  //       for (const pdf of addedPdfs) {
  //         const formData = new FormData();
  //         formData.append("file", pdf);
  
  //         const uploadResponse = await axios.post(
  //           `${process.env.REACT_APP_BACKEND_URL}/api/courses/file/upload/${sectionId}`,
  //           formData,
  //           {
  //             headers: {
  //               "Content-Type": "multipart/form-data",
  //               "auth-token": localStorage.getItem("token"),
  //             },
  //           }
  //         );
  //         console.log("PDF upload response:", uploadResponse.data);
  //       }
  //     }

  //     // Handle PDF deletions

  //     if(deletedPdfs.length > 0) {
  //       for (const pdfId of deletedPdfs) {
  //         console.log(pdfId , "pdfid");
          
  //         const deleteResponse = await axios.delete(
  //           `${process.env.REACT_APP_BACKEND_URL}/api/courses/file/${pdfId}`,
  //           {
  //             headers: {
  //               "auth-token": localStorage.getItem("token"),
  //             },
  //           }
  //         );
  //         console.log("PDF delete response:", deleteResponse.data);
  //       }
  //     }

  //     console.log("Update process completed successfully");
  //     return { success: true, message: "Section updated successfully" };
  //   } catch (error) {
  //     console.error("Error in updateSection:", error);
  //     return {
  //       success: false,
  //       message: error.message || "Failed to update section",
  //     };
  //   }
  // };



  const updateSection = async (
    sectionData,
    sectionId,
    addedPdfs,
    deletedPdfs
  ) => {
    console.log("updateSection called with:", {
      sectionData,
      sectionId,
      addedPdfs,
      deletedPdfs,
    });
  
    try {
      const userData = {
        title: sectionData.title,
        body: sectionData.body,
        videoUrl: sectionData.videoUrl,
      };
  
      // Update section details
      const updateResponse = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/section/update/${sectionId}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
  
      if (!updateResponse.data.success) {
        throw new Error(
          `Failed to update section details: ${JSON.stringify(updateResponse.data)}`
        );
      }
      console.log("Section update response:", updateResponse.data);
  
      // Handle PDF uploads
      if (addedPdfs.length > 0) {
        for (const pdf of addedPdfs) {
          try {
            const formData = new FormData();
            formData.append("file", pdf);
  
            const uploadResponse = await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/api/courses/file/upload/${sectionId}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  "auth-token": localStorage.getItem("token"),
                },
              }
            );
            console.log("PDF upload response:", uploadResponse.data);
          } catch (uploadError) {
            console.error("Error uploading PDF:", uploadError);
          }
        }
  
        // Clear the addedPdfs array correctly
        addedPdfs.splice(0, addedPdfs.length);
      }
  
      // Handle PDF deletions
      if (deletedPdfs.length > 0) {
        for (const pdfId of deletedPdfs) {
          try {
            const deleteResponse = await axios.delete(
              `${process.env.REACT_APP_BACKEND_URL}/api/courses/file/${pdfId}`,
              {
                headers: {
                  "auth-token": localStorage.getItem("token"),
                },
              }
            );
            console.log("PDF delete response:", deleteResponse.data);
          } catch (deleteError) {
            console.error("Error deleting PDF:", deleteError);
          }
        }
  
        // Clear the deletedPdfs array correctly
        deletedPdfs.splice(0, deletedPdfs.length);
      }
  
      console.log("Update process completed successfully");
      return { success: true, message: "Section updated successfully" };
    } catch (error) {
      console.error("Error in updateSection:", error);
      return {
        success: false,
        message: error.message || "Failed to update section",
      };
    }
  };

  const updateJoiningDate = async (userId , joiningDate) => {
    console.log(joiningDate , "join date ash");
    
    try {
      const res = await fetchProfile(userId);
      const data = await res.profile;
      console.log(data , "data");
      
      const updateJoiningDateData = {
        ...data,
        joiningDate,
        firstName : data.firstname,
        lastName : data.lastname,
        addressFirstLine : data.addressline1,
        addressSecondLine : data.addressline2,
        date : data.birthdate,
        phoneNumber : data.phone,
        zipCode : data.zipcode,
        profileImage : data.image
      }
      const update = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/auth/update-profile/${userId}` , updateJoiningDateData)
      console.log(update);
      fetchProfiles()
      
    } catch (e) {
      console.log(e);
      
    }
  }
  
  


  
  const contextData = {
    createUser,
    loginUser,
    createProfile,
    userStatus,
    setUserStatus,
    updateJoiningDate,
    userEmail,
    user,
    userDetails,
    setUser,
    setUserEmail,
    sendPasswordResetMail,
    resetPassword,
    userRole,
    fetchProfiles,
    fetchProfile,
    blockUser,
    unblockUser,
    createProfileUpdateRequest,
    getUserChangeRequests,
    getUserEditRequest,
    approveUserEditRequest,
    disapproveUserEditRequest,

    //for courses
    createCourse,
    fetchAllCourses,
    getCoursesByCreator,
    getModulesofCourse,
    createModule,
    getSectionsofModule,
    createSection,
    getSectionById,
    getSectionPdf,
    getPdfsofSection,
    publishCourse,
    unpublishCourse,
    downloadPdf,
    updateSection,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
