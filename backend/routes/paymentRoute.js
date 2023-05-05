const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticateUser } = require("../middlewares/auth");

router.route("/payment/process").post(isAuthenticateUser, processPayment);

router.route("/stripeapikey").get(isAuthenticateUser, sendStripeApiKey);

module.exports = router;
