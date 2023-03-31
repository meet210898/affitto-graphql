import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_ALL_CITIES } from "../../../gqloperations/queries";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton } from "@mui/material";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

import ModalCall from "../EditModals/EditCity";
import DeleteCity from "../DeleteModals/DeleteCity";
import TablePaginationActions from "../../components/TablePagination";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CityList = () => {
  const navigate = useNavigate();
  const { REACT_APP_BASE_URL } = process.env;

  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [id, setId] = useState("");
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { error, data, loading } = useQuery(GET_ALL_CITIES);
  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log("error", error);
  }

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const editHandler = (row) => setEditData(row);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "right",
        }}
      >
        <Button
          style={{
            background: "black",
            color: "white",
          }}
          onClick={() => navigate("/Admin/addCity")}
        >
          Add City
        </Button>
      </div>
      <TableContainer component={Paper}>
        <DeleteCity
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
          id={id}
        />
        <ModalCall open={openEdit} setOpen={setOpenEdit} editData={editData} />
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="left">State Name</StyledTableCell>
              <StyledTableCell align="left">City Name</StyledTableCell>
              <StyledTableCell align="left">City Image</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data?.city?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : data?.city
            ).map((row, index) => (
              <StyledTableRow key={page * rowsPerPage + (index + 1)}>
                <StyledTableCell component="th" scope="row">
                  {page * rowsPerPage + (index + 1)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.stateId.stateName}
                </StyledTableCell>
                <StyledTableCell align="left">{row.cityName}</StyledTableCell>
                <StyledTableCell align="left">
                  <img
                    height="80px"
                    width="80px"
                    style={{ borderRadius: "100%" }}
                    src={`${REACT_APP_BASE_URL}${row.cityImage}`}
                    alt="City"
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => {
                      editHandler(row);
                      setOpenEdit(true);
                    }}
                    aria-label="edit"
                    size="large"
                    color="primary"
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="large"
                    style={{ color: "red" }}
                    onClick={() => {
                      setId(row._id);
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure to delete this record?",
                        subTitle: "You can't undo this operation",
                      });
                    }}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={data?.city?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CityList;
