import React from "react";
import dynamic from 'next/dynamic';
import {Avatar, Box, Chip, Link} from "@mui/material";
import {getInitials} from "../../../utils/helper-functions";
import MKTypography from "../../@mui-components/typography";
const DataGrid = dynamic(
    () => import('devextreme-react/data-grid'),
    {
        ssr: false,
    }
);
import {
    Pager,
    Export,
    SearchPanel,
    Column,
    HeaderFilter,
    GroupPanel, MasterDetail
} from "devextreme-react/data-grid"
import CustomerApplications from "./customer-applications";
const CustomerDataGrid = props => {
    const { customers } = props;
    const allowedPageSizes = ['all', 10, 25, 50, 100];
    function actionCustomerDetails ({ data }){
        return(
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                }}
            >
                <Avatar
                    src={data.avatar}
                    sx={{
                        height: 35,
                        width: 35,
                        //backgroundColor:'primary.main'
                        background: 'linear-gradient(25deg,#0075c9,#4188e7 20%,#25c1ed 90%)'
                    }}
                >
                   <MKTypography variant={'body2'} sx={{ fontSize: '12px'}}>
                       {getInitials(data.otherNames)}
                   </MKTypography>
                </Avatar>
            </Box>
        )
    }
    return (
        <>
            <DataGrid
                dataSource={customers}
                showBorders={true}
                height={'100vh'}
                remoteOperations={true}
                columnAutoWidth={true}
                showColumnLines={true}
                showRowLines={true}
                allowColumnResizing={true}
                rowAlternationEnabled={true}
            >
                <SearchPanel visible={true} />
                <HeaderFilter visible={true} allowSearch={true} />
                <GroupPanel visible={true} />
                <MasterDetail
                    enabled={true}
                    component={CustomerApplications}
                />
                <Column
                    width={60}
                    visible={true}
                    cellRender={actionCustomerDetails}
                    caption=""
                />
                <Column
                    dataField="surname"
                    minWidth={100}
                    caption="Surname"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={true}
                />
                <Column
                    dataField="otherNames"
                    minWidth={100}
                    caption="Other Names"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={true}
                />
                <Column
                    dataField="phoneNumber"
                    minWidth={100}
                    caption="Phone No"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={true}
                />
                <Column
                    dataField="email"
                    minWidth={100}
                    caption="Email"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={true}
                />
                <Column
                    dataField="idNumber"
                    minWidth={100}
                    caption="ID No."
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={true}
                />
                <Column
                    dataField="applications"
                    minWidth={100}
                    caption="Applications"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={true}
                />
                {/*<Column*/}
                {/*    dataField="status"*/}
                {/*    minWidth={100}*/}
                {/*    caption="Status"*/}
                {/*    cellRender={actionStatus}*/}
                {/*    allowHeaderFiltering={true}*/}
                {/*    allowSearch={true}*/}
                {/*    allowFiltering={true}*/}
                {/*/>*/}
                <Pager
                    visible={true}
                    allowedPageSizes={allowedPageSizes}
                    displayMode={true}
                    showPageSizeSelector={true}
                    showInfo={true}
                    showNavigationButtons={true}
                />
                <Export enabled={true} allowExportSelectedData={false} />
            </DataGrid>
        </>
    )
}

export default CustomerDataGrid;