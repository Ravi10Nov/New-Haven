import "./AdminDashboard.css";
import React from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Sidebar from "../components/AdminSidebar";
import DashboardAdmin from "../DashboardAdmin/DashboardAdmin";

import AdminUserListOne from "../AdminUsersList/AdminUsersList";
import AdminProfileInstructor from "../AdminViewUserProfile/AdminProfileInstructor.js";
import CourseViewForApproval from "../../features/courses/view courses for approval/ViewCourse";
import CourseViewForMember from "../../features/courses/View course/ViewCourseForMember";
import Accomplishments from "../../features/accoumplishments/Accoumplishments";
import CourseViewForRequestChange from "../../features/courses/View course/ViewCourseForRequestChange";
import AddEditCourse from "../../features/courses/AddEditCourseDetails/AddEditCourse";
import ListDraftedCourses from "../../features/courses/List courses/ListDraftedCourses";
import ListPendingCourses from "../../features/courses/List courses/ListPendingCourses";
import ListCoursesThatNeedAccomplishments from "../../features/courses/List courses/ListCoursesThatNeedAccomplishments";
import ListCoursesThatHaveAccomplishments from "../../features/courses/List courses/ListCoursesThatHaveAccomplishments";
import ListCoursesThatHaveQuizzes from "../../features/courses/List courses/ListOwnedCoursesThatHaveQuizzes";
import ListCoursesLiveCoursesQuizzes from "../../features/courses/List courses/ListCoursesLiveWithQuizes";
import ListLiveCourses from "../../features/courses/List courses/ListLiveCoursesAdmin";
import Accoumplishments from "../../features/accoumplishments/Accoumplishments";
import ManageOwnedCourses from "../../features/courses/ManageOwnedCourses/ManageOwnedCourses";
import QuizMain from "../../features/Quiz/Quiz";
import ListCoursesChangeRequest from "../../features/AdminChangesRequest/ListingCoursesChangesRequests/ListChangesRequest";
import ListingUsersChangeRequst from "../../features/AdminChangesRequest/ListingUsersChangesRequests/ListUsersChangesRequests";
import ManageCategories from "../../features/categories/ListingCategories";
import "react-toastify/dist/ReactToastify.css";
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
import UserDetailsForChangeViewRequest from "features/Users/user details change requests view/UserDetailsViewForChangeRequest";
import PrivateRoute from "admin/AdminProtectedRoutes";
import UserViewDetails from "admin/UserViewDetails/UserViewDetails";
import DonationPage from "donation/UserDonate/DonationPage";
import Transactions from "features/Transactions/TransactionManage/Transactions";
import ActiveUserDetails from "features/Users/user details/UserDetails";
import IDcard from "features/Users/IdCard/IdCard";
import Chat from "member/Chat";
import GroupChat from "member/GroupChat";
import Notification from "../../features/Notifications/Notification";
import ActiveUserDetailsExperimental from "features/Users/user details/UserDetailsExpermiental";

//New Components
import AdminViewUser from "admin/AdminViewUserProfile/AdminViewUser";
import AdminViewUnverifiedUser from "admin/AdminUsersList/AdminViewUnverifiedUser";
import UserRequestChangesListExperimental from "features/AdminChangesRequest/ListingUsersChangesRequests/ListUsersChangesRequestsExperimental";
import ViewUserChangeRequest from "features/AdminChangesRequest/ListingUsersChangesRequests/ViewUserChangeRequest";
import CreateCourse from "courses/courseCreation/CreateCourse";
//import CreateCourseExperimental from 'courses/courseCreation/CreateCourseExperimental';
import CreateModule from "courses/courseCreation/CreateModule";
import CreateSection from "courses/courseCreation/createSection";
import ViewSectionDetails from "courses/courseCreation/ViewSectionDetails";
import ViewTest from "courses/courseTest/ViewTest";
import ViewQuestion from "courses/courseTest/ViewQuestion";
import CreateQuiz from "admin/Quiz/CreateQuiz";
import ViewQuiz from "admin/Quiz/ViewQuiz";
import ViewQuizQuestion from "admin/Quiz/ViewQuizQuestion";
import ViewBundle from "courses/courseBundle/ViewBundle";
import AdminViewUserCourses from "admin/AdminViewUserProfile/AdminViewUserCourses";

