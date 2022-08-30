
const express = require("express");

const request = require("request");

const bodyParser = require("body-parser");

const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
  const firstName = req.body.first;
  const lastName = req.body.last;
  const email = req.body.email;
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/24625b596a"

  const options = {
    method: "POST",
    auth: "Saharsh07:18927ee7ec366721c04b2a9138317c86-us14"
  }
  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200)
      res.sendFile(__dirname + "/success.html")
    else
      res.sendFile(__dirname + "/failure.html");
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});
app.post("/failure", function(req, res) {
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function() {
  console.log("The server is running on port 3000");
})
// 258735f159dbf694b56c9f22c57c9a5e-us14 24625b596a
