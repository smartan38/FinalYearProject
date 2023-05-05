const express= require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails, createReview, getProductReviews, deleteReview, getAdminProducts } = require("../controllers/productControllers");
const {isAuthenticateUser,authorizeRoles} = require("../middlewares/auth")
const router = express.Router();
 router.route("/products").get(getAllProducts);
 router.route("/admin/products").get(isAuthenticateUser,authorizeRoles("admin"),getAdminProducts)
 router.route("/admin/product/new").post(isAuthenticateUser,authorizeRoles("admin"),createProduct)
 router.route("/admin/product/:id")
        .put(isAuthenticateUser,authorizeRoles("admin"),updateProduct)
        .delete(isAuthenticateUser,authorizeRoles("admin"),deleteProduct)
 router.route("/product/:id").get(getProductDetails)
router.route("/reviews").put(isAuthenticateUser,createReview)
router.route("/review").get(getProductReviews).delete(isAuthenticateUser,deleteReview);

module.exports = router;