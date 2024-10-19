import axios from "axios";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

// Function to fetch books by title or author
export const fetchBooks = async (query, limit = 3) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: query,
        maxResults: limit, // Use maxResults for Google Books API
      },
    });

    // Map and structure the response data
    return response.data.items.map((book) => ({
      id: book.id,
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown",
      description: book.volumeInfo.description || "No description available",
      publisher: book.volumeInfo.publisher || "Unknown",
      cover: book.volumeInfo.imageLinks?.thumbnail || null, // Use imageLinks for cover
      pages: book.volumeInfo.pageCount || "Unknown", // Fetch number of pages
      isbn: book.volumeInfo.industryIdentifiers ? 
            book.volumeInfo.industryIdentifiers[0].identifier : "No ISBN available", // Fetch ISBN
      publicationDate: book.volumeInfo.publishedDate || "Unknown", // Fetch publication date
      genres: book.volumeInfo.categories ? book.volumeInfo.categories.slice(0, 3) : ["Unknown"], // Fetch genres
      tags: book.volumeInfo.categories || [], // Fetch all categories as tags
      rating: book.volumeInfo.averageRating || null, // Fetch average rating
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
