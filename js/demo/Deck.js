//Extend Deck.js
var Deck = (function(my){
//	var Constr;

	Constr.prototype.renderDeck = function(){
		var $html = $('<div />').attr("id", "cards");
		$.each(this.cards, function(){
console.log("hai");
			$html.append(this.$ui);
		});
	};

	return Constr;
	
}(Deck));

