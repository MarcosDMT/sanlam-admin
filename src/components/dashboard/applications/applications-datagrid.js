import React, {useState} from "react";
import dynamic from "next/dynamic"
const DataGrid = dynamic(
    () => import('devextreme-react/data-grid'),
    {
        ssr: false,
    }
);
import {
    Column, Export,
    FilterPanel,
    GroupPanel,
    HeaderFilter,
    Pager,
    Paging,
    SearchPanel
} from "devextreme-react/data-grid";
import {Chip, CircularProgress, IconButton, Tooltip} from "@mui/material";
import {Download} from "@mui/icons-material";
import {adminApis} from "../../../api-requests/admin-apis";
import {useAuth} from "../../../hooks/use-auth";
import useDownloader from "react-use-downloader";
import {green} from "@mui/material/colors";


const DownloadApplication = ({ data }) => {
    const auth = useAuth();
    const { size, elapsed, percentage, download, cancel, error, isInProgress } = useDownloader();
    const [isLoading, setIsLoading] = useState(false);
    const getApplicationFile = async (applicationId)=>{
        setIsLoading(true);
        try {
            const res = await adminApis.downloadApplication(applicationId, auth);
            const fileName = res.name+res.extension;
            await download(res.data, fileName)
            setIsLoading(false)

        }catch (e) {
            console.log(e)
            setIsLoading(false)
        }
    }
    return (
        <>
            <Tooltip title="Download">
                <IconButton disabled={isLoading}  onClick={e => getApplicationFile(data.id)}>
                    <Download/>
                    {isLoading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    )}
                </IconButton>
            </Tooltip>

        </>
    )
}


const ApplicationsDataGrid = props => {
    const { applications, viewOnly = false } = props;

    const allowedPageSizes = ['all', 10, 25, 50, 100];


    function actionNumber({ rowIndex }) {
        return rowIndex + 1;
    }
    function actionStatus({ data, displayValue }) {
        const color = displayValue ? 'success' : 'error';
        const status = displayValue ? 'Completed' : 'Incomplete';
        return (

            <Chip
                // style={{ color: 'success.main', borderColor: 'success.main' }}
                color={color}
                size={'small'}
                variant={'outlined'}
                label={status}
            />
        );
    }



    return (
        <>
            <DataGrid
                dataSource={applications}
                showBorders={true}
                height={!viewOnly ? '100vh' : 'auto'}
                keyExpr="id"
                remoteOperations={true}
                columnAutoWidth={true}
                showColumnLines={true}
                showRowLines={true}
                allowColumnResizing={true}
                rowAlternationEnabled={true}
            >
                {/*<FilterPanel visible={false} />*/}
                <SearchPanel
                    visible={true}
                    placeholder="Search..."
                />
                <HeaderFilter visible={true} allowSearch={true} />
                <GroupPanel visible={!viewOnly} />

                <Column caption="#" width={50} visible={true} cellRender={actionNumber} />
                <Column
                    dataField="refId"
                    minWidth={100}
                    caption="Reference Number"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={true}
                />
                <Column
                    dataField="customerName"
                    minWidth={100}
                    caption="Customer Name"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={true}
                />
                <Column
                    dataField="productName"
                    minWidth={100}
                    caption="Product"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={true}
                />
                <Column
                    dataField="complete"
                    minWidth={100}
                    caption="Status"
                    cellRender={actionStatus}
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={true}
                />
                <Column
                    dataField="stage"
                    minWidth={100}
                    caption="Stage"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={true}
                />
                <Column
                    dataField="requestCreatedOn"
                    minWidth={100}
                    dataType={'date'}
                    caption="Date"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={true}
                />
                <Column caption={'Action'} cellRender={(props) => <DownloadApplication {...props}/>}/>
                <Paging defaultPageSize={20} />
                <Pager
                    visible={true}
                    allowedPageSizes={allowedPageSizes}
                    displayMode={true}
                    showPageSizeSelector={true}
                    showInfo={true}
                    showNavigationButtons={true}
                />
                <Export  enabled={!viewOnly} allowExportSelectedData={false} />
            </DataGrid>
        </>
    )
}


export default ApplicationsDataGrid;