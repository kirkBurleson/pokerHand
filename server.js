var express = require("express"),
	http = require("http"),
	bodyParser = require("body-parser"),
	poker = require("./poker.js"),
	app;

app = express();
http.createServer(app).listen(4000);

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/hand", function (req, res) {
	var result;

	console.log("Received hand data: " + req.body.cards);
	result = poker.getHand(req.body);
	res.json(JSON.stringify(result));
});