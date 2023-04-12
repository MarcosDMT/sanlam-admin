import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {useDispatch, useSelector} from "../../../store";
import MKBox from "../../@mui-components/box";
import {useFormik} from "formik";
import * as Yup from "yup";
import {addRole} from "../../../redux/services/roles";
import {useAuth} from "../../../hooks/use-auth";
import TextField from "@mui/material/TextField";
import MKButton from "../../@mui-components/button";
import {toast} from "react-hot-toast";
import {getAllRoles} from "../../../slices/roles";


const AddUpdateRoleForm = props => {
    const { open, onClose, role } = props;
    // const { permissions } = useSelector(({ roles }) => roles);
    const authUser = useAuth();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: role ? role.name  :'',
            description: role ? role.description : '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required!')
        }),
        onSubmit: async (values, helpers) => {
            try {
                const res = await addRole(authUser, values);

                if (res.success) {
                    toast.success('Role Created Successfully')
                    await dispatch(getAllRoles(authUser));
                    onClose();
                }
                else{
                    toast.success('An error occurred while creating')
                }
            }
            catch (err){
                console.log(err.message)
            }
        }
    });

    return (
        <>
            <Dialog open={open} onClose={onClose} minWidth={'sm'} fullWidth>
                <DialogTitle>{ role ? 'Update Role' : 'Create Role'}</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            label={'Name'}
                            fullWidth
                            margin={'normal'}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            name={'name'}
                            placeholder={'Enter the name...'}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.touched.name && formik.errors.name)}
                            helperText={ formik.touched.name && formik.errors.name}
                        />

                        <TextField
                            label={'Description'}
                            fullWidth
                            margin={'normal'}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            name={'description'}
                            placeholder={'Description...'}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.touched.description && formik.errors.description)}
                            helperText={ formik.touched.description && formik.errors.description }
                        />

                        <MKBox sx={{ display: 'flex', my:2, justifyContent: 'flex-end', alignItems: 'center'}}>
                            <MKButton variant={'contained'} color={'primary'} type={'submit'}>
                                Save
                            </MKButton>
                        </MKBox>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )

}

export default AddUpdateRoleForm;