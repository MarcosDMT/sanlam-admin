import { createSlice } from "@reduxjs/toolkit";
import {fetchPermissions, fetchRoles, fetchUserMenus} from "../../redux/services/roles";


const initialState = {
    roles : [],
    permissions: [],
    menus: [],
}

const roleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers:{
       setRoles: (state,action) =>{
            state.roles = action.payload;
        },
        setPermissions: (state, action) =>{
            state.permissions = action.payload;
        },
        setMenus: (state, action) =>{
           state.menus = action.payload
        }
    }
})
export const  { setRoles, setPermissions, setMenus } = roleSlice.actions;


export const getAllRoles = (authUser) => async (dispatch) =>{
    const res = await fetchRoles(authUser)
    dispatch(setRoles(res));
}
export const getAllPermissions = (authUser) => async dispatch => {
    const res = await fetchPermissions(authUser);
    dispatch(setPermissions(res))
}

export const getUserMenus = (authUser) => async dispatch => {
    const res = await fetchUserMenus(authUser);
    dispatch(setMenus(res))
    console.log(res);
}



export default roleSlice.reducer;


