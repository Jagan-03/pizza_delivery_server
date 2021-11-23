const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    const output = `
            <h3>INVENTORY UPDATE</h3>
            <P>The ${req.body.name} stock is very low.</P>
            <p>Only ${req.body.quantity} left.</p>
        `;
    const sgMail = require("@sendgrid/mail");

    sgMail.setApiKey(
      "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"
    );
    const msg = {
      to: "test324acc@gmail.com",
      from: "pizzahouseno1@gmail.com", // Use the email address or domain you verified above
      subject: "PIZZA HOUSE",
      text: "INVENTORY UPDATE",
      html: output,
    };
    //ES6
    sgMail.send(msg).then(
      () => {},
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    );
});

module.exports = router;
