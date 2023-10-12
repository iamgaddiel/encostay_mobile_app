const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// ENV KEYS
const DEBUG = process.env.DEBUG;
const BREVO_API_KEY =
  DEBUG === "true"
    ? process.env.BREVO_API_TEST_KEY
    : process.env.BREVO_API_LIVE_KEY;

// Include the Brevo library
const brevo = require("@getbrevo/brevo");
const brevoDefaultClient = brevo.ApiClient.instance;

// Configure API key authorization: api-key
const brevoApiKey = brevoDefaultClient.authentications["api-key"];
brevoApiKey.apiKey = BREVO_API_KEY;

// Stripe Payment Routes
// const {
//   getPaymentIntent,
//   getStripeApiIsAlive,
// } = require("./routes/stripPayments");

const stripePayments = require('./routes/stripPayments')

const flutterPayments = require("./routes/flutterPayment");

const util = require('./routes/util')

// Flutterwave Payment Routes

const app = express();
const port = 3000 || process.env.port;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/stripe', stripePayments)
app.use('/flw', flutterPayments)
app.use('/util', util)

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

// Send Otp Email
app.post("/send_otp", async (req, res) => {
  const { email, otp, name, amount, currency_type, apartment_title } = req.body;

  let brevoApiInstance = new brevo.TransactionalEmailsApi();
  let brevoSendSmtpEmail = new brevo.SendSmtpEmail();

  brevoSendSmtpEmail.subject = "{{params.subject}}";
  brevoSendSmtpEmail.htmlContent = `
    <html>
      <body>

        <style>
          .otp_wrapper{
            background: orange;
            padding: 10px;
            border-radius: 12px;
            color: #eeeeee;
            text-align: center
          }
          .otp_text{
            text-align: center;
            color: orange
          }
          .note_color{
            color: #bbbbbb;
            text-align: center;
          }
          .note{
            text-align: center;
          }
          footer{
            text-align: center;
          }
        </style>

        <b>Hello {{ params.name }}, </b>
        <br />
        <br />
        <br />
        <p>Please enter the OTP below to complete your {{ params.amount }} {{ params.currency_type }} booking transaction for the apartment {{ params.apartment_title}} </p>

        <br />
        <h2> One Time Password (OTP)</h2>
        <div class='otp_wrapper'>
          <h1>{{ params.otp }}</h1>
        </div>
        <small class='note note_color'>
          This code expires in 10min and should only be used in-app. Do not click any link or share with any body.
        </small>
        <p class='note_color'> If you didn't attempt this transaction, please change your password immediately to protect your account. For further assistance, contact us at {{ params.contact_email }}</p>
        <footer class='note_color'>
          <hr class='border note_color' />
          <small> Need help, or have questions? </small> <br />
          <small style='margin-top'> Please visit our <strong style='color: #fff;'> contact us </strong> </small>
        </footer>
      </body>
    </html>`;
  brevoSendSmtpEmail.sender = {
    name: "Booking Transaction OTP",
    email: "encostay@proton.me",
  };
  brevoSendSmtpEmail.to = [{ email, name }];
  // brevoSendSmtpEmail.replyTo = { email: "example@brevo.com", name: "sample-name" };
  brevoSendSmtpEmail.headers = { Encostay: "unique-id-1234" };
  brevoSendSmtpEmail.params = {
    subject: "Encostay Booking Transaction OTP",
    apartment_title,
    otp,
    contact_email: "encostay@thisrupt.com",
    amount,
    name,
    currency_type,
  };

  const data = await brevoApiInstance.sendTransacEmail(brevoSendSmtpEmail).then(
    (data) => {
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
      return res.json({
        otp,
        data,
      });
    },
    (error) => {
      console.error(error);
    }
  );
});

app.listen(port, () => console.log(`Server started at port ${port}`));
