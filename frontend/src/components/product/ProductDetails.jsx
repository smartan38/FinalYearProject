import React, { Fragment, useEffect, useState } from "react";
// import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  getProductDetails,
  newReview,
} from "../../redux/action/productAction";
import ReviewCard from "./ReviewCard.jsx";
import Loader from "../layout/loader/Loader";
// import { useAlert } from "react-alert";
// import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../redux/action/cartAction";
import ReactStars from "react-rating-stars-component"
import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Rating from '@mui/material/Rating';

// import { Rating } from "@material-ui/lab";
// import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params=useParams();
  const navigate=useNavigate();

  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options={
    edit :false,
    color :"rgba(20,20,20,.2)",
    activeColor : "tomato",
    value:product.ratings,
    precision :0.5,
    isHalf :true,
}

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    dispatch(addItemsToCart(params.id, quantity));
    alert("Item Added To Cart");
    navigate("/cart")
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }

    if (reviewError) {
      alert(reviewError);
      dispatch(clearError());
    }

    if (success) {
      alert("Review Submitted Successfully");
      dispatch({ type:"newReviewReset" });
    }
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, error,reviewError,success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {/* <MetaData title={`${product.name} -- ECOMMERCE`} /> */}
          <div className="ProductDetails">
            <div>
           
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
              <ReactStars {...options}/>
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="Number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button> 
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} image={product.images[0]} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
