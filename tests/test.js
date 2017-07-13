var test = require('tape');
var logic = require('../Public/logic.js');
console.log(logic);
//Tests for wikiExtract function heavily depends on the DOM and browser functionality
//so as this is a complicated problem we focused on improving our code by testing for various inputs
//and directly looking at the index.html page results
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
