const express= require("express")
const {isAuthenticateUser,authorizeRoles} = require("../middlewares/auth");
const { newOrder, getSingleOrder, myOrders, getAllOrder, updateOrderStatus, deleteOrder } = require("../controllers/orderController");

const router=express.Router();
router.route("/order/new").post(isAuthenticateUser,newOrder)
router.route("/order/:id").get(isAuthenticateUser,getSingleOrder)
router.route("/orders/me").get(isAuthenticateUser,myOrders)
router.route("/admin/orders").get(isAuthenticateUser,authorizeRoles("admin"),getAllOrder)
router.route("/admin/order/:id").put(isAuthenticateUser,authorizeRoles("admin"),updateOrderStatus)
.delete(isAuthenticateUser,authorizeRoles("admin"),deleteOrder)

module.exports = router;