import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import "./CartItemCard.css";

const CartItemCard = ({item,deleteCartItem}) => {
  return (
      <div className='CartItemCard'>
        <img src={item.image} alt={item.name}/>
        <div>
           <NavLink className="link"  to={`/product/${item.product}`}>{item.name}</NavLink>
           <span>{`Price : ₹ ${item.price}`}</span>
           <p onClick={()=>deleteCartItem(item.product)}>remove</p>
        </div>
      
      </div>
        
      
  )
}

export default CartItemCard
