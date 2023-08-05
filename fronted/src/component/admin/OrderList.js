import React, { Fragment  ,useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import { NavLink,useNavigate} from "react-router-dom";
import {DataGrid} from "@material-ui/data-grid";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

 import Sidebar from "./Sidebar";
 import { clearErrors, deletOrder, getAllOrders} from "../../actions/orderAction"; 
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';
import { Button } from '@material-ui/core';

const OrderList = () => {
       
        const dispatch  = useDispatch();
        const alert     = useAlert();
        const navigate  =  useNavigate();
        const {orders ,error}     = useSelector((state)=>state.allOrders);
console.log(orders);
        const {error:deleteError , isDeleted}= useSelector((state)=>state.order);


           const deleteOrderHandler=(id)=>{
              dispatch(deletOrder(id));                         
           };

        useEffect(()=>{
           
          if(error){
               alert.error(error);
               dispatch(clearErrors());
          }

           if(deleteError){
           alert.error(deleteError);
           dispatch(clearErrors());
       }

       if(isDeleted){
          alert.success("Order Deleted Successfully");
          navigate("/admin/orders");
       dispatch({
        type:DELETE_ORDER_RESET
       })
        }
            dispatch(getAllOrders());
        },[dispatch,alert,error,deleteError,isDeleted]);

        const columns = [
          {
            field: "id",
           headerName: "Order ID",
           minWidth: 100,
           flex: 0.5,
          },
           {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex:0.3,
          },
      
          {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.4,
          },
          {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 100,
            flex: 0.3,
          },
      
          {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 90,
            flex: 0.3,
          },
      
          {
            field: "actions",
            flex: 0.4,
            headerName: "Actions",
            minWidth: 100,
            type: "number",
            sortable: false,
            renderCell: (params) => {
              return (
                <Fragment>
                  <NavLink to={`/admin/order/${params.id}`}> <EditIcon /> </NavLink>
              
                  <Button  onClick={() => deleteOrderHandler(params.id) } ><DeleteIcon /></Button>
                </Fragment>
              );
            },
          },
        ];

        const rows = [];

        orders && orders.forEach((item) => {
          let orderName = item.orderItems.map((elm)=> elm.name );
          console.log(orderName);

            console.log("OrderList",item);
            rows.push({
              id: item._id,
              name : orderName,
              itemsQty: item.orderItems.length,
              amount: item.totalPrice,
              status: item.orderStatus,
            });
          });



  return (
    <div>
    <Fragment>

    <div className="dashboard">
      <Sidebar/>
      <div className="productListContainer">
        <h1 id="productListHeading">ALL ORDERS</h1>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="productListTable"
          autoHeight
        />
      </div>
    </div>
  </Fragment>
    
    </div>
  )
}

export default OrderList