// Checks if words from the input match words of the solution -
// stored in the taArray of taElements.
// Returns the altered taArray
function processInput(taArray, input) {
    var inputWords = input.split(" ");
    var d = 0;
    var allowedTypos = 0;
    var s = false;
    
    for (i in inputWords) {
	for (ta_i in taArray) {
	    var ta = taArray[ta_i]
	    if (ta.mustBeSolved && !ta.hasBeenSolved) {
		if (ta.length > 3) { allowedTypos = Math.floor((ta.length-1) / 3);}
		else { allowedTypos = 0; }

		d = levenshteinDistance(inputWords[i], ta.word)
		console.log("word ", ta.word, "d ", d, " typos ", allowedTypos);
		if (d-allowedTypos <= 0) { ta.hasBeenSolved = true; s = true;
					   console.log(inputWords[i], " solved ", ta.word, " with d ", d);
					   break;
					 }

		for (synnonym in ta.synnonyms) {
		    if (s.length > 3) { allowedTypos = Math.floor((s.length-1) / 3);}
		    else { allowedTypos = 0; }

		    d = levenshteinDistance(inputWords[i], s)
		    if (d-allowedTypos <= 0) { ta.hasBeenSolved = true; s = true
					       console.log(inputWords[i], " solved ", synnonym, " with d ", d);
					       break;
					     }
		}
	    }
	    	    
	}
    }
    
    
    return { array: taArray, success: s }; 
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
	    if ((!ta.mustBeSolved) || ta.hasBeenSolved) {
		return ta.word;
	    }
	    return "*".repeat(ta.length);
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
//ar[2].hasBeenSolved = true

var player = document.getElementById("player");
if (player != null) {
    //player.autoplay = true;
} else {
    console.log("player is null")
}


var audio = new Audio("http://listen.vo.llnwd.net/g3/4/1/9/1/5/1302051914.mp3")
audio.play();
audio.volume = 0.5;
audio.currentTime = 10;

console.log(document.getElementById("pb"))

audio.addEventListener("timeupdate", function() {
    pb = document.getElementById("pb");
    var newValue = this.currentTime/this.duration
    pb.setAttribute("aria-valuenow", newValue);
    pb.style.width =  newValue*100 + "%";
});
