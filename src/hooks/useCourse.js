import { useContext } from "react";
import CourseContext from "contexts/CourseContext";

export const useCourse = () => {
  return useContext(CourseContext);
};