import React, { useEffect,useState } from 'react'
import "./Products.css"
import { useSelector,useDispatch } from 'react-redux'
import {clearError, getProducts} from '../../redux/action/productAction'
import Loader from '../layout/loader/Loader'
import Product from '../home/productss/Product'
import { useParams } from 'react-router-dom'
import Pagination from "react-js-pagination"
import{Slider} from "@mui/material"


const Products = () => {
  const categories=["Phone","Laptop","Footwear","Camera","Watch"];
    const dispatch=useDispatch()
      const[currentPage,setCurentPage]=useState(1)
      const [price,setPrice] = useState([0,25000])
      const [category,setCategory]=useState();
      const [ratings,setRatings]=useState(0)
    const {products,loading,productCount,resultPerPage,error} =useSelector(state=>state.products);
    const params=useParams();
    const keyword=params.keyword;
    const setCurrentPageNo=(e)=>{
      setCurentPage(e)
    }

      const priceHandler=(e,newPrice)=>{
        e.preventDefault();
        setPrice(newPrice);
      }

    useEffect(()=>{
      if(error){
        alert(error)
        dispatch(clearError())
      }
       dispatch(getProducts(keyword,currentPage,price,category,ratings))
    },[dispatch,keyword,currentPage,price,category,ratings,error])
  return (
  <>
      {loading?<Loader/>:<>
      <h2 className='productsHeading'>PRODUCTS</h2>
        <div className='products'>
            {
            products && products.map((product)=>(
                <Product key = {product._id} product={product}/>
            ))}
        </div>
       
       <div className='filterBox'>
        <p className='filt'>Price</p>
         <Slider 
         value={price}
         onChange={priceHandler}
         valueLabelDisplay="auto"
         aria-labelledby='range-slider'
         min={0}
         max={25000}
         />
         <p className='cate'>Category</p>
         <ul className='categoryBox'>
          {
            categories.map((category)=>(
              <li
                className="categoryLink"
                key={category}
                onClick={()=>setCategory(category)}
                >
                  {category}
              </li>
            ))
          }

         </ul>
         <fieldset>
             <p>Rating Above</p>
             <Slider 
                  value={ratings}
                  onChange={(e,newRating)=>{setRatings(newRating)}}
                  valueLabelDisplay="auto"
                  aria-labelledby='continuous-slider'
                  min={0}
                  max={5}
         />
         </fieldset>
       </div>


       {resultPerPage<productCount&&(
         <div className='paginationBox'>
         <Pagination 
           activePage ={currentPage}
           itemsCountPerPage={resultPerPage}
           totalItemsCount={productCount}
           onChange={setCurrentPageNo}
           nextPageText="Next"
           prevPageText="Prev"
           firstPageText="1st"
           lastPageText="Last"
           itemClass='page-item'
           linkClass='page-link'
           activeClass='pageItemActive'
           activeLinkClass='pageLinkActive'

         />
       </div>
       )}


      </>}
  </>
  )
}

export default Products