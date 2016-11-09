console.log( "Tic tac toe" );

const player1 = "Player1";
const player2 = "Player2";

var currentPlayer = "";
var player1Score = 0;
var player2Score = 0;
var hasWinner = false;

// Set the click response
var setClickResponse = function ( event, currentElement ) {

  var currentId = $( this ).attr( "id" );
  var isclick = $( this ).attr( "isclick" );

  setPlayerClickResponse( event, currentElement );

  console.log( "This was being clicked", currentElement );
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

  if ( currentPlayer === player1 ) {

    // Set to notify already clicked
    $element.attr( "isclick", "true" );

    $( currentElement ).css( {
      backgroundImage: "url( images/patrick.jpg )",
      backgroundSize: "cover"
    } );

    // Set to notify who clicked it
    $element.attr( "player", player1 );

    computerAction();
  }
  else {

    // Set to notify already clicked
    $element.attr( "isclick", "true" );

    $element.css( {
      backgroundImage: "url( images/spongebob.png )",
      backgroundSize: "cover"
    } );

    // Set to notify who clicked it
    $element.attr( "player", player2 );

  }

  // Evaluate the winner/result
  console.log( evaluateWinner() );
  var msg = evaluateWinner();

  if ( evaluateWinner().length > 0 ) {
    $( ".box" ).unbind();
  }

};

// Create the element for the image
var createElementImage = function ( event, source, description, title ) {
  var img = document.createElement( "img" );

  img.setAttribute( "src", source );
  img.setAttribute( "alt", description );
  img.setAttribute( "title", title );
  img.setAttribute( "width", "100px" );
  img.setAttribute( "height", "100px" );

  return img;
};

var init = function () {
  if ( currentPlayer === "" ) {
    currentPlayer = player1;
  }
  else if ( currentPlayer === player1 ) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }

  setClickResponse( event, this );

};

// Check for winner
var evaluateWinner = function () {
  return checkComb1()
         || checkComb2()
         || checkComb3()
         || checkComb4()
         || checkComb5()
         || checkComb6()
         || checkComb7()
         || checkComb8();
};

var checkComb1 = function () {
  var $boxes = $( ".box" );

  var player1Combination = $boxes.eq( 0 ).attr( "player" ) === player1
                           && $boxes.eq( 1 ).attr( "player" ) === player1
                           && $boxes.eq( 2 ).attr( "player" ) === player1;

  var player2Combination = $boxes.eq( 0 ).attr( "player" ) === player2
                           && $boxes.eq( 1 ).attr( "player" ) === player2
                           && $boxes.eq( 2 ).attr( "player" ) === player2;

  if ( player1Combination ) {
    return "Player 1 win!";
  }
  else if ( player2Combination ) {
    return "Player 2 win!";
  }

}

var checkComb2 = function () {
  var $boxes = $( ".box" );

  var player1Combination = $boxes.eq( 3 ).attr( "player" ) === player1
                           && $boxes.eq( 4 ).attr( "player" ) === player1
                           && $boxes.eq( 5 ).attr( "player" ) === player1;

  var player2Combination = $boxes.eq( 3 ).attr( "player" ) === player2
                           && $boxes.eq( 4 ).attr( "player" ) === player2
                           && $boxes.eq( 5 ).attr( "player" ) === player2;

  if ( player1Combination ) {
    return "Player 1 win!";
  }
  else if ( player2Combination ) {
    return "Player 2 win!";
  }

}

var checkComb3 = function () {
  var $boxes = $( ".box" );

  var player1Combination = $boxes.eq( 6 ).attr( "player" ) === player1
                           && $boxes.eq( 7 ).attr( "player" ) === player1
                           && $boxes.eq( 8 ).attr( "player" ) === player1;

  var player2Combination = $boxes.eq( 6 ).attr( "player" ) === player2
                           && $boxes.eq( 7 ).attr( "player" ) === player2
                           && $boxes.eq( 8 ).attr( "player" ) === player2;

  if ( player1Combination ) {
    return "Player 1 win!";
  }
  else if ( player2Combination ) {
    return "Player 2 win!";
  }

}

