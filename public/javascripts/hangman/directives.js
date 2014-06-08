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
        // Create a collection to iterate over within the view based on theWord
        var wordCollection = [];
        var wordArray = scope.theWord.split('');
        for(var i = 0; i < scope.theWord.length; ++i) {
          wordCollection.push({
            letter: wordArray[i],
            position: i,
            display: false
          });
        }
        scope.word = wordCollection;
        
        scope.makeGuess = function() {
          // Look for the letter within our wordCollection and toggle display flag.
          var matches = $filter('filter')(wordCollection, {letter: scope.guess});
          if (matches.length) {
            angular.forEach(matches, function(char, index) {
              char.display = true;
            });
          }
        }
      }
    }
  }]);