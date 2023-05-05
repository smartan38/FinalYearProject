import {createReducer} from "@reduxjs/toolkit"

//get all product reducer
export const cartReducer=createReducer({cartItems:[],shippingInfo:{}},{
      addToCart :(state,action)=>{
        const item=action.payload;
        const isItemExist=state.cartItems.find((i)=>i.product===item.product);
        if(isItemExist){
           state.cartItems=state.cartItems.map((i)=>i.product===isItemExist.product?item:i)

        }
        else{
            state.cartItems=[...state.cartItems,item];
        }

      },
      removeCartItem :(state,action)=>{
        state.cartItems= state.cartItems.filter((i) => i.product !== action.payload)
      },
      saveShippingInfo :(state,action)=>{
       state.shippingInfo=action.payload;
      }
    

})

