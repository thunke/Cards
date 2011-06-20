(function($) {

	//Test of js/Cards/Card.js

	module("Card Object", {
		setup: function(){
			this.c = new Card("Q", "S", 1, true);
		},
	});
		
	test("Card Constructor", 7, function(){
		strictEqual(typeof this.c, "object", "Creates a Card Object");
		strictEqual(this.c.sequence, "Q", "Suit seq is Q");
		strictEqual(this.c.suit, "S", "Suit sym is S");
		strictEqual(this.c.suitName, "Spades", "Suit Name is Spades");
		strictEqual(this.c.seqName, "Queen", "Sequence Name is Queen");
		strictEqual(this.c.id, "card-1", "Card's ID is set correctly - 'card-1'");
		ok(this.c.$ui.hasClass("up"), "Card is set to show");
	});

	test("Card.select", 1, function(){
		this.c.select();
		ok(this.c.$ui.hasClass("selected"), "Card can be selected (class='selected')")
	});

	test("Card.flip", 2, function(){
		this.c.flip("down");
		ok(this.c.$ui.hasClass("down"), "Card is flipped down when passed 'down'");
		this.c.flip();
		ok(this.c.$ui.hasClass("up"), "Card is flipped up on toggle (no args)");
	});

	test("Card.toString", 1, function(){
		strictEqual(this.c.toString(), "Queen of Spades", "Returns 'Queen of Spades'");
	});

}(jQuery));