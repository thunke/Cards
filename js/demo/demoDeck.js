var demoDeck = (function(){

	var $deckArea = null,
	 	$discardArea = null,
		deckFacing = "up",
		d = null;

	$(document).ready(function(){

		//Initializing the Game
		$deckArea = $('#deckArea'),
		$discardArea = $('#discardArea'),
		deckFacing = "up"
		d = new Deck(1);

		d.createHand(5);
		$deckArea.append(d.renderDeck());
		$('#handsArea').append(d.renderHands());

		//Button Handlers for the Deck
		$('#shuffle').click(function(){
			d.shuffle(1);
			$('#cards').remove();
			$deckArea.append(d.renderDeck());
		});

		$('#dealCard').click(function(){
			d.dealAll("up", true);
		});

		$('#gatherDiscards').click(function(){
			d.gatherCards(true);
			$('#cards').remove();
			d.flipAll(deckFacing);
			$deckArea.append(d.renderDeck());
		});

		$('#gather').click(function(){
			d.gatherCards(false);
			$('#cards').remove();
			d.flipAll(deckFacing);
			d.deselectAll();
			$deckArea.append(d.renderDeck());
		});

		$('#hideDeck').click(function(){
			if(deckFacing === "up")
			{
				d.flipAll("down");
				deckFacing = "down";
				$(this).attr({value: 'Show Deck'});
			}
			else
			{
				d.flipAll("up");
				deckFacing = "up";
				$(this).attr({value: 'Hide Deck'});
			}
		});

		$('#felt').click(function(event){
			$card = $(event.target).closest('.card');
			if($card.length)
			{
				if($card.parent().is('.cards-in-hand'))
				{
					$card.toggleClass('selected');
				}
			}
		});


		//Buttons for Each Hand
		$.each(d.hands, function(i){
			this.$ui
			.append($('<div />').addClass('button_row')
			.append(
				$('<input />').attr({ type: 'button', 'class': 'button', value: 'Hit Me', id: 'hands-' + i + '-hit' })
				.click(function(){ d.dealCard(i, "up", true) })
			)
			.append(
				$('<input />').attr({type: 'button', 'class': 'button', value: 'Discard Selected', id: 'hands-'+ i +'-discard'})  //, disabled: 'true'
				.click(function(){

					for(j = d.hands[i].cards.length - 1; j >= 0; j--)
					{
						if(d.hands[i].cards[j].$ui.hasClass('selected'))
						{
							d.hands[i].cards[j].$ui.removeClass('selected');
							d.hands[i].cards[j].flip("down");
							d.grabDiscard(d.hands[i].discard(j));
						}
					}

					$('#discardPile').remove();
					$discardArea.append(d.renderDiscard());
				})
			)
			.append(
				$('<input />').attr({type: 'button', 'class': 'button', value: 'toString', id: 'hands-'+i+'-toString'})
				.click(function(){ alert( d.hands[i].toString() ); }))
			);
			
			
		});	
	});	

}());
