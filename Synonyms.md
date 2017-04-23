### Synonyms

- Number of synonyms exponential to special characters
  - E.g. (fèat.
    - feat
    - feat.
    - fèat
    - fèat.
    - (feat
    - (feat.
    - (fèat
    - (fèat.
- Special characters (s)
  - äüöÄÜÖ
  - éèê, âàá, ...
  - *Uppercase letter => removed by lowercasing input + solution words*
- Illegal characters (i)
  - .,;:
  - (){}[]
  - -_/\
- Equivalent words
  - & == and
  - 5 == five

##### Simple solution:

Results in single (simplified) word (+ equivalences)

1. Lowercase word
2. Replace special characters
3. Remove illegal characters

##### Complex Solution:

Results in max. 2^(# of s/i characters)

1. Count number of s/i characters.

2. If number too high return to simple solution

3. Recursively build a list of all possibilities:

   function buildSynonymlist(w, c, #si) {

   ​	if (c == #si) { return w; }

   ​	w_ = replace/remove s/i character;

   ​	return buildSynonymlist(w, c+1, #si) + buildSynonymlist(w_, c+1, #si)

   }