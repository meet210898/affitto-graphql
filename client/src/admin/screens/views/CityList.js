import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CITIES } from "../../../gqloperations/queries";
import { DELETE_CITIES } from "../../../gqloperations/mutation";

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
import { IconButton } from "@mui/material";

import ModalCall from "../EditModals/EditCity";
import DeleteModal from "../DeleteModals";

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
  const { REACT_APP_BASE_URL } = process.env;

  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [id, setId] = useState("");
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const [deleteCity] = useMutation(DELETE_CITIES, {
    onCompleted: (data) => console.log("deleted city data==", data),
    refetchQueries: [GET_ALL_CITIES, "city"],
  });

  const { error, data, loading } = useQuery(GET_ALL_CITIES);
  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log("error", error);
  }

  const editHandler = (row) => setEditData(row);

  return (
    <TableContainer component={Paper}>
      <DeleteModal
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        id={id}
        deleteItem={deleteCity}
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
          {data?.city
            ?.slice(0)
            .reverse()
            .map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
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
                      console.log("row", row);
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
      </Table>
    </TableContainer>
  );
};

export default CityList;
