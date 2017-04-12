## Solving a Song

1. Get title string (T) and artist (A) from Server

2. Split T and A into word array (split by " ")

   // AND ",/./-") => "/( |,|.|-|_)/" => do that for the synonyms

3. Expand T and A to array of object containing

   1. The word
   2. Array of synnonyms (lowercase word, and = "&", five = "5", occurence of ê/è etc. replace by e, "./,/_/-")
      1. Guarante that the array includes the word without ending/starting special characters => this word shall be used for the length
   3. The Length
   4. *Boolean if the word has to be solved* - "-/,/." doesn't
   5. *Boolean if the word has been solved*

4. Build T and A of array by looping though array and taking either the word or build hidden string using the length and the hidden character

5. On user input:

   1. Get input words by splitting the input on " "
   2. For each word in the input, loop through T and A array
      1. If the input matches a T/A word (the synonyms) with some error (0 for length <= 3) set boolean to true
   3. If a word has been solved, send positive feedback => negative otherwise
   4. Build new Label String and check if all elements of T/A array have been solved => send solved T/A to server  