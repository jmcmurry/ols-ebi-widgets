var suggestWidget = require ("../index.js");
var assert = require("chai").assert;

describe ('SuggestWidget', function () {
    it ("Imports correctly", function () {
	assert.isDefined(suggestWidget);
	//assert.isFunction(suggestWidget);
    });

});
