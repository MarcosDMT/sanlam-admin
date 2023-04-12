import Head from "next/head";
import {appName} from "../../../utils/constants";
import MKBox from "../../../components/@mui-components/box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "../../../components/@mui-components/typography";
import {AuthGuard} from "../../../hocs/auth-guard";
import {DashboardLayout} from "../../../components/layouts/dashboard";
import {Card} from "@mui/material";
import ApplicationsDatagrid from "../../../components/dashboard/applications/applications-datagrid";
import {applicationData} from "../../../api-requests/dummy-data";
import {useDispatch, useSelector} from "../../../store";
import {useCallback, useEffect} from "react";
import {getApplications} from "../../../slices/admin/applications";
import {useMounted} from "../../../hooks/use-mounted";
import {useAuth} from "../../../hooks/use-auth";


const ApplicationsPage = () => {
    const { applications } = useSelector(({ applications}) => applications);
    const dispatch = useDispatch();
    const isMounted = useMounted();
    const auth = useAuth();

    const getData =  useCallback(async () => {
        try {
            await dispatch(getApplications(auth))
        } catch (e) {
            console.log(e.message)
        }
    },[isMounted])

    useEffect(()=>{
        getData();
    },[])

    return( <>
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
                            <MKTypography variant="h4">Applications</MKTypography>
                        </Grid>
                    </Grid>
                </MKBox>
                <MKBox>
                    <Card sx={{p:2}}>
                        <ApplicationsDatagrid {...{applications}}/>
                    </Card>
                </MKBox>


            </Container>
        </MKBox>
    </>)
}

ApplicationsPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default ApplicationsPage;