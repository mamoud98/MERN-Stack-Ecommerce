const braintree = require("braintree");
require("dotenv").config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANTID,
  publicKey: process.env.PUBLICKEY,
  privateKey: process.env.PRIVATEKEY,
});

exports.getToken = (req, res) => {
  gateway.clientToken
    .generate({})
    .then((response) => {
      const clientToken = response.clientToken;
      res.json({ clientToken: clientToken });
    })
    .catch((error) => {
      res.json(error);
    });
};

exports.processPayment = (req, res) => {
    console.log(req.body);
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;
  gateway.transaction
    .sale({
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true,
      },
    })
    .then((result) => {
      if (result.success) {
        res.json(result);
      } else {
        res.json("some thing is bad");
      }
    });
};
