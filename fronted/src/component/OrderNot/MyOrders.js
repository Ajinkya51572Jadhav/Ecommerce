


import React, { Fragment, useEffect } from 'react'
import  { DataGrid } from  "@mui/x-data-grid"
import LaunchIcon from "@material-ui/icons/Launch";

import "./MyOrders.css"
import Loader from '../layout/Loader/Loader';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, myOrders } from '../../actions/orderAction';
import { NavLink, useParams } from 'react-router-dom';






const MyOrders = () => {
            
            const dispatch = useDispatch();
            const alert    = useAlert();
            const {loading , error , orders} = useSelector((state)=>state.myOrders);
            const {user} = useSelector((state)=>state.user);

            console.log(orders) ;



            const columns = [
            {
              field:"id",
              headerName : "Order ID",
              minWidth : 300             
           },
           {
            field:"status",
            headerName : "Status",
            minWidth:150,
            flex : 0.5,
          },
          {
            field:"itemsQty",
            headerName : "items Qty",
            type:"number", 
            minWidth:150,
            flex : 0.3,
          },
          {
            field:"amount",
            headerName : "Amount",
            type:"number", 
            minWidth:270,
            flex : 0.5,
          },
          {
            field:"actions",
            headerName : "Actions",
            minWidth:150,
            type:"number",
            sortable:false,
            renderCell:(params)=>{
                 return(
                <NavLink to={`/order/${params.id}`}><LaunchIcon/></NavLink>        //  data change 
                 )
            }
          }
            ];   
            const  rows = [];
  
              {
                orders && orders.forEach((item,index) => {

                 rows.push({
                 itemsQty : item.orderItems.length,
                 id:item._id,
                 amount:item.totalPrice,
                 status:item.orderStatus,                       
                 })
       
                

                });
              }



              useEffect(()=>{
                
                if(error){
                    alert.error(error);
                    dispatch(clearErrors());
                }
                dispatch(myOrders());
              },[dispatch,alert,error]);
      

    return (
    <Fragment>
      
 {
    loading ? (<Loader/>):(
        
        <Fragment>
        <div className='myOrdersPage'>

          <DataGrid 
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className='myOrdersTable'
            autoHeight        
          />
        
          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>

        </div>
        
        </Fragment>
    )
 }

    </Fragment>
  )
}

export default MyOrders
