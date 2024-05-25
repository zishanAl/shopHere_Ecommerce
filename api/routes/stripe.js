const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);

router.post("/payment", async (req, res) => {
  await stripe.paymentIntents.create(
    {
      source : req.body.stripeToken,
      payment_method_types: ['card'],
      amount: req.body.amount,
      currency: "inr",
      // automatic_payment_methods: {
      //   enabled: true,
      // },
      // payment_method_data:{
      //   type : card,
      //   card :{
      //     token: req.body.tokenId,
      //   }
      // },
      // payment_method: req.body.tokenId,
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});



module.exports = router;
