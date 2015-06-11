(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = olswidget = require("./index.js");

},{"./index.js":2}],2:[function(require,module,exports){

var olswidget = {};
olswidget.suggest = require("./src/suggest.js");
//olswidget.select = require("src/select.js");

module.exports = exports = olswidget;


},{"./src/suggest.js":3}],3:[function(require,module,exports){
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



},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qbWNtdXJyeS9jb2RlL29scy1lYmktd2lkZ2V0cy9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam1jbXVycnkvY29kZS9vbHMtZWJpLXdpZGdldHMvZmFrZV9mMDJhNzIxOS5qcyIsIi9Vc2Vycy9qbWNtdXJyeS9jb2RlL29scy1lYmktd2lkZ2V0cy9pbmRleC5qcyIsIi9Vc2Vycy9qbWNtdXJyeS9jb2RlL29scy1lYmktd2lkZ2V0cy9zcmMvc3VnZ2VzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IG9sc3dpZGdldCA9IHJlcXVpcmUoXCIuL2luZGV4LmpzXCIpO1xuIiwiXG52YXIgb2xzd2lkZ2V0ID0ge307XG5vbHN3aWRnZXQuc3VnZ2VzdCA9IHJlcXVpcmUoXCIuL3NyYy9zdWdnZXN0LmpzXCIpO1xuLy9vbHN3aWRnZXQuc2VsZWN0ID0gcmVxdWlyZShcInNyYy9zZWxlY3QuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IG9sc3dpZGdldDtcblxuIiwiLypqc2xpbnQgIGJyb3dzZXI6IHRydWUsIHdoaXRlOiB0cnVlLCBwbHVzcGx1czogdHJ1ZSAqL1xuLy8gZGVmaW5pdGlvblxuLy92YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpKHJlcXVpcmUoXCJqc2RvbVwiKS5qc2RvbSgpLnBhcmVudFdpbmRvdyk7XG4vL3ZhciBiYXNldXJsY29uZmlnID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpL3N1Z2dlc3Q/cT1cIjtcbi8vIHVzYWdlXG4vLyQoXCJib2R5XCIpLmFwcGVuZChcIjxkaXY+VEVTVDwvZGl2PlwiKS5hcHBlbmQoZnVuY3Rpb24gKCkge1xuXG4vL2NoZWNrIG91dCBhcGkuanNcblxudmFyIHN1Z2dlc3QgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgY29uZmlnID0ge1xuICAgICAgICBiYXNldXJsOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hcGkvc3VnZ2VzdD9xPVwiLFxuICAgICAgICBpbmNsdWRlU3lub255bXM6IHRydWUsXG4gICAgICAgIGdyb3VwU3lub255bXM6IHRydWVcbiAgICB9O1xuXG4gICAgdmFyIF9zdWdnZXN0ID0gZnVuY3Rpb24gKGRpdikge1xuICAgICAgICBteXN1Z2dlc3QoZGl2LCBjb25maWcpO1xuICAgIH07XG5cbiAgICBfc3VnZ2VzdC5iYXNldXJsID0gZnVuY3Rpb24gKG5ld2Jhc2V1cmwpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKXJldHVybiBjb25maWcuYmFzZXVybDtcbiAgICAgICAgY29uZmlnLmJhc2V1cmwgPSBuZXdiYXNldXJsO1xuICAgICAgICByZXR1cm4gdGhpczsgLy8gYWxsb3dzIG1ldGhvZCBjb25jYXRlbmF0aW9uIChjaGFpbmluZylcbiAgICB9O1xuXG4gICAgX3N1Z2dlc3QuaW5jbHVkZVN5bm9ueW1zID0gZnVuY3Rpb24gKG5ld2luY2x1ZGVTeW5vbnltcykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGNvbmZpZy5pbmNsdWRlU3lub255bXM7XG4gICAgICAgIGNvbmZpZy5pbmNsdWRlU3lub255bXMgPSBuZXdpbmNsdWRlU3lub255bXM7XG4gICAgICAgIHJldHVybiB0aGlzOyAvLyBhbGxvd3MgbWV0aG9kIGNvbmNhdGVuYXRpb24gKGNoYWluaW5nKVxuICAgIH07XG5cbiAgICByZXR1cm4gX3N1Z2dlc3Q7XG59O1xuXG52YXIgbXlzdWdnZXN0ID0gZnVuY3Rpb24gKGRpdiwgY29uZmlnKSB7XG5cbiAgICAvL2NyZWF0ZSB0d28gaW5wdXQgZW1lbGVtZW50c1xuICAgIHZhciBhdXRvY29tcGxldGVBamF4ID0gJChcIjxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiYXV0b2NvbXBsZXRlLWFqYXhcXFwiIC8+XCIpO1xuICAgIHZhciBhdXRvY29tcGxldGVBamF4WCA9ICQoXCI8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImF1dG9jb21wbGV0ZS1hamF4LXhcXFwiIC8+XCIpO1xuICAgIGRpdi5hcHBlbmQoYXV0b2NvbXBsZXRlQWpheCkuYXBwZW5kKGF1dG9jb21wbGV0ZUFqYXhYKTtcblxuICAgIC8vIEluaXRpYWxpemUgYWpheCBhdXRvY29tcGxldGU6XG4gICAgJChkaXYpLmF1dG9jb21wbGV0ZSh7XG5cbiAgICAgICAgbG9va3VwOiBmdW5jdGlvbiAocXVlcnksIGRvbmUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHF1ZXJ5KTtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgICAgIHZhciBzdWdnZXN0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgICAgIC8vQ09SUy1lbmFibGVkIEFQSVxuICAgICAgICAgICAgICAgIHVybDogY29uZmlnLmJhc2V1cmwgKyBxdWVyeSxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXG5cbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFQSSBjYWxsIHN1Y2Nlc3NmdWwuXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcnJheSA9IGpzb24ucmVzcG9uc2UuZG9jcztcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmluY2x1ZGVTeW5vbnltcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXNMYWJlbCA9IGFycmF5W2tleV0ubGFiZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zLnB1c2goe1widmFsdWVcIjogdGhpc0xhYmVsLCBcImRhdGFcIjoga2V5fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtcInN1Z2dlc3Rpb25zXCJdID0gc3VnZ2VzdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChhamF4Q29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhamF4Q29udGV4dC5yZXNwb25zZVRleHQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBsb29rdXBGaWx0ZXI6IGZ1bmN0aW9uIChzdWdnZXN0aW9uLCBvcmlnaW5hbFF1ZXJ5LCBxdWVyeUxvd2VyQ2FzZSkge1xuICAgICAgICAgICAgdmFyIHJlID0gbmV3IFJlZ0V4cCgnXFxcXGInICsgJC5BdXRvY29tcGxldGUudXRpbHMuZXNjYXBlUmVnRXhDaGFycyhxdWVyeUxvd2VyQ2FzZSksICdnaScpO1xuICAgICAgICAgICAgcmV0dXJuIHJlLnRlc3Qoc3VnZ2VzdGlvbi52YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU2VsZWN0OiBmdW5jdGlvbiAoc3VnZ2VzdGlvbikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1lvdSBzZWxlY3RlZDogJyArIHN1Z2dlc3Rpb24udmFsdWUgKyAnLCAnICsgc3VnZ2VzdGlvbi5kYXRhKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25IaW50OiBmdW5jdGlvbiAoaGludCkge1xuICAgICAgICAgICAgJChhdXRvY29tcGxldGVBamF4WCkudmFsKGhpbnQpO1xuICAgICAgICB9LFxuICAgICAgICBvbkludmFsaWRhdGVTZWxlY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdZb3Ugc2VsZWN0ZWQ6IG5vbmUnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59O1xuXG4vLyB3b3JrcyB3aXRoIHJlcXVpcmVcbm1vZHVsZS5leHBvcnRzID0gc3VnZ2VzdDtcblxuXG4iXX0=
