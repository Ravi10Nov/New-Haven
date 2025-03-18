import React from "react";
import "./SitePagesToggle.css";
import { Button } from "react-bootstrap";
import CourseEditor from "../AdminContentTextEditor/CourseEditor";

const TopicsDetails = () => {
  return (
    <div className="TopicsDetails">
      <div className="contentPanel mt-4">
        <br />
        <div className="welcome_text">
          <CourseEditor></CourseEditor>
        </div>
        <br />
      </div>

      <div className="contentPanel mt-4">
        <div className="welcome_text">
          <h6>Welcome</h6>
          <p>
            We are a legally established, authorized and independent Native
            American Church that desires to protect and restore to the world our
            religious, cultural, and personal freedoms.
          </p>
        </div>
        <br />
      </div>

      <div className="videoCourse_buttons my-4">
        <Button variant="primary" className="submit_button">
          Submit
        </Button>{" "}
        <Button variant="outline" className="back_button">
          Back
        </Button>{" "}
      </div>
    </div>
  );
};

export default TopicsDetails;
