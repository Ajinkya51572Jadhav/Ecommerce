import axios from "axios";

import { ALL_PRODUCT_REQUEST , 
         ALL_PRODUCT_FAIL ,
         ALL_PRODUCT_SUCCESS,

         PRODUCT_DETAILS_FAIL,
         PRODUCT_DETAILS_SUCCESS, 
         PRODUCT_DETAILS_REQUEST,

         NEW_REVIEW_REQUEST,
         NEW_REVIEW_SUCCESS,
         NEW_REVIEW_FAIL,


         ADMIN_PRODUCT_REQUEST,
         ADMIN_PRODUCT_FAIL,
         ADMIN_PRODUCT_SUCCESS,

         NEW_PRODUCT_REQUEST,
         NEW_PRODUCT_SUCCESS,
         NEW_PRODUCT_FAIL,

         DELETE_PRODUCT_REQUEST,
         DELETE_PRODUCT_SUCCESS,
         DELETE_PRODUCT_FAIL,
         
         CLEAR_ERRORS,
         UPDATE_PRODUCT_FAIL,
         UPDATE_PRODUCT_REQUEST,
         UPDATE_PRODUCT_SUCCESS,
         ALL_REVIEW_FAIL,
         ALL_REVIEW_REQUEST,
         ALL_REVIEW_SUCCESS,
         DELETE_REVIEW_FAIL,
         DELETE_REVIEW_SUCCESS, 
      } from "../constants/ProductConstants";

     ///     all products get 

  export const getProduct=
 (keyword="",currentPage=1,price=[0,25000],category,ratings=0)=>async(dispatch)=>{
     try{
    
         dispatch({
            type:ALL_PRODUCT_REQUEST
        });

  let link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
  
    if(category){
      link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }
console.log(ratings);
console.log(category);
console.log(link);
     
         const {data} = await axios.get(link);        // { data change }
         console.log("getProduct",data);
             
         dispatch({
            type:ALL_PRODUCT_SUCCESS,
             payload:data
         })
 
     }catch(error){
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload : error.response.data.message     // data change .response.data.message
        })

     }};

    //                products details 

     export const getProductDetails=(id)=>async(dispatch)=>{

        console.log(id);

      try{
     
          dispatch({
            type:PRODUCT_DETAILS_REQUEST
        });
 
          const {data} = await axios.get(`/api/v1/product/${id}`);        // { data change }
          console.log("productDetails",data);
              
          dispatch({
             type:PRODUCT_DETAILS_SUCCESS,
              payload:data.product 
          })
  
      }catch(error){
         dispatch({
             type:PRODUCT_DETAILS_FAIL,
             payload : error.response.data.message     // data change .response.data.message
         })
 
      }};
 
//       Reviews  

 export const newReview=(reviewData)=> async(dispatch)=>{

  try {
   
    dispatch({
           type:NEW_REVIEW_REQUEST
         });

           const config = {
            headers:{
                "Content-Type":"application/json"
            }
           }

         const {data} = await axios.put("/api/v1/review",reviewData,config);
 
          console.log(" new Review data",data);
       

         dispatch({
            type:NEW_REVIEW_SUCCESS,
               payload:data.success
         });

         
       
  } catch (error) {
    dispatch({
           type:NEW_REVIEW_FAIL,
            payload:error.response.data.message
    })
  }
 }


// get Admin Products ______ (Admin)

    export const getAdminProducts=()=> async(dispatch)=>{
try {
   dispatch({
    type:ADMIN_PRODUCT_REQUEST
   });
   const {data} = await axios.get("/api/v1/admin/products");
     
   console.log("admin Products",data);
   dispatch({
    type:ADMIN_PRODUCT_SUCCESS,
     payload:data.products 
   });
} catch (error) {
  dispatch({
    type:ADMIN_PRODUCT_FAIL,
    payload : error.response.data.message
  })
}
    };

         
     // create Products 
     
    
    
    
     export  const   createProduct =(productData)=>async(dispatch)=>{
      
       console.log("create ProductData product",productData);

      try{
       
       dispatch({
        type:NEW_PRODUCT_REQUEST,
       })

      const  config = {
                headers:{
                  "Content-Type":"application/json"
                }
       }         
       const {data} = await  axios.post(`/api/v1/admin/product/new`,productData,config);

        console.log("create Product",data);

       dispatch({
        type:NEW_PRODUCT_SUCCESS, 
        payload:data
      });

    }catch(error){
      dispatch({
         type:NEW_PRODUCT_FAIL ,
          payload : error.responce.data.message,
      })
    }};



    //  delete product s

  export const  deleteProduct =(id)=> async(dispatch)=>{
      
         try {
                                      
   dispatch({
      type:DELETE_PRODUCT_REQUEST
    });

    const {data} = await axios.delete(`/api/v1/admin/product/${id}`);

    console.log("delete Product",data);

    dispatch({
     type:DELETE_PRODUCT_SUCCESS,
     payload:data.success       
   });

         } catch (error) {
              dispatch({
                 type:DELETE_PRODUCT_FAIL,
                 payload:error.responce.data.message
              });       
         }
   };    





  export const updateProduct = (id,productData)=>async(dispatch)=>{ 

    console.log("updateProduct id",id , "productData",productData);
         try {
          
         dispatch({
            type:UPDATE_PRODUCT_REQUEST ,
         });
         const config = {
          headers : {"Content-Type" :"multipart/form-data"}
        };
  
        const {data}  = await axios.put(`/api/v1/admin/product/${id}`,productData,config);

               
        console.log("update product",data);
          dispatch({
             type:UPDATE_PRODUCT_SUCCESS,
             payload: data.success
          });

         } catch (error) {
          dispatch({
             type:UPDATE_PRODUCT_FAIL , 
             payload: error.responce.data.message 

          })
         }
      

  };
    



  // product review _____(admin)
       
     export const  getAllReviews = (id)=>async(dispatch)=>{
          try{
           dispatch({
            type:ALL_REVIEW_REQUEST,
           });

         const {data}= await axios.get(`/api/v1/reviews?id=${id}`); 

           dispatch({
            type:ALL_REVIEW_SUCCESS,
            payload:data.reviews  
           });

          }catch(error){
             dispatch({
               type:ALL_REVIEW_FAIL,
               payload:error.responce.data.message    
             });
          }
     };


     //  delete product reviews ______(admin)

       export const deleteReviews = (reviewId,productId)=>async(dispatch)=>{
          
         console.log("delte reviewa product Id", reviewId,productId)
        try{
            dispatch({
               type:DELETE_REVIEW_FAIL 
            });
    
      const {data} = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`);
          
      console.log("delete reviews",data);
       
       dispatch({
             type:DELETE_REVIEW_SUCCESS, 
             payload:data.success
            });

           }catch(error){
            dispatch({
             type:DELETE_REVIEW_FAIL,
             payload:error.responce.data.message
            });
           }
       } ;











      // clearing Errors 
           export const cleareErrors = (dispatch)=>{
        dispatch({
            type:CLEAR_ERRORS
        });
         
     }


    