import "./InstructorDashboard.css";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Sidebar from "../InstructorSidebar/InstructorSidebar";
import DashboardInstructor from "../DashboardInstructor/DashboardInstructor";

import Accomplishments from "../../features/accoumplishments/Accoumplishments";
import DonationPage from "donation/UserDonate/DonationPage";
import CourseViewForMember from "../../features/courses/View course/ViewCourseForMember";

import AddEditCourse from "../../features/courses/AddEditCourseDetails/AddEditCourse";
import ListDraftedCourses from "../../features/courses/List courses/ListDraftedCourses";
import ListCoursesThatHaveQuizzes from "../../features/courses/List courses/ListOwnedCoursesThatHaveQuizzes";
import ManageOwnedCourses from "../../features/courses/ManageOwnedCourses/ManageOwnedCourses";
import QuizMain from "../../features/Quiz/Quiz";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import TakingQuiz from "../../features/Quiz/TakingQuiz";

import OwnedCoursesPage from "features/courses/Courses page/OwnedCoursesPage";
import Header from "components/header";
import CoursePage from "features/courses/Courses page/components/CoursesPage";

import {
  getFreeCourses,
  getRecommendedCourses,
  getUpcommingCourses,
} from "services/coursesService";
import AllCoursesPages from "features/courses/Courses page/CoursesAllTypesPage";

import ListingDonationHistory from "features/Transactions/ListingDonationsHistory";
import ListingIntructorEarnings from "features/Transactions/ListingIntructorEarnings";
import PrivateRoute from "instructor/InstructorProtectedRoute";
import ActiveUserDetails from "features/Users/user details/UserDetails";
import IDcard from "features/Users/IdCard/IdCard";
import AdminProfileInstructor from "admin/AdminViewUserProfile/AdminProfileInstructor";
import Chat from "member/Chat";
import Notification from "features/Notifications/Notification";

import CreateCourse from "instructor/courses/CourseCreation/CreateCourse";
import CreateModule from "instructor/courses/CourseCreation/CreateModule";
import CreateSection from "instructor/courses/CourseCreation/CreateSection";
import ViewSectionDetails from "instructor/courses/CourseCreation/ViewSectionDetails";
import AdminDashboardContent from "admin/AdminDashboard/AdminDashboardContent";
import ViewNewCourses from "member/courses/NewCourses/ViewNewCourses";
import ViewCourses from "member/courses/YourCourses/ViewCourses";
import ViewCompletedCourses from "member/courses/CompletedCourses/ViewCompletedCourses";
import ViewSections from "member/courses/YourCourses/ViewSections";
import SectionDetailView from "admin/Instructors/SectionDetailsView";
import ViewGroupedCourse from "member/courses/NewCourses/ViewGroupedCourse";
import ViewModules from "member/courses/YourCourses/ViewModules";
import EnterTest from "member/courses/CourseTest/EnterTest";
import CourseCertificate from "member/certificate/CourseCertificate";
import AccomplishmentsHome from "member/accomplishments/YourAccomplishments/AccomplishmentsHome";
import CoursesAndCertificates from "member/accomplishments/YourAccomplishments/CoursesAndCertificates";
import ActiveUserDetailsExperimental from "features/Users/user details/UserDetailsExpermiental";
import ViewTest from "member/courses/CourseTest/ViewTest";
import ChangePassword from "features/Users/user details/ChangePassword";

