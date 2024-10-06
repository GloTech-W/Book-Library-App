import React, { useEffect, useState } from "react";
import { fetchBooks } from "../../services/bookApi"; // Correct import for booksApi

const Hero = ({ handlereadNowPopup }) => {
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullPublisher, setShowFullPublisher] = useState(false);
  
  const truncateText = (text, limit) => {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  useEffect(() => {
    const loadBooks = async () => {
      const fetchedBooks = await fetchBooks("Harry Potter");
      setBooks(fetchedBooks);
      if (fetchedBooks.length > 0) {
        setCurrentBook(fetchedBooks[0]);
      }
    };

    loadBooks();
  }, []);

  return (
    <div className="min-h-[550px] sm:min-h-[650px] bg-white text-gray-900 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200">
      <div className="container pb-8 sm:pb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Text content section */}
          <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1">
            {currentBook && (
              <>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                  {currentBook.title}
                  <p className="bg-clip-text text-transparent bg-gradient-to-b from-orange-400 to-orange-600 text-right text-sm">
                    by {currentBook.author}
                  </p>
                </h1>

                {/* Description */}
                <p className="text-sm">
                  {showFullDescription
                    ? currentBook.description
                    : truncateText(currentBook.description || "No description available", 100)}
                  <span
                    className="text-primary cursor-pointer ml-2"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                  >
                    {showFullDescription ? "Show Less" : "View More"}
                  </span>
                </p>

                {/* Publisher */}
                <p className="text-sm">
                  Publisher:{" "}
                  {showFullPublisher
                    ? currentBook.publisher
                    : truncateText(currentBook.publisher || "Unknown", 50)}
                  <span
                    className="text-primary cursor-pointer ml-2"
                    onClick={() => setShowFullPublisher(!showFullPublisher)}
                  >
                    {showFullPublisher ? "Show Less" : "View More"}
                  </span>
                </p>

                <div>
                  <button
                    onClick={handlereadNowPopup} 
                    className="bg-gradient-to-r from-orange-500 to-orange-700 hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                  >
                    Read Now
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Image section */}
          <div className="min-h-[450px] flex justify-center items-center relative order-1 sm:order-2">
            <div className="h-[300px] sm:h-[450px] overflow-hidden flex justify-center items-center">
              {currentBook && (
                <img
                  src={currentBook.cover}
                  alt={currentBook.title}
                  className="w-[300px] h-[300px] sm:h-[450px] object-contain mx-auto"
                />
              )}
            </div>
            <div className="flex lg:flex-col lg:top-1/2 lg:-translate-y-1/2 lg:py-2 justify-center gap-4 absolute -bottom-[40px] lg:-right-1 bg-white rounded-full">
              {books.map((book) => (
                <img
                  key={book.id}
                  src={book.cover}
                  onClick={() => setCurrentBook(book)}
                  alt={book.title}
                  className="max-w-[100px] h-[100px] object-contain inline-block hover:scale-110 duration-200 cursor-pointer"
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
