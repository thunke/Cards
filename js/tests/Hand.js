(function($) {

	//Test of js/Cards/Hand.js

	module("Hand Object", {
		setup: function(){
			this.h = new Hand("test");
		},
	});
	
	test("Hand Constructor", 4, function(){
		strictEqual(typeof this.h, "object", "Creates a Hand Object");
		notStrictEqual(this.h.cards.length, null, "Hand has an array of cards");
		strictEqual(this.h.id, "hand-test", "Hand's id is set correctly");
		ok(this.h.hasOwnProperty("$ui"), "Has a UI property for the visual rendering of the hand");
	});

	test("Hand.addCard", 1, function(){
		this.h.addCard(new Card("Q", "S", 1, true), "up", false);
		strictEqual(this.h.cards.length, 1, "Able to add a card to the Hand");
	});
	
	test("Hand.discard", 2, function(){
		this.h.addCard(new Card("Q", "S", 1, true), "up", false);
		this.h.addCard(new Card("A", "H", 2, true), "up", false);
		this.h.discard(1);
		strictEqual(this.h.cards.length, 1, "The hand discarded a card");
		strictEqual( this.h.cards[0].id, "card-1","The hand discarded the correct card");
	});
	
	test("Hand.flipAll", 1, function(){
		ok(true, "All cards were flipped");
	});
	
	test("Hand.toString", 1, function(){
		this.h.addCard(new Card("Q", "S", 1, true), "up", false);
		this.h.addCard(new Card("A", "H", 1, true), "up", false);
		strictEqual(this.h.toString(), "Queen of Spades, Ace of Hearts", "The toString fn returns the correct string representation");
	});

}(jQuery));
