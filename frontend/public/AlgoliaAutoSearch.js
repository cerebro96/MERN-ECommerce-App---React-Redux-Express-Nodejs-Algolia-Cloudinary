function Algolia(){

  var apikey_1 = document.getElementById("api_key").value
  var apikey_2 = document.getElementById("api_key_long").value
  var apikey_3 = document.getElementById("api_sugg").value
  //console.log(apikey_1)
  //console.log(apikey_1)
  const client = algoliasearch(apikey_1, apikey_2)
  const products = client.initIndex(apikey_3)

autocomplete('#aa-search-input', { hint: false }, [
  {
    source: autocomplete.sources.hits(products, { hitsPerPage: 10 }),
    displayKey: 'query',
    templates: {
      suggestion: function(suggestion) {
        return `<span>${(suggestion._highlightResult.query.value)}</span>`;
      }
    }
  }
]).on('autocomplete:selected', function(event, suggestion, dataset, context) {
  //console.log(event, suggestion, dataset, context);
  console.log(suggestion.query);
  window.location = '/search/' + suggestion.query;
});

}

Algolia()