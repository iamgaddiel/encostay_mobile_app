const otpTemplate = `
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

    <br />
    <br />
    <br />
    <p>Please enter the OTP below to complete your password request </p>

    <br />
    <h2> One Time Password (OTP)</h2>
    <div class='otp_wrapper'>
      <h1>{{ params.otp }}</h1>
    </div>
    <small class='note note_color'>
      This code expires in 2min and should only be used in-app. Do not click any link or share with any body.
    </small>
    <p class='note_color'> If you didn't send this password reset requires, please change your password immediately to protect your account. For further assistance, contact us at {{ params.contact_email }}</p>
    <footer class='note_color'>
      <hr class='border note_color' />
      <small> Need help, or have questions? </small> <br />
      <small style='margin-top'> Please visit our <strong style='color: #fff;'> contact us </strong> </small>
    </footer>
  </body>
</html>`;


const transactionEmail = `
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


module.exports = {
  otpTemplate,
  transactionEmail
}