export default function InstructorDashboard() {
  const path = "/instructors";
  const url = "/instructors";
  const dashboardUrl = "/instructors";
  return (
    <div className="sharedDashboard">
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
                <PrivateRoute exact path={`${path}`}>
                  <AdminDashboardContent></AdminDashboardContent>
                </PrivateRoute>
                <PrivateRoute exact path={`${path}/ID-CARD`}>
                  <IDcard></IDcard>
                </PrivateRoute>

                <PrivateRoute exact path={`${path}/profile`}>
                  <ActiveUserDetailsExperimental url={url} />
                </PrivateRoute>

                <PrivateRoute exact path={`${path}/ChangePassword`}>
                  <ChangePassword url={url} />
                </PrivateRoute>

                <Switch>
                  {/* <PrivateRoute exact path={`${path}`}>
            <DashboardInstructor url={url} />
          </PrivateRoute> */}
                  {/* <PrivateRoute exact path={`${path}/users/:userId`}>
            <AdminProfileInstructor url={url} role={'instructor'}/>
          </PrivateRoute>  */}
                  {/* <PrivateRoute exact path={`${path}/Chat`}>
            <Chat></Chat>
          </PrivateRoute> */}

                  {/* Only for admin and instructor */}

                  {/* Courses managment */}

                  <PrivateRoute exact path={`${path}/courses/create`}>
                    <CreateCourse url={url} />
                  </PrivateRoute>

                  <PrivateRoute
                    exact
                    path={`${path}/courses/:courseId/modules/create`}
                  >
                    <CreateModule url={url}> </CreateModule>
                  </PrivateRoute>

                  <PrivateRoute
                    exact
                    path={`${path}/courses/:courseId/:moduleId/sections/create`}
                  >
                    <CreateSection url={url}> </CreateSection>
                  </PrivateRoute>

                  <PrivateRoute
                    exact
                    path={`${path}/courses/:courseId/:moduleId/sections/:sectionId/details`}
                  >
                    <ViewSectionDetails url={url}> </ViewSectionDetails>
                  </PrivateRoute>

                  {/* <PrivateRoute exact path={`${path}/courses/create`}> 
                <CreateCourse url={url} > </CreateCourse>     
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/courses/:courseId/modules/create`}> 
                <CreateModule url={url} > </CreateModule>     
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/courses/:courseId/:moduleId/sections/create`}> 
                <CreateSection url={url} > </CreateSection>     
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/courses/:courseId/:moduleId/sections/:sectionId/details`}> 
                <ViewSectionDetails url={url} > </ViewSectionDetails>     
          </PrivateRoute> */}

                  {/* <PrivateRoute exact path={`${path}/courses/add`}>
          <AddEditCourse url={url} operation={'Add'} />
        </PrivateRoute>

        <PrivateRoute exact path={`${path}/courses/owned`}>
          <ManageOwnedCourses url={url} role={'instructor'} />
        </PrivateRoute>
      
        <PrivateRoute exact path={`${path}/courses/drafted`}>
          <ListDraftedCourses url={url} > </ListDraftedCourses>
        </PrivateRoute> */}
                  {/* 
                  <PrivateRoute path={`${path}/courses/drafted/:courseId`}>
                    <AddEditCourse
                      url={url}
                      operation={"Edit"}
                      nestedOperation={"Add"}
                      role={"instructor"}
                    />
                  </PrivateRoute>

                  <PrivateRoute
                    path={`${path}/courses/owned/:courseId/:originalCourseId`}
                  >
                    <AddEditCourse
                      nestedOperation={"Edit"}
                      url={url}
                      role={"instructor"}
                      operation={"Edit"}
                    />
                  </PrivateRoute>

                  <PrivateRoute path={`${path}/courses/owned/:courseId`}>
                    <AddEditCourse
                      url={url}
                      role={"instructor"}
                      operation={"Edit"}
                    />
                  </PrivateRoute> */}

                  <PrivateRoute exact path={`${path}/ID-CARD`}>
                    <IDcard></IDcard>
                  </PrivateRoute>
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

                  <Route exact path={`${path}/accomplishments`}>
                    <AccomplishmentsHome url={url}></AccomplishmentsHome>
                  </Route>

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
                  {/* Quizzes managment */}
                  {/* <PrivateRoute exact path ={`${path}/quizzes/owned`}>
          <ListCoursesThatHaveQuizzes url={url} ></ListCoursesThatHaveQuizzes>
        </PrivateRoute>

        <PrivateRoute exact path ={`${path}/quizzes/add`}  >
                <QuizMain operation={'Add'} url={url}> </QuizMain>
        </PrivateRoute>

        <PrivateRoute exact path ={`${path}/quizzes/owned/:quizId`}>
          <QuizMain operation={'Edit'} url={url}> </QuizMain>
        </PrivateRoute>

        <PrivateRoute exact path={`${path}/transactions/earnings`}>
          <ListingIntructorEarnings url={url}> </ListingIntructorEarnings>
        </PrivateRoute> */}

                  {/* <PrivateRoute exact path={`${path}/courses/take/free`} > 
            <CoursePage url={url}  coursesType={'Free'} handlerFunction={getFreeCourses}> </CoursePage>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/courses/take/upcomming`} > 
            <CoursePage url={url} coursesType={'Upcomming'} handlerFunction={getUpcommingCourses}> </CoursePage>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/courses/take/recommended`} > 
            <CoursePage url={url} coursesType={'Recommended'} handlerFunction={getRecommendedCourses}> </CoursePage>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/courses/take/owned`} > 
            <OwnedCoursesPage url={url} ></OwnedCoursesPage>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/courses/all`} > 
            <AllCoursesPages url={path}></AllCoursesPages>
          </PrivateRoute> */}

                  {/* <PrivateRoute exact path={`${path}/courses/:courseId`}>
            <CourseViewForMember url={url} operation={'consume'} ></CourseViewForMember>
          </PrivateRoute>
          
          <PrivateRoute exact path={`${path}/courses/:courseId/quizzes/:quizId`}>
            <TakingQuiz></TakingQuiz>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/courses/accoumplishments/:courseId`}>
            <Accomplishments url={url} operation={'View'}> </Accomplishments>
          </PrivateRoute> */}

                  <PrivateRoute exact path={`${path}/transactions/history`}>
                    <ListingDonationHistory url={url}> </ListingDonationHistory>
                  </PrivateRoute>

                  <PrivateRoute exact path={`${path}/transactions/send`}>
                    <DonationPage></DonationPage>
                  </PrivateRoute>

                  {/* <PrivateRoute exact path={`${path}/profile`}>
            <ActiveUserDetails url={url} />
          </PrivateRoute>    

          <PrivateRoute exact path={`${path}/profile`}>
            <ActiveUserDetails url={url} />
          </PrivateRoute> */}
      
          <PrivateRoute exact path={`${path}/notifications`}>
            <Notification url={url} />
          </PrivateRoute>

                  {/*           
          <PrivateRoute exact path={`${path}/Chat`}>
            <Chat url={url} />
          </PrivateRoute> */}
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
