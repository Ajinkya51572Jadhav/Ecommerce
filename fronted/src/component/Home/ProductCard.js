import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./Home.css";
import { Rating } from "@material-ui/lab";


const ProductCard=({product})=>{
    // console.log(product);
    // console.log(product.image[0].url);
      
    // const options = {
    //     edite:false,
    //     color:"rgba(20,20,20,0.1)",
    //     activeColor:"tomato",
    //     size:window.innerWidth < 600 ? 20 :25,
    //     value:product.ratings,
    //     isHalf:true,  
    // }

    const options = {
        size: "large",
        value:product.ratings,
        readOnly: true,
        precision: 0.5  ,
      };
  
    return(
        <Fragment>
        <NavLink className={"productCard"} to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name}/>
        <p>{product.name}</p>

        <div>
{/*<ReactStars>*/}
     <Rating {...options}/><span className="productCardSpan">({product.numOfReviews} Reviews)</span>
           <span>{`₹${product.price}`}</span> 
          </div> 
         </NavLink>
        </Fragment>
    )
}

export default ProductCard;