let BASE_URL = "https://www.googleapis.com/books/v1/volumes?";

function processResponse(response) {
  if (response.ok) {
    return response.json();
  }
  throw response;
}

/**
 * Do an API call to the search API endpoint.
 * @returns {Promise<any>}
 */
function getBook(isbn) {
  return fetch(`${BASE_URL}q=isbn:${isbn}`).then(processResponse);
}

export default getBook;
