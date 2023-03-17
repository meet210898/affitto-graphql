import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_VEHICLES } from '../../../gqloperations/queries'

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

const VehicleList = () => {
    const { error, data, loading } = useQuery(GET_ALL_VEHICLES)
    if (loading) return <h1>Loading...</h1>
    if (error) {
        console.log('error', error)
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>No</StyledTableCell>
                        <StyledTableCell align="left">Vehicle Type Name</StyledTableCell>
                        <StyledTableCell align="left">Company Name</StyledTableCell>
                        <StyledTableCell align="left">Vehicle Name</StyledTableCell>
                        <StyledTableCell align="left">Vehicle Image</StyledTableCell>
                        <StyledTableCell align="left">Description</StyledTableCell>
                        <StyledTableCell align="left">Seats</StyledTableCell>
                        <StyledTableCell align="left">Door</StyledTableCell>
                        <StyledTableCell align="left">Fuel type</StyledTableCell>
                        <StyledTableCell align="left">Transmission</StyledTableCell>
                        <StyledTableCell align="left">AC</StyledTableCell>
                        <StyledTableCell align="left">RC Image</StyledTableCell>
                        <StyledTableCell align="left">RC Number</StyledTableCell>
                        <StyledTableCell align="left">PUC Image</StyledTableCell>
                        <StyledTableCell align="left">Price Per Day</StyledTableCell>
                        <StyledTableCell align="left">Insurance Image</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.vehicle?.slice(0).reverse().map((row, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                                {(index + 1)}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.typeId.typeName}</StyledTableCell>
                            <StyledTableCell align="left">{row.companyId.companyName}</StyledTableCell>
                            <StyledTableCell align="left">{row.vehicleName}</StyledTableCell>
                            <StyledTableCell align="left">{row.vehicleImage}</StyledTableCell>
                            <StyledTableCell align="left">{row.description}</StyledTableCell>
                            <StyledTableCell align="left">{row.seats}</StyledTableCell>
                            <StyledTableCell align="left">{row.door}</StyledTableCell>
                            <StyledTableCell align="left">{row.fuelType}</StyledTableCell>
                            <StyledTableCell align="left">{row.transmission}</StyledTableCell>
                            <StyledTableCell align="left">{row.ac ? 'Yes' : 'No'}</StyledTableCell>
                            <StyledTableCell align="left">{row.rcImage}</StyledTableCell>
                            <StyledTableCell align="left">{row.rcNumber}</StyledTableCell>
                            <StyledTableCell align="left">{row.pucImage}</StyledTableCell>
                            <StyledTableCell align="left">{row.priceperday}</StyledTableCell>
                            <StyledTableCell align="left">{row.insuranceImage}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default VehicleList