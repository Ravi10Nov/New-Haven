import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import "../../common/styles/ListingStyles.css";
// import { approveUserChangeRequest, disapproveUserChangeRequest, getUserChangeRequests } from '../../../services/changesService';
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Loader from "components/Loader";

import { Col, Form, Row } from "react-bootstrap";
import { UseSearchQuery } from "hooks/useSearchQuery";
import { PaginationComponent } from "features/courses/components/Paginitation";
import { EnhancedTable } from "components/SmartTable/SmartTable";
import UserChangeRequestsTable from "./UserChangeRequestsTable";
import { dayMonthYear } from "helpers/Date";
import { useAuth } from "hooks/useAuth";

const UserRequestChangesListExperimental = ({ url }) => {
  const {
    search,
    bindFormValue,
    setOrderByField,
    sortingOrder,
    setCount,
    setPage,
  } = UseSearchQuery();
  // const [ isLoading, setIsLoading ] = useState(true);
  const { getUserChangeRequests } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [rows, setRows] = useState([]);

 
  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    if (search) {
      initData();
    }
  }, [search]);

  const initData = async () => {
    setIsLoading(true);
    const response = await getUserChangeRequests();
    console.log(response);
    setRows(response.requests);
    setTotalEntries(response.totalEntries);
    setIsLoading(false);
    setIsLoading(false);
  };

  if (!isLoading)
    return (
      <div className="w-100">
        <div className="container-fluid">
          <div className="AdminDashboardContentPanel">
            <UserChangeRequestsTable requests={rows} initData={initData} />
          </div>
        </div>
      </div>
    );
  else {
    return <Loader />;
  }
};

export default UserRequestChangesListExperimental;
