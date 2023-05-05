import {createReducer} from "@reduxjs/toolkit"
//get all product reducer
export const productsReducer=createReducer({products :[]},{
    allProductRequest :(state)=>{
        state.loading=true
    },
    allProductSuccess : (state,action)=>{
        state.loading=false;
        state.products=action.payload.products;
        state.productCount=action.payload.productCount;
        state.resultPerPage=action.payload.resultPerPage;
    },
    allProductFail :(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    adminProductRequest :(state)=>{
        state.loading=true
    },
    adminProductSuccess : (state,action)=>{
        state.loading=false;
        state.products=action.payload.products;
       
    },
    adminProductFail :(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearError : (state)=>{
        state.error=null;
      },

})

//admin product create
export const newProductReducer=createReducer({product:[]},{
    newProductRequest :(state)=>{
        state.loading=true;
    },
    newProductSuccess : (state,action)=>{
        state.loading=false;
        state.success=action.payload.success;
        state.product=action.payload.product;
        
    },
    newProductFail :(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    newProductReset :(state)=>{
        state.success=false;
    },
    clearError : (state)=>{
        state.error=null;
      },

})

//get product detail
export const productDetailsReducer=createReducer({product :{}},{
    productDetailsRequest :(state)=>{
        state.loading=true;
    },
    productDetailsSuccess : (state,action)=>{
        state.loading=false;
        state.product=action.payload.product;
        
    },
    productDetailsFail :(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearError : (state)=>{
        state.error=null;
      },

})

//delete product reducer
export const productReducer=createReducer({},{
    deleteProductRequest :(state)=>{
        state.loading=true;
    },
    deleteProductSuccess : (state,action)=>{
        state.loading=false;
        state.isDeleted=action.payload;
        
    },
    deleteProductFail :(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    deleteProductReset :(state)=>{
        state.isDeleted=false;
    },
    updateProductRequest :(state)=>{
        state.loading=true;
    },
    updateProductSuccess : (state,action)=>{
        state.loading=false;
        state.isUpdated=action.payload;
        
    },
    updateProductFail :(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    updateProductReset :(state)=>{
        state.isUpdated=false;
    },
    clearError : (state)=>{
        state.error=null;
      },

})

//review reducer
export const newReviewReducer=createReducer({},{
    newReviewRequest :(state)=>{
        state.loading=true;
    },
    newReviewSuccess : (state,action)=>{
        state.loading=false;
        state.success=action.payload;
        
    },
    newReviewFail :(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    newReviewReset :(state)=>{
        state.success=false;
    },
    clearError : (state)=>{
        state.error=null;
      },

})

//product review
export const productReviewReducer=createReducer({reviews :[]},{
    allReviewRequest :(state)=>{
        state.loading=true;
    },
    allReviewSuccess : (state,action)=>{
        state.loading=false;
        state.reviews=action.payload;
        
    },
    allReviewFail :(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearError : (state)=>{
        state.error=null;
      },

})

//reviews reducer
export const reviewReducer=createReducer({},{
    deleteReviewRequest :(state)=>{
        state.loading=true;
    },
    deleteReviewSuccess : (state,action)=>{
        state.loading=false;
        state.isDeleted=action.payload;
        
    },
    deleteReviewFail :(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    deleteReviewReset :(state)=>{
        state.isDeleted=false;
    },
    clearError : (state)=>{
        state.error=null;
      },

})