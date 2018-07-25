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
    	setMovesInit();/intialize the moves */
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
	var modal = document.getElementById('myModal');/*modal class*/
    var span = document.getElementsByClassName("close")[0];/*close button in modal*/
	span.onclick = function() 
	{
    	modal.style.display = "none";
	}

// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) 
	{
    	if (event.target == modal) 
    	{
        	modal.style.display = "none";
    	}
	}
	var stars=document.querySelector('.stars');
	console.log(stars.children);
	console.log(stars.children[2]);
	var trackmoves;
    var restart=document.querySelector('.restart');
	restart.addEventListener('click',function(event)/*restart button code*/
	{
		document.location.reload();
	});
	var gametime = document.querySelector('.timer'),seconds = 0, minutes = 0,t;
	timer();/*calling the timer to start when the page intialises*/

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
				incrementMoves();/*increment moves by 1 for each match*/
    			trackmoves=document.querySelector('.moves').innerText;
    			console.log("the trackmoves is"+trackmoves);
    			if(trackmoves==='10')
    			{
       				 stars.children[2].remove('fa fa-star');/*if moves is equal 10 remove one perfomance star*/
    			}
				if(trackmoves==='15')
    			{
        
        			stars.children[1].remove('fa','fa-star');/*if moves is equal 15 remove two perfomance star*/
    			}
				console.log("checking for winner");
				winning();
			}
			else/*if the cards did not match close the cards in 1 seconds*/
			{
				incrementMoves();/*increment moves by 1 for each  unmatch*/
    			trackmoves=document.querySelector('.moves').innerText;
    			console.log("the trackmoves is"+trackmoves);
    			if(trackmoves==='10')
    			{
        			stars.children[2].remove('fa fa-star');/*if moves is equal 10 remove one perfomance star*/
    			}
    			}
    			if(trackmoves==='15')
    			{
        
      	  			stars.children[1].remove('fa','fa-star');/*if moves is equal 15 remove two perfomance star*/
    			}
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
	function winning()/*function to find if the player won the game*/
	{
		console.log(" i am inside winning function");
		var allcards=document.querySelectorAll('.card');
		var allmatch=[];
		allcards.forEach(function(card)
		{
			if(card.classList.contains('match'))
			{
				allmatch.push(card);/*if the cards has a match class push in an array*/
			}
		});
		if(allmatch.length===16)/*if all 16 cards has a match class display the winning message*/
		{
			stoptimer();/*stopping the timer when the game ends*/
			console.log("Congratulations you won the game in "+document.querySelector('.timer').innerText+"   with "+document.querySelector('.moves').innerText+ "   moves");
 			var performance,displaystars=0;
			perfomance=document.querySelector('.moves').innerText;
			if(perfomance>=10)
			{
    			displaystars=2;
			}
			if(perfomance>=15)
			{
   				 displaystars=1
			}
			if(perfomance<10)
			{
   				 displaystars=3
			}
    		var winmessage=`CONGRATULATIONS YOU WON the game with ${displaystars} stars and in a Timing of  ${document.querySelector('.timer').innerText}`;
    		console.log("the winn message is"+winmessage);
    		var modalcontent=document.querySelector('.winningcontent');
    		modalcontent.innerText=winmessage;/*display the message inside modal*/
       		setTimeout(modalDisplay,1000);/*dispalying the modal after 1 second*/

		}

	}
	function modalDisplay()
	{
    	modal.style.display = "block"
	}
	function add() /*function for calculating seconds and minutes*/
	{
   		seconds++;
    	if (seconds >= 60)
    	{
        	seconds = 0;
        	minutes++;
        }
    	gametime.textContent = `   ${minutes}m:${seconds} s`;/*setting the time in the element */

    	timer();
	}
	function timer()
	{
    	t = setTimeout(add, 1000);
	}
	function stoptimer() 
	{
    	clearTimeout(t);/*clearing the time function*/
	}
	function setMovesInit()
	{
		var moves=0;
    	document.querySelector('.moves').innerText=moves;/*intialize the moves to zero when the game starts*/
	}
	function incrementMoves()/*increment the moves by one and set to the  element in html*/
	{
		var currentmoves=document.querySelector('.moves').innerText;
		currentmoves++;
		document.querySelector('.moves').innerText=currentmoves;
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
