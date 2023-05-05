// import {combineReducers,applyMiddleware} from "redux"
// import thunk from "redux-thunk"
// import {composeWithDevTools} from "redux-devtools-extension"

// const reducer=combineReducers({});
// let initialState={};
// const middleware=[thunk];
import {configureStore} from "@reduxjs/toolkit"
import { productsReducer, productDetailsReducer, newReviewReducer, newProductReducer, productReducer, productReviewReducer, reviewReducer} from "./redux/reducer/productReducer";
import {  allUserReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./redux/reducer/userReducer";
import { cartReducer } from "./redux/reducer/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./redux/reducer/orderReducer";

let initialState = {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    },
  };

const store=configureStore({
    reducer : {
       products  :productsReducer,
       productDetail :productDetailsReducer,
       user:userReducer,
       profile :profileReducer,
       forgotPassword :forgotPasswordReducer,
       cart : cartReducer,
       newOrder :newOrderReducer,
       myOrders :myOrdersReducer,
       orderDetails :orderDetailsReducer,
       newReview :newReviewReducer,
       newProduct:newProductReducer,
       product :productReducer,
       allOrders :allOrdersReducer,
       order : orderReducer,
       allUsers :allUserReducer,
       userDetails:userDetailsReducer,
       productReviews:productReviewReducer,
       review:reviewReducer,
    },
    initialState,
})



export default store;