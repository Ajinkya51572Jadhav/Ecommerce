
import React, { Fragment, useEffect } from "react";
import  { DataGrid } from  "@mui/x-data-grid"
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import "./ProductList.css";
import { alluser, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import Sidebar from "./Sidebar";


   const UserList = () => {
  
        const dispatch = useDispatch();
        const alert    = useAlert();
        const navigate = useNavigate();


        const {users,error } = useSelector((state)=>state.allusers);

        console.log("user List ", users);
        const {error:deleteError ,  isDeleted ,message} = useSelector((state)=>state.profile);

          
               function deleteUserHandler(id){
                   dispatch(deleteUser(id));
             }; 


  const  columns =[
          {
            field:"id",
            headerName:"User ID",
            minWidth : 200,
            flex :0.5
          },
          {
            field: "email",
            headerName: "Email",
            minWidth: 150,
            flex:0.3,
          },
          {
            field:"name",
            headerName:"Name",
            minWidth:150,
            flex:0.3,
          },
          {
            field:"role",
            headerName:"Role",
            minWidth:100,
            flex:0.3,
          },
          {
            field:"actions",
            headerName:"Actions",
            minWidth:270,
            flex:0.3,
            type:"number",
            sortable:false,
            renderCell : (params)=>{
              return(
                <Fragment>
                <NavLink to={`/admin/user/${params.id}`}><EditIcon/></NavLink>                                                                                                                                          
                <Button onClick={()=> deleteUserHandler(params.id)}><DeleteIcon/></Button>
                </Fragment>
              )
            }
          },

  ];
   
      const  rows = [];


      users && users.forEach((item,index) => {
       
        console.log("users",item);
       
        rows.push({
            id:item._id,
            email:item.email,
            name:item.name,
            role :item.role
           })
      });
      

         useEffect(()=>{
             if(error){
              alert.error(error);
              dispatch(clearErrors()); 
             }

        if(deleteError){
              alert.error(deleteError);
              dispatch(clearErrors()); 
             }


            if (isDeleted) {
              alert.success(message);
               navigate("/admin/users");
              dispatch({ type: DELETE_USER_RESET });
            }

             dispatch(alluser());

         },[dispatch,alert,error,isDeleted , deleteError, message ]);





  return (
    <Fragment>

    <div className="dashboard">
      <Sidebar />
      <div className="productListContainer">
        <h1 id="productListHeading">ALL USERS</h1>
<DataGrid 
rows={rows} columns={columns} pageSize={10}  disableSelectionOnClick className="productListTable" autoHeight/>
      </div>
    </div>
  </Fragment>
  )
}


export default UserList
