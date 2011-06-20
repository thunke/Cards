var Hand = (function(id){

	//Private Properties and Methods
	var Constr;
	
	//Public API -- constructor
	Constr = function(id){
		this.cards = [];
		this.id = "hand-"+id;
		this.$ui = $("<div class='hand' id='"+this.id+"'><div class='cards-in-hand'></div></div>");
	};

	//Public API -- prototype
	Constr.prototype = {
		
		addCard: function(card, facing, animate){
			this.cards.push(card);
			if(!animate)
			{
				card.flip(facing);
				this.$ui.find('.cards-in-hand').append(card.$ui); 
			}
			else
			{
				var $hand = this.$ui,
					origin = card.$ui.offset(),
					destination;

				if(this.$ui.find('.card:last-child').offset())
				{
					destination = this.$ui.find('.card:last-child').offset();
					destination.left += 15;
				}
				else
					destination = this.$ui.find('.cards-in-hand').offset();

				$("body").append(card.$ui);
				card.$ui.css({ position: "absolute", top: origin.top, left: origin.left, zIndex: "500"})
					.animate({ 
						top: destination.top, 
						left: destination.left 
					}, 
					{
						duration: 500,
						complete: function(){ 
							$(this).css( { position: "", top: "", left: "", zIndex: "" } );
							card.flip(facing);
							$hand.find('.cards-in-hand').append(card.$ui); 
						}
					}
				);
			}
		},
		
		discard: function(card){
			if(this.cards[card])
			{
				return this.cards.splice(card, 1);
			}
		},

		flipAll: function(facing){
			$.each(this.cards, function(i){
				this.flip(facing);
			});
		},

		toString: function(){
			var r = [];
			$.each(this.cards, function(i){
				r.push(this.toString());
			});
			return r.join(", ");
		},

	};

	return Constr;

}());