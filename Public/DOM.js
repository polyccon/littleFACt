(function() {

  document.getElementById("from-to").addEventListener("submit", function(event) {
    event.preventDefault();
    var from = document.getElementById("from-to")[0].value
    var inputTo = document.getElementById("from-to")[1].value
    var to = document.getElementById("from-to")[1].value;

    if (from.indexOf('station') === -1) {
      from += "station";
    }
    if (to.indexOf('station') === -1) {
      to += "station";
    }
    httpRequest(tflURL(from, to), tflAPI)

    var wikiURL = createwikiUrl(inputTo);
    httpRequest(wikiURL, wikiExtract);
  })

})()


function domtflFunction(resultsToShow) {

  document.getElementById('duration').textContent = resultsToShow.journeys[0].duration;
  document.getElementById('tfl-results').style.display = 'block';

  var lineLeg = resultsToShow.journeys[0].legs;
  var linesNode = document.getElementById('lines');
  linesNode.innerHTML = "";
  lineLeg.forEach(function(line) {
    var newline = document.createElement('p');
    newline.textContent = line.routeOptions[0].name;
    linesNode.appendChild(newline);
  })
}



function domwikiFunction(destinationName, extr) {
  var destinationDrop = document.getElementById("destination");
  destinationDrop.textContent = destinationName;

  var extractDrop = document.getElementById("destination-extract");
  extractDrop.textContent = extr;
  document.getElementById('fun-fact').style.display = 'block';
}
