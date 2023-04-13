import { createSlice } from "@reduxjs/toolkit";
import { addUser,fetchUser } from "../../redux/services/users";

const initialState = {
    users : [],
}

const userSlice = createSlice({
    name: 'department',
    initialState,
    reducers:{
        getUsers: (state,action) =>{
            state.users = action.payload;
        },
    }
})

export const  { getUsers } = userSlice.actions;


export const getAllUsers = (authUser) => async dispatch =>{
    const res = await fetchUser(authUser)
    dispatch(getUsers(res));
}

export const createUser = (authUser,data) => async dispatch => {
    const response = await addUser(authUser,data)
    console.log("RESPONSE ",response);
    try {
        console.log(response.data);
        // dispatch(fetchSuccess(response.message));
    } catch (error) {
        console.log(error.message);
        // dispatch(fetchError(error.message));
    }
}

export default userSlice.reducer;


