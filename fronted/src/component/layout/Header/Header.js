import React from "react";
import { ReactNavbar } from "overlay-navbar";
import {MdAccountCircle } from "react-icons/md";
import {MdSearch } from "react-icons/md";
import {MdAddShoppingCart } from "react-icons/md";
import logo from "../../images/logo.gif";

const options = {
  burgerColor:"red",
  burgerColorHover: "orange ",//#eb4034
  logo,
  logoWidth: "15vmax",
  navColor1: "#ffffff",
  navColor2: "#f7f7f7",
  navColor3: "#f3f3f3",
  navColor4: "#eaeaea",
  // logoHoverSize: "10px",
  logoHoverColor: "white",//#eb4034
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  // link1Color: "red",//rgba(35, 35, 35,0.8)
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  // link1ColorHover: "green",//#eb4034
  link1Margin: "2vmax",
  profileIconUrl: "/login",
  profileIconColorHover: "green",//#eb4034
  searchIconColorHover: "green",//#eb4034
  cartIconColorHover: "green",//#eb4034
  cartIconMargin: "1vmax",
  profileIcon:true,
  profileIconColor: "rgba(35, 35, 35,0.8)",
  ProfileIconElement: MdAccountCircle, 
  searchIcon:true,
  searchIconColor: "rgba(35, 35, 35,0.8)",
  SearchIconElement:MdSearch,
  cartIcon:true,
  cartIconUrl:"/cart",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  CartIconElement:MdAddShoppingCart,
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
