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
	var allcards=document.querySelectorAll('.card');/*selecting the element with class card*/
	// console.log(allcards);
	var opencards=[];/*creating an empty array to  store all open cards*/

    allcards.forEach(function(card)
	{
		console.log("the contains open is"+card.classList.contains('open'));
		card.addEventListener('click',function(event)/*adding a event listener function for clicking the card*/
		{
		if(!card.classList.contains('open')&& !card.classList.contains('show')&& !card.classList.contains('match'))/*click only the cards that is closed and donot click the already opened cards*/
		{

			console.log("the contains open is"+card.classList.contains('open'));
			console.log(card+" was clicked");
			opencards.push(card);/*push the cards that is open into the opencards array*/
			console.log("the card is" +opencards.length);
			if(opencards.length<2)/*if only one card is open*/
			{
				opencards[0].classList.add('open');
				opencards[0].classList.add('show');
				console.log("inside lesser than")

			}
			if(opencards.length==2)/*if two cards are open*/
			{
				console.log("inside greter than")
				opencards[0].classList.add('open','show');	
				opencards[1].classList.add('open','show');

			if(opencards[0].dataset.card===opencards[1].dataset.card)/*if the cards match make the cards open*/
			{   
				console.log("yes it is matched");
				opencards[0].classList.add('match');
				opencards[0].classList.add('open');
				opencards[0].classList.add('show');
				opencards[1].classList.add('match');
				opencards[1].classList.add('open');
				opencards[1].classList.add('show');
				opencards=[];/*empty the opencards array for next round*/
			}
			else/*if the cards did not match close the cards in 1 seconds*/
			{
				setTimeout(function()
				{
 					opencards[0].classList.remove('open','show');
					opencards[1].classList.remove('open','show');
					opencards=[];
				},1000);

			}	
			}
		}
		});
	});
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
