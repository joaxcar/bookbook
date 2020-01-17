import KEY from "./apiConfig";
let BASE_URL = "https://www.googleapis.com/books/v1/volumes?";
let BASE_URL_ID = "https://www.googleapis.com/books/v1/volumes";

function processResponse(response) {
  if (response.ok) {
    return response.json();
  }
  throw response;
}

function makeData(d) {
  const id = d.id || "noID";
  const description = d.volumeInfo.description || "No description";
  const title = d.volumeInfo.title || "No title";
  const authors = d.volumeInfo.authors || ["No authors"];
  const publisher = d.volumeInfo.publisher || "No publisher";
  const imageLinks = d.volumeInfo.imageLinks || {
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/5/50/Closed_Book_Icon.svg"
  };
  const industryIdentifiers = d.volumeInfo.industryIdentifiers
    ? d.volumeInfo.industryIdentifiers
    : ["No identifier"];

  return {
    id,
    description,
    title,
    authors,
    publisher,
    imageLinks,
    industryIdentifiers,
    rating: 0,
    review: "",
    comment: "",
    tags: ["All"],
    progress: 0
  };
}

const filter = `&fields=totalItems,items/id,items/volumeInfo(description,title,subtitle,publishedDate,publisher,authors,imageLinks,industryIdentifiers)`;
/**
 * Do an API call to the search API endpoint.
 * @returns {Promise<any>}
 */
function getBooks(query, index) {
  const key = "&key=" + KEY;
  return fetch(`${BASE_URL}q=${query}${filter}&startIndex=${index}`)
    .then(processResponse)
    .then(ret => {
      const items = ret.items.map(data => makeData(data));
      return { totalItems: ret.totalItems, items };
    })
    .catch(e => window.console.error("error from api: " + e));
}

export function getBookById(id) {
  return fetch(`${BASE_URL_ID}/${id}`)
    .then(processResponse)
    .then(data => makeData(data));
}

export default getBooks;
