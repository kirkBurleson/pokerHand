var express = require("express"),
	unirest = require("unirest"),
	bodyParser = require("body-parser"),
	http = require("http"),
	app;

app = express();
app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/pokerProxy", function (req, res) {
	// call foreign machine
	unirest.post("http://192.168.2.6:4000/hand")
	.header("Accept", "application/json")
	.send(req.body)
	.end(function (response) {
		res.json(response.body);
	});
});

http.createServer(app).listen(3000);