import axios from "axios"
// get all products
 export const getProducts=(keyword="", currentPage=1,price=[0,25000],category,ratings=0)=>async(dispatch)=>{
    try {
        dispatch({
            type :"allProductRequest",
           })
           let link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
           if(category)
           {
            link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
           }
           const {data}=await axios.get(link);
           dispatch({
            type :"allProductSuccess",
            payload :data,
        })

    } catch (error) {
        dispatch({
            type :"allProductFail",
            payload :error.response.data.message
        })
    }
 }

 // get product details
 export const getProductDetails=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type :"productDetailsRequest",
           })
           const {data}=await axios.get(`/api/v1/product/${id}`);
           dispatch({
            type :"productDetailsSuccess",
            payload :data,
        })

    } catch (error) {
        dispatch({
            type :"productDetailsFail",
            payload :error.response.data.message
        })
    }
 }

  // get admin product
  export const getAdminProduct=()=>async(dispatch)=>{
    try {
        dispatch({
            type :"adminProductRequest",
           })
           const {data}=await axios.get("/api/v1/admin/products");
           dispatch({
            type :"adminProductSuccess",
            payload :data,
        })

    } catch (error) {
        dispatch({
            type :"adminProductFail",
            payload :error.response.data.message
        })
    }
 }

 //create product admin
 export const createProduct=(productData)=>async(dispatch)=>{
    try {
        dispatch({
            type :"newProductRequest",
           })
           const config={
            headers:{"Content-Type" : "application/json"}
           }
           const {data}=await axios.post(`/api/v1/admin/product/new`,productData,config);
           dispatch({
            type :"newProductSuccess",
            payload :data,
        })

    } catch (error) {
        dispatch({
            type :"newProductFail",
            payload :error.response.data.message
        })
    }
 }

 //delete product admin
 export const deleteProduct=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type :"deleteProductRequest",
           })
           
           const {data}=await axios.delete(`/api/v1/admin/product/${id}`);
           dispatch({
            type :"deleteProductSuccess",
            payload :data.success,
        })

    } catch (error) {
        dispatch({
            type :"deleteProductFail",
            payload :error.response.data.message
        })
    }
 }


 // product review
 export const newReview=(reviewData)=>async(dispatch)=>{
    try {
        dispatch({
            type :"newReviewRequest",
           })
           const config={
            headers:{"Content-Type" : "application/json"}
           }
           const {data}=await axios.put(`/api/v1/reviews`,reviewData,config);
           dispatch({
            type :"newReviewSuccess",
            payload :data.success,
        })

    } catch (error) {
        dispatch({
            type :"newReviewFail",
            payload :error.response.data.message
        })
    }
 }

 // get all review of a product
 export const getAllReviews=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type :"allReviewRequest",
           })
           
           const {data}=await axios.get(`/api/v1/reviews?id=${id}`);

           dispatch({
            type :"allReviewSuccess",
            payload :data.reviews,
        })

    } catch (error) {
        dispatch({
            type :"allReviewFail",
            payload :error.response.data.message
        })
    }
 }

 //delete review of a product
 export const deleteReviews=(reviewId,productId)=>async(dispatch)=>{
    try {
        dispatch({
            type :"deleteReviewRequest",
           })
           
           const {data}=await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`);
           dispatch({
            type :"deleteReviewSuccess",
            payload :data.success,
        })

    } catch (error) {
        dispatch({
            type :"deleteReviewFail",
            payload :error.response.data.message
        })
    }
 }


  //update product admin
  export const updateProduct=(id,productData)=>async(dispatch)=>{
    try {
        dispatch({
            type :"updateProductRequest",
           })
           const config={
            headers:{"Content-Type" : "application/json"}
           }
           const {data}=await axios.put(`/api/v1/admin/product/${id}`,productData,config);
           dispatch({
            type :"updateProductSuccess",
            payload :data.success,
        })

    } catch (error) {
        dispatch({
            type :"updateProductFail",
            payload :error.response.data.message
        })
    }
 }

 //action to clear error
 export const clearError=()=>async(dispatch)=>{
    dispatch({
        type :"clearError",
       })
 }
 