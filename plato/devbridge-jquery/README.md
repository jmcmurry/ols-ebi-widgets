ols-ebi-widgets
=========
Embeddable Javascript widgets that consume the services provided by the new version of the EBI's Ontology Lookup Service (OLS)
Search widget provides term autocompletion using the Devbridge JQuery Autocomplete library, which in turn depends only on JQuery.

Building ols-ebi-widgets
------------------
```
$ git clone https://github.com/jmcmurry/ols-ebi-widgets
$ cd ols-ebi-widgets
$ npm install
$ gulp build-browser # gulp build-browser-min
```
The generated javascript and css files will be at ./build