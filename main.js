console.log( "Tic tac toe" );

const user = "User";
const opponent = "Opponent";

var currentPlayer = "";
var winner = "";
var userScore = 0;
var opponentScore = 0;
var hasWinner = false;
var isDraw = false;
var playerCharacter = "";
var opponentCharacter = "";
var playerCharacterImage = "";
var opponentCharacterImage = "donald_trump.jpeg"; // just go against him for now
var loserImg = "";
var loserMessage = "";
var winnerImg = "";
var winnerMessage = "";

var avatar = {
  spongebob: "spongebob.png",
  patrick: "patrick.jpg",
  squidward: "squidward.jpg",
  plankton: "plankton.jpg",
  jerry: "jerry.png",
  mrkrab: "mr_krab.jpg"
};

var characters = {
  spongebob: {
                winning_images: [ "spongebob_win.gif", "spongebob.gif" ],
                winning_text: [ "You beat that shit!", "It appears you won proudly!" ]
             },
  patrick: {
                winning_images: [ "patrick.gif", "patrick_win.gif", "patrick_happy.gif" ],
                winning_text: [ "You've nail it!", "Well done!", "Great job!" ]
            },
  squidward: {
                winning_images: [ "squidward.gif", "squidward_win.gif" ],
                winning_text: [ "Oh yea! You won.", "Victory is yours to claim!" ]
             },
  plankton: {
               winning_images: [ "plankton_yes.gif", "plankton_evil_laugh.gif" ],
               winning_text: [ "You pretty sure scrap that loser.", "Great job on the victory!" ]
             },
  jerry: {
            winning_images: [ "jerry_win.gif", "jerry.gif" ],
            winning_text: [ "Meow...( as in you win! )", "Woof...( as in you just won! )" ]
          },
  mrkrab: {
             winning_images: [ "mr_krab_but.gif", "mr_krab_wipe.gif" ],
             winning_text: [ "Money money winner money!", "Biggie dollar win!" ]
          }
};

var loser = {
  loser_images: [ "donald_bye.gif",
                  "donald_fire.gif",
                  "donald_happy_shock.gif",
                  "hillary_disappointed.gif",
                  "hillary_horrified.gif" ],
  loser_text: [ "Oh my! Are you gonna quit?",
                "Such a loser!",
                "Great job, you are on the losing side",
                "Because of you, we are losing.",
                "You are such a nightmare" ]
};


// ------------- Response ---------------
// Set the click response
var setClickResponse = function ( event, currentElement ) {

  setPlayerClickResponse( event, currentElement );

};

// Set the player Response
var setPlayerClickResponse = function ( event, currentElement ) {
  var $element = $( currentElement );
  var isclick = $element.attr( "isclick" );

  if ( isclick === "true" ) {
    // Return false action
    console.log( "You've just reclicked it" );
    return;
  }

  playerAction( $element );
  computerAction();

};

// Do the player action
var playerAction = function ( currentElement ) {
  var $element = $( currentElement );

  // Set to notify already clicked
  $element.attr( "isclick", "true" );

  $element.css( {
    backgroundImage: "url( images/"+ playerCharacterImage + " )",
    backgroundSize: "cover"
  } );

  // Set to notify who clicked it
  $element.attr( "player", user );

  // Check for the winner
  showWinner();

};

// The computer action
var computerAction = function () {
  if ( hasWinner ) { return }
  var boxes = $( ".box" );
  var potentialBoxes = [];

  // Get the boxes which are not yet being clicked or selected
  for ( var i = 0; i < boxes.length; i++ ) {
    if ( boxes.eq( i ).attr( "isclick" ) === "false" ) {
      potentialBoxes.push( boxes.eq( i ) );
    }
  }

  // If there is some unclick boxes, then perform the computer action to select the box
  // Checking the available boxes not being clicked is just a fail safe action.
  if ( potentialBoxes.length > 0 ) {
    var luckyNumber = Math.floor( Math.random() * potentialBoxes.length );

    var $computerBox = $( potentialBoxes[ luckyNumber ] );

    // Set to notify already clicked
    $computerBox.attr( "isclick", "true" );

    // Set the image on the box to indicate the computer has already clicked
    $computerBox.css( {
      backgroundImage: "url( images/" + opponentCharacterImage + " )",
      backgroundSize: "cover"
    } );

    // Set to notify who clicked it
    $computerBox.attr( "player", opponent );

    // Change the current state of the user
    currentPlayer = user;

    // Check the winner
    showWinner();
  }
  else {
    // Well if no boxes left and no winner, this is for sure a DRAW!
    isDraw = true;
    showDraw();
  }

};

