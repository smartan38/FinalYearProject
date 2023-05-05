import React, { useEffect } from 'react'
import Product from './productss/Product'
import MetaData from '../layout/MetaData'
import "./Home.css"
import {getProducts} from "../../redux/action/productAction"
import {useDispatch,useSelector} from "react-redux"
import Loader from '../layout/loader/Loader'


const Home = () => {
 const dispatch = useDispatch();
 const {loading ,error,products}=useSelector(state=>state.products);
 useEffect(()=>{
  if(error){
    return alert(error);
  }
  dispatch(getProducts())
 },[dispatch,error])
  return (
  
   <>
   {loading ? <Loader/>:<>
    <MetaData title="MYApp"/>
    <div className='banner'>
      <p>Welcome to MyApp</p>
      <h1>FIND AMAZING PRODUCTS BELOW</h1>
      <a href='#container'>
        <button>
          Explore
        </button>
      </a>
    
    </div>
   <h2 className='featured'>Featured Products</h2>
   <div className='container' id ='container'>
   {products && products.map(product=>(
    <Product key={product._id} product={product}/>
   ))}
   

   </div>
   </>
   }

   </>
  
    
  )
}

export default Home