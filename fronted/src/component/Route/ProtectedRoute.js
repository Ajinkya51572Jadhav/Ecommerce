import React  from 'react'
import { useSelector } from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';

const ProtectedRoute = ({isAuthenticat, children ,isAdmin}) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    

       if(!isAuthenticat){
         return <Navigate  to="/login"/>;
       }
    
       if (isAdmin === true && user.role !== "admin") {
        return <Navigate to="/login" />;
      }



       return children ? children  : <Outlet/>; // children 
       
  };

export default ProtectedRoute;
