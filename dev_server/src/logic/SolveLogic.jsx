import levenshteinDistance from './LevenshteinDistance.jsx';

function getSimpleSynonyms(s) {
  var res = s.toLowerCase();
  res = s.replace(/è/g, "e")
  res = s.replace(/é/g, "e")
  res = s.replace(/ê/g, "e")
  res = s.replace(/à/g, "a")
  res = s.replace(/á/g, "a")
  res = s.replace(/â/g, "a")
  res = s.replace(/ì/g, "i")
  res = s.replace(/í/g, "i")
  res = s.replace(/î/g, "i")
  res = s.replace(/ù/g, "u")
  res = s.replace(/ú/g, "u")
  res = s.replace(/û/g, "u")
  res = s.replace(/ò/g, "o")
  res = s.replace(/ó/g, "o")
  res = s.replace(/ô/g, "o")
  const lower = res.toLowerCase().replace(/[^A-Za-z0-9äüöß]/g, "")
  res = s.replace(/ä/g, "ae")
  res = s.replace(/ü/g, "ue")
  res = s.replace(/ö/g, "oe")
  res = s.replace(/[^A-Za-z0-9ß]/g, "")
  return [res, lower]
}

/*
    Synnonyms explained in synnonyms.md
   */
function getSynonyms(s) {
  var alphaNum = s.replace(/[A-Z]/g, "");
  return getSimpleSynonyms(s);
}

function toTAElement(s) {
  //TODO function that determines if a word has to be solved
  var mbs = true;
  var synn = getSynonyms(s)
  return {
    word: s,
    synnonyms: synn,
    length: s.length,
    mustBeSolved: mbs,
    hasBeenSolved: !mbs
  };
}

/*
  taArray is a copy of the current titleElementArray/artistElementArray state from the GameLogic.
  This function will alter the copy of the state and return the new state.
 */
function checkInput(input, taArray) {
  console.log("SL checking input: ", input)
  const inputWords = input.split(" ");
  var d = 0;
  var allowedTypos = 0;
  //multiple changes during loop
  //flags to recognize if state has to be updated
  var ta_s = false;

  for (var i in inputWords) {
    for (var ta_i in taArray) {
      var ta = taArray[ta_i];
      if (ta.mustBeSolved && !ta.hasBeenSolved) {
        if (ta.length > 3) {
          allowedTypos = Math.floor((ta.length - 1) / 3);
        } else {
          allowedTypos = 0;
        }

        d = levenshteinDistance(inputWords[i], ta.word);
        if (d - allowedTypos <= 0) {
          //Success changes
          console.log("Solved ", ta.word, "with ", inputWords[i], " distance", d, " at", allowedTypos);
          ta.hasBeenSolved = true;
          ta_s = true;
          continue;
        }
        for (var s_i in ta.synnonyms) {
          var s = ta.synnonyms[s_i];
          if (s.length > 3) {
            allowedTypos = Math.floor((s.length - 1) / 3);
          } else {
            allowedTypos = 0;
          }

          d = levenshteinDistance(inputWords[i], s);
          if (d - allowedTypos <= 0) {
            //Success changes
            console.log("Solved ", s, "with ", inputWords[i], " distance", d, " at", allowedTypos);
            ta.hasBeenSolved = true;
            ta_s = true;
            break;
          }
        }
      }
    }
  }
  return [ta_s, taArray];
}

function checkIfSolved(taArray) {
  return taArray.filter(function(ta) {
    return ta.mustBeSolved
  }).reduce(function(acc, ta) {
    return acc && ta.hasBeenSolved;
  }, true);
}

export { toTAElement, checkInput, checkIfSolved }
