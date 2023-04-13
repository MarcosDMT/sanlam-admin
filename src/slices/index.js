import customersReducer from "./admin/customers";
import applicationsReducer from "./admin/applications";
import rolesReducer from './roles'
import userReducer from './users'


const reducers = {
    customers: customersReducer,
    applications: applicationsReducer,
    users: userReducer,
    roles: rolesReducer,
}

export default reducers;