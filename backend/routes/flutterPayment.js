const express = require('express')
const router = express.Router();

const Flutterwave = require("flutterwave-node-v3");
// const open = require("open");
require("dotenv").config();

const DEBUG = process.env.DEBUG;

const pocketbaseUrl =
  DEBUG === "true"
    ? "http://127.0.0.1:8090/api/"
    : "https://encostay-app.pockethost.io/api";

const FLW_PUBLIC_KEY = DEBUG === "true" ? process.env.FLW_TEST_PK : process.env.FLW_LIVE_PK;
const FLW_SECRET_KEY = DEBUG === "true" ? process.env.FLW_TEST_SK : process.env.FLW_LIVE_SK;
const FLW_ENCRYPTION_KEY =
  DEBUG === "true" ? process.env.FLW_TEST_EK : process.env.FLW_LIVE_EK;

const flw = new Flutterwave(FLW_PUBLIC_KEY, FLW_SECRET_KEY);




router.post('/payment', async (req, res) => {
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


    console.log("🚀 ~ file: flutterPayment.js:32 ~ chargeDebitCard ~ pin:", pin)

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
    console.log(error, '-------------');
    return res.json({ data: JSON.stringify(error) }).status(500);
  }
})

// async function chargeDebitCard(req, res) {
//   const {
//     card_number,
//     cvv,
//     expiry_month,
//     expiry_year,
//     fullname,
//     amount,
//     phone_number,
//     email,
//     tx_ref,
//     pin,
//     otp,
//   } = req.body;


//     console.log("🚀 ~ file: flutterPayment.js:32 ~ chargeDebitCard ~ pin:", pin)

//   // Initiating the transaction
//   const payload = {
//     card_number,
//     cvv,
//     expiry_month,
//     expiry_year,
//     currency: "NGN",
//     amount,
//     // redirect_url: "https://www.google.com",
//     fullname,
//     email,
//     phone_number,
//     enckey: FLW_ENCRYPTION_KEY,
//     tx_ref,
//   };

//   try {
//     const response = await flw.Charge.card(payload);
//     console.log(response);

//     // Authorizing transactions

//     // For PIN transactions
//     if (response.meta.authorization.mode === "pin") {
//       let payload2 = payload;
//       payload2.authorization = {
//         mode: "pin",
//         // fields: ["pin"],
//         pin: parseInt(pin),
//       };
//       const reCallCharge = await flw.Charge.card(payload2);

//       // Add the OTP to authorize the transaction
//       const callValidate = await flw.Charge.validate({
//         otp,
//         flw_ref: reCallCharge.data.flw_ref,
//       });
//       console.log(callValidate);
//     }

//     // For 3DS or VBV transactions, redirect users to their issue to authorize the transaction
//     // if (response.meta.authorization.mode === "redirect") {
//     //   var url = response.meta.authorization.redirect;
//     //   open(url);
//     // }

//     console.log(response);
//   } catch (error) {
//     console.log(error, '-------------');
//     return res.json({ data: JSON.stringify(error) }).status(500);
//   }
// }


router.post('/payment_callback', async (req, res) => {
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
      console.log(response, '<------');
    } else {
      // Inform the customer their payment was unsuccessful
    }
  }
})

// async function paymentCallback(req, res) {
//   if (req.query.status === "successful") {
//     const transactionDetails = await Transaction.find({
//       ref: req.query.tx_ref,
//     });
//     const response = await flw.Transaction.verify({
//       id: req.query.transaction_id,
//     });
//     if (
//       response.data.status === "successful" &&
//       response.data.amount === transactionDetails.amount &&
//       response.data.currency === "NGN"
//     ) {
//       // Success! Confirm the customer's payment
//       console.log(response, '<------');
//     } else {
//       // Inform the customer their payment was unsuccessful
//     }
//   }
// }

// module.exports = {
//   chargeDebitCard,
//   paymentCallback,
// };

module.exports = router
