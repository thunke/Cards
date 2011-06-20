var Card = (function(sequence, suit, id, isShowing){

	//Private Properties and Methods
	var Constr,
		innerTemplate,
		
		styleMid = function (grid){
			var html = [], h = 0;
			html[h++] = "<div class=\"mid\">";
			for(var g, i = 0; g = grid[i++];)
			{
				html[h++] = "<span class=\"";
				html[h++] = g;
				html[h++] = "\">";
				html[h++] = sym;
				html[h++] = "</span>";
			}
			html[h++] = "</div>";
			return html.join("");
		};

	//Public API -- constructor
	Constr = function(sequence, suit, id, showing){
		  this.sequence = sequence;  //A - K
		  this.seqName;  //Ace - King
		  this.suit = suit;  //S, C, D, H
		  this.suitName; //Spades
		  this.id = "card-"+id;
		  this.$ui;  //jQuery object of visual rendering
		  this.showing = showing === undefined ? true : showing;

		switch(suit){
			case "S":
				sym = "&spades;";
				this.suitName = "Spades";
				break;
			case "C":
				sym = "&clubs;";
				this.suitName = "Clubs";
				break;
			case "H":
				sym = "&hearts;";
				this.suitName = "Hearts";
				break;
			case "D":
				sym = "&diams;";
				this.suitName = "Diamonds";
				break;
		}

		switch(sequence){
			case "A":
				innerTemplate = styleMid("A");
				this.seqName="Ace";
				break;
			case 2:
				innerTemplate = styleMid(["B1", "B5"]);
				this.seqName="Two";
				break;
			case 3:
				innerTemplate = styleMid(["B1", "B3", "B5"]);
				this.seqName="Three";
				break;
			case 4:
				innerTemplate = styleMid(["A1", "C1", "A5", "C5"]);
				this.seqName="Four";
				break;
			case 5:
				innerTemplate = styleMid(["A1", "C1", "B3", "A5", "C5"]);
				this.seqName="Five";
				break;
			case 6:
				innerTemplate = styleMid(["A1", "C1", "A3", "C3", "A5", "C5"]);
				this.seqName="Six";
				break;
			case 7:
				innerTemplate = styleMid(["A1", "C1", "B2", "A3", "C3", "A5", "C5"]);
				this.seqName="Seven";
				break;
			case 8:
				innerTemplate = styleMid(["A1", "C1", "B2", "A3", "C3", "B4", "A5", "C5"]);
				this.seqName="Eight";
				break;
			case 9:
				innerTemplate = styleMid(["A1", "C1", "A2", "C2", "B3", "A4", "C4", "A5", "C5"]);
				this.seqName="Nine";
				break;
			case 10:
				innerTemplate = styleMid(["A1", "C1", "A2", "B2", "C2", "A4", "B4", "C4", "A5", "C5"]);
				this.seqName="Ten";
				break;
			case "J":
				innerTemplate = styleMid(["F1", "F2"]);
				this.seqName="Jack";
				break;
			case "Q":
				innerTemplate = styleMid(["F1", "F2"]);
				this.seqName="Queen";
				break;
			case "K":
				innerTemplate = styleMid(["F1", "F2"]);
				this.seqName="King";
				break;
		}

		this.$ui = $(
			[ "<div class=\"card up ",this.suitName," ",this.seqName," ",this.seqName,"-",this.suitName,"\" id=\"",this.id,"\">",
			"  <div class=\"front\">",
			"    <span class=\"tl\">",this.sequence,"<span class=\"suit\">",sym,"</span></span>",
			"    <span class=\"br\">",this.sequence,"<span class=\"suit\">",sym,"</span></span>",
			innerTemplate,
			"  </div>",
			"  <div class=\"back\"><div class=\"bmid\"></div></div>",
			"</div>"].join(""));

			if(!this.showing) this.$ui.removeClass('up').addClass('down');
	};

	//Public API -- prototype
	Constr.prototype = {
		
		//turn a card 'up' or 'down'; no arg does a toggle
		flip: function(facing){
			if(facing)
			{
				this.$ui.removeClass('up down').addClass(facing);
			}
			else
			{
				this.$ui.toggleClass('up down');
			}
		},

		select: function(){
			this.$ui.toggleClass('selected');
		},

		toString: function(){
			return this.seqName+" of "+this.suitName
		},

	};

	return Constr;

}());
