'use strict';

angular.module('hm.directives', []).
  directive('hmGuessOptions', ['$filter', function($filter) {
    return {
      restrict: 'E',
      scope: {
        theWord: '=word'
      },
      templateUrl: '/partials/hangman/guessDisplay.html',
      link: function(scope, element, attrs) {
        // Keep track failed guesses
        scope.errors = [];
        
        // Keep track of the letters used to guess
        scope.lettersGuessed = [];

        setupWord();
        
        /**
         * Process the users guess, making visible the guess if we have matches.
         */
        scope.makeGuess = function() {
          // See if user already made a guess with this letter and not penalize them.
          if ($filter('filter')(scope.lettersGuessed, {$: scope.guess}).length) {
            // Todo: Setup warning.
          } else {
            // Look for the letter within our wordCollection and toggle display flag.
            var matches = $filter('filter')(scope.word, {letter: scope.guess});
            if (matches.length) {
              angular.forEach(matches, function(char, index) {
                char.display = true;
              });
            } else {
              scope.errors.push(scope.guess);
            }
          
            // Add the latest guess to the list.
            scope.lettersGuessed.push(scope.guess);

            // Clear out the guess to allow for more guessing.
            scope.guess = '';
          }
        }
        
        /**
         * Helper function to determine if we've correctly guessed the word or need
         * to keep guessing.
         */
        scope.canGuess = function() {
          var lettersFound = $filter('filter')(scope.word, {display: true});
          
          // If we've errored out or solved, no more guessing allowed.
          if ((scope.errors.length >= 3) || (scope.theWord.length == lettersFound.length)) {
            return false;
          }
          
          return true;
        }
        
        scope.dictionary = [
          'scrabble',
          'love',
          'apple',
          'watergate',
          'foobar'
        ];
  
        scope.reset = function() {
          scope.theWord = scope.dictionary[getRandomInt(0,4)];
          scope.errors = [];
          scope.lettersGuessed = [];
          setupWord();
        }
  
        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
      
        // Create a collection to iterate over within the view based on theWord
        function setupWord() {
          var wordCollection = [];
          var wordArray = scope.theWord.split('');
          for(var i = 0; i < scope.theWord.length; ++i) {
            wordCollection.push({
              letter: wordArray[i],
              display: false
            });
          }
          scope.word = wordCollection;          
        }
      }
    }
  }]);