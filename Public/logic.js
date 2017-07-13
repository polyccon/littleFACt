

(function() {
  var to = document.getElementById("from-to")[1].value;

  var array = to.toLowerCase().split(" ");
  var arr = array.map(function(x) {
    return x.slice(0, 1).toUpperCase() + x.slice(1);
  });
  var destString = arr.join("%20");

  if (destString === "Angel" || destString === "Bank" || destString === "Borough" || destString == "Barbican" || destString === "Monument" || destString === "Oval" || destString === "Wimbledon" || destString === "Temple") {
    destString = destString + ",%20London";
  }
  var wikiURL = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=" + destString;

  function wikiExtract() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {

        var data = JSON.parse(xhr.responseText);
        var keys = Object.keys(data.query.pages);
        var destinationDrop = document.getElementById("destination");
        var destinationName = data.query.pages[keys[0]].title;
        destinationDrop.textContent = destinationName;

        var extractDrop = document.getElementById("destination-extract");
        var extr = data.query.pages[keys[0]].extract.replace(/(&nbsp;|<([^>]+)>)/ig, "");
        extractDrop.textContent = extr;

        if (extr.length < 50) {
          destString = arr.join("%20") + ",%20London";
          wikiURL = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=" + destString;
          wikiExtract();
          console.log(destinationName);
          console.log(data);
          if (extr === "") {
            extractDrop.textContent = "Sorry! " + destinationName + " doesn't seem to have a wikipedia page yet, why don't you make one yourself?"
          }
        }

      }
    }

    xhr.open("GET", wikiURL, true);
    xhr.send();
  }
  wikiExtract();
})();



function tflAPI(from, to, callback) {
  var TFL_API = "https://api.tfl.gov.uk/journey/journeyresults/"
  var TFL_key = "?app_id=11944170&app_key=b5950c6792c4a2e09bb2331e499ff205"
  var url = TFL_API + from + "/to/" + to + TFL_key;
  console.log(url);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    console.log("readystate", xhr.readyState);
    console.log("status", xhr.status);
    if (xhr.readyState == 4 && xhr.status == 300) {
      var responseObj = JSON.parse(xhr.responseText);
      console.log(responseObj);
      var newFrom = responseObj.fromLocationDisambiguation.disambiguationOptions[0].place.icsCode;
      console.log(newFrom);
      var newTo = responseObj.toLocationDisambiguation.disambiguationOptions[0].place.icsCode;
      console.log(newTo);
      //GRAB ICS CODE AND PASS ONTO RENDER
      tflAPI(newFrom, newTo, callback);
    }

    if (xhr.readyState == 4 && xhr.status == 200) {
      var responseObj200 = JSON.parse(xhr.responseText);
      console.log(responseObj200);
      callback(responseObj200);
    }
  }
  xhr.open("GET", url, true);
  xhr.send();
};




if (typeof module !== 'undefined') {
  module.exports = tflAPI;
  module.exports = wikiExtract;
}
