var poker = (function () {
	var result = {
			hand : null,
			error : null
		},
		suits = [],
		ranks = [],
		map,

		contains_royalflush = function () {
			if (ranks.reduce(function (prev, cur) { return prev + cur; }) !== 60)
				return false;
			return contains_flush();
		},
		contains_straight_flush = function () {
			if (!contains_straight()) return false;
			return contains_flush();
		},
		contains_4_of_kind = function () {
			var i;

			for (i = 2; i < map.length; i++) {
				if (map[i] === 4) {
					return true;
				}
			}

			return false;
		},
		contains_fullhouse = function () {
			var i;

			if (contains_3_of_kind()) {
				for (i = 2; i < map.length; i++) {
					if (map[i] === 2) return true;
				}
			}			

			return false;
		},
		contains_flush = function () {
			var i;
			for (i = 1; i < ranks.length; i++) {
				if (suits[i] !== suits[i-1]) {
					return false;
				}
			}
			return true;
		},
		contains_straight = function () {
			var i,
					aceSwapped = false;

			for (i = 0; i < ranks.length-1; i++) {
				
				if (i === 0 && ranks[0] === 2 && ranks[4] === 14) {
					// using ace as a 1
					ranks[4] = 1;
					aceSwapped = true;
					sort_ranks();
				}

				if ((ranks[i] + 1) !== ranks[i+1]) {
					// ace was used as a 1, reset it to a high ace
					if (aceSwapped) make_high_ace();
					return false;
				}
			}

			if (aceSwapped) make_high_ace();
			return true;
		},
		contains_3_of_kind = function () {
			var i;

			for (i = 2; i < map.length; i++) {
				if (map[i] === 3) {
					return true;
				}
			}

			return false;
		},
		contains_2_pair = function () {
			var i, pairs;

			for (i = 2, pairs = 0; i < map.length; i++) {
				if (map[i] === 2) {
					pairs++;
					if (pairs === 2) return true;
				}
			}

			return false;
		},
		contains_pair = function () {
			var i;

			for (i = 2; i < map.length; i++) {
				if (map[i] === 2) {
					return true;
				}
			}

			return false;
		},
		get_high_card = function () {
			return (ranks[4] > 10) ? get_name(ranks[4]) : ranks[4];
		},
		get_name = function (num) {
			if (num === 11) return "Jack";
			if (num === 12) return "Queen";
			if (num === 13) return "King";
			if (num === 14) return "Ace";
			return "[** Illegal number passed into get_name() of poker.js **]"
		},
		strip_suits = function (hand) {
			suits.push(hand.cards[0][hand.cards[0].length-1]);
			suits.push(hand.cards[1][hand.cards[1].length-1]);
			suits.push(hand.cards[2][hand.cards[2].length-1]);
			suits.push(hand.cards[3][hand.cards[3].length-1]);
			suits.push(hand.cards[4][hand.cards[4].length-1]);
		},
		strip_ranks = function (hand) {
			ranks.push(hand.cards[0].substr(0, hand.cards[0].length-1));
			ranks.push(hand.cards[1].substr(0, hand.cards[1].length-1));
			ranks.push(hand.cards[2].substr(0, hand.cards[2].length-1));
			ranks.push(hand.cards[3].substr(0, hand.cards[3].length-1));
			ranks.push(hand.cards[4].substr(0, hand.cards[4].length-1));
		},
		convert_cards_to_numbers = function (hand) {
			if (ranks.length === 0) strip_ranks(hand);
			ranks = ranks.map(function (value) {
				if (value === 'j' || value === 'J') return 11;
				if (value === 'q' || value === 'Q') return 12;
				if (value === 'k' || value === 'K') return 13;
				if (value === 'a' || value === 'A') return 14;
				return +value;
			});
		},
		sort_ranks = function () {
			var i, j, tmp;

			// insertion sort
			for (i = 1; i <= ranks.length; i++) {
				for (j = i; j > 0 && ranks[j-1] > ranks[j]; j--) {
					tmp = ranks[j];
					ranks[j] = ranks[j-1];
					ranks[j-1] = tmp;
				}
			}
		},
		set_result = function (hand_desc, error) {
			result.hand = hand_desc;
			result.error = error;
			return result;
		},
		create_card_count = function () {
			ranks.map(function (value) {
				map[value]++;
			});
		},
		make_high_ace = function () {
			ranks[0] = 14;
			sort_ranks();
		},
		init_data_structures = function () {
			suits.length = 0;
			ranks.length = 0;
			map = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; // 0 - 14 (2 - Ace, burn first 2)
		};

	return {
		getHand : function (hand) {
			init_data_structures();
			strip_suits(hand);
			strip_ranks(hand);
			convert_cards_to_numbers(hand);
			sort_ranks();
			create_card_count();

			if (contains_royalflush()) {
				return set_result("Royal Flush");
			}

			if (contains_straight_flush()) {
				return set_result("Straight Flush");
			}

			if (contains_4_of_kind()) {
				return set_result("4 Of A Kind");
			}

			if (contains_fullhouse()) {
				return set_result("Full House");
			}

			if (contains_flush()) {
				return set_result("Flush");
			}

			if (contains_straight()) {
				return set_result("Straight");
			}

			if (contains_3_of_kind()) {
				return set_result("3 Of A Kind");
			}

			if (contains_2_pair()) {
				return set_result("2 Pair");
			}

			if (contains_pair()) {
				return set_result("1 Pair");
			}

			return set_result(get_high_card());
		}
	};
}());

module.exports = poker;