// ------------- Triggers ---------------

// Initialization
var init = function () {

  if ( characterSelected() ) {
    if ( currentPlayer === "" ) {
      currentPlayer = user;
    }
    else if ( currentPlayer === user ) {
      currentPlayer = opponent;
    }
    else {
      currentPlayer = user;
    }

    // Remove the event character selection
    $( ".character_box.user" ).off();

    // Get the character and set the avater
    playerCharacter = getSelectedCharacter();
    setPlayerAvatar();

    // Select the winning text and images
    selectRandomWinnerText();

    // Select the loser text and images
    selectRandomLoserText();

    // Set the click response
    setClickResponse( event, this );
  }
  else {
    // Alert to select character

    swal(
          'Player',
          'Please select your character',
          'warning'
        );
  }

};

// ------------- Evaluation ---------------

var checkCombination = function () {
  var $boxes = $( ".box" );

  var userCombination = ( $boxes.eq( 0 ).attr( "player" ) === user
                             && $boxes.eq( 1 ).attr( "player" ) === user
                             && $boxes.eq( 2 ).attr( "player" ) === user
                           )
                           || ( $boxes.eq( 3 ).attr( "player" ) === user
                                && $boxes.eq( 4 ).attr( "player" ) === user
                                && $boxes.eq( 5 ).attr( "player" ) === user
                              )
                           || ( $boxes.eq( 6 ).attr( "player" ) === user
                                && $boxes.eq( 7 ).attr( "player" ) === user
                                && $boxes.eq( 8 ).attr( "player" ) === user
                              )
                           || ( $boxes.eq( 0 ).attr( "player" ) === user
                                && $boxes.eq( 3 ).attr( "player" ) === user
                                && $boxes.eq( 6 ).attr( "player" ) === user
                              )
                           || ( $boxes.eq( 1 ).attr( "player" ) === user
                                && $boxes.eq( 4 ).attr( "player" ) === user
                                && $boxes.eq( 7 ).attr( "player" ) === user
                              )
                           || ( $boxes.eq( 2 ).attr( "player" ) === user
                                && $boxes.eq( 5 ).attr( "player" ) === user
                                && $boxes.eq( 8 ).attr( "player" ) === user
                              )
                           || ( $boxes.eq( 2 ).attr( "player" ) === user
                                && $boxes.eq( 4 ).attr( "player" ) === user
                                && $boxes.eq( 6 ).attr( "player" ) === user
                              )
                           || ( $boxes.eq( 0 ).attr( "player" ) === user
                                && $boxes.eq( 4 ).attr( "player" ) === user
                                && $boxes.eq( 8 ).attr( "player" ) === user
                              );

  var opponentCombination = ( $boxes.eq( 0 ).attr( "player" ) === opponent
                                && $boxes.eq( 1 ).attr( "player" ) === opponent
                                && $boxes.eq( 2 ).attr( "player" ) === opponent
                              )
                              || ( $boxes.eq( 3 ).attr( "player" ) === opponent
                                   && $boxes.eq( 4 ).attr( "player" ) === opponent
                                   && $boxes.eq( 5 ).attr( "player" ) === opponent
                                 )
                              || ( $boxes.eq( 6 ).attr( "player" ) === opponent
                                   && $boxes.eq( 7 ).attr( "player" ) === opponent
                                   && $boxes.eq( 8 ).attr( "player" ) === opponent
                                 )
                              || ( $boxes.eq( 0 ).attr( "player" ) === opponent
                                   && $boxes.eq( 3 ).attr( "player" ) === opponent
                                   && $boxes.eq( 6 ).attr( "player" ) === opponent
                                 )
                              || ( $boxes.eq( 1 ).attr( "player" ) === opponent
                                   && $boxes.eq( 4 ).attr( "player" ) === opponent
                                   && $boxes.eq( 7 ).attr( "player" ) === opponent
                                 )
                              || ( $boxes.eq( 2 ).attr( "player" ) === opponent
                                   && $boxes.eq( 5 ).attr( "player" ) === opponent
                                   && $boxes.eq( 8 ).attr( "player" ) === opponent
                                 )
                              || ( $boxes.eq( 2 ).attr( "player" ) === opponent
                                   && $boxes.eq( 4 ).attr( "player" ) === opponent
                                   && $boxes.eq( 6 ).attr( "player" ) === opponent
                                 )
                              || ( $boxes.eq( 0 ).attr( "player" ) === opponent
                                   && $boxes.eq( 4 ).attr( "player" ) === opponent
                                   && $boxes.eq( 8 ).attr( "player" ) === opponent
                                 );

  if ( userCombination ) {
    hasWinner = true;
    userScore++;
    winner = user;
    return winner;
  }
  else if ( opponentCombination ) {
    hasWinner = true;
    opponentScore++;
    winner = opponent;
    return winner;
  }

};

