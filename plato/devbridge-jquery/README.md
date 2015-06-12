plato devbridge-jquery
=========
Embeddable Javascript widget that consume the services provided by the new version of the EBI's Ontology Lookup Service (OLS)
Search widget provides term autocompletion using the Devbridge JQuery Autocomplete library, which in turn depends only on JQuery.

Building ols-ebi-widgets
------------------
```
$ git clone https://github.com/jmcmurry/ols-ebi-widgets/plato/devbridge-jquery
$ cd ols-ebi-widgets/plato/devbridge-jquery
$ npm install
$ gulp build-browser # gulp build-browser-min
```
The generated javascript and css files will be at ./build

The npm implementation is not yet working properly