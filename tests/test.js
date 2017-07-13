var test = require('tape');
var logic = require('../Public/logic.js');

//Tests for wikiExtract function heavily depends on the DOM and browser functionality
//so as this is a complicated problem we focused on improving our code by testing for various inputs
//and directly looking at the index.html page results
test('wikiExtract return string', function(t) {
  var actual = typeof wikiExtract("anything");
  var expected = "string"
  t.equal(actual, expected, 'wikiExtract should return a string');
  t.end();
});
