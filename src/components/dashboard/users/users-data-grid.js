import DataGrid, {
  Column,
  SearchPanel,
  Toolbar,
  Item,
} from "devextreme-react/data-grid";
import React,{useEffect} from "react";
import AddUser from "../../../pages/dashboard/users/addUser";
import { useSelector,useDispatch } from "react-redux";
import { getAllUsers } from "../../../slices/users";
import { useAuth } from "../../../hooks/use-auth";

const UsersDataGrid = () => {
  // const { users } = useSelector(({ users }) => users)
  const dispatch = useDispatch();
  const authUser = useAuth();

  const fetchUsers = async () =>{
    await dispatch(getAllUsers(authUser));
  }

  useEffect(() =>{
    fetchUsers();
  },[]);

  return (
    <>
      <DataGrid
        // dataSource={users}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        showColumnLines={true}
        showRowLines={true}
      >
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Column dataField="firstName" caption="First Name" />
        <Column dataField="lastName" caption="Last Name" />
        <Column dataField="branchName" caption="Branch" />
        <Column
          dataField="phoneNumber"
          caption="Contact"
          //   dataType="number"
          cssClass="bullet"
        />
        <Column dataField="email" caption="Email" cssClass="bullet" />
        <Column dataField="departmentName" caption="Department" cssClass="bullet" />
        <Column dataField="roleName" caption="Role" cssClass="bullet" />
        <Toolbar>
          <Item location="before">
            <AddUser />
          </Item>
          <Item location="after" name="searchPanel" />
        </Toolbar>
      </DataGrid>
    </>
  );
};

export default UsersDataGrid;
