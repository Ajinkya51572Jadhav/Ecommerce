

   import {
        
          CREATE_ORDER_REQUEST,
          CREATE_ORDER_SUCCESS,
          CREATE_ORDER_FAIL,
    
          MY_ORDERS_FAIL,
          MY_ORDERS_REQUEST,
          MY_ORDERS_SUCCESS,

          ORDERS_DETAILS_SUCCESS,
          ORDERS_DETAILS_REQUEST,
          ORDERS_DETAILS_FAIL,
          
          ALL_ORDERS_REQUEST,
          ALL_ORDERS_SUCCESS,
          ALL_ORDERS_FAIL,

          CLEAR_ERRORS,
          DELETE_ORDER_FAIL,
          DELETE_ORDER_REQUEST,
          DELETE_ORDER_SUCCESS,
          UPDATE_ORDER_FAIL,
          UPDATE_ORDER_REQUEST,
          UPDATE_ORDER_SUCCESS,

   }from "../constants/orderConstantsNot";
    import axios from "axios";

  //           create Order

   export const createOrder =(order)=> async(dispatch,getState)=>{
  console.log("order",order);
    try {

        dispatch({
            type:CREATE_ORDER_REQUEST
        });
           
        const config = {
            headers : {
                "Content-Type":"application/json"
           }
        }
             const {data} = await axios.post("https://backend-ajinkya51572jadhav.vercel.app/api/v1/order/new",order, config);

        console.log("orderAction data",data);


             dispatch({
                 type:CREATE_ORDER_SUCCESS,  
                 payload:data
             });


    } catch (error) {
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:error.response.data.message,
        })
    }
      
   }

                   //   get    Order

         export  const  myOrders =()=>async(dispatch,getState)=>{
                 
            try {
                
              dispatch({
                type:MY_ORDERS_REQUEST,
              });

             const {data} = await axios.get("https://backend-ajinkya51572jadhav.vercel.app/api/v1/orders/me");

                 console.log("myorders",data);

             dispatch({
                type:MY_ORDERS_SUCCESS,
                payload : data.orders
             });


            } catch (error) {
                 dispatch({
                    type:MY_ORDERS_FAIL,
                     payload:error.response.data.message
                })

            }

         } 

          
         //  get Order Details 

         export const getOrderDetails=(id)=>async(dispatch,getState)=>{
           
            try{
                dispatch({
                    type:ORDERS_DETAILS_REQUEST
                });
    
                const {data} = await axios.get(`https://backend-ajinkya51572jadhav.vercel.app/api/v1/order/${id}`);
                     console.log("OrderDetails",data);

                dispatch({
                    type:ORDERS_DETAILS_SUCCESS,
                    payload: data.order 
                })
                       
            }catch(error){
                dispatch({
                    type:ORDERS_DETAILS_FAIL,
                    payload:error.response.data.message
                })
            }
      }


                    //      get All orders    _______(admin)

            export const getAllOrders =()=> async(dispatch)=>{

                try{
                  dispatch({
                    type:ALL_ORDERS_REQUEST,
                  });
                        
                  const {data} = await axios.get(`https://backend-ajinkya51572jadhav.vercel.app/api/v1/admin/orders`);
                        console.log("all orders", data);
                    
                     dispatch({
                       type:ALL_ORDERS_SUCCESS,
                       payload:data.orders 
                    });
            
                }catch(error){
                      dispatch({
                        type:ALL_ORDERS_FAIL,
                         payload:error.response.data.message 
                      });
                }
                };

                        
                  // update orders   

                  export const updateOrders=(id,order)=>async(dispatch)=>{
                        try {
                                dispatch({
                                     type:UPDATE_ORDER_REQUEST
                                });
                           
                              const config = {
                                headers:{
                                  "Content-type":"application/json"
                                }
                              };

                              const {data} = await axios.put(`https://backend-ajinkya51572jadhav.vercel.app/api/v1/admin/order/${id}`,order,config);

                          dispatch({
                            type:UPDATE_ORDER_SUCCESS,
                             payload:data.success
                          });


                        } catch (error) {
                             dispatch({
                               type:UPDATE_ORDER_FAIL,
                               payload:error.response.data.message
                             })
                        }
                  };
                  
                  








                //     delete orders 
                   
              export const  deletOrder=(id)=>async(dispatch)=>{
                    try {
                        
                        dispatch({
                          type:DELETE_ORDER_REQUEST,
                        });
                                    
                        const {data}  = await axios.delete(`https://backend-ajinkya51572jadhav.vercel.app/api/v1/admin/order/${id}`);
                             
                        dispatch({
                            type:DELETE_ORDER_SUCCESS,
                            payload:data.success 
                        });


                    } catch (error) {
                       dispatch({
                         type:DELETE_ORDER_FAIL,
                         payload:error.response.data.message
                       })        
                    }
              }; 
           




   //      Clearing error 

          export const  clearErrors = ()=>async(dispatch)=>{
                 dispatch({
                    type:CLEAR_ERRORS
                 });
          }