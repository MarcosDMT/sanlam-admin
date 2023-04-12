import { createSlice } from '@reduxjs/toolkit'
import {adminApis} from "../../api-requests/admin-apis";

const initialState = {
    customers:  [],
}

const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        fetchCustomers: (state, action) => {
            state.customers =  action.payload
        }
    }
});


export const getCustomers = (useAuth) => async dispatch => {
    const data = await adminApis.getCustomers(useAuth);
    dispatch(customersSlice.actions.fetchCustomers(data));
}

export default customersSlice.reducer