const express = require("express");
const bodyParser = require("body-parser");
const brevo = require("@getbrevo/brevo");
const router = express.Router();
require("dotenv").config();

// ENV KEYS
const DEBUG = process.env.DEBUG;

// [BREVO] ----------------------------------------------------------------------------------------
const BREVO_API_KEY =
  DEBUG === "true"
    ? process.env.BREVO_API_TEST_KEY
    : process.env.BREVO_API_LIVE_KEY;

// Include the Brevo library
const { otpTemplate, transactionEmail } = require("./emailTemplates");
const brevoDefaultClient = brevo.ApiClient.instance;

// Configure API key authorization: api-key
const brevoApiKey = brevoDefaultClient.authentications["api-key"];
brevoApiKey.apiKey = BREVO_API_KEY;

// [MiddleWare] -----------------------------------------------------------------------------------
// router.use(bodyParser.json());
// router.use(router.json());

router.post("/logger", (req, res) => {
  const { errorMessage, file, lineNumber, user } = req.body;
  const timestamp = new Date();
  console.log(
    `🚀 ~ App Error  ~ user: ${user} ~ timestamp: ${timestamp}, errorMessage: ${errorMessage}, file: ${file}, lineNumber: ${lineNumber} `
  );
});

// Send Transactional Otp Email
router.post("/send_transactional_otp", async (req, res) => {
  const { email, otp, name, amount, currency_type, apartment_title } = req.body;

  let brevoApiInstance = new brevo.TransactionalEmailsApi();
  let brevoSendSmtpEmail = new brevo.SendSmtpEmail();

  brevoSendSmtpEmail.subject = "{{params.subject}}";
  brevoSendSmtpEmail.htmlContent = transactionEmail;
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

router.post("/send_otp", async (req, res) => {
  const { email, otp } = req.body;
  // console.log("🚀 ~ file: core.js:79 ~ router.post ~ { email, otp } :", {
  //   email,
  //   otp,
  // });

  let brevoApiInstance = new brevo.TransactionalEmailsApi();
  let brevoSendSmtpEmail = new brevo.SendSmtpEmail();

  brevoSendSmtpEmail.subject = "{{params.subject}}";
  brevoSendSmtpEmail.htmlContent = otpTemplate;

  brevoSendSmtpEmail.sender = {
    name: "Encostay App",
    email: "encostay@proton.me",
  };

  brevoSendSmtpEmail.to = [{ email }];

  // brevoSendSmtpEmail.replyTo = { email: "example@brevo.com", name: "sample-name" };

  brevoSendSmtpEmail.headers = { Encostay: "unique-id-1234" };
  brevoSendSmtpEmail.params = {
    subject: "Encostay Booking Transaction OTP",
    otp,
    contact_email: "encostay@thisrupt.com",
  };

  const data = await brevoApiInstance.sendTransacEmail(brevoSendSmtpEmail).then(
    (data) => {
      console.log("API called successfully. Returned data: " + JSON.stringify(data));
      return res.json({ otp, data });
    },
    (error) => {
      console.error(error);
    }
  );
  console.log("🚀 ~ file: core.js:213 ~ app.post ~ data:", data);
});

module.exports = router;
