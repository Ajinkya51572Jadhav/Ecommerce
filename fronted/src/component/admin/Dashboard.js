

import React,{Fragment, useEffect} from 'react'


import "./dashboard.css"
import Sidebar from './Sidebar'
import { Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import {   registerables , Chart as ChartJS, CategoryScale,  LinearScale,  PointElement,  LineElement,  Title,  Tooltip,  Legend,} from 'chart.js';
import { Doughnut, Line  } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { cleareErrors, getAdminProducts } from '../../actions/ProductAction';
import { getAllOrders } from '../../actions/orderAction';
import { alluser } from '../../actions/userAction';
ChartJS.register(  ...registerables ,CategoryScale,  LinearScale,  PointElement,  LineElement,  Title,  Tooltip,  Legend);



const Dashboard = () => {

               const dispatch = useDispatch();
               const alert    =  useAlert();           



       const {error ,products} = useSelector((state)=>state.products);
       const {orders}=useSelector((state)=>state.allOrders)
       const {users} = useSelector((state)=>state.allusers);
        
       let outOfStock = 0;

        products && products.forEach((item,index)=> {
             if(item.Stock===0){
                  outOfStock+=1;
             }    
          
        });

        useEffect(()=>{
               if(error){
                alert.error(error);
                dispatch(cleareErrors());
               }
                   
          dispatch(getAdminProducts());          
          dispatch(getAllOrders()); 
          dispatch(alluser());
        },[dispatch,error,alert]);

        //   totol amount 
        let totalAmount = 0;
        orders &&
          orders.forEach((item) => {
            totalAmount += item.totalPrice;
          });

   const data = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0,totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock,products.length - outOfStock],
      },
    ],
  };



  return (
    <Fragment>
    <div className='dashboard'>
    <Sidebar/>
      <div className='dashboardContainer'>
           <Typography component={'h1'}>Dashboard</Typography>
              <div className='dashboardSummary'>
                 <div><p>Total Amount <br/>₹ {totalAmount}</p></div>
                   <div className='dashboardSummaryBox2'>
                     <NavLink to={'/admin/products'}><p>Product</p><p>{products && products.length}</p></NavLink>
                     <NavLink to={'/admin/orders'}><p>Orders</p><p>{orders && orders.length}</p></NavLink>
                     <NavLink to={'/admin/users'}><p>Users</p><p>{users && users.length}</p></NavLink>
                   </div>
              </div>

  <div className='lineChart'>
  <Line  data={data} />  
  </div>

  <div className="doughnutChart">
  <Doughnut data={doughnutState} />
</div>
     </div>
    </div>
    </Fragment>
  )
}

export default Dashboard











