import {createReducer} from "@reduxjs/toolkit"
//get all product reducer
export const newOrderReducer=createReducer({},{
    createOrderRequest :(state)=>{
        state.loading=true
    },
    createOrderSuccess : (state,action)=>{
        state.loading=false;
        state.order=action.payload;
    },
    createOrderFail :(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearError : (state)=>{
        state.error=null;
      },

})
//get myorder
export const myOrdersReducer=createReducer({orders:[]},{
    myOrdersRequest :(state)=>{
        state.loading=true
    },
    myOrdersSuccess : (state,action)=>{
        state.loading=false;
        state.orders=action.payload;
    },
    myOrdersFail :(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearError : (state)=>{
        state.error=null;
      },

})

//get all order admin
export const allOrdersReducer=createReducer({orders:[]},{
    allOrdersRequest :(state)=>{
        state.loading=true
    },
    allOrdersSuccess : (state,action)=>{
        state.loading=false;
        state.orders=action.payload;
    },
    allOrdersFail :(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearError : (state)=>{
        state.error=null;
      },

})

//update order admin
export const orderReducer=createReducer({},{
    updateOrderRequest :(state)=>{
        state.loading=true
    },
    updateOrderSuccess : (state,action)=>{
        state.loading=false;
        state.isUpdated=action.payload;
    },
    updateOrderFail :(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    updateOrderReset :(state)=>{
        state.isUpdated=false;
    },

    deleteOrderRequest :(state)=>{
        state.loading=true
    },
    deleteOrderSuccess : (state,action)=>{
        state.loading=false;
        state.isDeleted=action.payload;
    },
    deleteOrderFail :(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    deleteOrderReset :(state)=>{
        state.isDeleted=false;
    },
    clearError : (state)=>{
        state.error=null;
      },

})

//order details 
export const orderDetailsReducer=createReducer({order:{}},{
   orderDetailsRequest :(state)=>{
        state.loading=true
    },
    orderDetailsSuccess : (state,action)=>{
        state.loading=false;
        state.order=action.payload;
    },
    orderDetailsFail :(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearError : (state)=>{
        state.error=null;
      },

})