/* npm i axios  react-alert  react-alert-template-basic  react-helmet react-redux redux redux-thunk    redux-devtools-extension  react-router-dom  overlay-navbar */
//  rgb(255, 2, 171) 

   import React,{ Fragment, useEffect, useState } from "react";
   import {BrowserRouter, Route, Routes } from "react-router-dom";
   import { useSelector } from "react-redux";
   import axios from "axios";
   import { Elements } from "@stripe/react-stripe-js";
   import { loadStripe } from "@stripe/stripe-js";   
   
   import "./App.css";
   import Footer from "./component/layout/footer/Footer.js"
   import Home  from "./component/Home/Home.js"  
   import Header from "./component/layout/Header/Header.js" 
   import ProductDetails from "./component/Product/ProductDetails.js";
   import Products from "./component/Product/Products.js";
   import Search from "./component/Product/Search.js";
   import LoginSingUp from "./component/User/LoginSingUp";
   import  store from "./Store";
   import { loadUser } from "./actions/userAction";
   import UserOptions from "./component/layout/Header/UserOptions.js"
   import Profile from "./component/User/Profile.js"
   import ProtectedRoute from "./component/Route/ProtectedRoute";
   import UpdateProfile  from "./component/User/UpdateProfile.js";
   import UpdatePassword  from "./component/User/UpdatePassword.js";
   import ForgotPassword  from "./component/User/ForgotPassword.js";
   import ResetPassword from "./component/User/ResetPassword";
   import Cart from "./component/Cart/Cart.js"
   import Shipping from "./component/Cart/Shipping.js"
   import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
   import Payment from "./component/Cart/Payment.js"
   import OrderSuccess from "./component/Cart/OrderSuccess.js"
   import MyOrders  from "./component/Order/MyOrders.js" 
   import OrderDetails from "./component/Order/OrderDetails.js"
   import Dashboard from "./component/admin/Dashboard.js";
   import ProductList from "./component/admin/ProductList.js"
   import NewProduct from "./component/admin/NewProduct";
   import UpdateProduct from "./component/admin/UpdateProduct.js"
   import OrderList from "./component/admin/OrderList";
   import ProcessOrder from "./component/admin/ProcessOrder.js"
   import UserList from "./component/admin/UserList";
   import UserUpdate from "./component/admin/UserUpdate.js";
   import ProductReview from "./component/admin/ProductReview.js"
   import Contact from "./component/layout/Contact/Contact";
   import About from "./component/layout/About/About";
   import NotFound from "./component/layout/Not Found/NotFound";


   function App() {
     
     const {isAuthenticated ,user}=useSelector((state)=>state.user);
        
     const [stripeApikey,setStripeApikey]=useState("");
     
     async function getStripeApiKey(){
              const {data} = await axios.get("/api/v1/stripeapikey");
             
              console.log("data-----  striapikey",data);
             
                  setStripeApikey(data.stripeApiKey);
     } 

      console.log("stripeApiKey",stripeApikey);
          
     useEffect(()=>{
   
         store.dispatch(()=>loadUser());             
         getStripeApiKey();
     },[]);                                          

    //  window.addEventListener("contextmenu",(e)=>e.preventDefault())

     return (
    <Fragment>
    
     <BrowserRouter> 
          <Header/>   
          {isAuthenticated && <UserOptions user={user}/>}

          {/*    simple Route      */}

          
<Routes>
<Route  path="/" element={<Home/>}/> 
<Route  path="/product/:id" element={<ProductDetails/>}/> 
<Route  path="/products" element={<Products/>}/> 
<Route  path="/products/:keyword" element={<Products/>}/>     
<Route  path="/search" element={<Search/>}/>
<Route path="/password/forgot" element={<ForgotPassword/>} />
<Route path="/password/reset/:token" element={<ResetPassword/>} />
<Route  path="/login" element={<LoginSingUp/>}/>
<Route  path="/cart" element={<Cart/>}/>
<Route  path={"*"}  element={<NotFound/>}/>
     
{
  stripeApikey && (
        <Route path="/process/payment" element={<Elements  stripe={loadStripe(stripeApikey)}><Payment/></Elements>}/>
  )
}

{/*    Protect Route   outlet    */}

<Route  element={<ProtectedRoute isAuthenticat={isAuthenticated} />}>
<Route exact path="/contact" element={<Contact/>} />
<Route exact path="/about" element={<About/>} />
<Route path="/account" element={<Profile/>}/>
<Route path="/me/update" element={<UpdateProfile/>}/>
<Route path="password/update" element={<UpdatePassword/>}/>
<Route path="/shipping" element={<Shipping/>}/>
<Route path="/order/confirm" element={<ConfirmOrder/>}/>       




<Route path="/success" element={<OrderSuccess/>}/>
<Route path="orders" element={<MyOrders/>}/>
 <Route path="/order/:id"  element={<OrderDetails/>} />
 
 {/*    admin  Route   chilidern   */}

<Route  path="/admin/dashboard" element={<ProtectedRoute isAuthenticat={isAuthenticated}  isAdmin={true}>
 <Dashboard/>
  </ProtectedRoute>}/>

  <Route  path="/admin/products" element={<ProtectedRoute isAuthenticat={isAuthenticated}  isAdmin={true}>
  <ProductList/>
   </ProtectedRoute>}/>


   <Route  path="/admin/product" element={<ProtectedRoute isAuthenticat={isAuthenticated}  isAdmin={true}>
   <NewProduct/>
    </ProtectedRoute>}/>



<Route  path="/admin/product/:id" element={<ProtectedRoute isAuthenticat={isAuthenticated}  isAdmin={true}>
<UpdateProduct/>
</ProtectedRoute>}/>


<Route  path="/admin/orders" element={<ProtectedRoute isAuthenticat={isAuthenticated}  isAdmin={true}>
<OrderList/>
</ProtectedRoute>}/>
 


<Route  path="/admin/order/:id" element={<ProtectedRoute isAuthenticat={isAuthenticated}  isAdmin={true}>
<ProcessOrder/>
</ProtectedRoute>}/>
 

<Route  path="/admin/users" element={<ProtectedRoute isAuthenticat={isAuthenticated}  isAdmin={true}>
<UserList/>
</ProtectedRoute>}/>



<Route  path="/admin/user/:id" element={<ProtectedRoute isAuthenticat={isAuthenticated}  isAdmin={true}>
<UserUpdate/>
</ProtectedRoute>}/>



<Route  path="/admin/reviews" element={<ProtectedRoute isAuthenticat={isAuthenticated}  isAdmin={true}>
<ProductReview/>
</ProtectedRoute>}/>

 
{/*<Route element={window.location.pathname==="/process/payment" ? null : <NotFound/>}/>*/}

 </Route> 

  


</Routes>
    <Footer/>
    </BrowserRouter>

    </Fragment>
  );
}

export default App;
