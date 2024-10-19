import React, { useEffect, useState } from "react";
import { fetchBooks } from "../../services/bookApi"; // Import the fetchBooks function from the API service
import { IoIosArrowForward } from "react-icons/io"; // Import arrow icon for navigation

// List of genres to fetch books from, each with a name and query keyword
const genres = [
  { name: "Romance", query: "romance" },
  { name: "New Adult", query: "new adult" },
  { name: "Horror", query: "horror" },
  { name: "Historical Fiction", query: "historical fiction" },
  { name: "Magical Fiction", query: "magical" },
];

const CurrentlyReading = () => {
  // State to store the fetched books data
  const [booksData, setBooksData] = useState([]);

  // useEffect to fetch books data when the component mounts
  useEffect(() => {
    const fetchBooksData = async () => {
      // Fetch one book from each genre
      const books = await Promise.all(
        genres.map(async (genre) => {
          const data = await fetchBooks(genre.query, 1); // Fetch one book per genre
          return {
            genre: genre.name, // Include genre name in each book's data
            ...data[0], // Take the first (and only) book fetched for the genre
          };
        })
      );
      setBooksData(books); // Set the fetched books data in state
    };

    fetchBooksData(); // Call the function to fetch books data
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <>
      {/* Anchor to allow smooth scroll to the "Currently Reading" section */}
      <span id="currently-reading"></span>
      <div className="py-10 bg-blue-200 dark:bg-blue-800"> {/* Section with light and dark mode background */}
        <div className="container">
          {/* Section header with title and quote */}
          <div className="text-center mb-20 max-w-[400px] mx-auto">
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-blue-600">
              Currently Reading
            </p>
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-xs text-gray-400">
              "A reader lives a thousand lives before he dies. The man who never reads lives only one." — George R.R. Martin
            </p>
          </div>

          {/* Display books in a responsive grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
            {booksData.map((book, index) => {
              // Calculate reading progress based on index (for demonstration purposes)
              const progress = (index + 1) * 20; // Modify this calculation as needed for actual progress

              return (
                <div
                  key={index}
                  data-aos="zoom-in" // Animation effect for each book card
                  className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-gray-500 hover:text-white relative shadow-xl duration-high group max-w-[300px]"
                >
                  {/* Display genre name */}
                  <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
                    {book.genre}
                  </p>
                  {/* Display book cover image */}
                  <div className="h-[100px]">
                    <img
                      src={book.cover} // Book cover from Google Books API
                      alt={book.title}
                      className="max-w-[100px] block mx-auto transform -translate-y-14 group-hover:scale-105 duration-300 shadow-md"
                    />
                  </div>
                  {/* Display book details (title, author, publisher) */}
                  <div className="p-4 text-center">
                    <h1 className="text-xl font-bold">{book.title}</h1>
                    <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                      {book.author} {/* Author fetched from Google Books API */}
                    </p>
                    <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                      {book.publisher} {/* Publisher fetched from Google Books API */}
                    </p>
                    {/* Display progress bar (dynamic width based on calculated progress) */}
                    <div className="w-full h-2 bg-gray-300 rounded-full mt-4 mb-2">
                      <div
                        className="h-2 bg-orange-600 rounded-full"
                        style={{ width: `${progress}%` }} // Dynamic width based on progress
                      ></div>
                    </div>
                    {/* Button that changes label and style based on progress */}
                    <button
                      className={`py-1 px-4 rounded-full mt-4 transition duration-300 ${
                        progress === 100
                          ? "bg-green-600 text-white" // "Completed" button style when progress is 100%
                          : "bg-orange-600 hover:scale-105 text-white group-hover:bg-white group-hover:text-orange-600" // "Continue Reading" style otherwise
                      }`}
                      onClick={() => {
                        // Log either "Completed" or "Continue Reading" based on progress
                        console.log(progress === 100 ? "Completed" : "Continue Reading");
                      }}
                    >
                      {progress === 100 ? "Completed" : "Continue Reading"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation button for "Next Page" (can be linked to another page) */}
          <div className="flex justify-center mt-10">
            <button
              className="text-gray-500 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 flex items-center"
              onClick={() => console.log("Navigate to next page")}
            >
              <span>Next Page</span>
              <IoIosArrowForward className="ml-2 text-2xl" /> {/* Forward arrow icon */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentlyReading;
