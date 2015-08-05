var assert = require("assert"),
		poker = require("../poker.js"),
		hand,
		result;

describe('Poker Hand Tests -', function () {

	describe("Royal Flush - ", function () {
		it('should return "Royal Flush"', function () {
			hand = ["10s", "qs", "ks", "As", "js"],
			result = poker.getHand( {cards: hand} );

			assert.equal(result.hand, "Royal Flush");
		});
	});

	describe("Straight Flush - ", function () {
		it('should return "Straight Flush"', function () {
			hand = ["5s", "4s", "6s", "2s", "3s"],
			result = poker.getHand( {cards: hand} );

			assert.equal(result.hand, "Straight Flush");
		});
	});

	describe("4 Of A Kind - ", function () {
		it('should return "4 Of A Kind"', function () {
			hand = ["4d", "4s", "kc", "4c", "4h"],
			result = poker.getHand( {cards: hand} );

			assert.equal(result.hand, "4 Of A Kind");
		});
	});

	describe("Full House - ", function () {
		it('should return "Full House"', function () {
			hand = ["4d", "4s", "kc", "ks", "kh"],
			result = poker.getHand( {cards: hand} );

			assert.equal(result.hand, "Full House");
		});
	});

	describe("Flush - ", function () {
		it('should return "Flush"', function () {
			hand = ["js", "4s", "2s", "ks", "as"],
			result = poker.getHand( {cards: hand} );

			assert.equal(result.hand, "Flush");
		});
	});

	describe("Straight - ", function () {
		it('should return "Straight"', function () {
			hand = ["6s", "4s", "2h", "3s", "5s"],
			result = poker.getHand( {cards: hand} );

			assert.equal(result.hand, "Straight");
		});
	});

	describe("3 Of A Kind - ", function () {
		it('should return "3 Of A Kind"', function () {
			hand = ["9s", "4s", "4h", "qs", "4s"],
			result = poker.getHand( {cards: hand} );

			assert.equal(result.hand, "3 Of A Kind");
		});
	});

	describe("2 Pair - ", function () {
		it('should return "2 Pair"', function () {
			hand = ["9s", "qs", "4h", "qh", "4s"],
			result = poker.getHand( {cards: hand} );

			assert.equal(result.hand, "2 Pair");
		});
	});

	describe("1 Pair - ", function () {
		it('should return "1 Pair"', function () {
			hand = ["9s", "qs", "10h", "qh", "4s"],
			result = poker.getHand( {cards: hand} );

			assert.equal(result.hand, "1 Pair");
		});
	});

	describe("High Card - ", function () {
		it('should return "Jack"', function () {
			hand = ["js", "2s", "10h", "9h", "4s"],
			result = poker.getHand( {cards: hand} );

			assert.equal(result.hand, "Jack");
		});
	});

})