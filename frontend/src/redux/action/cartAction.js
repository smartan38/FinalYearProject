import axios from "axios"

export const addItemsToCart=(id,quantity)=>async(dispatch,getState)=>{

           const {data}=await axios.get(`/api/v1/product/${id}`);
           dispatch({
            type :"addToCart",
            payload :{
                product :data.product._id,
                name:data.product.name,
                price:data.product.price,
                image :data.product.images[0].url,
                stock:data.product.Stock,
                quantity,
            },
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
        // localStorage.setitem('cartItems',JSON.stringify(getState().cart.cartItems))
    }



// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type:"removeCartItem" ,
      payload:id,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
  
  // SAVE SHIPPING INFO
  export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
      type:"saveShippingInfo",
      payload: data,
    });
  
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };
  
   