//synonyms

var theme = function() {
    "use strict";

    var _ = function (suggest_widget, div) {

		suggest_widget
	    .baseurl(thisBaseUrl);


		suggest_widget(div);
    };

    return _;
};

// thisBaseUrl tree
var thisBaseUrl = "http://localhost:8080/api/suggest?q=";
