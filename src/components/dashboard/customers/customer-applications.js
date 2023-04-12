import ApplicationsDataGrid from "../applications/applications-datagrid";
import {useMounted} from "../../../hooks/use-mounted";
import {useEffect, useState} from "react";
import {adminApis} from "../../../api-requests/admin-apis";
import {useAuth} from "../../../hooks/use-auth";

const CustomerApplications = props => {
    const { data } = props;
    const isMounted = useMounted();
    const auth = useAuth();
    const [applications, setApplications] = useState();
    const fetchCustomerApplications = async () => {
        try {
            const customerId = data.key.id;
            const res = await adminApis.getCustomerApplications(customerId, auth);
            if (isMounted()){
                setApplications(res);
            }
        }catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        fetchCustomerApplications();
    },[data]);

    return(
        <>
            <ApplicationsDataGrid {...{applications, viewOnly: true}}/>
        </>
    )
}

export default CustomerApplications;