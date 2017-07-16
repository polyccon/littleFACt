var testwikiurl = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=victoria,%20London"

function httpRequest(url, nextfunction) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
     var data =  JSON.parse(xhr.responseText);
     nextfunction(data);
    }
  }
  xhr.open('GET', url, true);
  xhr.send();
}

function destStr(string) {
  var array = string.toLowerCase().split(" ");
  var arr = array.map(function(x) {
    return x.slice(0, 1).toUpperCase() + x.slice(1);
  });
  var str = arr.join("%20");
  if (str === "Angel" || str === "Bank" || str === "Borough" || str == "Barbican" || str === "Monument" || str === "Oval" || str === "Wimbledon" || str === "Temple" || str === "Archway") {
    str = str + ",%20London";
  }
  return str;
}

function createwikiUrl(inputTo) {
  var destString = destStr(inputTo);
  return "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=" + destString;
}

 var wikiURL = createwikiUrl(inputTo);

function wikiExtract(data) {


 var keys = Object.keys(data.query.pages);
 var destinationName = data.query.pages[keys[0]].title;
 var extr = data.query.pages[keys[0]].extract.replace(/(&nbsp;|<([^>]+)>)/ig, "");

 domwikiFunction(destinationName, extr);

 if (extr.length < 50) {
   wikiURL += ",%20London";
   wikiExtract();

   if (extr === "") {
     extractDrop.textContent = "Sorry! " + destinationName + " doesn't seem to have a wikipedia page yet, why don't you make one yourself?"
   }
}
document.getElementById('fun-fact').style.display = 'block';
}

function wikiApi(inputTo) {
  var wikiURL = createwikiUrl(inputTo);
    wikiExtract();
  };

httpRequest(wikiURL, wikiExtract);




  /*function to build TFL Api URL*/
  function tflURL(from, to) {
    var TFL_API = "https://api.tfl.gov.uk/journey/journeyresults/"
    var TFL_key = "?app_id=11944170&app_key=b5950c6792c4a2e09bb2331e499ff205"
    var url = TFL_API + from + "/to/" + to + TFL_key;

    return url;
  }





  function tflAPI(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {

      if (xhr.readyState == 4 && xhr.status == 300) {
        var responseObj = JSON.parse(xhr.responseText);

        var fromOptions = responseObj.fromLocationDisambiguation.disambiguationOptions;

        var toOptions = responseObj.toLocationDisambiguation.disambiguationOptions;

        var matchqufrom = fromOptions.matchQuality;

        var matchquto = toOptions.matchQuality;


        //  if (fromOptions !=undefined && toOptions!=undefined && matchquto != undefined && matchqufrom != undefined && matchquto>=855 && matchqufrom >= 855) {
        var newFrom = fromOptions[0].place.icsCode;

        var newTo = toOptions[0].place.icsCode;

        //GRAB ICS CODE AND PASS ONTO RENDER
        tflAPI(tflURL(newFrom, newTo), callback);
        //    } else {

        // console.log(document.getElementById("duration").innerHTML);
        // var duration = document.getElementById("duration");
        // duration.innerHTML = "Oops! Station name is not recognised!";

        //alert("Oops! Station name is not recognised!");
        //console.log(document.getElementById("duration").innerHTML);
        //   console.log("IM here");
        // }

      }

      if (xhr.readyState == 4 && xhr.status == 200) {
        var responseObj200 = JSON.parse(xhr.responseText);

        callback(responseObj200);
      }
    }
    xhr.open("GET", url, true);
    xhr.send();
  };


  if (typeof module !== 'undefined') {
    module.exports = {
      tflURL,
      destStr
    };
  }
