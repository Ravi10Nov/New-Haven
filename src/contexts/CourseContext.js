import { createContext, useEffect, useState } from "react";
import axios from "config/axios";
const CourseContext = createContext();


export const CourseProvider = ({ children }) => {

  

  const [course, setCourse] = useState("");

  const contextData = {
    course,
  };

  
  return (
    <CourseContext.Provider value={contextData}>{children}</CourseContext.Provider>
  );

}

export default CourseContext;