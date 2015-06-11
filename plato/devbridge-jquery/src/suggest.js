/*jslint  browser: true, white: true, plusplus: true */
// definition
//var $ = require('jquery')(require("jsdom").jsdom().parentWindow);
//var baseurlconfig = "http://localhost:8080/api/suggest?q=";
// usage
//$("body").append("<div>TEST</div>").append(function () {

//check out api.js

var suggest = function () {

    var config = {
        baseurl: "http://localhost:8080/api/suggest?q=",
        includeSynonyms: true,
        groupSynonyms: true
    };

    var _suggest = function (div) {
        mysuggest(div, config);
    };

    _suggest.baseurl = function (newbaseurl) {
        if (!arguments.length)return config.baseurl;
        config.baseurl = newbaseurl;
        return this; // allows method concatenation (chaining)
    };

    _suggest.includeSynonyms = function (newincludeSynonyms) {
        if (!arguments.length)return config.includeSynonyms;
        config.includeSynonyms = newincludeSynonyms;
        return this; // allows method concatenation (chaining)
    };

    return _suggest;
};

var mysuggest = function (div, config) {

    //create two input emelements
    var autocompleteAjax = $("<input type=\"text\" class=\"autocomplete-ajax\" />");
    var autocompleteAjaxX = $("<input type=\"text\" class=\"autocomplete-ajax-x\" />");
    div.append(autocompleteAjax).append(autocompleteAjaxX);

    // Initialize ajax autocomplete:
    $(div).autocomplete({

        lookup: function (query, done) {
            console.log(query);
            var result = {};
            var suggestions = [];

            $.ajax({
                type: 'GET',
                //CORS-enabled API
                url: config.baseurl + query,
                dataType: "json",

                success: function (json) {
                    console.log("API call successful.");

                    var array = json.response.docs;

                    if (config.includeSynonyms) {
                        for (var key in array) {
                            if (array.hasOwnProperty(key)) {
                                var thisLabel = array[key].label;
                                suggestions.push({"value": thisLabel, "data": key});
                            }
                        }
                    }
                    result["suggestions"] = suggestions;
                    done(result);
                },

                error: function (ajaxContext) {
                    console.log(ajaxContext.responseText)
                }
            });

        },

        lookupFilter: function (suggestion, originalQuery, queryLowerCase) {
            var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
            return re.test(suggestion.value);
        },
        onSelect: function (suggestion) {
            console.log('You selected: ' + suggestion.value + ', ' + suggestion.data);
        },
        onHint: function (hint) {
            $(autocompleteAjaxX).val(hint);
        },
        onInvalidateSelection: function () {
            console.log('You selected: none');
        }
    });

};

// works with require
module.exports = suggest;


