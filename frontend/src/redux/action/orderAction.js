import axios from "axios"
// create order
 export const createOrder=(order)=>async(dispatch)=>{
    try {
        dispatch({
            type :"createOrderRequest",
           })
           const config={
            headers:{"Content-Type" : "application/json"}
           }
           const {data}=await axios.post("/api/v1/order/new",order,config);
           dispatch({
            type :"createOrderSuccess",
            payload :data,
        })
  
    } catch (error) {
        dispatch({
            type :"createOrderFail",
            payload :error.response.data.message
        })
    }
  }

  //myOrders

  export const myOrders=()=>async(dispatch)=>{
    try {
        dispatch({
            type :"myOrdersRequest",
           })
           
           const {data}=await axios.get("/api/v1/orders/me");
           dispatch({
            type :"myOrdersSuccess",
            payload :data.orders,
        })
  
    } catch (error) {
        dispatch({
            type :"myOrdersFail",
            payload :error.response.data.message
        })
    }
  }

  //all Orders Admin

  export const getAllOrders=()=>async(dispatch)=>{
    try {
        dispatch({
            type :"allOrdersRequest",
           })
           
           const {data}=await axios.get("/api/v1/admin/orders");
           dispatch({
            type :"allOrdersSuccess",
            payload :data.orders,
        })
  
    } catch (error) {
        dispatch({
            type :"allOrdersFail",
            payload :error.response.data.message
        })
    }
  }


  // update order Admin
 export const updateOrder=(id,order)=>async(dispatch)=>{
    try {
        dispatch({
            type :"updateOrderRequest",
           })
           const config={
            headers:{"Content-Type" : "application/json"}
           }
           const {data}=await axios.put(`/api/v1//admin/order/${id}`,order,config);
           dispatch({
            type :"updateOrderSuccess",
            payload :data.success,
        })
  
    } catch (error) {
        dispatch({
            type :"updateOrderFail",
            payload :error.response.data.message
        })
    }
  }

    // delete order Admin
 export const deleteOrder=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type :"deleteOrderRequest",
           })
           
           const {data}=await axios.delete(`/api/v1//admin/order/${id}`);
           dispatch({
            type :"deleteOrderSuccess",
            payload :data.success,
        })
  
    } catch (error) {
        dispatch({
            type :"deleteOrderFail",
            payload :error.response.data.message
        })
    }
  }
  //orderDetails
  export const getOrderDetails=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type :"orderDetailsRequest",
           })
           
           const {data}=await axios.get(`/api/v1/order/${id}`);
           dispatch({
            type :"orderDetailsSuccess",
            payload :data.order,
        })
  
    } catch (error) {
        dispatch({
            type :"orderDetailsFail",
            payload :error.response.data.message
        })
    }
  }



   //action to clear error
 export const clearError=()=>async(dispatch)=>{
    dispatch({
        type :"clearError",
       })
 }
 