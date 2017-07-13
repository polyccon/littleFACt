

(function( ){

  document.getElementById("from-to").addEventListener("submit",function(event) {
    event.preventDefault();
    var from = document.getElementById("from-to")[0].value ;
    console.log("cadf", from);
    var to = document.getElementById("from-to")[1].value ;

    tflAPI(from,to, function (resultsToShow) {

console.log(resultsToShow);
       document.getElementById('duration').textContent = resultsToShow.journeys[0].duration;

var lineLeg = resultsToShow.journeys[0].legs;
console.log(lineLeg);
 lineLeg.forEach(function(line){
   console.log(line.routeOptions[0].name);
  var newline = document.createElement('p');
  newline.textContent = line.routeOptions[0].name ;
  document.getElementById("lines").appendChild(newline);

 })

    } )

  })








})()
