const fetchAPI = (queryString) => {
  const algoliaURL = "https://places-dsn.algolia.net/1/places/query"

  const bodyRequest = { query: queryString };

  // The below is the same as if this were ruby 
  // bodyRequest.to_s
  const bodyRequestString = JSON.stringify(bodyRequest);

  const options = {
    method: "POST",
    body: bodyRequestString
  }

  fetch(algoliaURL, options)
    .then(response => response.json())
    .then((json) => {
      
      const ul = document.getElementById('results');
      // clean the UL before the loop
      ul.innerHTML = '';
       
      // console.log(json.hits);

      const cities = json.hits;

      cities.forEach((cityJSON) => {
        const cityName = cityJSON.locale_names.default[0];
        // build an HTML from the city name
        const cityHTML = `
          <li>
            ${cityName}
          </li>
        `
        // insert the HTML
        ul.insertAdjacentHTML('beforeend', cityHTML)
      });
    });
}

// find the input
const input = document.getElementById('search');
// add event listener
input.addEventListener('keyup', (event) => {
  // fetch api
  const queryString = input.value;

  fetchAPI(queryString);
});
