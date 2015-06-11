/*jslint  browser: true, white: true, plusplus: true */

//$ = require ("devbridge-autocomplete");

$(function () {
    'use strict';

    // Initialize ajax autocomplete:
    $('#autocomplete-ajax').autocomplete({

        lookup: function (query, done) {
            console.log(query);
            var result = {};
            var suggestions = [];

            $.ajax({
                type: 'GET',
                //CORS-enabled API
                url: "http://localhost:8080/api/select?q=" + query,
                dataType: "json",

                success: function (json) {
                    console.log("API call successful.");
                    var array = json.response.docs;
                    for (var key in array) {
                        if (array.hasOwnProperty(key)) {
                            var thisLabel = array[key].label;
                            var isDefiningOntology = array[key].is_defining_ontology;
                            suggestions.push({"value": thisLabel, "data": { category: 'isDefiningOntology' }});
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
            $('#selection-ajax').html('You selected: ' + suggestion.value + ', ' + suggestion.data);
        },
        onHint: function (hint) {
            $('#autocomplete-ajax-x').val(hint);
        },
        onInvalidateSelection: function () {
            $('#selection-ajax').html('You selected: none');
        }
    });


});
