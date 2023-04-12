import { createSlice } from '@reduxjs/toolkit'
import {adminApis} from "../../api-requests/admin-apis";

const initialState = {
    applications:  [],
}

const applicationsSlice = createSlice({
    name: 'applications',
    initialState,
    reducers: {
        fetchApplications: (state, action) => {
            state.applications =  action.payload
        }
    }
});


export const getApplications = (useAuth) => async dispatch => {
    const data = await adminApis.getApplications(useAuth);
    dispatch(applicationsSlice.actions.fetchApplications(data));
}

export default applicationsSlice.reducer