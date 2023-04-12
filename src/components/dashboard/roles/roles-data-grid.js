import React, {useState} from 'react';
import dynamic from "next/dynamic";
import {Column, Item, SearchPanel, Toolbar} from "devextreme-react/data-grid";

import MKBox from "../../@mui-components/box";
import {Add} from "@mui/icons-material";
import MKButton from "../../@mui-components/button";
import PermissionsForm from "./permissions-form";
const DataGrid = dynamic(() => import("devextreme-react/data-grid"), {
    ssr: false,
});
const RolesDataGrid = props => {
    const { data, handleOnAdd } = props;
    const [ selectedRole, setSelectedRole ] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handleOnClose = () => {
        setOpenDialog(false);
    }


    const actionsOptions = ({ data }) => {
        const handleOnEdit = () => {
            setSelectedRole(data);
            setOpenDialog(true);
        }
        return (
            <MKBox>
                {/*<Tooltip title="Edit">*/}
                {/*    <IconButton size={"small"} color={"info"} onClick={handleOnEdit}>*/}
                {/*        <Edit />*/}
                {/*    </IconButton>*/}
                {/*</Tooltip>*/}
                <MKButton onClick={handleOnEdit} variant={'outlined'} size={'small'} color={'info'}>
                    Manage Permissions
                </MKButton>
            </MKBox>
        );
    };
    return (
        <>
            <DataGrid
                dataSource={data}
                allowColumnReordering={true}
                rowAlternationEnabled={true}
                showBorders={true}
                height={'70vh'}
            >
                <SearchPanel visible={true} highlightCaseSensitive={true} />
                <Column dataField="name" caption="Role Name" />
                <Column dataField="description" caption="Description" />
                <Column
                    caption="Action"
                    width={200}
                    allowFiltering={false}
                    cellRender={actionsOptions}
                />
                <Toolbar>
                    <Item location="before">
                        <MKButton
                            onClick={handleOnAdd}
                            color={'primary'}
                            variant={'contained'}
                            startIcon={<Add/>}>
                            Add Role
                        </MKButton>
                    </Item>
                    <Item location="after" name="searchPanel" />
                </Toolbar>
            </DataGrid>
            <PermissionsForm {...{ open: openDialog, onClose: handleOnClose, role: selectedRole }}/>
        </>
    )
}

export default RolesDataGrid;