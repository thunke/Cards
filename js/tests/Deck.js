(function($) {

	//Test of js/Cards/Deck.js
	module("Deck Object", {
		setup: function(){
			this.d = new Deck(2);
		},
	});

	test("Deck Constructor", 5, function(){
		strictEqual(typeof this.d, "object", "Creates a Deck Object");
		notStrictEqual(this.d.cards.length, null, "Deck has an array of cards");
		strictEqual(this.d.cards.length, 104, "Deck has 2 packs totaling 104 cards");
		notStrictEqual(this.d.discardPile.length, null, "Deck has a discard pile array");
		notStrictEqual(this.d.hands.length, null, "Deck has an array of Hands");
	});

	test("Deck.shuffle", 1, function(){
		var first5 = [this.d.cards[0].id, this.d.cards[1].id, this.d.cards[2].id, this.d.cards[3].id, this.d.cards[4].id];
		this.d.shuffle(3);
		var new5 =  [this.d.cards[0].id, this.d.cards[1].id, this.d.cards[2].id, this.d.cards[3].id, this.d.cards[4].id];
		notDeepEqual(first5, new5, "Cards get shuffled arround");
	});
	
	test("Deck.createHand", 2, function(){
		this.d.createHand(2);
		strictEqual(this.d.hands.length, 2, "Two new hands created");
		ok(this.d.hands[0].hasOwnProperty("$ui"), "Deck.hands array populated with Hand objects");
	});

	test("Deck.renderHands", 1, function(){
		this.d.createHand(2);
		ok(this.d.renderHands, "renderHands returns a string of HTML");
	});

	test("Deck.dealAll", 1, function(){
		this.d.createHand(2);
		this.d.dealAll("up", false);
		var f = true;
		$.each(this.d.hands, function(){
			 if(typeof this.cards[0]!=="object"){ f = false; }
		});
		ok(f, "All hands were delt a card.");
	});
	
	test("Deck.dealCard", 1, function(){
		this.d.createHand(2);
		this.d.dealCard(1, "up", false);
		ok(typeof this.d.hands[1].cards[1], "A hand was delt a single card from the deck");
	});

	test("Deck.grabDiscard", 1, function(){
		var l = this.d.discardPile.length;
		this.d.createHand(1);
		this.d.hands[0].addCard(new Card("Q", "S", 1, true));
		this.d.grabDiscard(this.d.hands[0].discard(0));
		notStrictEqual(this.d.discardPile.length, l, "Discard added to the discard pile");
	});
	
	test("Deck.renderDiscard", 1, function(){
		ok(this.d.renderDiscard, "Render Discard returns a string of HTML");
	});
	
	test("Deck.count", 1, function(){
		strictEqual(this.d.count(), 104, "Deck.count returns the correct count");
	});
	
	test("Deck.renderDeck", 1, function(){
		ok(this.d.renderDeck, "Render Deck returns a string of HTML");
	});
	
	test("Deck.gatherCards", 2, function(){
		this.d.createHand(2);
		this.d.dealAll("up", false);
		this.d.dealAll("up", false);
		//100 Cards in deck, 4 in play.
		this.d.grabDiscard(this.d.hands[0].discard(0));
		this.d.grabDiscard(this.d.hands[0].discard(0));
		//Gather only from discard pile
		this.d.gatherCards(true);
		strictEqual(this.d.cards.length, 102, "Deck gathered 2 cards from the discard pile");
		//Gather All
		this.d.gatherCards(false);
		strictEqual(this.d.cards.length, 104, "Deck gathered remaining 2 cards in play, deck is full");	
	});
	
	test("Deck.flipAll", 2, function(){
		this.d.flipAll("up");
		var f = true;
		$.each(this.d.cards, function(){ if(this.$ui.hasClass("down")) f = false; });
		ok(f, "Each card is flipped up");

		this.d.flipAll("down");
		f = true;
		$.each(this.d.cards, function(){ if(this.$ui.hasClass("up")) f = false; });
		ok(f, "Each card is flipped down");
	});

	test("Deck.deselectAll", 1, function(){
		$.each(this.d.cards, function(){
			this.$ui.addClass("selected");
		});
		
		this.d.deselectAll();

		var f = true;
		$.each(this.d.cards, function(){ if(this.$ui.hasClass("selected")) f = false; });
		ok(f, "Each card was selected and then deselected");		
	});
	
}(jQuery));