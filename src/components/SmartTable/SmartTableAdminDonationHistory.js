import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Loader from "components/Loader";
import { Button, Modal, TextField, Typography } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { visuallyHidden } from "@mui/utils";
import axios from "config/axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAuth } from "hooks/useAuth";
import { Actions } from "features/Transactions/ListingDonationsTransactionsForAdmin";

function EnhancedTableHead({ headCells, orderBy, order, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell className={"p-0 m-0 w-0 "}></TableCell>

        {headCells.map((headCell, index) => {
          return (
            <TableCell
              key={headCell.id}
              align={headCell.align}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <div
                className={`w-full flex justify-${headCell.align} text-white`}
              >
                {headCell.dontUseForOrder ? (
                  headCell.label
                ) : (
                  <>
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      align={headCell.align}
                      onClick={createSortHandler(headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </>
                )}
              </div>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export function EnhancedTable({
  url,
  actionsAdditionalFields = [],
  headers,
  tableName,
  rows,
  startIndex,
  endIndex,
  defaultOrder,
  setOrderOnParent,
  actions,
}) {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState(defaultOrder || "createdAt");
  const [searchQuery, setSearchQuery] = useState("");
  const [donations, setDonations] = useState(rows);
  const { user } = useAuth();
  const [dense, setDense] = useState(false);
  const [showDescriptionColumn, setShowDescriptionColumn] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [newDescription, setNewDescription] = useState("");

  const handleEdit = (transactionId, currentDescription) => {
    setEditingTransactionId(transactionId);
    setNewDescription(currentDescription);
    setEditModalOpen(true);
  };

  const handleDelete = async (transactionId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/transactions/${transactionId}`
      );
      toast.success("Transaction deleted successfully");
      // Refresh the data
      filterRows();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction");
    }
  };

  const handleSaveDescription = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/transactions/${editingTransactionId}`,
        {
          description: newDescription,
        }
      );
      toast.success("Description updated successfully");
      setEditModalOpen(false);
      // Refresh the data
      filterRows();
    } catch (error) {
      console.error("Error updating description:", error);
      toast.error("Failed to update description");
    }
  };

  useEffect(() => {
    filterRows();
    checkDescriptionColumn();
  }, [order, rows, startIndex, endIndex]);

  const checkDescriptionColumn = () => {
    const currentPageRows = rows.slice(startIndex - 1, endIndex);
    const hasDescription = currentPageRows.some(
      (row) => row.description && row.description.trim() !== ""
    );
    setShowDescriptionColumn(hasDescription);
  };

  const filterRows = () => {
    const handleSort = (data, order) => {
      return data.sort((a, b) => {
        const orderFactor = order === "asc" ? 1 : -1;
        const valueA = String(a[orderBy] || "").toLowerCase();
        const valueB = String(b[orderBy] || "").toLowerCase();
        return valueA.localeCompare(valueB) * orderFactor;
      });
    };

    const sortedAndFilteredDonations = handleSort(
      rows.filter((donation) => {
        const searchTermLower = searchQuery.trim().toLowerCase();
        return (
          String(donation.amount).toLowerCase().includes(searchTermLower) ||
          (donation.currency &&
            donation.currency.toLowerCase().includes(searchTermLower)) ||
          (donation.purchasedItems &&
            donation.purchasedItems.toLowerCase().includes(searchTermLower)) ||
          (donation.status &&
            donation.status.toLowerCase().includes(searchTermLower)) ||
          (donation.user &&
            donation.user.toLowerCase().includes(searchTermLower))
        );
      }),
      order
    );

    setDonations(sortedAndFilteredDonations);
  };

  useEffect(() => {
    setOrderOnParent({ order: order === "asc" ? 1 : -1, orderBy: orderBy });
  }, [order, orderBy]);

  const handleRequestSort = (event, property) => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setOrderBy(property);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      {!tableName || (
        <div className="userListBtn_parent">
          <button id="user_list_btn">{tableName}</button>
        </div>
      )}
      <hr className="mt-0" />

      <Box sx={{ width: "100%" }} className="px-4 pb-3">
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                headCells={[
                  ...headers.filter(
                    (header) =>
                      header.id !== "description" || showDescriptionColumn
                  ),
                  { id: "actions", label: "Actions", align: "right" },
                ]}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {donations.slice(startIndex - 1, endIndex).map((row, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row._id || index}
                  >
                    <TableCell className={"p-0 m-0 w-0 "}></TableCell>
                    {headers
                      .filter(
                        (header) =>
                          header.id !== "description" || showDescriptionColumn
                      )
                      .map((header) => {
                        if (header.formattingCallback) {
                          const formattingCallBack = header.formattingCallback;
                          return (
                            <TableCell align="left" key={header.id}>
                              {row[header.id]
                                ? formattingCallBack(row[header.id])
                                : formattingCallBack(header.defaultValue)}
                              {header.additional_text && row[header.id]
                                ? header.additional_text
                                : ""}
                            </TableCell>
                          );
                        }

                        if (header.formattingCallbackV2) {
                          const formattingCallBack =
                            header.formattingCallbackV2;
                          return (
                            <TableCell align="left" key={header.id}>
                              {row["donationDate"] !== null
                                ? formattingCallBack("donationDate", row)
                                : formattingCallBack(header.id, row)}
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell align="left" key={header.id}>
                            {header.id === "amount"
                              ? `$${parseFloat(row[header.id]).toFixed(2)}`
                              : typeof row[header.id] === "number"
                              ? `$${row[header.id]}`
                              : row[header.id] || header.defaultValue}
                            {header.additional_text && row[header.id]
                              ? header.additional_text
                              : ""}
                            {header.id === "Status" && (
                              <Actions
                                url={url}
                                transactionId={row._id}
                                id={row.userId}
                                status={row.status}
                              />
                            )}
                          </TableCell>
                        );
                      })}

                    <TableCell align="right">
                      <Button
                        startIcon={<EditIcon />}
                        onClick={() => handleEdit(row._id, row.description)}
                      >
                        Edit
                      </Button>
                      <Button
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(row._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

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
          <Button
            onClick={handleSaveDescription}
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>
        </Box>
      </Modal>
    </>
  );
}
