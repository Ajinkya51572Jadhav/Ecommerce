


import React,{Fragment} from 'react'
import   "./OrderSuccess.css"
import ChckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <Fragment>
    <div className='orderSuccess'>
      <ChckCircleIcon/>
      <Typography>Your Order Has Been Placed Successfully </Typography>
      <NavLink to={"/orders"}>View Order</NavLink>
    </div>
    </Fragment>
  )
}

export default OrderSuccess