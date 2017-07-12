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
        console.log(destinationName);
      }
    }

    xhr.open("GET", wikiURL, true);
    xhr.send();
  }
  wikiExtract();
})();
