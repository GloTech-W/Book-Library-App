import React, { useEffect, useState } from "react";
import { fetchBooks } from "../../services/bookApi"; // Import the function to fetch books from an API

const Hero = ({ handlereadNowPopup }) => {
  const [books, setBooks] = useState([]); // State to hold the list of books
  const [currentBook, setCurrentBook] = useState(null); // State to hold the currently selected book
  const [showFullDescription, setShowFullDescription] = useState(false); // State to toggle full/short description
  const [showFullPublisher, setShowFullPublisher] = useState(false); // State to toggle full/short publisher info

  // Function to shorten long text to a specific limit
  const truncateText = (text, limit) => {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  // Fetch books when the component loads for the first time
  useEffect(() => {
    const loadBooks = async () => {
      const fetchedBooks = await fetchBooks("Harry Potter"); // Fetch books related to 'Harry Potter'
      setBooks(fetchedBooks); // Set the fetched books into state
      if (fetchedBooks.length > 0) {
        setCurrentBook(fetchedBooks[0]); // Set the first book as the current book to display
      }
    };

    loadBooks(); // Call the function to load books
  }, []); // Empty dependency array ensures this runs once on component load

  return (
    <div className="min-h-[550px] sm:min-h-[650px] bg-white text-gray-900 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200">
      <div className="container pb-8 sm:pb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Text content section */}
          <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1">
            {currentBook && ( // Display this only if there is a current book
              <>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                  {currentBook.title} {/* Display the current book's title */}
                  <p className="bg-clip-text text-transparent bg-gradient-to-b from-orange-400 to-orange-600 text-right text-sm">
                    by {currentBook.author} {/* Display the current book's author */}
                  </p>
                </h1>

                {/* Book Description */}
                <p className="text-sm">
                  {showFullDescription
                    ? currentBook.description // Show full description if toggled on
                    : truncateText(currentBook.description || "No description available", 100)} {/* Show truncated description */}
                  <span
                    className="text-primary cursor-pointer ml-2"
                    onClick={() => setShowFullDescription(!showFullDescription)} // Toggle description visibility
                  >
                    {showFullDescription ? "Show Less" : "View More"} {/* Toggle text */}
                  </span>
                </p>

                {/* Publisher Info */}
                <p className="text-sm">
                  Publisher:{" "}
                  {showFullPublisher
                    ? currentBook.publisher // Show full publisher info if toggled on
                    : truncateText(currentBook.publisher || "Unknown", 50)} {/* Show truncated publisher */}
                  <span
                    className="text-primary cursor-pointer ml-2"
                    onClick={() => setShowFullPublisher(!showFullPublisher)} // Toggle publisher info visibility
                  >
                    {showFullPublisher ? "Show Less" : "View More"} {/* Toggle text */}
                  </span>
                </p>

                {/* Read Now Button */}
                <div>
                  <button
                    onClick={handlereadNowPopup} // Trigger the popup when button is clicked
                    className="bg-gradient-to-r from-orange-500 to-orange-700 hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                  >
                    Read Now
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Book Image Section */}
          <div className="min-h-[450px] flex justify-center items-center relative order-1 sm:order-2">
            <div className="h-[300px] sm:h-[450px] overflow-hidden flex justify-center items-center">
              {currentBook && currentBook.cover && ( // Show current book's image if it exists
                <img
                  src={currentBook.cover}
                  alt={currentBook.title} // Display the book's cover image
                  className="w-[300px] h-[300px] sm:h-[450px] object-contain mx-auto"
                />
              )}
            </div>
            {/* Small Book Thumbnails to Select Other Books */}
            <div className="flex lg:flex-col lg:top-1/2 lg:-translate-y-1/2 lg:py-2 justify-center gap-4 absolute -bottom-[40px] lg:-right-1 bg-white rounded-full">
              {books.map((book) => (
                <img
                  key={book.id} // Each book has a unique key
                  src={book.cover} // Use the book's cover for the thumbnail
                  onClick={() => setCurrentBook(book)} // When clicked, set this book as the current book
                  alt={book.title} 
                  className="max-w-[100px] h-[100px] object-contain inline-block hover:scale-110 duration-200 cursor-pointer" // Thumbnail styling with hover effect
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
