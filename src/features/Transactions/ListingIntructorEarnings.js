import { getEarningsForInstructor } from "services/transactionService";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import "../common/styles/ListingStyles.css";
import { UseSearchQuery } from "hooks/useSearchQuery";
import { EnhancedTable } from "components/SmartTable/SmartTable";
import { dayMonthYear } from "helpers/Date";
import { PaginationComponent } from "features/courses/components/Paginitation";
import Box from "@mui/material/Box";
import Loader from "components/Loader";

const actions = ({ url, id, status, handleEditCallback }) => {
  return (
    <>
      <div className="lc_flex justify-center items-center">
        <Box textAlign="center">
          {status != "PENDING" || (
            <Button
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
              variant="contained"
              sx={{ margin: "auto" }}
              className="bt_danger m-auto"
            >
              ' Unkown status '
            </Button>
          )}
        </Box>
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
    const response = await getEarningsForInstructor(search);

    setRows(response.data.data);
    setTotalEntries(response.data.totalCount);
    setIsLoading(false);
  };

  const renderDate = (field, row) => {
    if (!row[field]) {
      return "Still Pending";
    }
    return dayMonthYear(row[field]);
  };

  const renderFromField = (field, row) => {
    return row["from"][field];
  };

  const headers = [
    { label: "Transaction id", id: "_id", align: "start" },
    {
      label: "Transaction Created Date",
      formattingCallbackV2: renderDate,
      id: "createdAt",
      align: "start",
    },
    {
      label: "Payout Date",
      formattingCallbackV2: renderDate,
      id: "payout_date",
      align: "start",
    },
    {
      label: "from",
      id: "email",
      formattingCallbackV2: renderFromField,
      align: "start",
    },
    { label: "purchased item", id: "perchaused_item", align: "start" },
    { label: "Amount", id: "amount", align: "start" },
    {
      label: "Dralla amount",
      id: "amount",
      formattingCallback: (value) => value * 0.3,
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
                actions({ ...props, handleEditCallback: HandleEditButton })
              }
              actionsAdditionalFields={["status"]}
              url={url}
              tableName={"Earnings"}
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
  } else {
    return <Loader />;
  }
};

export default function ListingDonationsTransactionsForAdmin({ url }) {
  return (
    <div className="App w-100">
      <ProductTable url={url} />
    </div>
  );
}
