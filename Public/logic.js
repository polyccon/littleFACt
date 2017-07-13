// var api = {}
//
//
//
//
//
//
//
//
//
// if (typeof module !== 'undefined') {
//   module.exports = api;
// }

(function() {
  var destString = "Bethnal%20Green";
  var wikiURL = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=" + destString;

  function wikiExtract() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {

        var data = JSON.parse(xhr.responseText);
        var keys = Object.keys(data.query.pages);
        var key = Number(keys[0]);
        console.log(key);
        var destinationDrop = document.getElementById("destination");
        var destinationName = data.query.pages;
        destinationDrop.textContent = destinationName;

        var extractDrop = document.getElementById("destination-extract");
        var extract = data.extract;
        extractDrop.textContent = extract;
        // var name = data.name;
        // nameDrop.textContent = name;

      }
    }

    xhr.open("GET", wikiURL, true);
    xhr.send();
  }
  wikiExtract();
})();




function tflAPI(from, to ,callback ) {
  var TFL_API = "https://api.tfl.gov.uk/journey/journeyresults/"
   var TFL_key = "?app_id=11944170&app_key=b5950c6792c4a2e09bb2331e499ff205"
  var url = TFL_API + from + "/to/" + to + TFL_key ;
  console.log(url);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
console.log("readystate", xhr.readyState);
console.log("status", xhr.status);
    if (xhr.readyState == 4 && xhr.status == 300) {
      var responseObj = JSON.parse(xhr.responseText);
      console.log(responseObj);
      var newFrom = responseObj.fromLocationDisambiguation.disambiguationOptions[0].place.icsCode;
      console.log(newFrom) ;
      var newTo = responseObj.toLocationDisambiguation.disambiguationOptions[0].place.icsCode;
      console.log(newTo);
      //GRAB ICS CODE AND PASS ONTO RENDER
      tflAPI(newFrom,newTo,callback);
    }

    if (xhr.readyState == 4 && xhr.status == 200) {
      var responseObj200 = JSON.parse(xhr.responseText);
      console.log(responseObj200);
      callback (responseObj200);
    }
  }
  xhr.open("GET", url, true);
  xhr.send();
};

//api call 2 : hAnd show this weekourneyresults/1000266/to/1000013?app_id=11944170&app_key=b5950c6792c4a2e09bb2331e499ff205
// function renderTFL (responseObj) {
//   console.log (responseObj);
//   var journeyTime = journeys[0].duration ;
//   document.getElementById("destination-extract").textconent
// }








if (typeof module !== 'undefined') {
  module.exports = tflAPI;
}

// westminsterstation/to/bankstation?app_id={{11944170}}&app_key={{b5950c6792c4a2e09bb2331e499ff205}}
