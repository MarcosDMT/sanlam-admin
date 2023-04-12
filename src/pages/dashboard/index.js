import Dashboard from "../../components/dashboard";
import {appName} from "../../utils/constants";
import MKTypography from "../../components/@mui-components/typography";
import Head from "next/head";
import Container from "@mui/material/Container";
import MKBox from "../../components/@mui-components/box";
import Grid from "@mui/material/Grid";
import {AuthGuard} from "../../hocs/auth-guard";
import {DashboardLayout} from "../../components/layouts/dashboard";
import {useMounted} from "../../hooks/use-mounted";
import {useCallback, useEffect} from "react";
import {useDispatch} from "../../store";
import {getCustomers} from "../../slices/admin/customers";
import {getApplications} from "../../slices/admin/applications";
import {useAuth} from "../../hooks/use-auth";

const DashboardPage = () => {
    const isMounted = useMounted();
    const dispatch = useDispatch();
    const auth = useAuth();
    const getAllCustomers = useCallback(async () => {
        try{
            if(isMounted){
                await dispatch(getCustomers(auth));
            }
        }catch (e) {
            console.log(e)
        }
    },[isMounted]);
    const getAllApplications = useCallback(async () => {
        try{
            if(isMounted){
                await dispatch(getApplications(auth));
            }

        }catch (e) {
            console.log(e)
        }
    },[isMounted]);

    useEffect(() => {
        getAllCustomers();
        getAllApplications();
    }, []);

    return(
        <>
            <Head>
                <title>Dashboard | {appName}</title>
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
                                <MKTypography variant="h4">Dashboard</MKTypography>
                            </Grid>
                        </Grid>
                    </MKBox>
                    <Grid container spacing={4}>
                       <Grid item md={12} xs={12}>
                           <Dashboard/>
                       </Grid>
                    </Grid>
                </Container>
            </MKBox>
        </>
    )
}

DashboardPage.getLayout = (page) => (
    // <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    // </AuthGuard>
);

export default DashboardPage;