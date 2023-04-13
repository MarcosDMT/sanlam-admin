import React, { useCallback, useEffect, useState } from "react";
import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import Head from "next/head";
import Container from "@mui/material/Container";
import MKBox from "../../../components/@mui-components/box";
import Grid from "@mui/material/Grid";
import MKTypography from "../../../components/@mui-components/typography";
import { appName } from "../../../utils/constants";
import RolesDataGrid from "../../../components/dashboard/roles/roles-data-grid";
import { Card } from "@mui/material";
import { useAuth } from "../../../hooks/use-auth";
import { useMounted } from "../../../hooks/use-mounted";
import { useDispatch, useSelector } from "../../../store";
import { getAllPermissions, getAllRoles } from "../../../slices/roles";
import AddUpdateRoleForm from "../../../components/dashboard/roles/add-update-form";

const Roles = () => {
  const authUser = useAuth();
  const isMounted = useMounted();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const { roles } = useSelector(({ roles }) => roles);

  const handleOnClose = () => {
    setOpenDialog(false);
  };

  const handleOnAdd = () => {
    setOpenDialog(true);
  };

  const fetchRoles = useCallback(async () => {
    await dispatch(getAllRoles(authUser));
  }, [isMounted]);

  const fetchAllPermissions = useCallback(async () => {
    await dispatch(getAllPermissions(authUser));
  }, [isMounted]);

  useEffect(() => {
    fetchRoles();
    fetchAllPermissions();
  }, []);

  return (
    <>
      <Head>
        <title>Roles | {appName}</title>
      </Head>
      <MKBox
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <MKBox sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <MKTypography variant="h4">{"Roles"}</MKTypography>
              </Grid>
            </Grid>
          </MKBox>
          <Card sx={{ p: 2 }}>
            <MKBox>
              <RolesDataGrid data={roles} handleOnAdd={handleOnAdd} />
            </MKBox>
          </Card>
        </Container>
      </MKBox>
      <AddUpdateRoleForm open={openDialog} onClose={handleOnClose} />
    </>
  );
};

Roles.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Roles;
