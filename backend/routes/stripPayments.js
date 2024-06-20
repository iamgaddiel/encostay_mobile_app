const express = require("express");
const router = express.Router();
require("dotenv").config();

const DEBUG = true;
const LIVE_SK = process.env.STRIPE_LIVE_SK;
const LIVE_PK = process.env.STRIPE_LIVE_PK;
const TEST_SK = process.env.STRIPE_TEST_SK;
const TEST_PK = process.env.STRIPE_TEST_PK;

const SK = DEBUG ? TEST_SK : LIVE_SK;
const PK = DEBUG ? TEST_PK : LIVE_PK;

const stripe = require("stripe")(SK);

router.get("/", (req, res) => {
  return res.json({ status: "stripe is working" });
});

router.post("/payments", async (req, res) => {
  const { amount, id } = req.body;
  console.log(
    "🚀 ~ file: stripPayments.js:21 ~ router.post ~ { amount, id }:",
    { amount, id }
  );
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Spatula company",
      payment_method: id,
      confirm: true,
    });
    console.log(
      "🚀 ~ file: stripPayments.js:29 ~ router.post ~ payment:",
      payment
    );
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

router.post("/payments_two", async (req, res) => {
  const { amount, description } = req.body;
  console.log(
    "🚀 ~ file: stripPayments.js:21 ~ router.post ~ { amount, id }:",
    { amount }
  );
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log(
      "🚀 ~ file: stripPayments.js:29 ~ router.post ~ payment:",
      payment
    );
    res.json({
      message: {
        msg: "Payment successful",
        clientSecret: payment.client_secret,
      },
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

router.get("/config", (req, res) => {
  return res.json({
    publishableKey: PK,
    secretKey: SK,
  });
});

// ------------- Payment --------------------------------
router.get("/create_account", async (req, res) => {
  const account = await stripe.accounts.create({
    type: "express",
  });
  console.log("🚀 ~ router.post ~ account:", account);
  return res.json({ account });
});

module.exports = router;
