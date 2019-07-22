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

app.listen(port,function(){
	console.log('We are in Mode');
});
