let BASE_URL = "https://www.googleapis.com/books/v1/volumes?";
let BASE_URL_ID = "https://www.googleapis.com/books/v1/volumes";

function processResponse(response) {
  if (response.ok) {
    return response.json();
  }
  throw response;
}

function makeData(d) {
  const id = d.id ? d.id : "noID";
  const description = d.volumeInfo.description
    ? d.volumeInfo.description
    : "No description";
  const title = d.volumeInfo.title ? d.volumeInfo.title : "No title";
  const authors = d.volumeInfo.authors ? d.volumeInfo.authors : ["No authors"];
  const publisher = d.volumeInfo.publisher
    ? d.volumeInfo.publisher
    : "No publisher";
  const imageLinks = d.volumeInfo.imageLinks
    ? d.volumeInfo.imageLinks
    : {
        thumbnail:
          "https://upload.wikimedia.org/wikipedia/commons/5/50/Closed_Book_Icon.svg"
      };
  return { id, description, title, authors, publisher, imageLinks };
}

const filter = `&fields=totalItems,items/id,items/volumeInfo(description,title,subtitle,publishedDate,publisher,authors,imageLinks)`;
/**
 * Do an API call to the search API endpoint.
 * @returns {Promise<any>}
 */
function getBook(isbn) {
  return fetch(`${BASE_URL}q=${isbn}${filter}`)
    .then(processResponse)
    .then(ret => {
      const items = ret.items.map(data => makeData(data));
      return { totalItems: ret.totalItems, items };
    });
}

export function getBookById(id) {
  return fetch(`${BASE_URL_ID}/${id}`)
    .then(processResponse)
    .then(data => makeData(data));
}

export default getBook;
