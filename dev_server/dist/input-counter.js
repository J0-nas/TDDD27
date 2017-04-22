 function startProgressBar() {
     var d = document.getElementById("progress");
     d.className += "filling-bar";
     d.style.width = "100%"
     d.style.background = "lightcoral";

     var t = document.getElementById("timer");
     t.className += "filling-text";
     t.style.color = "lightcoral";
 }

 var count = 30;
 var counter = setInterval(timer, 1000); //1000 will  run it every 1 second

 function timer() {
     count = count - 1;
     if (count <= 0) {
         clearInterval(counter);
         document.getElementById("timer").innerHTML = "0";
         return;
     }

     document.getElementById("timer").innerHTML = count;
 }
