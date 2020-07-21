const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const fs 		= require('fs')

const stripe = require("stripe")("sk_test_51H2238Io92aJXnNLoH5Slodep1cfbk8IUeb6xnfmdVsWfbWOuhZK9FOLD83uSgVoOyyxeAk0MCp3TAo7CF6Fgy8e00NQ2bUSQ1");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// order amount

const calcOrder = numDonation => {
  const price = 100;
  const total = price * numDonation;
  console.log(total);
  return total;
};


// API calls

app.post('/api/paymentIntent', async (req, res) => {
  const { numDonation } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    // need to calc actual amount
    amount: calcOrder(numDonation),
    currency: 'usd',
    statement_descriptor: 'Feeding Kittens',
    // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'}
  });
  const clientSecret = JSON.stringify(paymentIntent.client_secret);
  res.send(clientSecret);
});

app.get('/api/hello', (req, res) => {
  res.send({ express: `Server listening on port ${port}` });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.post('/hooks', function(req, res){
	var body = {
	    payment_info: req.body
	}
	filePath = __dirname + '/payments.txt'

	fs.appendFile(filePath, JSON.stringify(body) + '\n', function(err) {
		if (err) { throw err }
		res.status(200).json({
			message: "File successfully written"
		})
    })

})

// CORS header `Access-Control-Allow-Origin` set to accept all
//app.get('/allow-cors', function(request, response) {
//  response.set('Access-Control-Allow-Origin', '*');
//  response.sendFile(__dirname + '/message.json');
//});


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('https://localhost:8080', function(req, res) {
//    res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
