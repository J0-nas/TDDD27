// Checks if words from the input match words of the solution.
// Returns indexes of words that were solved
function processInput(solutionArray, input) {
  var inputWords = input.split(" ")
  var res = []
  for (word in inputWords) {
    for (var i = 0; i < solutionArray.length(); i++) {
      if (solutionArray[i] == word) {
        res.append(i)
      }
    }
  }
}

var title = "Plastic, Beach"
var synonyms = title.split(/[ ,]+/g)
console.log(sA);