import CreateRequestsView from "admin/Instructors/CreateRequestsView";
import ModulesView from "admin/Instructors/ModulesView";
import SectionView from "admin/Instructors/SectionsView";
import SectionDetailView from "admin/Instructors/SectionDetailsView";

import AdminDashboardContent from "./AdminDashboardContent";
import AdminVerifyUser from "admin/AdminUsersList/AdminVerifyUser";
import ListingDonationsTransactionsForAdmin from "features/Transactions/ListingDonationsTransactionsForAdmin";
import TransactionUserDetailsForAdmin from "features/Transactions/TransactionUserDetailsForAdmin";
import ChagePassword from "features/Users/user details/ChangePassword";
import Setup2FA from "screens/Setup2FA";
import UnverifiedEamils from "screens/UnverifiedEmails";
import Directory from "screens/Directory";

{
  /* un-inemplmanted features*/
}
//import SitePagesWelcomeSection from '../SitePagesWelcomeSection/SitePagesWelcomeSection';

export default function AdminDashboard() {
  const url = "/admins";
  const dashboardUrl = "/admins";
  const path = "/admins";

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
                <Header title="Dashboard" sub="Home" role="Admin" url={url} />
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

                <PrivateRoute exact path={`${path}/directory`}>
                  <Directory url={url} />
                </PrivateRoute> 

                <PrivateRoute exact path={`${path}/ChangePassword`}>
                  <ChagePassword url={url} />
                </PrivateRoute>  

                <PrivateRoute exact path={`${path}/setup-2fa`}>
                  <Setup2FA url={url} />
                </PrivateRoute> 

                {/* <Switch>


          <PrivateRoute exact path={`${path}`}>
            <DashboardAdmin url={url} />
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/ID-CARD`}>
            <IDcard></IDcard>
          </PrivateRoute>


          { /* Only for admin */}

                {/* user management */}
                <PrivateRoute path={`${path}/users/details`}>
                  <UserViewDetails url={url}></UserViewDetails>
                </PrivateRoute>

                <PrivateRoute path={`${path}/users/details/:userId`}>
                  <AdminViewUser url={url} />
                </PrivateRoute>

                <PrivateRoute
                  path={`${path}/users/details/:userId/coursedetails`}
                >
                  <AdminViewUserCourses url={url} />
                </PrivateRoute>

                <PrivateRoute
                  path={`${path}/users/details/:userId/userDonations`}
                >
                  <ListingDonationHistory url={"/members"} />
                </PrivateRoute>

                <PrivateRoute exact path={`${path}/users/changes`}>
                  <UserRequestChangesListExperimental url={url}>
                    {" "}
                  </UserRequestChangesListExperimental>
                </PrivateRoute>

                <PrivateRoute exact path={`${path}/users/changes/:userId`}>
                  <ViewUserChangeRequest url={url}> </ViewUserChangeRequest>
                </PrivateRoute>

                <PrivateRoute exact path={`${path}/users/verification`}>
                  <AdminVerifyUser url={url} />
                </PrivateRoute>

                <PrivateRoute exact path={`${path}/users/unverified-emails`}>
                  <UnverifiedEamils url={url}/>
                </PrivateRoute>

                <PrivateRoute exact path={`${path}/users/verification/:userId`}>
                  <AdminViewUnverifiedUser url={url} />
                </PrivateRoute>

                {/* <PrivateRoute exact path={`${path}/users/`}>
              <AdminUserListOne url={url} />
          </PrivateRoute>

          <PrivateRoute exact path ={`${path}/users/changes`} >
            <ListingUsersChangeRequst url={url}> </ListingUsersChangeRequst>
          </PrivateRoute> */}

                {/* <PrivateRoute exact path={`${path}/users/changes/:changeRequestId`}>
            <UserDetailsForChangeViewRequest url={url}></UserDetailsForChangeViewRequest>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/users/:userId`}>
            <AdminProfileInstructor url={url} />
          </PrivateRoute>
 */}

                {/* Courses managment */}

                <PrivateRoute exact path={`${path}/courses/create`}>
                  <CreateCourse url={url}> </CreateCourse>
                </PrivateRoute>

                {/* <PrivateRoute exact path={`${path}/courses/create`}> 
                <CreateCourseExperimental url={url} > </CreateCourseExperimental>     
          </PrivateRoute> */}

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

                <PrivateRoute
                  exact
                  path={`${path}/courses/:courseId/test/:testId`}
                >
                  <ViewTest url={url}> </ViewTest>
                </PrivateRoute>

                <PrivateRoute
                  exact
                  path={`${path}/courses/:courseId/test/:testId/question/:questionId`}
                >
                  <ViewQuestion url={url}> </ViewQuestion>
                </PrivateRoute>

                <PrivateRoute
                  exact
                  path={`${path}/coursebundle/:coursebundleId`}
                >
                  <ViewBundle url={url}> </ViewBundle>
                </PrivateRoute>

                {/* Create Requests */}

                <PrivateRoute exact path={`${path}/createrequests`}>
                  <CreateRequestsView url={url}></CreateRequestsView>
                </PrivateRoute>

                <PrivateRoute
                  exact
                  path={`${path}/createrequests/courses/:courseId/modules`}
                >
                  <ModulesView url={url}></ModulesView>
                </PrivateRoute>

                <PrivateRoute
                  exact
                  path={`${path}/createrequests/courses/:courseId/:moduleId/sections`}
                >
                  <SectionView url={url}></SectionView>
                </PrivateRoute>

                <PrivateRoute
                  exact
                  path={`${path}/createrequests/courses/:courseId/:moduleId/sections/:sectionId/details`}
                >
                  <SectionDetailView url={url}></SectionDetailView>
                </PrivateRoute>

                {/* Create Requests */}

                <PrivateRoute exact path={`${path}/courses/pending`}>
                  <ListPendingCourses url={url}> </ListPendingCourses>
                </PrivateRoute>

                <PrivateRoute exact path={`${path}/courses/manage`}>
                  <ListLiveCourses url={url}></ListLiveCourses>
                </PrivateRoute>

                <PrivateRoute
                  exact
                  path={`${path}/courses/changes/:changeRequestId`}
                >
                  <CourseViewForRequestChange
                    url={url}
                  ></CourseViewForRequestChange>
                </PrivateRoute>

                <PrivateRoute exact path={`${path}/courses/changes`}>
                  <ListCoursesChangeRequest url={url}>
                    {" "}
                  </ListCoursesChangeRequest>
                </PrivateRoute>

                <PrivateRoute path={`${path}/courses/manage/:courseId`}>
                  <AddEditCourse url={url} operation={"Edit"} role={"admin"} />
                </PrivateRoute>

                <PrivateRoute exact path={`${path}/courses/pending/:courseId`}>
                  <CourseViewForApproval
                    url={url}
                    operation={"view"}
                    role={"admin"}
                  ></CourseViewForApproval>
                </PrivateRoute>

                {/* Accoumplishments managment */}
                <PrivateRoute
                  exact
                  path={`${path}/courses/accoumplishments/add`}
                >
                  <ListCoursesThatNeedAccomplishments
                    url={url}
                    operation={"Add"}
                  >
                    {" "}
                  </ListCoursesThatNeedAccomplishments>
                </PrivateRoute>

                <PrivateRoute
                  exact
                  path={`${path}/courses/accoumplishments/modify`}
                >
                  <ListCoursesThatHaveAccomplishments
                    url={url}
                    operation={"Add"}
                  >
                    {" "}
                  </ListCoursesThatHaveAccomplishments>
                </PrivateRoute>

                <PrivateRoute
                  exact
                  path={`${path}/courses/accoumplishments/:courseId/add`}
                >
                  <Accomplishments url={url} operation={"Add"}>
                    {" "}
                  </Accomplishments>
                </PrivateRoute>

                <PrivateRoute
                  exact
                  path={`${path}/courses/accoumplishments/:courseId/modify`}
                >
                  <Accomplishments url={url} operation={"Modify"}>
                    {" "}
                  </Accomplishments>
                </PrivateRoute>

                <PrivateRoute exact path={`${path}/accoumplishments/add`}>
                  <ListCoursesThatNeedAccomplishments url={url}>
                    {" "}
                  </ListCoursesThatNeedAccomplishments>
                </PrivateRoute>

                <PrivateRoute exact path={`${path}/accoumplishments/edit`}>
                  <ListCoursesThatHaveAccomplishments url={url}>
                    {" "}
                  </ListCoursesThatHaveAccomplishments>
                </PrivateRoute>

                <PrivateRoute
                  exact
                  path={`${path}/accoumplishments/add/:courseId`}
                >
                  <Accoumplishments operation={"Add"} url={url}>
                    {" "}
                  </Accoumplishments>
                </PrivateRoute>

                <PrivateRoute
                  exact
                  path={`${path}/accoumplishments/edit/:courseId`}
                >
                  <Accoumplishments operation={"Edit"} url={url}>
                    {" "}
                  </Accoumplishments>
                </PrivateRoute>

                {/* Categories managment */}

                <PrivateRoute exact path={`${path}/categories/manage`}>
                  <ManageCategories url={url}></ManageCategories>
                </PrivateRoute>

                {/* quizzes managment */}

                <PrivateRoute exact path={`${path}/quizzes/create`}>
                  <CreateQuiz url={url}></CreateQuiz>
                </PrivateRoute>

                <PrivateRoute exact path={`${path}/quizzes/details/:quizId`}>
                  <ViewQuiz url={url}></ViewQuiz>
                </PrivateRoute>

                <PrivateRoute
                  exact
                  path={`${path}/quizzes/:quizId/question/details/:questionId`}
                >
                  <ViewQuizQuestion url={url}></ViewQuizQuestion>
                </PrivateRoute>

                {/*<PrivateRoute exact path ={`${path}/quizzes/view/:quizId`}>
                <QuizMain operation={'View'} url={url}> </QuizMain>
            </PrivateRoute>

          <PrivateRoute exact path={`${path}/transactions/manage`}>
                <Transactions url={url}> </Transactions>
          </PrivateRoute> */}

                {/* Only for admin and instructor */}

                {/* Courses managment */}

                {/* <PrivateRoute exact path={`${path}/courses/add`}>
                <AddEditCourse url={url} operation={'Add'} />
              </PrivateRoute>

              <PrivateRoute exact path={`${path}/courses/owned`}>
                <ManageOwnedCourses url={url} role={'admin'} />
              </PrivateRoute> */}

                {/* <PrivateRoute path={`${path}/courses/drafted/:courseId`}>
                <AddEditCourse url={url} nestedOperation={'Add'} operation={'Edit'} role={'admin'}  />
              </PrivateRoute>
              
              <PrivateRoute exact path={`${path}/courses/drafted`}>
                <ListDraftedCourses url={url} > </ListDraftedCourses>
              </PrivateRoute>



              <PrivateRoute path={`${path}/courses/owned/:courseId`}>
                <AddEditCourse url={url} role={'admin'} operation={'Edit'}  />
              </PrivateRoute> */}
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

              <PrivateRoute exact path ={`${path}/quizzes/manage/:quizId`}>
                <QuizMain operation={'Edit'} url={url}> </QuizMain>
              </PrivateRoute> */}

                <PrivateRoute exact path={`${path}/transactions/earnings`}>
                  <ListingDonationsTransactionsForAdmin url={"/admins"} />
                </PrivateRoute>

                <PrivateRoute
                  exact
                  path={`${path}/transactions/userdetails/:userId`}
                >
                  <TransactionUserDetailsForAdmin url={"/admins"} />
                </PrivateRoute>

                {/* for admin/instructor/member */}

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
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/courses/:courseId`}>
            <CourseViewForMember url={url} operation={'consume'} ></CourseViewForMember>
          </PrivateRoute>
          
          <PrivateRoute exact path={`${path}/courses/:courseId/quizzes/:quizId`}>
            <TakingQuiz></TakingQuiz>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/courses/accoumplishments/:courseId`}>
            <Accomplishments url={url} operation={'View'}> </Accomplishments>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/transactions/history`}>
            <ListingDonationHistory url={url}> </ListingDonationHistory>
          </PrivateRoute> */}

                <PrivateRoute exact path={`${path}/transactions/send`}>
                  <DonationPage></DonationPage>
                </PrivateRoute>

                {/* <PrivateRoute exact path={`${path}/profile`}>
            <ActiveUserDetails url={url} />
          </PrivateRoute>  */}

                <PrivateRoute exact path={`${path}/notifications`}>
                  <Notification url={url} dashboardUrl={dashboardUrl} />
                </PrivateRoute>

                {/*           
          <PrivateRoute exact path={`${path}/Chat`}>
            <Chat url={url} />
          </PrivateRoute>


          <PrivateRoute exact path={`${path}/GroupChat`}>
            <GroupChat url={url} /> */}
                {/* </PrivateRoute> */}

                {/* </Switch> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
