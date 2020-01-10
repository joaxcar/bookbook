let BASE_URL = "https://www.googleapis.com/books/v1/volumes?";

function processResponse(response) {
  if (response.ok) {
    return response.json();
  }
  throw response;
}

const filter = `&fields=totalItems,items/volumeInfo(description,title,subtitle,publishedDate,publisher,authors,imageLinks)`;
/**
 * Do an API call to the search API endpoint.
 * @returns {Promise<any>}
 */
function getBook(isbn) {
  return fetch(`${BASE_URL}q=${isbn}${filter}`).then(processResponse);
}

export default getBook;
