import React, {useState} from 'react';
import {useSelector} from "../../../store";
import MKBox from "../../@mui-components/box";
import {Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel} from "@mui/material";
import DMTDropdown from "../../@dmt-components/form/dropdown";
import DMTAccordion from "../../@dmt-components/accordion";
import {addRolePermissions} from "../../../redux/services/roles";
import DialogActions from "@mui/material/DialogActions";
import MKButton from "../../@mui-components/button";
import {toast} from "react-hot-toast";
import {useAuth} from "../../../hooks/use-auth";
import MKTypography from "../../@mui-components/typography";

const PermissionsForm = props => {
    const { role, open, onClose } = props;
    // const { permissions } = useSelector(({ roles }) => roles);
    const authUser = useAuth();

    const [selectedPerms, setSelectedPerms] = useState([]);

    const handleOnChange = (perm) => e => {
        const data = [...selectedPerms];
        const { checked } = e.target;
        if (checked){
            data.push({
                mainMenuId: perm.id,
                childMenu : null,
                permission: perm.pageName,
            })
        }
        else{
            const index  = data.findIndex(datum => datum.mainMenuId === perm.id);
            data.splice(index, 1);
        }
        setSelectedPerms(data);
    }
    const handleOnChildChange = (perm, child) => e => {
        const data = [...selectedPerms];
        const { checked } = e.target;
        const index = data.findIndex(datum => datum.mainMenuId === perm.id);
        if (checked){
            if (index !== -1){
                data[index].childMenu.push(
                    {
                        id: child.id,
                        permission: child.pageName,
                    })
            }
            else{
                data.push({
                    mainMenuId: perm.id,
                    childMenu : [{
                        id: child.id,
                        permission: child.pageName,
                    }],
                    permission: perm.pageName,
                })
            }
        }
        else{
           const i = data[index].childMenu.findIndex( item => item.id === child.id);
            data[index]?.childMenu.splice(i, 1);
            if (data[index].childMenu.length < 1){
                data.splice(index, 1);
            }
        }

        setSelectedPerms(data);
    }

    const handleOnSavePermissions = async () => {
        try {
            const formData = {
                roleId: role?.id,
                permissions: selectedPerms,
            }
            const res =  await addRolePermissions(authUser, formData);
            if (res.success){
                toast.success('Permissions updated successfully');
                onClose();
            }
        }
        catch (e){
            console.log(e)
            toast.error(e)
        }
    }
    const getChildren = (perm) => perm.child.map((p, index) => {
            let checked = false;
            const parentIndex = selectedPerms.findIndex(item => item.mainMenuId === perm.id);
            if (parentIndex !== -1){
                const childIndex = selectedPerms[parentIndex]?.childMenu.findIndex(opt => opt.id === p.id);
                if (childIndex !== -1){
                    checked = true;
                }
            }
            return (
                <MKBox key={index} sx={{display: 'flex', flexDirection: 'column', ml: 3}}>
                    <FormControlLabel
                        checked ={ checked}
                        label={p.pageName}
                        value={p.pageName}
                        control={<Checkbox/>}
                        onChange={handleOnChildChange(perm, p)}
                    />
                </MKBox>
            )
        }
    );
    return (
        <>
            <Dialog open={open} onClose={onClose} minWidth={'sm'} fullWidth scroll={'body'}>
                <DialogTitle>Manage Permissions : {role?.name}</DialogTitle>
                <DialogContent>
                    <MKBox>
                        {/* {permissions.map(perm => {
                            let checked = false;
                            const index = selectedPerms.findIndex(item => item.mainMenuId === perm.id);
                            if (index !== -1){
                                checked = true;
                            }
                            return (
                                <>
                                    { perm.child ? (
                                            <DMTAccordion  title={perm.pageName} active={true}>
                                                {getChildren(perm)}
                                            </DMTAccordion>
                                        ):
                                        <FormControlLabel
                                            checked={checked}
                                            label={perm.pageName}
                                            control={<Checkbox/>}
                                            value={perm.pageName}
                                            onChange={handleOnChange(perm)}
                                        />
                                    }

                                </>
                            )
                        })} */}
                    </MKBox>
                    <DialogActions>
                        <MKButton onClick={handleOnSavePermissions} variant={'contained'} color={'primary'}>
                            Save
                        </MKButton>
                    </DialogActions>

                </DialogContent>
            </Dialog>

        </>
    )
}

export default React.memo(PermissionsForm);