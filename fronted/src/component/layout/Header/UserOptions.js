import React, { Fragment, useEffect, useState } from 'react';
import {SpeedDial,SpeedDialAction} from "@material-ui/lab"
import PersonIcon from "@material-ui/icons/Person";
import DashBoardIcon from "@material-ui/icons/Dashboard";
import ExictToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon  from '@material-ui/icons/ListAlt';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {useAlert} from "react-alert";
import {useNavigate}from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop } from '@material-ui/core';

import { logout } from '../../../actions/userAction';
import "./Header.css";
import imageProfile from "../../images/Profile.png"


const UserOptions = ({user}) => {

const {cartItems} = useSelector((state)=>state.cart);

  console.log(user); 
  const [open,setOpen]=useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();


 
 
 
 const options = [
  {
    icon:<ListAltIcon/>,
    name:"Orders",
    func:orders
  },
  {
    icon:<PersonIcon/>,
    name:"Profile",
    func:account
  },
  {
    icon:<ShoppingCartIcon style={{color:cartItems.length ? "green" : "red" }}/>,
    name:`Cart  (${cartItems.length}) `,
    func:cart
  },  
  {
    icon:<ExictToAppIcon/>,
    name:"Logout",
    func:logoutUser
  },
 
 ];
             if(user.role==="admin"){
                    options.unshift({
                      icon:<DashBoardIcon/>,
                      name:"Dashboard",
                      func:dashboard,
                    })
                 };
         
               
        function dashboard(){
            navigate("/admin/dashboard");
        }

        function orders(){
          navigate("/orders");
        }

        function account(){
          navigate("/account");
        }

        function cart(){
          navigate("/cart");
        }

        function logoutUser(){
          dispatch(logout());
          alert.success("Logout Successfully");
        }   



       

  return (
    <Fragment>
      <Backdrop open={open} style={{zIndex:'10'}}/>
    <SpeedDial
      ariaLabel='SpeedDial Tooltip '
      onClose={()=>setOpen(false)}
      onOpen={()=>setOpen(true)}
      //style={{zIndex:"11"}}
       open={open}
      icon={<img className='speedDialIcon' src={user.avatar.url ? user.avatar.url:imageProfile} alt='Profile'/>}
       direction='down'
       className="speedDial" 
       >

       {
        options.map((item)=>(
          <SpeedDialAction   
          key={item.name}
          icon={item.icon}
          onClick={item.func}  
          tooltipTitle={item.name}
          tooltipOpen={window.innerWidth <=600?600:false}/>
            
  ))}      
      

      </SpeedDial>
   </Fragment>
  )
}

export default UserOptions;
