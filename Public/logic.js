function destStr(string) {
  var array = string.toLowerCase().split(" ");
  var arr = array.map(function(x) {
    return x.slice(0, 1).toUpperCase() + x.slice(1);
  });
  var str = arr.join("%20");
  if (str === "Angel" || str === "Bank" || str === "Borough" || str == "Barbican" || str === "Monument" || str === "Oval" || str === "Wimbledon" || str === "Temple") {
    str = str + ",%20London";
  }
  return str;
}


function wikiApi(inputTo) {

  var destString = destStr(inputTo);
  var wikiURL = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=" + destString;

  function wikiExtract() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {

        var data = JSON.parse(xhr.responseText);
        var keys = Object.keys(data.query.pages);
        var destinationName = data.query.pages[keys[0]].title;

        var destinationDrop = document.getElementById("destination");


        destinationDrop.textContent = destinationName;

        var extractDrop = document.getElementById("destination-extract");
        var extr = data.query.pages[keys[0]].extract.replace(/(&nbsp;|<([^>]+)>)/ig, "");
        extractDrop.textContent = extr;

        if (extr.length < 50) {
          destString = destString + ",%20London";
          wikiURL = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=" + destString;
          wikiExtract();
          console.log(destinationName);
          console.log(data);
          if (extr === "") {
            extractDrop.textContent = "Sorry! " + destinationName + " doesn't seem to have a wikipedia page yet, why don't you make one yourself?"
          }
        }
      }
      document.getElementById('fun-fact').style.display = 'block';
    }

    xhr.open("GET", wikiURL, true);
    xhr.send();
  }
  wikiExtract();
};


/*function to build TFL Api URL*/
function tflURL(from, to) {
  var TFL_API = "https://api.tfl.gov.uk/journey/journeyresults/"
  var TFL_key = "?app_id=11944170&app_key=b5950c6792c4a2e09bb2331e499ff205"
  var url = TFL_API + from + "/to/" + to + TFL_key;
  console.log(url);
  return url;
}





function tflAPI(url, callback) {
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
      tflAPI(tflURL(newFrom, newTo), callback);
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

//
// /* Parellel function */
//
// function parallel(tasks, callback) {
//   // new code goes in this function here!
//   var results = [];
//   var count = 0;
//   tasks.forEach(function(task, index) {
//     task(function(err, result) {
//       // if there's an error, call THE callback
//       if (err) {
//         callback(err, null);
//         return;
//       }
//       // push results to results array and increment counter. uses index to push results in the right order
//       results[index] = result;
//       count++;
//       // if all tasks have completed, call THE callback
//       if (count === tasks.length) {
//         callback(undefined, results);
//       }
//     })
//   })
// }
// parallel([
//   function(callback) {
//     setTimeout(function() {
//       callback(undefined, 1);
//     }, 2000);
//   },
//   function(callback) {
//     setTimeout(function() {
//       callback(undefined, 2);
//     }, 1000);
//   },
//   function(callback) {
//     setTimeout(function() {
//       callback(undefined, 3);
//     }, 1500);
//   },
//
// ], function(err, result) {
//   console.log('err', err); // undefined
//   console.log('result', result); // [1,2,3]
// });



if (typeof module !== 'undefined') {
  module.exports = {
    tflURL,
    destStr
  };
}
