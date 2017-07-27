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
    var extraD = {
      tflURL: 'whatever'
    };
    httpRequest(tflURL(from, to), tflAPI, 300, extraD);

    var wikiurl = createwikiUrl(inputTo);
    var extraData = {
      wikiURL: wikiurl
    };
    httpRequest(wikiurl, wikiExtract, 200, extraData);



  })

})()

function domelse(string) {

  var durnode = document.getElementById('duration');
  durnode.innerHTML = "";
  var newdur = document.createElement('holla');
  newdur.textContent = string;
  durnode.appendChild(newdur);

  document.getElementById('tfl-results').style.display = 'none';

  document.getElementById('fun-fact').style.display = 'none';
}

function domtflFunction(duration, legs) {

  document.getElementById('duration').textContent = duration;
  document.getElementById('tfl-results').style.display = 'block';

  var lineLeg = legs;
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
