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

//Todo build function that builds a list of synnonyms for a word
function getSynnonyms(s) {
    return [];
}

function toTAElement(s) {
    // TODO function that determines if a word has to be solved.
    mbs = true;
    return {
	word: s,
	synnonyms: getSynnonyms(s),
	length: s.length,
	mustBeSolved: mbs,
	hasBeenSolved: false
    };
}

function buildLabelString(taArray) {
    var wordArray = taArray.map(
	function(ta) {
	    return ta.word
	}
    );
    return wordArray.join(" ");
}

function checkIfSolved(taArray) {
    return taArray.filter(
	function(ta) {
	    return (ta.mustBeSolved == true)
	}
    ).reduce(
	function(acc, ta) {
	    return (acc && ta.hasBeenSolved);
	}, true
    );
}

/**
 * See Wikipedia. Best suited for or game => we need all 3 kinds of errors.
*/
function levenshteinDistance(s, t) {
    var cost;
    if (s.length == 0) { return t.length; }
    if (t.length == 0) { return s.length; }

    if (s[s.length -1] == t[t.length -1]) { cost = 0; }
    else { cost = 1; }

    var new_s = s.slice(0, -1);
    var new_t = t.slice(0, -1);
    
    return Math.min( levenshteinDistance(new_s, t) + 1,
		     levenshteinDistance(s, new_t) + 1,
		     levenshteinDistance(new_s, new_t) + cost
		   );
}

var title = "Plastic, Beach"
var synonyms = title.split(/[ ,]+/g)
console.log(synonyms);
console.log(levenshteinDistance("hallo", "world"))
console.log(levenshteinDistance("0", "1"))

s = toTAElement("-")
s.mustBeSolved = false
ar = [toTAElement("gre"), s, toTAElement("dsfgljkn")]
ar[0].hasBeenSolved = true
ar[2].hasBeenSolved = true
