const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
var secret='sk_test_94bb5a311bf89eb2b0ffc11b522de52184e07796';
var paystack = require('paystack')(secret);
const xoauth2 = require('xoauth2');

app.use('/Images',express.static(__dirname + "/Images"));
app.use('/',express.static(__dirname + "/"));
app.use(bodyparser.urlencoded({ extended: true }));
app.route('/')
	.get(function(req,res){
		res.sendFile(__dirname + '/first.html');
		console.log('we are here');
	});
  const client_id ="1095060995264-5fa12n4gnp4v88cglm7tnc9i94i4ad9o.apps.googleusercontent.com";
  const client_secret ="Lg1NKDDbxevkLwrZ_xzQtqCf";
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'shayolaw@gmail.com',
        clientId: client_id,
        clientSecret:client_secret,
        refreshToken: "1/wHnOW0aiT3ejHIqPRxNHde_n1xMc2huReYhREHZb27c",
        accessToken: "ya29.GltNBxllndbo3WOTW_8_v2XGdgcmHlPHozL_jyxeHMW3gAkEfMOqU4utp6qTG4GNVJ4VWYZ49eOrHCDH7jZGqtFQQBPcxoFskMS3GFE3urUZfu3SMlefFZQPV_s2",
        expires: 3600
    }
});
app.route('/hire')
	.post(function(req,res){
		console.log(req.body)
		var price = req.body.Package;
		price = price +'00';
	 	var page_id;
  		var url ='https://paystack.com/pay/'
  // New Page
    paystack.page.create({
        name: 'API Monthly',
        amount: price})
      .then(function(body){
        page_id = body.data.id;
        console.log(page_id);
        url = url+body.data.slug;
        res.redirect( url);})
      .catch(function(error){
        return done(error);
      });
	})
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.listen(port,function(){
	console.log('We are in Mode');
});
