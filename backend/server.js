const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();


// ENV KEYS
const DEBUG = process.env.DEBUG;



// Stripe Payment Routes
// const {
//   getPaymentIntent,
//   getStripeApiIsAlive,
// } = require("./routes/stripPayments");

// [ROUTES] ----------------------------------------------------------------------------------------

const stripePaymentsRoutes = require('./routes/stripPayments')

const flutterPaymentsRoutes = require("./routes/flutterPayment");

const coreRoutes = require('./routes/core')

const imagekitRoutes = require('./routes/imagekitApp')



const app = express();
const port = 3000 || process.env.port;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/stripe', stripePaymentsRoutes)
app.use('/flw', flutterPaymentsRoutes) // Flutterwave Payment Routes
app.use('/api/core', coreRoutes)
app.use('/image_kit', imagekitRoutes)

// [MIDDLEWARES] ----------------------------------------------------------------------------------------
// allow cross-origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



// [Stripe] ---------------------------------------------------------------
// app.get("/test_stripe", getStripeApiIsAlive);
// app.post("/stripe_payment", getPaymentIntent);

// // [Flutterwave] ---------------------------------------------------------------
// app.post("/flw/payment", chargeDebitCard);
// app.post("flw/payment_callback", paymentCallback);


app.get("/", (req, res) => {
  console.log("Reached again");
  res.json({ status: "working" });
});

app.post('/test', (req, res) => {
  console.log(req.body)
  res.json(req.body)
})

app.listen(port, () => console.log(`Server started at port ${port}`));
