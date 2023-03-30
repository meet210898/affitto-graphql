import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKINGS } from "../../../gqloperations/queries";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

const BookingList = () => {
  const { error, data, loading } = useQuery(GET_ALL_BOOKINGS);
  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log("error", error);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell align="left">User Name</StyledTableCell>
            <StyledTableCell align="left">Company Name</StyledTableCell>
            <StyledTableCell align="left">Vehicle Name</StyledTableCell>
            <StyledTableCell align="left">Start Date</StyledTableCell>
            <StyledTableCell align="left">End Date</StyledTableCell>
            <StyledTableCell align="left">Payment</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.booking?.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="left">{`${row.userId.firstName} ${row.userId.lastName}`}</StyledTableCell>
              <StyledTableCell align="left">
                {row.companyId.companyName}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.vehicleId.vehicleName}
              </StyledTableCell>
              <StyledTableCell align="left">{row.startDate}</StyledTableCell>
              <StyledTableCell align="left">{row.endDate}</StyledTableCell>
              <StyledTableCell align="left">{row.payment}</StyledTableCell>
              <StyledTableCell align="left">
                {row.status ? "Approved" : "Pending"}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookingList;
