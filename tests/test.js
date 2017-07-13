var test = require('tape');
var logic = require('../Public/logic.js');


//Test for tflURL Function
test('tflURL', function(t) {
  var actual = typeof logic.tflURL("apples","oranges");
  var expected = "string"
  t.equal(actual, expected, 'TFLUrl should return a string');
  t.end();
});

test('tflURL', function(t) {
  var actual =  logic.tflURL("hello","world");
  var expected = "https://api.tfl.gov.uk/journey/journeyresults/hello/to/world?app_id=11944170&app_key=b5950c6792c4a2e09bb2331e499ff205"
  t.equal(actual, expected, 'TFLUrl correctly concatonates url');
  t.end();
});
