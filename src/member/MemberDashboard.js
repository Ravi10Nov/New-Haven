import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Chat from "./Chat";
import Dashboard from "./Dashboard";
import "./member.css";
import Sidebar from "./MemberSidebar";
import SpiritualAdoption from "./SpiritualAdoption";
import GroupChatEdit from "./GroupChatEdit";
import { ToastContainer } from "react-toastify";
import CoursePage from "features/courses/Courses page/components/CoursesPage";
import OwnedCoursesPage from "features/courses/Courses page/OwnedCoursesPage";
import AllCoursesPages from "features/courses/Courses page/CoursesAllTypesPage";
import CourseViewForMember from "features/courses/View course/ViewCourseForMember";
import TakingQuiz from "features/Quiz/TakingQuiz";
import Accoumplishments from "features/accoumplishments/Accoumplishments";
import ListingDonationHistory from "features/Transactions/ListingDonationsHistory";
import DonationPage from "donation/UserDonate/DonationPage";
import ActiveUserDetails from "features/Users/user details/UserDetails";
import Notification from "features/Notifications/Notification";
import { getFreeCourse } from "services/userService";
import {
  getRecommendedCourses,
  getUpcommingCourses,
} from "services/coursesService";
import Header from "components/header";
import IDcard from "features/Users/IdCard/IdCard";
import ActiveUserDetailsExperimental from "features/Users/user details/UserDetailsExpermiental";
import ViewNewCourses from "./courses/NewCourses/ViewNewCourses";
import ViewCourses from "./courses/YourCourses/ViewCourses";
import ViewModules from "./courses/YourCourses/ViewModules";
import ViewSections from "./courses/YourCourses/ViewSections";
import SectionDetailView from "./courses/YourCourses/SectionDetailView";
import ViewTest from "./courses/CourseTest/ViewTest";
import EnterTest from "./courses/CourseTest/EnterTest";
import ViewQuizzes from "./Quiz/ViewQuizzes";
import EnterQuiz from "./Quiz/EnterQuiz";
import StepperArea from "donation/StepperArea/StepperArea";
import ViewGroupedCourse from "./courses/NewCourses/ViewGroupedCourse";
import CourseCertificate from "./certificate/CourseCertificate";
import AccomplishmentsHome from "./accomplishments/YourAccomplishments/AccomplishmentsHome";
import CoursesAndCertificates from "./accomplishments/YourAccomplishments/CoursesAndCertificates";
import ViewCompletedCourses from "./courses/CompletedCourses/ViewCompletedCourses";

import MemberDashboardContent from "./MemberDashboardContent";
import ChangePassword from "features/Users/user details/ChangePassword";
import Directory from "screens/Directory";

