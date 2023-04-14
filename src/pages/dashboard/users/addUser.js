import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { Grid, TextField } from "@mui/material";
import { branches, departments } from "../../../api-requests/dummy-data";
import Autocomplete from "@mui/material/Autocomplete";
import { getAutoCompleteValue } from "../../../utils/helper-functions";
import MKButton from "../../../components/@mui-components/button";
import * as yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { createUser } from "../../../slices/users";
import { useAuth } from "../../../hooks/use-auth";
import { toast } from "react-hot-toast";
import { getAllUsers } from "../../../slices/users";
import { getAllRoles } from "../../../slices/roles";
import { addUser } from "../../../redux/services/users";

const AddUser = () => {
  const [open, setOpen] = React.useState(false);
  const { roles } = useSelector(({ roles }) => roles);
  const dispatch = useDispatch();
  const authUser = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchRoles = async () => {
    await dispatch(getAllRoles(authUser));
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const validationSchema = yup.object({
    password: yup.string("Enter password").required("Password is required"),
    // id: yup.number("Enter id").required("Id is required"),
    firstName: yup.string("Enter first name").required("Fist name is required"),
    lastName: yup.string("Enter last name").required("Last name is required"),
    userName: yup.string("Enter username").required("Username is required"),
    email: yup
      .string("Enter email address")
      .email("Enter a valid email")
      .required("Email is required"),
    // isEnabled: yup.string("true or false").required("An option is required"),
    roleId: yup.string("Enter role name").required("Role is required"),
    // success: yup.string("true or false").required("An option is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      // id: "",
      firstName: "",
      lastName: "",
      userName: "",
      name: "",
      email: "",
      roleId: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          ...values,
          name: values.firstName + " " + values.lastName,
        };
        const res = await addUser(authUser, formData)

        if (res?.success) {
          await dispatch(getAllUsers(authUser));
          helpers.resetForm();
          handleClose();
          toast.success("User created successfully");
        }else{
          toast.error(res.errorMsg)
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });

  const handleOnEnabled = (event, value) => {
    console.log(value);
    if (value !== null) {
      formik.setFieldValue("isEnabled", value.value);
    } else {
      formik.setFieldValue("isEnabled", null);
    }
  };

  const handleOnSuccess = (event, value) => {
    console.log(value);
    if (value !== null) {
      formik.setFieldValue("success", value.value);
    } else {
      formik.setFieldValue("success", null);
    }
  };

  const handleOnRoleId = (event, value) => {
    if (value !== null) {
      formik.setFieldValue("roleId", value.id);
    } else {
      formik.setFieldValue("roleId", null);
    }
  };

  const isEnabled = [
    { id: 1, name: "True", value: true },
    { id: 2, name: "False", value: false },
  ];

  const success = [
    { id: 1, name: "True", value: true },
    { id: 2, name: "False", value: false },
  ];

  return (
    <div>
      <MKButton
        variant="contained"
        size="small"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Add User
      </MKButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Users"}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item md={6} sx={12}>
                <TextField
                  style={{ marginTop: "8px" }}
                  fullWidth
                  maxWidth="sm"
                  label="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item md={6} sx={12}>
                <TextField
                  style={{ marginTop: "8px" }}
                  fullWidth
                  maxWidth="sm"
                  label="lastName"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
            </Grid>
            <TextField
              style={{ marginTop: "8px", marginBottom: "8px" }}
              fullWidth
              maxWidth="sm"
              label="Username"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
            />
            <TextField
              style={{ marginTop: "8px", marginBottom: "8px" }}
              fullWidth
              maxWidth="sm"
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              style={{ marginTop: "8px", marginBottom: "8px" }}
              fullWidth
              maxWidth="sm"
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Autocomplete
              fullWidth
              options={roles}
              value={getAutoCompleteValue(roles, formik.values.roleId)}
              getOptionLabel={(option) => option.name}
              onChange={handleOnRoleId}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  sx={{ marginTop: 2 }}
                  {...params}
                  label="Role"
                />
              )}
            />

            <MKButton disabled={formik.isSubmitting} sx={{ marginTop: "4px" }} type="submit" color="primary">
              Save
            </MKButton>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddUser;
