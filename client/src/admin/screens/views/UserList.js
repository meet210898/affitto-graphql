import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../../gqloperations/queries";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { UPDATE_IS_VERIFY } from "../../../gqloperations/mutation";

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

const UserList = () => {
  const { REACT_APP_BASE_URL } = process.env;

  const [updateIsVerify] = useMutation(UPDATE_IS_VERIFY, {
    onCompleted: (data) => console.log("updated user data==", data),
    refetchQueries: [GET_ALL_USERS, "user"],
  });

  const { error, data, loading } = useQuery(GET_ALL_USERS);
  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log("error", error);
  }

  const editStatus = (userId, isVerify) => {
    updateIsVerify({
      variables: {
        userVerify: {
          _id: userId,
          isVerify: !isVerify,
        },
      },
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Phone Number</StyledTableCell>
            <StyledTableCell align="left">Address</StyledTableCell>
            <StyledTableCell align="left">Pincode</StyledTableCell>
            <StyledTableCell align="left">State</StyledTableCell>
            <StyledTableCell align="left">City</StyledTableCell>
            <StyledTableCell align="left">Username</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Is Verify</StyledTableCell>
            <StyledTableCell align="left">Personal Image</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.user
            ?.slice(0)
            .reverse()
            .map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="left">{`${row.firstName} ${row.lastName}`}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.phoneNumber}
                </StyledTableCell>
                <StyledTableCell align="left">{row.address}</StyledTableCell>
                <StyledTableCell align="left">{row.pincode}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.stateId.stateName}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.cityId === null
                    ? "City is not defined"
                    : row.cityId.cityName}
                </StyledTableCell>
                <StyledTableCell align="left">{row.username}</StyledTableCell>
                <StyledTableCell align="left">{row.email}</StyledTableCell>
                <StyledTableCell align="left">
                  <Button
                    variant="contained"
                    style={{
                      height: "auto",
                      width: "auto",
                      fontWeight: "bold",
                    }}
                    color={row.isVerify === true ? "success" : "error"}
                    onClick={() => {
                      editStatus(row._id, row.isVerify);
                    }}
                  >
                    {row.isVerify ? "Verified" : "Not Verified"}
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <img
                    height="80px"
                    width="80px"
                    style={{ borderRadius: "100%" }}
                    src={`${REACT_APP_BASE_URL}${row.personalImage}`}
                    alt="Personal img"
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
