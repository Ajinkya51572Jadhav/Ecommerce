import React, {Fragment, useState} from 'react';
import { useEffect } from 'react';
import Carousel from "react-material-ui-carousel";
import { useSelector ,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import { useAlert } from 'react-alert';

import "./ProductDetails.css";
import { cleareErrors, getProductDetails, newReview } from '../../actions/ProductAction';
import ReviewCard from "./ReviewCard"
import Loader from '../layout/Loader/Loader';
import { addItemsToCart } from '../../actions/cartAction';
import {Dialog , DialogActions , DialogContent ,  DialogTitle , Button}  from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import { NEW_REVIEW_RESET } from '../../constants/ProductConstants';


 const ProductDetails=()=>{ 

       const params = useParams();  

         console.log(params.id);
         
       const dispatch = useDispatch();
  
      const alert = useAlert();
      
    const {product , loading ,error }=useSelector((state)=>state.productDetails);
    const {success,error:reviewError} = useSelector((state)=>state.NewReview);
     console.log( "productDetails",product);

   

  //   const options = {
  //     edite:false,
  //     color:"rgba(20,20,20,0.1)",
  //     activeColor:"tomato",
  //     size:window.innerWidth < 600 ? 20 :25,
  //     value:product.ratings,
  //     isHalf:true,  
  // }

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5  ,
  };


  const [quantity,setquantity]=useState(1);
  const [comment,setComment]=useState("");
  const [rating,setRating]=useState(0);
  const [open,setOpen]=useState(false);


        


         
        const  increaseQuantity=()=>{
          if(product.Stock <= quantity ) return ;    
        const qtr = quantity + 1 ; 
        setquantity(qtr);
        }

        const decreaseQuantity=()=>{
          if( 1 >= quantity ) return ;    
          const qtr = quantity - 1 ; 
          setquantity(qtr);
        }

    function addToCartHandler(){
           dispatch(addItemsToCart(params.id,quantity));
           alert.success("Item Added To Cart");
    }



    function    submitReviewToggle(){
       open ? setOpen(false) : setOpen(true);
    }
    

           function reviewSubmitHandler(){
                  const myForm  = new  FormData();
                  myForm.set("rating",rating);
                  myForm.set("comment",comment);
                  myForm.set("productId",params.id);
                  dispatch(newReview(myForm));
                  setOpen(false)
           }






    useEffect(()=>{
        
      if(error){
        alert.error(error);
        dispatch(cleareErrors());   
      }

      if(reviewError){
        alert.error(reviewError);
        dispatch(cleareErrors());   
            }

           if(success){
            alert.success("Review Submitted SuccessFully");
            dispatch({
              type:NEW_REVIEW_RESET
            });
           }
            

        dispatch(getProductDetails(params.id));   
    
    },[dispatch,params.id,error,alert,success,reviewError]); 

  return (
<Fragment>
{
loading ? (<Loader/>) :(

  <Fragment> 
  <div className='ProductDetails'>  
 <div>
   <Carousel>   
       {     product.images && product.images.map((item,i)=>(
            <img className='CarouselImage' key={item.url} src={item.url} alt={`${i} Slide`}/>
           ))
       }
       </Carousel>
       </div>
              <div>

       <div className="detailsBlock-1">
         <h2>{product.name}</h2>
         <p>Product # {product._id}</p>
       </div>

       <div className="detailsBlock-2">
      {/*<ReactStars {...options} />*/}    <Rating {...options} />
         <span className="detailsBlock-2-span"> ({product.numOfReviews} Reviews)</span>
       </div>

       <div className="detailsBlock-3">
         <h1>{`₹${product.price}`}</h1>
         <div className="detailsBlock-3-1">
           <div className="detailsBlock-3-1-1">
             <button onClick={decreaseQuantity}>-</button>
             {/*<input type="number" readOnly value={quantity} />*/}
             <span>{quantity}</span>
             <button onClick={increaseQuantity}>+</button>
           </div>
    <button   onClick={addToCartHandler}  disabled={product.Stock < 1 ? true : false}>Add to Cart </button> 
         </div>

  <p> Status:  
  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
    {product.Stock < 1 ? "OutOfStock" : "InStock"}
           </b>
         </p>
       </div>

 <div className="detailsBlock-4">Description : <p>{product.description}</p></div>
       <button  className="submitReview"  onClick={submitReviewToggle}>Submit Review</button>
            </div>              
                       </div>

<h3 className='reviewsHeading'>REVIEWS</h3>  


   <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={submitReviewToggle}>
         <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className='submitDialog'>
          <Rating onChange={(e)=>setRating(e.target.value)} value={rating} size={"large"}/>
 <textarea onChange={(e)=>setComment(e.target.value)} className='submitDialogTextArea' cols={30} rows={5} value={comment} />          
             <DialogActions>
             <Button color='secondary' onClick={submitReviewToggle}>Cancel</Button>
             <Button color='primary' onClick={reviewSubmitHandler}>Submit</Button>
             </DialogActions>         
          </DialogContent>                      
          
          </Dialog>

{    
    product.reviews && product.reviews[0] ? (
      <div className='reviews'>
      { product.reviews && product.reviews.map((review)=> <ReviewCard review={review}/> )}
      </div>
   
    ):(
      <div className='noReviews'>No Reviews Yet</div>
    )}
  </Fragment>

)

}
</Fragment>

  )
}


export default ProductDetails;