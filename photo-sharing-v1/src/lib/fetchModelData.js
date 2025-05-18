// /**
//  * fetchModel - Fetch a model from the web server.
//  *
//  * @param {string} url      The URL to issue the GET request.
//  *
//  */
// function fetchModel(url) {
//   const models = null;
//   return models;
// }

// export default fetchModel;

const API_BASE_URL = "http://localhost:8081/api";

async function fetchModel(url) {
  try {
    console.log("Fetching from:", API_BASE_URL + url);
    const response = await fetch(`${API_BASE_URL}${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchModel error:", error);
    throw error;
  }
}

export default fetchModel;
