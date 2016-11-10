console.log( "Tic tac toe" );

// $( "#board" ).parallax();

const user = "User";
const opponent = "Opponent";

var currentPlayer = "";
var winner = "";
var userScore = 0;
var opponentScore = 0;
var hasWinner = false;
var isDraw = false;

// TODO: create functionality to choose character
// TODO: create arrays of winning image display and text display (consider object)
// TODO: if time allows, create another AI

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

var playerAction = function ( currentElement ) {
  var $element = $( currentElement );

  // Set to notify already clicked
  $element.attr( "isclick", "true" );

  $element.css( {
    backgroundImage: "url( images/patrick.jpg )",
    backgroundSize: "cover"
  } );

  // Set to notify who clicked it
  $element.attr( "player", user );

  showWinner();

};

var computerAction = function () {
  if ( hasWinner ) { return }
  var boxes = $( ".box" );
  var potentialBoxes = [];

  for ( var i = 0; i < boxes.length; i++ ) {
    if ( boxes.eq( i ).attr( "isclick" ) === "false" ) {
      potentialBoxes.push( boxes.eq( i ) );
    }
  }

  if ( potentialBoxes.length > 0 ) {
    var luckyNumber = Math.floor( Math.random() * potentialBoxes.length );

    var $computerBox = $( potentialBoxes[ luckyNumber ] );

    // Set to notify already clicked
    $computerBox.attr( "isclick", "true" );

    $computerBox.css( {
      backgroundImage: "url( images/spongebob.png )",
      backgroundSize: "cover"
    } );

    // Set to notify who clicked it
    $computerBox.attr( "player", opponent );

    currentPlayer = user;

    showWinner();
  }
  else {
    isDraw = true;
    showDraw();
  }

};

// ------------- Triggers ---------------

var init = function () {
  if ( currentPlayer === "" ) {
    currentPlayer = user;
  }
  else if ( currentPlayer === user ) {
    currentPlayer = opponent;
  }
  else {
    currentPlayer = user;
  }

  setClickResponse( event, this );

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

  if ( hasWinner ) {
    $( ".box" ).off();

    if ( msg === user ) {
      imgDisplay = "images/patrick_happy.gif";
    }
    else if ( msg === opponent ) {
      imgDisplay = "images/spongebob_win.gif";
    }

    // Display that annoying billbord
    displayBillboard( imgDisplay );
  }
};

var showDraw = function () {
  imgDisplay = "images/pineapple_house.jpg";

  // Display that annoying billboard
  displayBillboard( imgDisplay );
};

var displayBillboard = function ( imgDisplay ) {
  $( "#showcase" ).attr( "src", imgDisplay );
  $( "#winner_msg" ).html( winner + " win!" );

  if ( isDraw ) {
    $( "#winner_msg" ).html( "It's a draw!" );
  }
  $( "#billboard" ).fadeIn( 500 );

  $( "#billboard" ).on( "click", function() {
    $( this ).fadeOut( 500 );
    resetGame();
  } );
};

var winnerImage = function () {

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
var characterSelected = function () {
  var selected = false;

  var userSelection = $( ".character_box.user" );
  var opponentSelection = $( ".character_box.opponent" );

  

  return selected;
}


// ------------- Release the Kraken ---------------

// Set the event listener to the box
characterSelected();
$( ".box" ).on( "click", init );
