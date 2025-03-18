import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";

import "../common/styles/ListingStyles.css";
import { toast } from "react-toastify";
import { UseSearchQuery } from "hooks/useSearchQuery";
import { EnhancedTable } from "components/SmartTable/SmartTable1";
import { dayMonthYear } from "helpers/Date";
import { getDonationsHistoryForUser } from "services/transactionService";
import Loader from "components/Loader";
import { useAuth } from "hooks/useAuth";
import axios from "config/axios";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { PaginationComponent } from "features/courses/components/PaginationForAdminDonationHistory";

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
  const { userId: memberId } = useParams();
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);

  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const isAdmin = user.role === "admin";

  const userId = memberId || user._id;

  const [totalEntries, setTotalEntries] = useState(0);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [newDescription, setNewDescription] = useState("");

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleEditClick = (transactionId, currentDescription) => {
    setEditingTransactionId(transactionId);
    setNewDescription(currentDescription);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/transactions/${editingTransactionId}`,
        {
          description: newDescription,
        }
      );
      toast.success("Transaction description updated successfully.");
      setEditModalOpen(false);
      initData();
    } catch (error) {
      console.error("Edit error", error);
      toast.error("Couldn't update the transaction. Please try again later.");
    }
  };

  useEffect(() => {
    if (search) {
      initData();
    }
  }, [search]);
  //
  const initData = async () => {
    const response = await getDonationsHistoryForUser(search, userId);

    console.log("hisrty donation", response);

    // debugger;
    setRows(response.data.donations);
    setTotalEntries(response.data.donations.length);
    setIsLoading(false);
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

  const renderAmount = (field, row) => {
    return row[field] ? `$${row[field]}.00` : "0";
  };

  const headers = [
    { label: "ID Number", id: "_id", align: "start" },
    {
      label: "Date",
      id: "createdAt",
      formattingCallbackV2: renderDate,
      align: "start",
    },
    {
      label: "Amount",
      id: "amount",
      // formattingCallbackV2: renderAmount,
      // additional_text: "$",
      align: "start",
      dontUseForOrder: true,
    },
    { label: "Description", id: "description", align: "start" },
    { label: "Status", id: "status", align: "start" },
    ...(isAdmin
      ? [
        {
          label: "Actions",
          id: "actions",
          align: "center",
          dontUseForOrder: true,
        },
      ]
      : []),
  ];
  const handleDelete = async (transactionId) => {
    console.log("transactionId:", transactionId)
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/transactions/${transactionId}`
      );
      toast.success("Transaction deleted successfully.");
      initData();
    } catch (error) {
      console.error("Delete error", error);
      toast.error("Couldn't delete the transaction. Please try again later.");
    }
  };

  const handleEdit = async (transactionId, newDescription) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/transactions/${transactionId}`,
        {
          description: newDescription,
        }
      );
      toast.success("Transaction description updated successfully.");
      initData();
    } catch (error) {
      console.error("Edit error", error);
      toast.error("Couldn't update the transaction. Please try again later.");
    }
  };
  console.log("rows: " ,rows);
  if (!isLoading) {
    return (
      <>
        <div className="container-fluid">
          <div className="AdminDashboardContentPanel">
            <EnhancedTable
              actionsAdditionalFields={["quiz"]}
              url={url}
              tableName={"Donation History"}
              startIndex={(currentPage - 1) * itemsPerPage + 1}
              endIndex={Math.min(currentPage * itemsPerPage, rows.length)}
              headers={headers}
              rows={rows}
              setOrderOnParent={(state) => {
                sortingOrder(state.order);
                setOrderByField(state.orderBy);
              }}
              actions={(row) =>
                user.role === "admin" ? (
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(row.row._id)}
                    >
                      Delete
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleEditClick(row.row._id, row.row.description)
                      }
                    >
                      Edit
                    </Button>
                  </div>
                ) : null
              }
            />
            <Modal
              open={editModalOpen}
              onClose={() => setEditModalOpen(false)}
              aria-labelledby="edit-description-modal"
              aria-describedby="edit-transaction-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: { xs: "75%", md: "50%" },
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Typography
                  id="edit-description-modal"
                  variant="h6"
                  component="h2"
                  gutterBottom
                >
                  Edit Transaction Description
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  margin="normal"
                />
                <Box
                  sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    onClick={() => setEditModalOpen(false)}
                    sx={{ mr: 2 }}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={handleEditSubmit}>
                    Save Changes
                  </Button>
                </Box>
              </Box>
            </Modal>
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
  } else {
    return <Loader />;
  }
};

export default function AdminSitePages({ url }) {
  return (
    <div className="App w-100">
      <ProductTable url={url} />
    </div>
  );
}
