import Head from "next/head";
import {appName} from "../../../utils/constants";
import MKBox from "../../../components/@mui-components/box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "../../../components/@mui-components/typography";
import {AuthGuard} from "../../../hocs/auth-guard";
import {DashboardLayout} from "../../../components/layouts/dashboard";
import {Card} from "@mui/material";
import CustomerDatagrid from "../../../components/dashboard/customers/customer-datagrid";
import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "../../../store";
import {useMounted} from "../../../hooks/use-mounted";
import {getCustomers} from "../../../slices/admin/customers";
import {useAuth} from "../../../hooks/use-auth";


const CustomersPage = () => {
    const { customers } = useSelector(({ customers }) => customers);
    const isMounted = useMounted();
    const dispatch = useDispatch();
    const auth = useAuth();

    const getData = useCallback(async () => {
        try{
            if (isMounted){
                await dispatch(getCustomers(auth));
            }
        }catch (e) {
            console.log(e.message)
        }
    },[isMounted]);
    useEffect(() =>{
        getData();
    },[])

    return( <>
        <Head>
            <title>  Customers | {appName}</title>
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
                            <MKTypography variant="h4">Customers</MKTypography>
                        </Grid>
                    </Grid>
                </MKBox>
                <MKBox>
                    <Card sx={{p:2}}>
                        <CustomerDatagrid {...{customers}}/>
                    </Card>
                </MKBox>


            </Container>
        </MKBox>
    </>)
}

CustomersPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default CustomersPage;