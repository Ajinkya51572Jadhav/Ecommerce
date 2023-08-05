


import React, { Fragment } from 'react'
import logo from "../images/logo.gif";
import { NavLink } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";


import "./Sidebar.css";

const Sidebar = () => {
  return (
    <Fragment>
    <div className='sidebar'>
    <NavLink to={'/'}><img src={logo} alt='Ecommerce'/></NavLink>
    <NavLink to={"/admin/dashboard"}><p><DashboardIcon/> Dashboard</p></NavLink>
    
    <NavLink> 
        <TreeView defaultCollapseIcon={<ExpandMoreIcon/>} defaultExpandIcon={<ImportExportIcon/>}>
          <TreeItem nodeId='1' label={'Products'}>  
              <NavLink to={'/admin/products'}><TreeItem nodeId='2' label='All' icon={<PostAddIcon/>}/></NavLink>
              <NavLink to={'/admin/product'}><TreeItem nodeId='3' label='Create' icon={<AddIcon/>}/></NavLink>
          </TreeItem>
        </TreeView>
    </NavLink>

    <NavLink to={'/admin/orders'}><p><ListAltIcon/>Orders</p></NavLink>
    <NavLink to={'/admin/users'}><p><PeopleIcon/>Users</p></NavLink>
    <NavLink to={'/admin/reviews'}><p><RateReviewIcon/>Reviews</p></NavLink>
    </div>
    </Fragment>
  )
}

export default Sidebar;