const express = require("express");
const router = express.Router();

const Flutterwave = require("flutterwave-node-v3");
// const open = require("open");
require("dotenv").config();

const DEBUG = process.env.DEBUG;

const pocketbaseUrl =
  DEBUG === "true"
    ? "http://127.0.0.1:8090/api/"
    : "https://encostay-app.pockethost.io/api";

const FLW_PUBLIC_KEY =
  DEBUG === "true" ? process.env.FLW_TEST_PK : process.env.FLW_LIVE_PK;
const FLW_SECRET_KEY =
  DEBUG === "true" ? process.env.FLW_TEST_SK : process.env.FLW_LIVE_SK;
const FLW_ENCRYPTION_KEY =
  DEBUG === "true" ? process.env.FLW_TEST_EK : process.env.FLW_LIVE_EK;

const flw = new Flutterwave(FLW_PUBLIC_KEY, FLW_SECRET_KEY);

router.post("/card_payment", async (req, res) => {
  const {
    card_number,
    cvv,
    expiry_month,
    expiry_year,
    fullname,
    amount,
    phone_number,
    email,
    tx_ref,
    pin,
    otp,
  } = req.body;

  console.log("🚀 ~ file: flutterPayment.js:32 ~ chargeDebitCard ~ pin:", pin);

  // Initiating the transaction
  const payload = {
    card_number,
    cvv,
    expiry_month,
    expiry_year,
    currency: "NGN",
    amount,
    // redirect_url: "https://www.google.com",
    fullname,
    email,
    phone_number,
    enckey: FLW_ENCRYPTION_KEY,
    tx_ref,
  };

  try {
    const response = await flw.Charge.card(payload);
    console.log(response);

    // Authorizing transactions

    // For PIN transactions
    if (response.meta.authorization.mode === "pin") {
      let payload2 = payload;
      payload2.authorization = {
        mode: "pin",
        // fields: ["pin"],
        pin: parseInt(pin),
      };
      const reCallCharge = await flw.Charge.card(payload2);

      // Add the OTP to authorize the transaction
      const callValidate = await flw.Charge.validate({
        otp,
        flw_ref: reCallCharge.data.flw_ref,
      });
      console.log(callValidate);
    }

    // For 3DS or VBV transactions, redirect users to their issue to authorize the transaction
    // if (response.meta.authorization.mode === "redirect") {
    //   var url = response.meta.authorization.redirect;
    //   open(url);
    // }

    console.log(response);
  } catch (error) {
    console.log(error, "-------------");
    return res.json({ data: JSON.stringify(error) }).status(500);
  }
});

router.post("/bank_payment", async (req, res) => {
  const {
    account_number,
    amount,
    currency,
    reference,
    narration,
    bank_name,
    beneficiary_name,
    meta,
    account_bank,
    debit_currency,
  } = req.body;

  console.log(req.body, '<------')

  let payload = {};
  
  if (currency === "USD") {
    payload = {
      amount,
      narration,
      currency,
      beneficiary_name,
      meta,
    };
  }

  if (currency === "NGN") {
    payload = {
      account_number,
      account_bank,
      amount,
      currency,
      reference,
      narration,
      debit_currency,
    };
  }
  
  
  try {
    console.log("🚀 ~ router.post ~ payload:", payload)
    
    const response = await flw.Transfer.initiate(payload);
    console.log("🚀 ~ router.post ~ response:", response)
    if (response.status === "success") return res.json(response);
    return res.json({ status: "failed" });
  }
  catch (error) {
    console.log(error, "<---- error paying money");
    return res.status(500).json({ status: "failed" });
  }
});

router.post("/payment_callback", async (req, res) => {
  if (req.query.status === "successful") {
    const transactionDetails = await Transaction.find({
      ref: req.query.tx_ref,
    });
    const response = await flw.Transaction.verify({
      id: req.query.transaction_id,
    });
    if (
      response.data.status === "successful" &&
      response.data.amount === transactionDetails.amount &&
      response.data.currency === "NGN"
    ) {
      // Success! Confirm the customer's payment
      console.log(response, "<------");
    } else {
      // Inform the customer their payment was unsuccessful
    }
  }
});

router.post("/refund", async (req, res) => {
  try {
    const { transaction_id, amount } = req.body;
    const payload = {
      id: transaction_id, //This is the transaction unique identifier. It is returned in the initiate transaction call as data.id
      amount,
    };
    const response = await flw.Transaction.refund(payload);
    console.log(response);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }

 });

router.get("/get_banks", async (req, res) => {
  try {
    const payload = {
      country: "NG", //Pass either NG, GH, KE, UG, ZA or TZ to get list of banks in Nigeria, Ghana, Kenya, Uganda, South Africa or Tanzania respectively
    };
    const response = await flw.Bank.country(payload);
    console.log(response);
    res.status(200).json({ ...response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed" });
  }
});

module.exports = router;
