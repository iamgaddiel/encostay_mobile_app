// const express = require('express')
require("dotenv").config();

const DEBUG = false;
const LIVE_SK = process.env.STRIPE_LIVE_SK;
const TEST_SK = process.env.STRIPE_TEST_SK;
const SK = DEBUG ? TEST_SK : LIVE_SK;

const stripe = require("stripe")(SK);

// const stripPaymentRouter = express.Router()

function getStripeApiIsAlive(req, res) {
  return res.json({ status: "stripe is working" });
}

async function getPaymentIntent(req, res) {
  const { currency, amount } = req.body;

  stripe.paymentIntents
    .create({
      amount,
      currency,
      metadata: { integration_check: "accept_a_payment" },
    })
    .then((response) => res.json({ clientSecret: response.client_secret }))
    .catch((error) => {
      console.log(error, "<---- Error");
      res
        .status(500)
        .send({ error: "An error occurred while creating payment intent" });
    });
}

module.exports = {
  getStripeApiIsAlive,
  getPaymentIntent,
};