export default function MemberDashboard() {
  const path = "/members";
  const url = "/members";
  const dashboardUrl = "/user-dashboard";

  return (
    <div className="sharedDashboard" style={{ contain: "paint" }}>
      <div className="dashboardRow">
        <div className="sidebar dashboardSidebar">
          <Sidebar url={url}></Sidebar>
        </div>
        <ToastContainer />
        <div className="sharedDashboard">
          <div className="dashboardRow">
            <div className="dashboardContent">
              <div className="dashboardHeader">
                <Header
                  title="Dashboard"
                  sub="Home"
                  role="Instructor"
                  url={url}
                />
              </div>
              <div className=" w-full">
                {/* <MemberDashboardContent></MemberDashboardContent>  */}
                <Switch>
                  <Route exact path={`/user-dashboard`}>
                    <MemberDashboardContent></MemberDashboardContent>
                  </Route>

                  <Route exact path={`${path}/StepperArea`}>
                    <StepperArea></StepperArea>
                  </Route>

                  <Route exact path={`${path}/ID-CARD`}>
                    <IDcard></IDcard>
                  </Route>

                  <Route exact path={`${path}/ChangePassword`}>
                    <ChangePassword url={url} />
                  </Route>

                  {/* Course Routes */}

                  <Route exact path={`${path}/courses/new`}>
                    <ViewNewCourses url={url}></ViewNewCourses>
                  </Route>

                  <Route exact path={`${path}/courses/enrolled`}>
                    <ViewCourses url={url}></ViewCourses>
                  </Route>

                  <Route exact path={`${path}/courses/completed`}>
                    <ViewCompletedCourses url={url}></ViewCompletedCourses>
                  </Route>

                  <Route
                    exact
                    path={`${path}/courses/enrolled/:courseId/modules`}
                  >
                    <ViewModules url={url}></ViewModules>
                  </Route>

                  <Route
                    exact
                    path={`${path}/courses/enrolled/:courseId/:moduleId/sections`}
                  >
                    <ViewSections url={url}></ViewSections>
                  </Route>

                  <Route
                    exact
                    path={`${path}/courses/enrolled/:courseId/:moduleId/section/:sectionId/details`}
                  >
                    <SectionDetailView url={url}></SectionDetailView>
                  </Route>

                  <Route exact path={`${path}/courses/group/:coursebundleId`}>
                    <ViewGroupedCourse url={url}></ViewGroupedCourse>
                  </Route>

                  {/* Course Routes */}

                  {/* Course Test Routes */}

                  <Route exact path={`${path}/courses/test/:courseId`}>
                    <ViewTest url={url}></ViewTest>
                  </Route>

                  <Route
                    exact
                    path={`${path}/courses/test/:courseId/enter/:testId`}
                  >
                    <EnterTest url={url}></EnterTest>
                  </Route>

                  {/* Course Test Routes */}

                  {/* Course Certificate Routes */}
                  <Route
                    exact
                    path={`${path}/courses/certificate/:userId/:courseId`}
                  >
                    <CourseCertificate url={url}></CourseCertificate>
                  </Route>
                  {/* Course Certificate Routes */}

                  {/* Quiz Routes */}

                  <Route exact path={`${path}/quizzes`}>
                    <ViewQuizzes url={url}></ViewQuizzes>
                  </Route>

                  <Route exact path={`${path}/quizzes/:quizId`}>
                    <EnterQuiz url={url}></EnterQuiz>
                  </Route>

                  {/* Quiz Routes */}

                  {/* Accomplishments Routes */}

                  <Route exact path={`${path}/accomplishments`}>
                    <AccomplishmentsHome url={url}></AccomplishmentsHome>
                  </Route>

                  <Route
                    exact
                    path={`${path}/accomplishments/courses/certificates/:userId`}
                  >
                    <CoursesAndCertificates url={url}></CoursesAndCertificates>
                  </Route>

                  {/* Accomplishments Routes */}

                  {/* <Route exact path={`${path}/profile`}>
                    <ActiveUserDetails></ActiveUserDetails>
                  </Route> */}

                  <Route exact path={path}>
                    <Dashboard url={url}></Dashboard>
                  </Route>
                  <Route exact path={`${path}/dashboard`}>
                    <OwnedCoursesPage url={url}></OwnedCoursesPage>
                  </Route>

                  <Route exact path={`${path}/courses/take/owned`}>
                    <OwnedCoursesPage url={url}></OwnedCoursesPage>
                  </Route>

                  <Route exact path={`${path}/courses/take/free`}>
                    <CoursePage
                      url={url}
                      coursesType={"Free"}
                      handlerFunction={getFreeCourse}
                    >
                      {" "}
                    </CoursePage>
                  </Route>

                  <Route exact path={`${path}/courses/take/upcomming`}>
                    <CoursePage
                      url={url}
                      coursesType={"Upcomming"}
                      handlerFunction={getUpcommingCourses}
                    >
                      {" "}
                    </CoursePage>
                  </Route>

                  <Route exact path={`${path}/courses/take/recommended`}>
                    <CoursePage
                      url={url}
                      coursesType={"Recommended"}
                      handlerFunction={getRecommendedCourses}
                    >
                      {" "}
                    </CoursePage>
                  </Route>

                  <Route exact path={`${path}/courses/all`}>
                    <AllCoursesPages url={path}></AllCoursesPages>
                  </Route>

                  <Route exact path={`${path}/courses/:courseId`}>
                    <CourseViewForMember
                      url={url}
                      operation={"consume"}
                    ></CourseViewForMember>
                  </Route>

                  <Route
                    exact
                    path={`${path}/courses/:courseId/quizzes/:quizId`}
                  >
                    <TakingQuiz></TakingQuiz>
                  </Route>

                  {/* <Route
                    exact
                    path={`${path}/courses/accoumplishments/:courseId`}
                  >
                    <Accoumplishments url={url} operation={"View"}>
                      {" "}
                    </Accoumplishments>
                  </Route> */}

                  <Route exact path={`${path}/transactions/history`}>
                    <ListingDonationHistory url={url}> </ListingDonationHistory>
                  </Route>

                  <Route exact path={`${path}/transactions/send`}>
                    <DonationPage></DonationPage>
                  </Route>

                  <Route exact path={`${path}/profile`}>
                    {/* <ActiveUserDetails url={url} /> */}
                    <ActiveUserDetailsExperimental url={url} />
                  </Route>

                  <Route exact path={`${path}/directory`}>
                    {/* <ActiveUserDetails url={url} /> */}
                    <Directory url={url} />
                  </Route>

                  <Route exact path={`${path}/notifications`}>
                    <Notification url={url} dashboardUrl={dashboardUrl} />
                  </Route>

                  <Route exact path={`${path}/Chat`}>
                    <Chat url={url} />
                  </Route>

                  <Route exact path={`${path}/SpiritualAdoption`}>
                    <SpiritualAdoption url={url} />
                  </Route>

                  <Route exact path={`${path}/GroupChatEdit`}>
                    <GroupChatEdit url={url} />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
