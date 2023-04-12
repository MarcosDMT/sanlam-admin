import {
    Box,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { toast } from "react-hot-toast";
import {Scrollbar} from "../../@mui-components/scrollbar";
import CustomerRows from "./customer-rows";

export const CustomerListTable = (props) => {
    const {
        customers,
        customersCount,
        onPageChange,
        onRowsPerPageChange,
        page,
        rowsPerPage,
        ...other
    } = props;
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const [open, setOpen] = useState(false)

    // Reset selected customers when customers change
    useEffect(
        () => {
            if (selectedCustomers.length) {
                setSelectedCustomers([]);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [customers]
    );

    const onClose = () => {
        setOpen(false)
    }

    const handleSelectAllCustomers = (event) => {
        setSelectedCustomers(
            event.target.checked ? customers.map((customer) => customer.id) : []
        );
    };

    const handleSelectOneCustomer = (event, customerId) => {
        if (!selectedCustomers.includes(customerId)) {
            setSelectedCustomers((prevSelected) => [...prevSelected, customerId]);
        } else {
            setSelectedCustomers((prevSelected) =>
                prevSelected.filter((id) => id !== customerId)
            );
        }
    };



    const handleDeleteMultipleCustomers = async () => {
        setOpen(false)
        selectedCustomers.map(async (customerId) => {
            try {
                //const data = await dispatch(deleteCustomer(user.businessId, customerId));
            }
            catch (e) {
                toast.success(e.message);
            }
        })
        toast.success("Customers Deleted Successfully!");

    }

    const enableBulkActions = selectedCustomers.length > 0;
    const selectedSomeCustomers =
        selectedCustomers.length > 0 && selectedCustomers.length < customers.length;
    const selectedAllCustomers = selectedCustomers.length === customers.length;

    return (
        <div {...other}>
            <Box
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === "dark" ? "neutral.800" : "neutral.100",
                    display: enableBulkActions ? "block" : "none",
                    px: 2,
                    py: 0.5,
                }}
            >
                <Checkbox
                    checked={selectedAllCustomers}
                    indeterminate={selectedSomeCustomers}
                    onChange={handleSelectAllCustomers}
                />
                {/*<Button size="small" sx={{ ml: 2 }} onClick={() => setOpen(true)}>*/}
                {/*    Delete*/}
                {/*</Button>*/}
                {/*/!*<Button size="small" sx={{ ml: 2 }}>*!/*/}
                {/*/!*  Edit*!/*/}
                {/*/!*</Button>*!/*/}
            </Box>
            <Scrollbar>
                <Table width={'100%'}>
                    <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedAllCustomers}
                                    indeterminate={selectedSomeCustomers}
                                    onChange={handleSelectAllCustomers}
                                />
                            </TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    <TableBody>
                      <CustomerRows {...{customers, selectedCustomers, handleSelectOneCustomer}}/>
                    </TableBody>
                </Table>
            </Scrollbar>
            <TablePagination
                component="div"
                count={customersCount}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />


        </div>
    );
};

CustomerListTable.propTypes = {
    customers: PropTypes.array.isRequired,
    customersCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};
