import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../../gqloperations/queries";
import { UPDATE_IS_VERIFY } from "../../../gqloperations/mutation";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

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

const UserList = () => {
  const { REACT_APP_BASE_URL } = process.env;

  const [updateIsVerify] = useMutation(UPDATE_IS_VERIFY, {
    onCompleted: (data) => console.log("updated user data==", data),
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { error, data, loading } = useQuery(GET_ALL_USERS);
  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log("error", error);
  }

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const editStatus = (userId, isVerify) => {
    updateIsVerify({
      variables: {
        userVerify: {
          _id: userId,
          isVerify: !isVerify,
        },
      },
      update(cache, { data: { user } }) {
        const recruit = cache.readQuery({
          query: GET_ALL_USERS,
        });
        let userArr = [...recruit.user];
        const updateStateIndex = userArr.findIndex(
          (data) => data._id === user._id
        );
        userArr.splice(updateStateIndex, 1, user);
        cache.writeQuery({
          query: GET_ALL_USERS,
          data: {
            user: [...userArr],
          },
        });
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
          {(rowsPerPage > 0
            ? data?.user?.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : data?.user
          ).map((row, index) => (
            <StyledTableRow key={page * rowsPerPage + (index + 1)}>
              <StyledTableCell component="th" scope="row">
                {page * rowsPerPage + (index + 1)}
              </StyledTableCell>
              <StyledTableCell align="left">{`${row.firstName} ${row.lastName}`}</StyledTableCell>
              <StyledTableCell align="left">{row.phoneNumber}</StyledTableCell>
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
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              count={data?.user?.length}
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
  );
};

export default UserList;
