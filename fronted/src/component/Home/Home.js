import { Fragment, useEffect } from 'react'
import {CgMouse} from  "react-icons/cg";
import {useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { NavLink, useParams } from 'react-router-dom';

import "./Home.css";
import ProductCard from "./ProductCard.js"
// import MetaData from '../layout/MetaData';
import { cleareErrors, getProduct } from '../../actions/ProductAction';
import Loader from '../layout/Loader/Loader';




const Home=()=>{
  const  params = useParams()
  const alert = useAlert();
 const dispatch = useDispatch();

 
const {loading, error , products}=useSelector(state=>state.products);

const keyword  = params.keyword;

console.log(keyword);
console.log(products)


  useEffect(()=>{
     
    if(error){
      alert.error(error);
      dispatch(cleareErrors());
    }

    dispatch(getProduct(keyword));
  },[dispatch ,keyword ,error ,alert]);

  
//  const product = {
//     name:"Blue T-shirt",
//    image:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
//     price:"₹300",
//     _id:"ajinkya"
//  };

  return (

    <Fragment>
    {
      loading ? (<Loader/>):(

        <Fragment>
        {/*<MetaData title={"Home page is working"}/>*/}
      <div className='banner'>
         <p>Welcome to ECOMMERCE </p>
         <h1> FIND AMAZING PRODUCTS <br/> <h5>Blockbuster Deals | Shop Now</h5></h1>
         <a href="#container"><button>Scroll <CgMouse/> </button> </a>
         <h2 className='homeHeading'>Featured Products </h2>        
         <div id='container' className='container'>
         
         {/*<Product product={product}/>*/}
          
  {
    products && products.map((product)=>{
    return(
      <ProductCard key={product._id} product={product}/>
      )
    })
  }         </div>
       </div>
      </Fragment>

      )
    }
    </Fragment>
  )
}

export default Home 