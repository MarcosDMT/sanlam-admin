import Grid from "@mui/material/Grid";
import FilledInfoCard from "../@dmt-components/cards/info-cards/filled-info-card";
import {useSelector} from "../../store";
import CurrencyFormat  from 'react-currency-format'



const summaries = [
    {
        id: 1,
        color: 'info',
        icon: 'how_to_reg',
        title: 'Total Applications',
        type: 'applicationCount',
       // description:'200'
    },
    {
        id: 2,
        color: 'success',
        icon: 'done_all',
        title: 'Total Completed',
        type: 'applicationCompleted',
        //description:'900'
    },
    {
        id: 3,
        color: 'error',
        icon: 'pending',
        title: 'Total Incomplete',
        type: 'applicationInComplete',
       //description:'500'
    },
    {
        id: 4,
        color: 'secondary',
        icon: 'people',
        title: 'No. of Customers',
        type: 'customersCount',
        //description:'1,000'
    },
];
const getCount = (customers, applications, type) => {
    if (type === 'customersCount'){
        return customers.length;
    }
    else{
        const applicationCount = applications.filter((application) => {
            if (type === 'applicationCount'){
                return true;
            }
            if (type === 'applicationCompleted'){
                return application.complete;
            }
            if (type === 'applicationInComplete'){
                return !application.complete;
            }
            return true;
        })
        return applicationCount.length;
    }
}
const DashboardCards = () => {
    const { customers } = useSelector(({customers}) => customers);
    const { applications } = useSelector(({applications}) => applications);
    return(
        <>
            <Grid container spacing={2}>
                    {summaries.map((summary => (
                        <Grid key={summary.id} item xs={12} md={3}>
                            <FilledInfoCard
                                variant="gradient"
                                color={summary.color}
                                icon={summary.icon}
                                title={summary.title}
                                description={
                                    <CurrencyFormat
                                        displayType={'text'}
                                        value={getCount(customers, applications, summary.type)}
                                        thousandSeparator={true}
                                        prefix={''}
                                    />
                               }
                            />
                        </Grid>
                    )))}
            </Grid>
        </>
    )
}

export default DashboardCards;