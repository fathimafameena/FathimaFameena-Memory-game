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

	
	initGame();//intialize function is called when the game starts
	var allcards=document.querySelectorAll('.card');/*selecting the element with class card*/
	var opencards=[];/*creating an empty array to  store all open cards*/
	var modal = document.getElementById('myModal');/* a variable for  accessing modal*/
    var span = document.getElementsByClassName("close")[0];/*close button in modal*/
	var stars=document.querySelector('.stars');/* a variable for  accessing star element*/
	var trackmoves;
    var restart=document.querySelector('.restart');
	var gametime = document.querySelector('.timer'),seconds = 0, minutes = 0,t;
	var timerstart=0;
    allcards.forEach(function(card)
	{
		card.addEventListener('click',function(event)/*adding a event listener function for clicking the card*/
		{
		if(!card.classList.contains('open')&& !card.classList.contains('show')&& !card.classList.contains('match'))/*click only the cards that is closed and donot click the already opened cards*/
		{
			
			timerstart=timerstart+1;
			console.log("the time variable is"+timerstart);
			if(timerstart===1)
			{
               timer();/*starting the timer on the first click*/
			}
			opencards.push(card);/*push the cards that is open into the opencards array*/
			if(opencards.length<2)/*if only one card is open*/
			{
				displayOneCards();

			}
			if(opencards.length==2)/*if two cards are open*/
			{
				displayTwoCards();
			if(opencards[0].dataset.card===opencards[1].dataset.card)/*if the cards match make the cards open*/
			{   
				match();/*call the match function to see if the cards match*/
				
			}
			else/*if the cards did not match close the cards in 1 seconds*/
			{
				unmatch();/*call the unmatch function if the cards didnt match*/
				
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
			
 			var displaystars=0;
 			var modalcontent=document.querySelector('.winningcontent');
    		var modalTime=document.querySelector('.modaltime');
    		var modalmoves=document.querySelector('.modalmoves');
    		var modalstars=document.querySelector('.modalstar');
    		var modaltimemessage=`Time=${document.querySelector('.timer').innerText}`;
    		var modalmovesmessage=`Moves=${document.querySelector('.moves').innerText}`;
			if(trackmoves>=25)
			{
    			displaystars=1;/*displaying the perfomance star in number  in winning message based on the moves*/
			}
			if(trackmoves>=15&&trackmoves<25)
			{
   				 displaystars=2
			}
			if(trackmoves<15)
			{
   				 displaystars=3
			}
			if(displaystars===1)
			{
    		var winmessage=`YOU WON the game.Try improving your memory`;
    		var modalstarmessage=`Star=${displaystars}star`;
    		}
    		else
    		{
    		var winmessage=`CONGRATULATIONS YOU WON the game`;
    		var modalstarmessage=`Star=${displaystars}stars`;

    		}
    		
    		modalcontent.innerText=winmessage;/*display the message inside modal*/
    		modalTime.innerText=modaltimemessage;
    		modalmoves.innerText=modalmovesmessage;
    		modalstars.innerText=modalstarmessage;
       		setTimeout(modalDisplay,1000);/*dispalying the modal after 1 second*/
       	}

	}

	function genarateCard(card)
    {
    	return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;/*genarating the HTML list dynamically for all cards*/
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

	function displayOneCards()
	{
		opencards[0].classList.add('open');
		opencards[0].classList.add('show');
		console.log("inside lesser than")

	}
    function displayTwoCards()
    {
		console.log("inside greter than")
		opencards[0].classList.add('open','show');	
		opencards[1].classList.add('open','show');
	}
	function match()
	{
		console.log("yes it is matched");
		opencards[0].classList.add('match');
		opencards[0].classList.add('open');
		opencards[0].classList.add('show');
		opencards[1].classList.add('match');
		opencards[1].classList.add('open');
		opencards[1].classList.add('show');
		opencards=[];/*empty the opencards array for next round*/
		incrementMoves();/*increment moves by 1 for each click*/
			trackmoves=document.querySelector('.moves').innerText;
    		console.log("the trackmoves is"+trackmoves);
    		if(trackmoves==='15')
    		{
       			 stars.children[2].remove('fa fa-star');/*if moves is equal 10 remove one perfomance star*/
    		}
			if(trackmoves==='25')
    		{
        		stars.children[1].remove('fa','fa-star');/*if moves is equal 15 remove two perfomance star*/
    		}
		console.log("checking for winner");
		winning();
	}
	function unmatch()
	{
		opencards[0].classList.add('unmatch');
		opencards[1].classList.add('unmatch');/*code for making the background red if cards didnt match*/
		incrementMoves();/*increment moves by 1 for each click*/
		trackmoves=document.querySelector('.moves').innerText;
    	console.log("the trackmoves is"+trackmoves);
    		if(trackmoves==='15')
    		{
       			 stars.children[2].remove('fa fa-star');/*if moves is equal 10 remove one perfomance star*/
    		}
			if(trackmoves==='25')
    		{
        		stars.children[1].remove('fa','fa-star');/*if moves is equal 15 remove two perfomance star*/
    		}
		setTimeout(function()
		{
 			opencards[0].classList.remove('open','show','unmatch');
			opencards[1].classList.remove('open','show','unmatch');/*make the unmatch cards close in 1 second*/
			opencards=[];
		},1000);

	}
	function modalDisplay()
	{
    	modal.style.display = "block"
	}

	span.onclick = function() //close the modal when user clicks it
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
	restart.addEventListener('click',function(event)/*restart button code*/
	{
		document.location.reload();
	});
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
	function setMovesInit()/*intialize the moves to 0*/
	{
		var moves=0;
    	document.querySelector('.moves').innerText=moves;
	}
	function incrementMoves()/*increment the moves to 1*/
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
