import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";

import "./CoursesPagesStyles.css";
import { getAllCoursesType } from "services/coursesService";
import { CourseSection } from "./components/CoursesSection";

// i should focus on showing the courses.
const AllCoursesPages = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [upcomingCourses, setUpcommingCourses] = useState(null);
  const [recommendedCourses, setRecommendedCourses] = useState(null);
  const [freeCourses, setFreeCourses] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    setIsLoading(true);

    const response = await getAllCoursesType(5);
    const data = response.data.data;

    setUpcommingCourses(data.upcomming);
    setRecommendedCourses(data.recommended);
    setFreeCourses(data.freeForYou);
    setIsLoading(false);
  };

  if (!isLoading) {
    return (
      <div className="dashboardContentPanel h-auto mb-5">
        <div className="container-fluid pb-5">
          <div className="inner_continue_course">
            {/* free for you */}
            <CourseSection
              sectionName={"Free"}
              sectionItems={freeCourses}
              url={url}
            >
              {" "}
            </CourseSection>
            {/* free for you */}
            <CourseSection
              sectionName={"Recommended"}
              sectionItems={recommendedCourses}
              url={url}
            >
              {" "}
            </CourseSection>
            {/* free for you */}
            <CourseSection
              sectionName={"Upcomming"}
              sectionItems={upcomingCourses}
              url={url}
            >
              {" "}
            </CourseSection>
          </div>
        </div>
      </div>
    );
  }
};

export default AllCoursesPages;
