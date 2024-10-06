import axios from "axios";

const BASE_URL = "https://openlibrary.org";

// Function to fetch books by title or author
export const fetchBooks = async (query, limit = 3) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.json`, {
      params: {
        q: query,
        limit: limit,
      },
    });

    // Map and structure the response data
    return response.data.docs.map((book) => ({
      id: book.key,
      title: book.title,
      author: book.author_name ? book.author_name.join(", ") : "Unknown",
      description: book.first_sentence ? book.first_sentence[0] : "No description available",
      publisher: book.publisher ? book.publisher.join(", ") : "Unknown",
      cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null,
      pages: book.number_of_pages_median || "Unknown", // Fetch number of pages
      isbn: book.isbn ? book.isbn[0] : "No ISBN available", // Fetch ISBN
      publicationDate: book.first_publish_year || "Unknown", // Fetch publication date
      genres: book.subject ? book.subject.slice(0, 3) : ["Unknown"], // Fetch genres (subjects)
      tags: book.subject ? book.subject : [], // Fetch all subjects as tags
      rating: book.rating || null,  
    }));
  } catch (error) {
    console.error("Error fetching books:", error);
    return []; // Return an empty array on error
  }
};

// Utility function to trim text and append "..." if it exceeds a certain length
export const trimText = (text, maxLength = 100) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};
