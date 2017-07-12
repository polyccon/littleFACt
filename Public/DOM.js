

(function( ){

  document.getElementById("from-to").addEventListener("submit",function(event) {
    event.preventDefault();
    var from = document.getElementById("from-to")[0].value;
    console.log("cadf", from);
    var to = document.getElementById("from-to")[1].value;

    tflAPI(from,to )

  })








})()
