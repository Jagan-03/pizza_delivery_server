const express = require('express');
const router = express.Router();
const Razorpay = require("razorpay");
const ObjectID = require('mongodb').ObjectID;

const mongo = require("../mongo");

const razorpay = new Razorpay({
    key_id: "rzp_test_2wjXim3nGQG8ph",
    key_secret: "jpmpjhJj92Ab1XajU5QwR2P4",
  });

router.get("/:id", async (req, res) => {
    try {
        let total = req.params.id;
        // user[0].orders.forEach((item) => {
        //   total += item.price * item.quantity;
        // });

        const payment_capture = 1;
        const amount = total;
        const currency = "INR";
    
        const options = {
          amount: amount * 100,
          currency: currency,
          receipt: "Thanks for choosing Pizza house.",
          payment_capture: payment_capture,
        };
    
        const response = await razorpay.orders.create(options);
        res.json({
          id: response.id,
          amount: response.amount,
          currency: response.currency,
          receipt: response.receipt,
        });
      } catch (error) {
        console.log(error);
      }
});

module.exports = router;
