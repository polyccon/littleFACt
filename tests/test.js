var test = require('tape');
var logic = require('../Public/logic.js');

console.log(logic);
//Tests for wikiExtract function heavily depends on the DOM and browser functionality
//so as this is a complicated problem we focused on improving our code by testing for various inputs
//and directly looking at the index.html page results

//Test for Wiki Api related Functions
test('destStr', function(t) {
  var actual = typeof logic.destStr("anything");
  var expected = "string";
  t.equal(actual, expected, 'should return a string');
  t.end();
});
test('destStr', function(t) {
  var actual = logic.destStr("victoria");
  var expected = "Victoria";
  t.equal(actual, expected, 'should return a string with first letter a  capital');
  t.end();
});
test('destStr', function(t) {
  var actual = logic.destStr("bethnal green").indexOf(" ");
  var expected = "Bethnal%20Green".indexOf(" ");
  t.equal(actual, expected, 'should return string without whitespaces');
  t.end();
});
test('destStr', function(t) {
  var actual = logic.destStr("hyde park").indexOf("%20");
  var expected = "Hyde%20Park".indexOf("%20");
  t.equal(actual, expected, 'should return string with whitespaces replaced by %20');
  t.end();
});
test('destStr', function(t) {
  var actual = logic.destStr("hyde park corner");
  var expected = "Hyde%20Park%20Corner";
  t.equal(actual, expected, 'should work with 3 or more words');
  t.end();
});
test('destStr', function(t) {
  var actual = logic.destStr("Barbican");
  var expected = "Barbican,%20London";
  t.equal(actual, expected, 'should add a string for some arguments');
  t.end();
});

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
