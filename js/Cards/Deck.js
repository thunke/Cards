var Deck = (function(packs){

	//Private Properties and Methods
	var Constr;


	//Public API -- constructor
	Constr = function(packs){

		this.cards = [];
		this.discardPile = [];
		this.hands = [];

		var n = packs || 1,
			sequence = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'],
			suits = ['S', 'C', 'H', 'D'],
			cardId = 0;
			
		for(i = 0; i < n; i++)
		{
			for(j = 0, sel = sequence.length; j < sel; j++)
			{
				for(k = 0, sul = suits.length; k < sul; k++)
				{
					this.cards.push(new Card(sequence[j], suits[k], cardId, true));
					cardId++;
				}
			}
		}

	};

	//Public API -- prototype
	Constr.prototype = {
	
		shuffle: function(n){
			var k, 
				tmp,
				mf = Math.floor, 
				mr = Math.random,
				n = n || 1;

			for (var i = 0; i < n; i++)
			{
				for (var j = 0, cl = this.cards.length; j < cl; j++)
				{
					k = mf(mr() * cl);
					tmp = this.cards[j];
					this.cards[j] = this.cards[k];
					this.cards[k] = tmp;
				}
			}

		},

		createHand: function(n){
			var n = n || 1;

			for(i = 0; i < n; i++)
			{
				this.hands.push(new Hand(this.hands.length));
			}
			
		},
		
		renderHands: function(){
			$html = $('<div />').attr('id', 'hands');
			for(var i =0, hl = this.hands.length; i < hl; i++)
			{
				$html.append(this.hands[i].$ui);
			}
			return $html;
		},
		
		dealAll: function(facing, animate){
			var that = this;
			$.each(this.hands, function(i){
				var time = 250 * i;

				if(animate)
				{
					var myTime = window.setTimeout(function(){that.dealCard(i, facing, true)}, time);
				}
				else
				{
					that.dealCard(i, facing, false)
				}
			});
		},

		dealCard: function(hand, facing, animate){
			if(this.cards.length > 0)
			{
				this.hands[hand].addCard(this.cards.shift(), facing, animate);
			}			
		},
		
		grabDiscard: function(card){
			if(card)
			{
				for(var i =0, cl = card.length; i< cl; i++)
				{
					this.discardPile.push(card[i]);
				}
			}
		},
		
		renderDiscard: function(){
			var $html = $('<div />').attr('id', 'discardPile')
			for(var i =0, dpl = this.discardPile.length; i < dpl; i++)
			{
				$html.append(this.discardPile[i].$ui);
			}
			return $html;		
		},
		
		count: function(){
			return this.cards.length;  
		},
		
		renderDeck: function(){
			var $html = $('<div />').attr("id", "cards");
			$.each(this.cards, function(){
				$html.append(this.$ui);
			});
			return $html;
		},
		
		gatherCards: function(keepPlaying){
			for(var x in y=this.discardPile.splice(0, this.discardPile.length))
			{
				this.cards.push(y[x]);
			}

			if(!keepPlaying)
			{
				for(var i = 0, hl = this.hands.length; i < hl; i++)
				{
					for(var x in y=this.hands[i].cards.splice(0, this.hands[i].cards.length))
					{
						this.cards.push(y[x]);
					}
				}
			}
		},
		
		flipAll: function(facing){
			$.each(this.cards, function(){
				this.flip(facing);
			});
		},
		
		deselectAll: function(){
			$.each(this.cards, function(){
				this.$ui.removeClass('selected');
			});
		}
	};
	
	return Constr;

}());