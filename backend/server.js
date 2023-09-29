const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// const stripePayments = require("./routes/stripPayments");

// const DEBUG = false;
// const LIVE_SK = process.env.STRIPE_LIVE_SK;
// const TEST_SK = process.env.STRIPE_TEST_SK;
// const SK = DEBUG ? TEST_SK : LIVE_SK;

// const stripe = require("stripe")(SK);

const {
  getPaymentIntent,
  getStripeApiIsAlive,
} = require("./routes/stripPayments");






const app = express();
const port = 3000 || process.env.port;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());






// app.use('/stripe', stripePayments)

// [Stripe] ---------------------------------------------------------------
app.get('/test_stripe', getStripeApiIsAlive)
app.post("/stripe_payment", getPaymentIntent);



// [Flutterwave] ---------------------------------------------------------------



app.get("/", (req, res) => {
    console.log("Reached again");
  res.json({ status: "working" });
});


app.listen(port, () => console.log(`Server started at port ${port}`));
