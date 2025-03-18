import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TextField from "@mui/material/TextField";
import { visuallyHidden } from "@mui/utils";
import Loader from "components/Loader";
import { useAuth } from "hooks/useAuth";
import { useEffect, useState } from "react";

function EnhancedTableHead({
  headCells,
  orderBy,
  order,
  tableName,
  onRequestSort,
  actions,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const { user , updateJoiningDate } = useAuth();
  return (
    <TableHead>
      <TableRow>
        <TableCell className={"p-0 m-0 w-0 "}></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <div className={`w-full flex justify-${headCell.align} text-white`}>
              {headCell.dontUseForOrder ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  align={headCell.align}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc" ? "sorted descending" : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              )}
            </div>
          </TableCell>
        ))}
        {tableName == "User List" && (
          <TableCell>
            <div className={`w-full flex justify-center `}>
              <TableSortLabel>Status</TableSortLabel>
            </div>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

export function EnhancedTable({
  url,
  actionsAdditionalFields = [],
  headers,
  startIndex,
  endIndex,
  tableName,
  rows,
  defaultOrder,
  setOrderOnParent,
  actions,
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(defaultOrder || "createdAt");
  const [profiles, setProfiles] = useState(rows);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [joiningDates, setJoiningDates] = useState({});
  const { user, updateJoiningDate } = useAuth();

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleJoiningDate = (e, id) => {
    e.preventDefault();
    const newDate = e.target.value;
    setJoiningDates((prev) => ({ ...prev, [id]: newDate }));
    updateJoiningDate(id, newDate);
  };

  useEffect(() => {
    const initialJoiningDates = {};
    profiles.forEach(row => {
      initialJoiningDates[row.id] = convertTimestampToDate(row.joiningDate);
    });
    setJoiningDates(initialJoiningDates);
  }, [profiles]);

  const filterRows = () => {
    const handleSort = (data, order) => {
      if (!order) return data;
      return data.sort((a, b) => {
        const orderFactor = order === "asc" ? 1 : -1;
        const valueA = String(a[orderBy]).toLowerCase();
        const valueB = String(b[orderBy]).toLowerCase();
        return valueA.localeCompare(valueB) * orderFactor;
      });
    };

    const sortedAndFilteredRows = handleSort(
      rows.filter((row) => {
        const searchTerm = searchQuery.trim().toLowerCase();
        if(searchTerm === ""){
            return true
        }else{
          return (
            row.firstname?.toLowerCase().includes(searchTerm) ||
            row.email?.toLowerCase().includes(searchTerm) 
          );
        }
      }),
      order
    );

    setProfiles(sortedAndFilteredRows);
  };

  useEffect(() => {
    filterRows();
  }, [searchQuery, order, rows]);

  const handleRequestSort = (event, property) => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setOrderBy(property);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  if (!isLoading) {
    return (
      <>
        <Box mb={2} mt={2} className="rounded-md border border-gray-300">
          {user.role === "admin" && tableName === "User List" && (
            <TextField
              label="Search by Firstname or Email"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearch}
              fullWidth
            />
          )}
        </Box>

        <Box sx={{ width: "100%" }} className="px-4 pb-3">
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                <EnhancedTableHead
                  actionsAdditionalFields={actionsAdditionalFields}
                  order={order}
                  orderBy={orderBy}
                  headCells={headers}
                  tableName={tableName}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                  actions={actions}
                />
                <TableBody>
                  {profiles.slice(startIndex - 1, endIndex ).map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell className={"flex items-center justify-center"} align="center">
                        {actions({
                          url,
                          id: row.user,
                          ...Object.assign({}, ...actionsAdditionalFields.map(field => ({ [field]: row[field] }))),
                        })}
                      </TableCell>
                      {headers.map((header) => (
                        <TableCell align="left" key={header.id}>
                          {header.id === "joiningDate" ? (
                            <input
                              type="date"
                              value={joiningDates[row.user] || convertTimestampToDate(row.joiningDate)}
                              onChange={(e) => handleJoiningDate(e, row.user)}
                            />
                          ) : (
                            row[header.id] || header.defaultValue
                          )}
                          {header.additional_text && row[header.id] && header.additional_text}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </>
    );
  } else {
    return <Loader />;
  }
}
