import Button from "@mui/material/Button";

import "../common/styles/ListingStyles.css";
import { toast } from "react-toastify";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Box from "@mui/material/Box";
import {
  getCoursesTransactionForAdmin,
  updateTransaction,
} from "services/transactionService";
import React, { useEffect, useState } from "react";
import "../common/styles/ListingStyles.css";
import { UseSearchQuery } from "hooks/useSearchQuery";
import { EnhancedTable } from "components/SmartTable/SmartTable";
import { dayMonthYear } from "helpers/Date";
import { PaginationComponent } from "features/courses/components/Paginitation";

const actions = ({ url, id, status, handleEditCallback }) => {
  const handleStatusChange = async (transactionId, status) => {
    try {
      const data = { status };
      if (status == "COMPLETED") {
        data["payout_date"] = Date.now();
      }
      const response = await updateTransaction(transactionId, data);
      await handleEditCallback();
      toast.success("Transactoin status been updated successfuly");
    } catch {
      toast.error("something went wrong try again");
    }
  };

  return (
    <>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Box textAlign="center">
              {status != "PENDING" || (
                <Button
                  {...bindTrigger(popupState)}
                  variant="contained"
                  sx={{ margin: "auto" }}
                  color={"warning"}
                  className=" m-auto"
                >
                  {" "}
                  Pending{" "}
                </Button>
              )}
              {status != "COMPLETED" || (
                <Button
                  {...bindTrigger(popupState)}
                  variant="contained"
                  sx={{ margin: "auto" }}
                  color={"success"}
                >
                  {" "}
                  Completed{" "}
                </Button>
              )}
              {status == "PENDING" || status == "COMPLETED" || (
                <Button
                  {...bindTrigger(popupState)}
                  variant="contained"
                  sx={{ margin: "auto" }}
                  className="bt_danger m-auto"
                >
                  {" "}
                  Unkown status{" "}
                </Button>
              )}
            </Box>
            <Menu {...bindMenu(popupState)}>
              <MenuItem
                onClick={() => {
                  handleStatusChange(id, "COMPLETED");
                  popupState.close();
                }}
              >
                Completed
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleStatusChange(id, "PENDING");
                  popupState.close();
                }}
              >
                Pending
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
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
  const [isLoading, setIsLoading] = useState(true);

  const [rows, setRows] = useState([]);

  const [totalEntries, setTotalEntries] = useState(0);
  const [selectedItem, setSelectedItem] = useState({ name: "", id: "" });
  const [showCategoryModal, SetShowCategoryModal] = useState(null);

  useEffect(() => {
    if (search) {
      initData();
    }
  }, [search]);

  const HandleEditButton = (categoryId, categoryName) => {
    setSelectedItem({ name: categoryName, id: categoryId });
    SetShowCategoryModal(true);
  };

  const handleCloseModal = (modalState) => {
    SetShowCategoryModal(modalState);
  };

  const handleAddCategory = () => {
    setSelectedItem({ name: null, id: null });
    SetShowCategoryModal(true);
    initData();
  };

  const initData = async () => {
    const response = await getCoursesTransactionForAdmin(search);
    debugger;
    setRows(response.data.data);
    setTotalEntries(response.data.totalCount);
    setIsLoading(false);
  };

  const renderDate = (field, row) => {
    return dayMonthYear(row[field]);
  };
  const renderToField = (field, row) => {
    return row["to"][field];
  };
  const renderFromField = (field, row) => {
    return row["from"][field];
  };

  const headers = [
    { label: "Transaction id", id: "_id", align: "start" },
    {
      label: "Transaction date",
      formattingCallbackV2: renderDate,
      id: "createdAt",
      align: "start",
    },
    { label: "Transaction type", id: "transaction_type", align: "start" },
    { label: "purchased item", id: "perchaused_item", align: "start" },
    { label: "Amount", id: "amount", align: "start" },
    {
      label: "From",
      id: "email",
      formattingCallbackV2: renderFromField,
      align: "start",
    },
    {
      label: "To",
      id: "email",
      formattingCallbackV2: renderToField,
      align: "start",
    },
    {
      label: "Payout Date",
      id: "payout_date",
      formattingCallbackV2: renderDate,
      defaultValue: "Admin didn't make the payout",
      align: "start",
    },
  ];

  if (!isLoading) {
    return (
      <>
        <div className="container-fluid">
          <div className="AdminDashboardContentPanel">
            <EnhancedTable
              actions={(props) =>
                actions({ ...props, handleEditCallback: initData })
              }
              // actionsAdditionalFields={["status"]}
              url={url}
              tableName={"List of Donations"}
              headers={headers}
              rows={rows}
              setOrderOnParent={(state) => {
                sortingOrder(state.order);
                setOrderByField(state.orderBy);
              }}
            />

            <PaginationComponent
              initTotalEntries={totalEntries}
              initItemsPerPageCount={5}
              initPageNumber={1}
              setParamsOnParent={({ page, itemsPerPageCount }) => {
                setPage(page);
                setCount(itemsPerPageCount);
              }}
            ></PaginationComponent>
          </div>
        </div>
      </>
    );
  }
};

export default function ListingCoursesTransactionsForAdmin({ url }) {
  return (
    <div className="App w-100">
      <ProductTable url={url} />
    </div>
  );
}