var checkComb4 = function () {
  var $boxes = $( ".box" );

  var player1Combination = $boxes.eq( 0 ).attr( "player" ) === player1
                           && $boxes.eq( 3 ).attr( "player" ) === player1
                           && $boxes.eq( 6 ).attr( "player" ) === player1;

  var player2Combination = $boxes.eq( 0 ).attr( "player" ) === player2
                           && $boxes.eq( 3 ).attr( "player" ) === player2
                           && $boxes.eq( 6 ).attr( "player" ) === player2;

  if ( player1Combination ) {
    return "Player 1 win!";
  }
  else if ( player2Combination ) {
    return "Player 2 win!";
  }

}
var checkComb5 = function () {
  var $boxes = $( ".box" );

  var player1Combination = $boxes.eq( 1 ).attr( "player" ) === player1
                           && $boxes.eq( 4 ).attr( "player" ) === player1
                           && $boxes.eq( 7 ).attr( "player" ) === player1;

  var player2Combination = $boxes.eq( 1 ).attr( "player" ) === player2
                           && $boxes.eq( 4 ).attr( "player" ) === player2
                           && $boxes.eq( 7 ).attr( "player" ) === player2;

  if ( player1Combination ) {
    return "Player 1 win!";
  }
  else if ( player2Combination ) {
    return "Player 2 win!";
  }

};

var checkComb6 = function () {
  var $boxes = $( ".box" );

  var player1Combination = $boxes.eq( 2 ).attr( "player" ) === player1
                           && $boxes.eq( 5 ).attr( "player" ) === player1
                           && $boxes.eq( 8 ).attr( "player" ) === player1;

  var player2Combination = $boxes.eq( 2 ).attr( "player" ) === player2
                           && $boxes.eq( 5 ).attr( "player" ) === player2
                           && $boxes.eq( 8 ).attr( "player" ) === player2;

  if ( player1Combination ) {
    return "Player 1 win!";
  }
  else if ( player2Combination ) {
    return "Player 2 win!";
  }

};

// Diagonal checking
var checkComb7 = function () {
  var $boxes = $( ".box" );

  var player1Combination = $boxes.eq( 2 ).attr( "player" ) === player1
                           && $boxes.eq( 4 ).attr( "player" ) === player1
                           && $boxes.eq( 6 ).attr( "player" ) === player1;

  var player2Combination = $boxes.eq( 2 ).attr( "player" ) === player2
                           && $boxes.eq( 4 ).attr( "player" ) === player2
                           && $boxes.eq( 6 ).attr( "player" ) === player2;

  if ( player1Combination ) {
    return "Player 1 win!";
  }
  else if ( player2Combination ) {
    return "Player 2 win!";
  }

};

// Diagonal checking
var checkComb8 = function () {
  var $boxes = $( ".box" );

  var player1Combination = $boxes.eq( 0 ).attr( "player" ) === player1
                           && $boxes.eq( 4 ).attr( "player" ) === player1
                           && $boxes.eq( 8 ).attr( "player" ) === player1;

  var player2Combination = $boxes.eq( 0 ).attr( "player" ) === player2
                           && $boxes.eq( 4 ).attr( "player" ) === player2
                           && $boxes.eq( 8 ).attr( "player" ) === player2;

  if ( player1Combination ) {
    return "Player 1 win!";
  }
  else if ( player2Combination ) {
    return "Player 2 win!";
  }

};

 var computerAction = function () {
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

    //  var $computerMove = $( computerAction() );

     // Set to notify already clicked
     $computerBox.attr( "isclick", "true" );

     $computerBox.css( {
       backgroundImage: "url( images/spongebob.png )",
       backgroundSize: "cover"
     } );

     // Set to notify who clicked it
     $computerBox.attr( "player", player2 );

     currentPlayer = player2;

   }


   return null;

 }


// Set the event listener to the box
$( ".box" ).on( "click", init );
