


function tflAPI (from,to) {
  var TFL_API = "https://api.tfl.gov.uk/journey/journeyresults/"
  // var TFL_key = "?app_id={{11944170}}&app_key={{b5950c6792c4a2e09bb2331e499ff205}}"


    var url = TFL_API + from + "/to/" + to
    console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var responseObj = JSON.parse(xhr.responseText);

        callback(responseObj);
      }
    }
    xhr.open("GET", url, true);
    xhr.send();



};













if (typeof module !== 'undefined') {
  module.exports = tflAPI;
}

// westminsterstation/to/bankstation?app_id={{11944170}}&app_key={{b5950c6792c4a2e09bb2331e499ff205}}
