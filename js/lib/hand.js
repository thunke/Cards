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
