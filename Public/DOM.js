

(function( ){

  document.getElementById("from-to").addEventListener("submit",function(event) {
    event.preventDefault();
    var from =document.getElementById("from-to")[0].value
    var inputTo =  document.getElementById("from-to")[1].value
    var to = document.getElementById("from-to")[1].value ;

    if (from.indexOf('station') === -1 ) {
      from += "station" ;
    }
    if (to.indexOf('station') === -1 ) {
       to += "station" ;
    }
    // if (inputTo.indexOf('station') !== -1 ) {
    //    inputTo.replace(' station', "");
    // }
    // console.log(inputTo);
    tflAPI(from,to, function (resultsToShow) {


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

  wikiApi(inputTo);
  })








})()
