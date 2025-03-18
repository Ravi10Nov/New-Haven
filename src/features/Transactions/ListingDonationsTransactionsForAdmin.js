import { getDonationsTransactionForAdmin } from "services/transactionService";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../common/styles/ListingStyles.css";
import { UseSearchQuery } from "hooks/useSearchQuery";
import { EnhancedTable } from "components/SmartTable/SmartTableAdminDonationHistory";
import { dayMonthYear } from "helpers/Date";
import { PaginationComponent } from "features/courses/components/PaginationForAdminDonationHistory";
import Box from "@mui/material/Box";
import Loader from "components/Loader";
import { useAuth } from "hooks/useAuth";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import { toast } from "react-toastify";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import axios from "config/axios";

export const Actions = ({
  url,
  transactionId,
  id,
  status,
  handleEditCallback,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(status);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleStatusUpdate = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/transactions/updateStatus`,
        {
          status: selectedStatus,
          transactionId,
        }
      );

      toast.success("Updated transaction status successfully.");
    } catch (error) {
      console.log("status change error", error);
      toast.error(`Couldn't change status! Please try again later`);
    }
  };

  return (
    <>
      <div className="lc_flex justify-center items-center">
        <Box textAlign="center" className="flex gap-x-1 items-center">
          <select value={selectedStatus} onChange={handleStatusChange}>
            <option value="pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>
          <Button
            variant="contained"
            color="success"
            onClick={handleStatusUpdate}
          >
            Update
          </Button>
        </Box>
        <NavLink to={`${url}/transactions/userdetails/${id}`}>
          <Button variant="contained" sx={{ margin: "auto" }} color="success">
            Details
          </Button>
        </NavLink>
      </div>
    </>
  );
};

const ProductTable = ({ url }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);

  const {
    search,
    bindFormValue,
    setOrderByField,
    sortingOrder,
    setCount,
    setPage,
  } = UseSearchQuery();
  const [orderObject, setOrderObject] = useState({
    order: null,
    orderBy: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [showDescriptionColumn, setShowDescriptionColumn] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [startedDownload, setStartedDownload] = useState(false);

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    if (rows.length > 0) {
      const startIdx = (currentPage - 1) * itemsPerPage;
      const endIdx = Math.min(startIdx + itemsPerPage, rows.length);
      checkDescriptionColumn(rows.slice(startIdx, endIdx));
    }
  }, [rows, currentPage, itemsPerPage]);

  const onDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const onFocusChange = (focusedInput) => {
    setFocusedInput(focusedInput);
  };

  const checkDescriptionColumn = (currentRows) => {
    if (!currentRows || currentRows.length === 0) {
      setShowDescriptionColumn(false);
      return;
    }
    const hasDescription = currentRows.some(
      (row) => row.description && row.description.trim() !== ""
    );
    setShowDescriptionColumn(hasDescription);
  };
  const handleCleanSlate = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete all donations? This action cannot be undone."
      )
    ) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/api/transactions/all`
        );
        toast.success("All donations have been deleted");
        initData(); // Refresh the data
      } catch (error) {
        console.error("Error deleting all donations:", error);
        toast.error("Failed to delete all donations");
      }
    }
  };
  const initData = async () => {
    try {
      setIsLoading(true);
      const response = await getDonationsTransactionForAdmin(search, user._id);
      console.log("admin donation listing", response);
      setIsLoading(false);
      setRows(response.data.donations);
      setTotalEntries(response.data.total);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  function monthDayYear(d) {
    const parsedDate = new Date(d);
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
      parsedDate
    );
    let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(
      parsedDate
    );
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
      parsedDate
    );
    return `${mo}-${da}-${ye}`;
  }
  const renderDate = (field, row) => {
    return monthDayYear(row[field]);
  };

  const generateHeaders = (showDescriptionColumn) => [
    { label: "ID number", id: "_id", align: "start" },
    {
      label: "Date",
      formattingCallbackV2: renderDate,
      id: "createdAt",
      align: "start",
    },
    {
      label: "Transaction Type",
      id: "transaction_type",
      defaultValue: "PayPal",
      align: "start",
    },
    { label: "Donation Type", id: "purchasedItems", align: "start" },
    ...(showDescriptionColumn
      ? [{ label: "Description", id: "description", align: "start" }]
      : []),
    { label: "Amount", id: "amount", align: "start" },
    // { label: "To", id: "EMPTY", defaultValue: "Website", align: "start" },
    { label: "Status", id: "status", align: "start" },
  ];

  const handleDownload = async () => {
    const starting = moment(startDate).format("YYYY-MM-DD");
    const ending = moment(endDate).format("YYYY-MM-DD");
    console.log("starting date", starting, "ending", ending);

    if (starting && ending) {
      try {
        setStartedDownload(true);
        const response = await axios.get("/api/transactions/download", {
          params: { starting, ending },
          responseType: "blob", // Add this line
        });
        setStartedDownload(false);
        console.log("response", response);
        const downloadLink = window.URL.createObjectURL(
          new Blob([response.data])
        );
        const link = document.createElement("a");
        link.href = downloadLink;
        link.setAttribute("download", "donations.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error(error);
        toast.error("Error generating download");
      }
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container-fluid">
        <div className="AdminDashboardContentPanel">
          <div className="flex justify-between items-center  mr-3   mb-4">
            <div className="flex gap-2 items-center">
              <DateRangePicker
                startDate={startDate}
                startDateId="startDateId"
                endDate={endDate}
                endDateId="endDateId"
                onDatesChange={onDatesChange}
                focusedInput={focusedInput}
                onFocusChange={onFocusChange}
                showClearDates={true}
                block={false}
                numberOfMonths={2}
                customInputIconName="calendar"
                withPortal
                readOnly={false}
                isOutsideRange={() => false}
              />
              <Button
                onClick={handleDownload}
                variant="contained"
                color="success"
              >
                {startedDownload ? "Downloading" : "Download"}
              </Button>
            </div>
            <Button
              onClick={handleCleanSlate}
              variant="contained"
              color="error"
            >
              Clean Slate
            </Button>
          </div>

          <EnhancedTable
            actionsAdditionalFields={["status"]}
            url={url}
            tableName="List of Donations"
            startIndex={(currentPage - 1) * itemsPerPage + 1}
            endIndex={Math.min(currentPage * itemsPerPage, rows.length)}
            headers={generateHeaders(showDescriptionColumn)}
            rows={rows}
            setOrderOnParent={(state) => {
              sortingOrder(state.order);
              setOrderByField(state.orderBy);
            }}
          />

          <PaginationComponent
            initTotalEntries={totalEntries}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            rows={rows}
          />
        </div>
      </div>
    </>
  );
};

export default function ListingDonationsTransactionsForAdmin({ url }) {
  return (
    <div className="App w-100">
      <ProductTable url={url} />
    </div>
  );
}
