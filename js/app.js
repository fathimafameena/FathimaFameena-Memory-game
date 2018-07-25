/*
 * Create a list that holds all of your cards
 */
	var cards=["fa-diamond","fa-diamond",
            "fa-paper-plane-o","fa-paper-plane-o",
            "fa-github","fa-github",
            "fa-apple","fa-apple",
            "fa-cube","fa-cube",
            "fa-leaf","fa-leaf",
            "fa-bicycle","fa-bicycle",
            "fa-bomb","fa-bomb"];/*created a array of cards*/

	function genarateCard(card)
    {
    	console.log("i am called");
    	return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;/*genarating the HTML list dynamically for all cards*/
    	console.log(`<li class="card"><i class="fa ${card}"></i></li>`);	
    }   
/*a function to intialise the game with all intial parameters*/
    function initGame()
    {
    	var deck=document.querySelector('.deck');
    	var cardHtml=shuffle(cards.map(function(card)/*shuffling the cards everytime  by using the shuffle function*/
    	{
         console.log("the card is"+card); 
           return genarateCard(card);/*passing the array to the genarateCard function to dynamically create a list of cards*/
    	}));
   		console.log("i am cardHtml"+cardHtml.join(''));
    	deck.innerHTML=cardHtml.join('');
    }
	initGame();//intialize function is called when the game starts
	// Shuffle function from http://stackoverflow.com/a/2450976
	function shuffle(array) 
	{
    	var currentIndex = array.length, temporaryValue, randomIndex;
		while (currentIndex !== 0)
		 {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    	}

    return array;
	}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
