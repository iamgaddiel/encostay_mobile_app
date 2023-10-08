const express = require("express");
const router = express.Router();
require("dotenv").config();

const DEBUG = false;
const LIVE_SK = process.env.STRIPE_LIVE_SK;
const TEST_SK = process.env.STRIPE_TEST_SK;
const SK = DEBUG ? TEST_SK : LIVE_SK;

const stripe = require("stripe")(SK);



router.get("/", (req, res) => {
  return res.json({ status: "stripe is working" });
});


router.post("/payments", async (req, res) => {
  const { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Spatula company",
      payment_method: id,
      confirm: true,
    });
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

module.exports = router;