// Check for winner
var evaluateWinner = function () {
  var checkcomb = checkCombination();
  return checkcomb;
};

var showWinner = function () {
  // Evaluate the winner/result
  var msg = evaluateWinner();
  var imgDisplay = "";
  var msgDisplay = "";

  if ( hasWinner ) {
    $( ".box" ).off();

    if ( msg === user ) {
      imgDisplay = winnerImg;
      msgDisplay = winnerMessage;
    }
    else if ( msg === opponent ) {
      imgDisplay = loserImg;
      msgDisplay = loserMessage;
    }

    // Display that annoying billbord
    displayBillboard( imgDisplay, msgDisplay );
  }
};

// Show the draw message
var showDraw = function () {
  imgDisplay = "images/pineapple_house.jpg";

  // Display that annoying billboard
  displayBillboard( imgDisplay, "" );
};


// This is used to display the winning, losing and draw message
var displayBillboard = function ( imgDisplay, msgDisplay ) {
  $( "#showcase" ).attr( "src", imgDisplay );
  $( "#winner_msg" ).html( msgDisplay );

  if ( isDraw ) {
    $( "#winner_msg" ).html( "It's a draw!" );
  }

  $( "#billboard" ).fadeIn( 500 );

  $( "#billboard" ).on( "click", function() {
    $( this ).fadeOut( 500 );
    resetGame();
  } );
};


// ------------- Reset ---------------

var resetGame = function () {
  $( ".box" ).css( {
    backgroundImage: "none",
  });
  $( ".box" ).attr( "isclick", "false" );
  $( ".box" ).attr( "player", "" );

  // Lets show the winning counter
  $( "#userPlayer" ).html( "Win: " + userScore );
  $( "#opponentPlayer" ).html( "Win: " + opponentScore );
  hasWinner = false;
  isDraw = false;
  winner = "";

  $( ".box" ).on( "click", init );

};

// ------------- Select character -----------------

// Check if the character already selected
var characterSelected = function () {
  var selected = false;

  var userSelection = $( ".character_box.user" );
  var opponentSelection = $( ".character_box.opponent" );

  for ( var i = 0; i < userSelection.length; i++ ) {
    if ( userSelection.eq( i ).attr( "isselected" ) === "true" ) {
      selected = true;
      break;
    }
  }

  return selected;
};

// Get the selected character
var getSelectedCharacter = function () {
  var potentialCharacter = $( ".character_box.user" );
  var character = "";

  for ( var i = 0; i < potentialCharacter.length; i++ ) {
    if ( potentialCharacter.eq( i ).attr( "isselected" ) === "true" ) {
      character = potentialCharacter.eq( i ).attr( "id" );
    }
  }

  return character;
};

// Set the loser message
var selectRandomLoserText = function () {
  var loserImgTxtLength = loser.loser_images.length;
  var luckyLoser = Math.floor( Math.random() * loserImgTxtLength );

  loserImg = "images/" + loser.loser_images[ luckyLoser ];
  loserMessage = loser.loser_text[ luckyLoser ];

};

// Set the player's avatar
var setPlayerAvatar = function () {
  playerCharacterImage = avatar[ playerCharacter ];

};

// Set the winner message
var selectRandomWinnerText = function () {
  var winnerCharacter = characters[ playerCharacter ];
  var winnerImgTxtLength = winnerCharacter.winning_images.length;
  var luckyWinnerChoice = Math.floor( Math.random() * winnerImgTxtLength );

  winnerImg = "images/" + winnerCharacter.winning_images[ luckyWinnerChoice ];
  winnerMessage = winnerCharacter.winning_text[ luckyWinnerChoice ];

}


// ------------- Release the Kraken ---------------

// Set the event listener to the character box
$( ".character_box.user" ).on( "click", function () {

  if ( characterSelected() ) {
    $( ".character_box.user" ).attr( "isselected", "false" );
    $( ".character_box.user" ).css( "border", "0px" );
  }

  $( this ).attr( "isselected", "true" );
  $( this ).css({
    border: "2px solid rgba(81, 203, 238, 0.7)",
    borderRadius: "8px"
  });

});

// Set the event listener to the box
$( ".box" ).on( "click", init );
