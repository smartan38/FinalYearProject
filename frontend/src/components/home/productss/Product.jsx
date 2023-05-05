import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"
// import img from "../../asset/img1.jpg"

const Product = ({product}) => {
  const options={
    edit :false,
    color :"rgba(20,20,20,.2)",
    activeColor : "tomato",
    value:product.ratings,
    precision :0.5,
    isHalf :true,
}
  return (
    <Link className='productCard' to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name}  height={400} />  
        <p>{product.name}</p>
        <div>
          <ReactStars {...options}/>
          <span>({product.numOfReviews} Reviews)</span>
        </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  )
}

export default Product