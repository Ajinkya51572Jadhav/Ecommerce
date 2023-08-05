


import React, { Fragment, useEffect } from "react";
import  { DataGrid } from  "@mui/x-data-grid"
import { useSelector, useDispatch } from "react-redux";
import { cleareErrors , getAdminProducts, deleteProduct} from "../../actions/ProductAction";
import { NavLink, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import SideBar from "./Sidebar";
import "./ProductList.css";
import { DELETE_PRODUCT_RESET } from "../../constants/ProductConstants";


   const ProductList = () => {
  
        const dispatch = useDispatch();
        const alert    = useAlert();
        const navigate = useNavigate();

        const {error,products}=useSelector((state)=>state.products);
        const { error:deleteError , isDeleted} = useSelector((state)=>state.product);
          
               function deleteProductHandler(id){

                console.log("delet id ",id);
                   dispatch(deleteProduct(id));
             }; 


  const  columns =[
          {
            field:"id",
            headerName:"Product ID",
            minWidth : 200,
            flex :0.5
          },
          {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex:0.3,
          },
          {
            field:"stock",
            headerName:"Stock",
            type:"number",
            minWidth:150,
            flex:0.3,
          },
          {
            field:"price",
            headerName:"Price",
            type:"number",
            minWidth:270,
            flex:0.5,
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
                <NavLink to={`/admin/product/${params.id}`}><EditIcon/></NavLink>                                                                                                                                          
                <Button onClick={()=> deleteProductHandler(params.id)}><DeleteIcon/></Button>
                </Fragment>
              )
            }
          },

  ];
   
      const  rows = [];
      
      products && products.forEach((item,index) => {
        console.log("products",item);
           rows.push({
            id:item._id,
            stock:item.Stock,
            price:item.price,
            name:item.name , 
           })
      });
      

         useEffect(()=>{
             if(error){
              alert.error(error);
              dispatch(cleareErrors());
             }

             if (deleteError) {
              alert.error(deleteError);
              dispatch(cleareErrors());
            }

            if (isDeleted) {
              alert.success("Product Deleted Successfully");
               navigate("/admin/dashboard");
              dispatch({ type: DELETE_PRODUCT_RESET });
            }

             dispatch(getAdminProducts());

         },[dispatch,alert,error,deleteError,isDeleted]);





  return (
    <Fragment>

    <div className="dashboard">
      <SideBar />
      <div className="productListContainer">
        <h1 id="productListHeading">ALL PRODUCTS</h1>
<DataGrid 
rows={rows} columns={columns} pageSize={10}  disableSelectionOnClick className="productListTable" autoHeight/>
      </div>
    </div>
  </Fragment>
  )
}

export default ProductList