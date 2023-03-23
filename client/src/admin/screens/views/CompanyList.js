import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_COMPANIES } from "../../../gqloperations/queries";
import { DELETE_COMPANIES } from "../../../gqloperations/mutation";

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

import ModalCall from "../EditModals/EditCompany";
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

const CompanyList = () => {
  const { REACT_APP_BASE_URL } = process.env;

  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [id, setId] = useState("");
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const [deleteCompany] = useMutation(DELETE_COMPANIES, {
    onCompleted: (data) => console.log("deleted city data==", data),
    refetchQueries: [GET_ALL_COMPANIES, "company"],
  });

  const { error, data, loading } = useQuery(GET_ALL_COMPANIES);
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
        deleteItem={deleteCompany}
      />
      <ModalCall open={openEdit} setOpen={setOpenEdit} editData={editData} />
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell align="left">Vehicle Type</StyledTableCell>
            <StyledTableCell align="left">Company Name</StyledTableCell>
            <StyledTableCell align="left">Company Logo</StyledTableCell>
            <StyledTableCell align="left">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.company
            ?.slice(0)
            .reverse()
            .map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.typeId.typeName}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.companyName}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <img
                    height="80px"
                    width="80px"
                    style={{ borderRadius: "100%" }}
                    src={`${REACT_APP_BASE_URL}${row.companyLogo}`}
                    alt="Company Logo"
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

export default CompanyList;
