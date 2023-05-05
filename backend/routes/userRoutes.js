const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, 
    resetPassword, getUserDetails, updatePassword, updateProfile, 
    getAllUsers, getSingleUser, updateProfileByAdmin, deleteUserByAdmin, placeContact } = require("../controllers/userController");
const { isAuthenticateUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/contact").post(placeContact);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticateUser,getUserDetails)
router.route("/password/update").put(isAuthenticateUser,updatePassword)
router.route("/me/update").put(isAuthenticateUser,updateProfile)
router.route("/admin/users").get(isAuthenticateUser,authorizeRoles("admin"),getAllUsers)
router.route("/admin/user/:id")
.get(isAuthenticateUser,authorizeRoles("admin"),getSingleUser)
.put(isAuthenticateUser,authorizeRoles("admin"),updateProfileByAdmin)
.delete(isAuthenticateUser,authorizeRoles("admin"),deleteUserByAdmin)
module.exports=router;