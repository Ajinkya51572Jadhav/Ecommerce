


import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/CartConstants";
import axios from "axios";


//    Add To cart

export const addItemsToCart=(id,quantity)=>async(dispatch,getState)=>{


    const {data} = await axios.get(`https://backend-ajinkya51572jadhav.vercel.app/api/v1/product/${id}`);
     console.log("cart data",data);    
     
         dispatch({
             type:ADD_TO_CART,
            //  payload :{ 
            //    data : data.product,
            //   quantity : quantity
            //   }
                payload :{
                product: data.product._id,
                name: data.product.name ,
                price: data.product.price ,
                image : data.product.images[0].url,
                stock : data.product.Stock,
                quantity : quantity, 
            }
             });

  localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));  
       
    };


//     Remove To cart 


export const removeItemsFromCart=(id)=>async(dispatch,getState)=>{

     dispatch({
         type:REMOVE_CART_ITEM,
           payload :id
               
          });

localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));  

     
  };


  
//     Save Shipping info 


export const saveShippingInfo=(data)=>async(dispatch)=>{

    dispatch({
        type:SAVE_SHIPPING_INFO,
          payload :data 
              
         });

localStorage.setItem("shippingInfo", JSON.stringify(data));
    
 };
