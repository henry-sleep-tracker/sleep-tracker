const { Router } = require("express");
const router = Router();
const stripe = require("stripe");
const express = require("express");
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const {
  getUserByStripeCustomerId,
  createNewPlan,
} = require("../controllers/plan");
const { updateFreePlanUsage } = require("../functions/user");

router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    let data;
    let eventType;
    // Check if webhook signing is configured.
    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`);
        console.log(`error`, err.message);
        return res.sendStatus(400);
      }

      // Extract the object from the event.
      data = event.data;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data;
      eventType = req.body.type;
      console.log("there is not a webhookSecret");
    }
    try {
      switch (eventType) {
        case "invoice.payment_succeeded":
          console.log("CASE invoice.payment_succeeded", data);
          const user = await getUserByStripeCustomerId(data.object.customer);
          console.log("USER invoice.payment_succeeded", user);

          await createNewPlan(data.object.amount_paid, user.id);
          if (data.object.amount_paid === 0) {
            await updateFreePlanUsage(user.id);
          }
          // Payment is successful and the subscription is created.
          // You should provision the subscription and save the customer ID to your database.
          break;
        default:
        // Unhandled event type
      }
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

module.exports = router;
