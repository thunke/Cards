var Card = function(newSequence, newSuit, newId, newShowing){

  this.sequence = newSequence;  //A - K
  this.seqName;  //Ace - King
  this.suit = newSuit;  //S, C, D, H
  this.suitName; //Spades
  this.id = "card-"+newId;
  this.$ui;  //jQuery object of visual rendering
  this.showing = newShowing === undefined ? true : newShowing;

  function styleMid(grid){
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

  switch(newSuit){
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

  var innerTemplate;

  switch(newSequence){
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
}

Card.prototype = {

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

var Hand = function(newId){

  this.cards = [];
  this.id = "hand-"+newId;

  this.$ui = $("<div />")
    .attr('id', this.id).addClass('hand')
    .append($("<div />").addClass('cards-in-hand'));
};

Hand.prototype = {

  addCard: function(card, animate){

    this.cards.push(card);

    if(!animate)
    {
      this.$ui.find('.cards-in-hand').append(card.$ui); 
    }
    else
    {
      var $hand = this.$ui;
      var origin = card.$ui.offset();
      var destination;

      if(this.$ui.find('.card:last-child').offset())
      {
        destination = this.$ui.find('.card:last-child').offset();
        destination.left += 71;
      }
      else
        destination = this.$ui.find('.cards-in-hand').offset();

      card.$ui.css({ position: "absolute", top: origin.top, left: origin.left, zIndex: "5" }).animate({ 
          top: destination.top, 
          left: destination.left 
        }, {
          duration: 500,
          complete: function(){ 
            $(this).css( { position: "relative", top: "auto", left: "auto", zIndex: "auto" } );
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

  toString: function(){
    var str ="";
    $.each(this.cards, function(i){
      str+=this.toString()+", ";
    });
    return str;
  },

  //optional arg facing 'up' or 'down'; null does a toggle  
  flipAll: function(facing){
    $.each(this.cards, function(i){
      this.flip(facing);
    });
  },
  
};
var Deck = function(numPacks){

  this.cards = [];
  this.discardPile = [];
  this.hands = [];
  
  this.createDeck = function(n){
    var n = n || 1;
    var sequence = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    var suits = ['S', 'C', 'H', 'D'];
    var cardId = 0;
 
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

  this.createDeck(numPacks);
};

Deck.prototype = {
  
  shuffle: function(n){
    var k, tmp, mf = Math.floor, mr = Math.random;
    var n = n || 1;

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

  dealAll: function(animate){
    var that = this;
    $.each(this.hands, function(i){
      var time = 250 * i;

      if(animate)
      {
        var myTime = window.setTimeout(function(){that.dealCard(i, true);}, time);
      }
      else
      {
        that.dealCard(i, false)
      }
    });
  },

  dealCard: function(hand, animate){
    if(this.cards.length > 0)
    {
      this.hands[hand].addCard(this.cards.shift(), animate);
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
    $html = $('<div />').attr('id', 'discardPile')
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

  //set keepplaying to true if you only want to gather the discards
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

  //optional arg facing 'up' or 'down' null does a toggle  
  flipAll: function(facing){
    $.each(this.cards, function(){
      this.flip(facing);
    });
  },

  deselectAll: function(){
    $.each(this.cards, function(){
      this.$ui.removeClass('selected');
    });
  },
  
};
