

import { legacy_createStore as createStore,combineReducers,applyMiddleware} from "redux";   //@reduxjs/toolkit
// import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";


import { ProductDetailsReducer, productsReducer, productReducer, newProductReducer, newReviewReducer, productReviewsReducer, reviewdeleteReducer } from "./reducers/ProductReducer";
import { forgotPasswordReducer, getAlluserReducer, getUserDetailsReducer, profileReducer, userReducer } from "./reducers/userReducer"; 
import { cartReducer } from "./reducers/cartReducer";
import { AllOrdersReducers, myOrdersReducer, newOrderReducer ,orderDetailsReducer, orderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
products : productsReducer,
productDetails:ProductDetailsReducer ,
user:userReducer,
profile:profileReducer,
forgotPassword : forgotPasswordReducer,  
cart: cartReducer,
newOrder : newOrderReducer,
myOrders : myOrdersReducer, 
ordersDetails : orderDetailsReducer ,
NewReview : newReviewReducer ,
newProduct:newProductReducer,
product:productReducer,
allOrders : AllOrdersReducers,
order : orderReducer,
allusers : getAlluserReducer,
userDetails : getUserDetailsReducer,
productReviews : productReviewsReducer,
review: reviewdeleteReducer

}) 

let initialState ={
      cart :{
     cartItems : localStorage.getItem("cartItems") ?  JSON.parse(localStorage.getItem("cartItems")) : [] ,
shippingInfo :  localStorage.getItem("shippingInfo") ?  JSON.parse(localStorage.getItem("shippingInfo")) : {},
      } 

};

  console.log(initialState);

const middleware = [thunk];


const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;


            
