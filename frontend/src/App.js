import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Header from './components/layout/Header';
import Home from "./components/home/Home";
import About from "./components/about/About"
import Contact from "./components/contact/Contact"
import Cart from "./components/cart/Cart"
import Footer from "./components/layout/footer/Footer";
import Loader from "./components/layout/loader/Loader";
// import UserOptions from "./components/layout/UserOptions.jsx"
import ProductDetails from "./components/product/ProductDetails.jsx"
import Products from "./components/product/Products.jsx"
import Search from "./components/product/Search.jsx"
import './App.css';
import LoginSignup from "./components/user/LoginSignup";
import store from "./store"
import React, { useState } from "react";
import axios from "axios"
import { loadUser } from "./redux/action/userAction";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { useSelector} from "react-redux";
import Acount from "./components/user/Acount";
import Profile from "./components/user/Profile.jsx";
import UpdateProfile from "./components/user/UpdateProfile.jsx";
import UpdatePassword from "./components/user/UpdatePassword.jsx";
import ForgotPassword from "./components/user/ForgotPassword.jsx";
import Shipping from "./components/cart/Shipping.jsx";
import ConfirmOrder from "./components/cart/ConfirmOrder.jsx"
import Payment from "./components/cart/Payment.jsx"
import Ordersuccess from "./components/cart/Ordersuccess.jsx"
import MyOrders from "./components/order/MyOrders"
import OrderDetails from "./components/order/OrderDetails.jsx"
import Dashboard from "./components/admin/Dashboard"
import ProductList from "./components/admin/ProductList.jsx"
import NewProduct from "./components/admin/NewProduct.jsx"
import UpdateProduct from "./components/admin/UpdateProduct.jsx"
import OrderList from "./components/admin/OrderList.jsx"
import  ProcessOrder from "./components/admin/ProcessOrder.jsx"
import UserList from "./components/admin/UserList.jsx"
import UpdateUser from "./components/admin/UpdateUser.jsx"
import ProductReview from "./components/admin/ProductReview.jsx"
function App() {
//  const {isAuthenticated,user} = useSelector(state=>state.user)
  const[stripeApiKey,setStripeApiKey]=useState()

async function getStripeApiKey(){
const {data}=await axios.get("/api/v1/stripeapikey")
setStripeApiKey(data.stripeApiKey);
}

  React.useEffect(()=>{
    store.dispatch(loadUser());
    getStripeApiKey();
  },[])
  return (
   <Router>
    < Header />
   
    
    <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/sad" element={<Loader/>}/>
    <Route path="/products" element={<Products/>}/>
    <Route path="/products/:keyword" element={<Products/>}/>
    <Route path="/product/:id" element={<ProductDetails/>}/>
    <Route path="/about" element={<About />}/>
    <Route path="/contact" element={<Contact />}/>
    <Route path="/cart" element={<Cart />}/>
    <Route path="/login" element ={<LoginSignup />}/>
    <Route path="/search" element={<Search />}/>
    <Route path="/shipping" element={<Shipping />}/>
    <Route path="/acount"  element={<Acount/>}/>
    <Route path="/profile"  element={<Profile/>}/>
    <Route path="/me/update"  element={<UpdateProfile/>}/>
    <Route path="/password/update"  element={<UpdatePassword/>}/>
    <Route path="/password/forgot"  element={<ForgotPassword/>}/>
    <Route path="/order/confirm"  element={<ConfirmOrder/>}/>
    
    <Route path="/process/payment" element={<Payment stripeApiKey={stripeApiKey}/>}/>
    <Route path="/success"  element={<Ordersuccess/>}/>
    <Route path="/orders"  element={<MyOrders/>}/>   
    <Route path="/order/:id" element={<OrderDetails/>}/>
    <Route path="/admin/dashboard" element={<Dashboard/>}/>
    <Route path="/admin/products" element={<ProductList/>}/>
    <Route path="/admin/product" element={<NewProduct/>}/>
    <Route path="/admin/product/:id" element={<UpdateProduct/>}/>
    <Route path="admin/orders" element={<OrderList/>}/>
    <Route path="admin/order/:id" element={<ProcessOrder/>}/>
    <Route path="admin/users" element={<UserList/>}/>
    <Route path="admin/user/:id" element={<UpdateUser/>}/>
    <Route path="admin/reviews" element={<ProductReview/>}/>
    </Routes>
   
    
      
    

    <Footer />
   </Router>
  )
}

export default App;
