


 const catchAsyncError = require("../middleware/catchAsyncError");

 const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  
     exports.processPayment = catchAsyncError(async(req,res,next)=>{
  
        const myPayment = await stripe.paymentIntents.create({
                
                    amount : req.body.amount,
                    currency: "inr",
                    metadata : {
                    company : "Ecommerce",
                    },
                    });

                    res.json({
                        success : true ,
                        client_secret : myPayment.client_secret
                    }).status(200);
     }) ;

     
     exports.sendStripeApiKey = catchAsyncError(async(req,res)=>{
           res.json({
            stripeApiKey : process.env.STRIPE_API_KEY
           }).status(200);
     });











//      // server.js
// //
// // Use this sample code to handle webhook events in your integration.
// //
// // 1) Paste this code into a new file (server.js)
// //
// // 2) Install dependencies   we_1NiBwzSFdkBHSMfXe1hddf88 
// //                 serccit         whsec_xASozedyBYcBB1Dosumqa4L6cc6XJOCf
// //   npm install stripe
// //   npm install express
// //
// // 3) Run the server on http://localhost:4242
// //   node server.js

// // The library needs to be configured with your account's secret key.
// // Ensure the key is kept out of any version control system you might be using.
// const stripe = require('stripe')('sk_test_...');
// const express = require('express');
// const app = express();


// // This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret = "whsec_636f945395d941b05dc01dfd5d922cd154c632180ec0d18a3ca583cba7d89e0a";

// app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//   } catch (err) {
//     response.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'payment_link.created':
//       const paymentLinkCreated = event.data.object;
//       // Then define and call a function to handle the event payment_link.created
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// });

// app.listen(4242, () => console.log('Running on port 4242'));