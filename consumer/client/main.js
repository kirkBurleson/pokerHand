var sendHand = function () {
	var hand = ["5d", "Js", "8s", "8c", "3h"];
	var params = {
		cards: hand
	};

	$.post("pokerProxy", params, function (result) {
		console.log("Best hand: " + (JSON.parse(result)).hand);
	});
};