


import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productReview.css";
import { useSelector, useDispatch } from "react-redux";

import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import Sidebar from "./Sidebar";
import { deleteReviews, getAllReviews } from "../../actions/ProductAction";
import { cleareErrors } from "../../actions/ProductAction"; 
import { DELETE_REVIEW_RESET } from "../../constants/ProductConstants";
import { useNavigate } from "react-router-dom";




const ProductReview = () => {
              
                   const dispatch = useDispatch();
                   const alert    = useAlert();
                   const Navigate = useNavigate();
                   
            const {loading,error,reviews} = useSelector((state)=>state.productReviews );  
            const {error:deleteError, isDeleted} = useSelector((state)=>state.review);
             
            console.log(reviews);

              const [productId,setProductId]=useState("");                    
              
             function deleteReviewHandler(reviewId){
                         dispatch(deleteReviews(reviewId,productId));
                }

           function  productReviewsSubmitHandler(e){
                     e.preventDefault();
                    dispatch(getAllReviews(productId));
                    };

              useEffect(()=>{
                 
                if(error){
                   alert.error(error);
                   dispatch(cleareErrors());
                }

                if(deleteError){
                    alert.error(deleteError);
                    dispatch(cleareErrors());
                 }

                if(isDeleted){
                    alert.success(`Deleted review successfully`);
                    Navigate(`/admin/reviews`);
                    dispatch({type:DELETE_REVIEW_RESET});
                 }
                   
                 dispatch(getAllReviews());
              },[dispatch,alert,error,deleteError,isDeleted,productId]);



  
  const columns = [
    { field: "id",
     headerName: "Review ID",
      minWidth: 200,
       flex: 0.5 
    },
    {
      field: "user",
      headerName: "User",
      minWidth:100,
      flex: 0.2,
    },
    {
      field: "comment",
      headerName: "Comment", 
      minWidth:340,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 100,
      flex: 0.4,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 120,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        console.log(params.id)
        return (
          <Fragment>
            <Button onClick={()=>deleteReviewHandler(params.id)}><DeleteIcon /></Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>

      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star /> 
<input type="text" placeholder="Product Id" required value={productId} onChange={(e) => setProductId(e.target.value)}/>       
    </div>
<Button id="createSearchBtn" type="submit" disabled={loading ? true : false || productId === "" ? true : false}>
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReview;
