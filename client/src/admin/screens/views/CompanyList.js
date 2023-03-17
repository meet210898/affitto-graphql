import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_COMPANIES } from '../../../gqloperations/queries'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const CompanyList = () => {
    const { error, data, loading } = useQuery(GET_ALL_COMPANIES)
    if (loading) return <h1>Loading...</h1>
    if (error) {
        console.log('error', error)
    }
console.log("data",data)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>No</StyledTableCell>
                        <StyledTableCell align="left">Vehicle Type</StyledTableCell>
                        <StyledTableCell align="left">Company Name</StyledTableCell>
                        <StyledTableCell align="left">Company Logo</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.company?.slice(0).reverse().map((row, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                                {(index + 1)}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.typeId.typeName}</StyledTableCell>
                            <StyledTableCell align="left">{row.companyName}</StyledTableCell>
                            <StyledTableCell align="left">{row.companyLogo}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CompanyList