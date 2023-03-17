import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_FAQS } from '../../../gqloperations/queries'

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

const FaqList = () => {
    const { error, data, loading } = useQuery(GET_ALL_FAQS)
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
                        <StyledTableCell align="left">FAQ Category</StyledTableCell>
                        <StyledTableCell align="left">Question</StyledTableCell>
                        <StyledTableCell align="left">Answer</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.faq?.slice(0).reverse().map((row, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                                {(index + 1)}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.faqCategoryId.faqCategory}</StyledTableCell>
                            <StyledTableCell align="left">{row.question}</StyledTableCell>
                            <StyledTableCell align="left">{row.answer}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default FaqList