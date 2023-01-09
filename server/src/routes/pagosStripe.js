const { Router } = require("express");
const Stripe = require("stripe");
const router = Router();
const { User, Plan } = require("../db.js");
const { getPlanByUserId } = require("../controllers/plan");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

router.get("/", async (req, res) => {
  const { userId } = req.query;
  const plan = await getPlanByUserId(userId);
  if (plan === null) {
    return res.status(200).send("1900-01-02");
  } else {
    return res.status(200).send(plan.dataValues);
  }
});
router.get("/prices", async (req, res) => {
  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });
  return res.json(prices);
});

router.post("/session", async (req, res) => {
  const { priceId, email } = req.body;
  const user = await User.findOne({ where: { email: email } });
  const session = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/private/", //si todo sale bien redirigira la sgt pag
      cancel_url: "http://localhost:3000/private/planes", //si todo sale mal, redirigir a otra pag
      customer: user.stripeCustomerId,
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );
  return res.json(session);
});

module.exports = router;
