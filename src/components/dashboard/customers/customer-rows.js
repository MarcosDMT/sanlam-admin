import React, {useMemo} from 'react'
import {Avatar, Box, Checkbox, IconButton, Link, TableCell, TableRow, Typography} from "@mui/material";
import {getInitials} from "../../../utils/helper-functions";
import NextLink from "next/link";
import {ArrowRight, Edit} from "@mui/icons-material";
const CustomerRows = ({ customers, selectedCustomers, handleSelectOneCustomer  }) => {

    const renderData = () => useMemo(()=>(
        <>
            {customers.map((customer) => {
            const isCustomerSelected = selectedCustomers.includes(
                customer.id
            );

            return (
                <TableRow hover key={customer.id} selected={isCustomerSelected}>
                    <TableCell padding="checkbox">
                        <Checkbox
                            checked={isCustomerSelected}
                            onChange={(event) =>
                                handleSelectOneCustomer(event, customer.id)
                            }
                            value={isCustomerSelected}
                        />
                    </TableCell>
                    <TableCell>
                        <Box
                            sx={{
                                alignItems: "center",
                                display: "flex",
                            }}
                        >
                            <Avatar
                                src={customer.avatar}
                                sx={{
                                    height: 42,
                                    width: 42,
                                }}
                            >
                                {getInitials(customer.customerName)}
                            </Avatar>
                            <Box sx={{ ml: 1 }}>
                                <NextLink href={`/dashboard/customers/${customer.id}`} passHref>
                                    <Link color="inherit" variant="subtitle2">
                                        {customer.customerName}
                                    </Link>
                                </NextLink>
                            </Box>
                        </Box>
                    </TableCell>
                    <TableCell>
                        {customer.phoneNumber!== null && customer.phoneNumber!=='' ? customer.phoneNumber : '-'}
                    </TableCell>
                    <TableCell>
                        <Typography color="textSecondary" variant="body2">
                            <a href={`mailTo:${customer.email}`}>{customer.email}</a>
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography color={`success.main`} variant="subtitle2">
                            {`Active`}
                        </Typography>
                    </TableCell>
                    <TableCell align="right">
                        <NextLink
                            href={`/dashboard/customers/${customer.id}/edit`}
                            passHref
                        >
                            <IconButton component="a">
                                <Edit fontSize="small" />
                            </IconButton>
                        </NextLink>
                        <NextLink
                            href={`/dashboard/customers/${customer.id}`}
                            passHref
                        >
                            <IconButton component="a">
                                <ArrowRight fontSize="small" />
                            </IconButton>
                        </NextLink>
                    </TableCell>
                </TableRow>
            );
        })}
        </>
    ),[customers, selectedCustomers])


    return (
        <>
            {renderData()}
        </>
    )
}

export default React.memo(CustomerRows);