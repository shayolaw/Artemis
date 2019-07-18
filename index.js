const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
var secret='sk_test_94bb5a311bf89eb2b0ffc11b522de52184e07796';
var paystack = require('paystack')(secret);
const port = process.env.PORT || 3000;

app.use('/Images',express.static(__dirname + "/Images"));
app.use('/',express.static(__dirname + "/"));
app.use(bodyparser.urlencoded({ extended: true }));
app.route('/')
	.get(function(req,res){
		res.sendFile(__dirname + '/first.html');
		console.log('we are here');
	});
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shayolaw@gmail.com',
    pass: 'shayzzel'
  }
});
app.route('/contact')
	.post(function(req,res){
		const name = req.body.name;
		const email = req.body.email;
		const message = req.body.message;
		console.log(req.body);
		var mailOptions = {
  from: 'seyilaw@gmail.com',
  to: email,
  subject: 'New Message From Client',
  text: name + ', '+message,
  html:"<!DOCTYPE html><html><head><title>Artemis</title><style type='text/css'>body {height: 100vh;overflow-x: hidden; margin: 0;font-family: Montserrat; }nav {display: flex;align-items: center; }nav img {height: 50px; }.message{width:90vw;margin:15vh auto;}.message p{line-height: 200%;width:85vw;margin: 0 auto;}.terms{width:90vw;margin:-10vh auto 10vh auto;}.bottom{width:90vw;margin:0 auto;}hr{margin-top: 30px;}.bottom ul{display: flex;list-style: none;width:100%;justify-content: space-around;}a{text-decoration: none;color:#9f74e8;font-weight: bold;font-size: 14px;}</style></head><body><div class='mask'><nav><img src='cid:unique@nodemailer.com'></nav></div><content><section class='message'><h2>Dear Sayo</h2><p>You have received a message from "+name+"</p><p>"+message+"<br><br><strong>Reply Email: </strong>"+email+"</p><hr></section><section class='terms'><center><p style='margin-bottom: 30px'><strong >Terms & Conditions</strong></p></center><p style='width:85vw; margin:0 auto'><small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</small></p></section><nav class='bottom'><ul><li><a href='#'>Home</a></li><li><a href='#'>Contact Page</a></li><li><a href='#'>FAQ</a></li><li><a href='#'>Database</a></li></ul></nav></content></body></html>",
   attachments: [{
        filename: 'logo.png',
        path: "C:/Users/Hon. S.A. Lawal/Desktop/Ui/IOT/Images/logo.png",
        cid: 'unique@nodemailer.com' //same cid value as in the html img src
    }]
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
	res.send("Email Sent");
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
