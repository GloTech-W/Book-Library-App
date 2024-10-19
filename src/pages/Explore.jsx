import React, { useState } from "react"; // Import necessary hooks and React
import { Link } from "react-router-dom"; // Import Link for navigation
import { FaSearch } from "react-icons/fa"; // Import search icon

// Import genre images
import fantasyImage from "../assets/ExploreImages/Fantasy.png";
import historicalFictionImage from "../assets/ExploreImages/Historical Fiction.png";
import horrorImage from "../assets/ExploreImages/Horror.png";
import humorImage from "../assets/ExploreImages/Humor.png";
import literatureImage from "../assets/ExploreImages/Literature.png";
import magicImage from "../assets/ExploreImages/Magic.png";
import mysteryImage from "../assets/ExploreImages/Mystery detective stories.png";
import playsImage from "../assets/ExploreImages/Plays.png";
import poetryImage from "../assets/ExploreImages/Poetry.png";
import romanceImage from "../assets/ExploreImages/Romance.png";
import scienceFictionImage from "../assets/ExploreImages/Science Fiction.png";
import shortStoriesImage from "../assets/ExploreImages/Short Stories.png";
import thrillerImage from "../assets/ExploreImages/Thriller.png";
import youngAdultImage from "../assets/ExploreImages/Young Adult.png";

// Array of genre objects with title, link, and image
const genres = [
  { title: "Fantasy", link: "/books/fantasy", image: fantasyImage },
  { title: "Historical Fiction", link: "/books/historicalfiction", image: historicalFictionImage },
  { title: "Horror", link: "/books/horror", image: horrorImage },
  { title: "Humor", link: "/books/humor", image: humorImage },
  { title: "Literature", link: "/books/literature", image: literatureImage },
  { title: "Magic", link: "/books/magic", image: magicImage },
  { title: "Mystery Detective Stories", link: "/books/mystery", image: mysteryImage },
  { title: "Plays", link: "/books/plays", image: playsImage },
  { title: "Poetry", link: "/books/poetry", image: poetryImage },
  { title: "Romance", link: "/books/romance", image: romanceImage },
  { title: "Science Fiction", link: "/books/sciencefiction", image: scienceFictionImage },
  { title: "Short Stories", link: "/books/shortstories", image: shortStoriesImage },
  { title: "Thriller", link: "/books/thriller", image: thrillerImage },
  { title: "Young Adult", link: "/books/youngadult", image: youngAdultImage },
];

// Function to truncate long text to a maximum length
const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

// Main Explore component
const Explore = () => {
  // State hooks for search, results, loading, and popup handling
  const [searchTerm, setSearchTerm] = useState(""); // Holds the search term
  const [results, setResults] = useState([]); // Holds search results
  const [loading, setLoading] = useState(false); // Indicates if data is loading
  const [notFound, setNotFound] = useState(false); // Indicates if no books were found
  const [selectedBook, setSelectedBook] = useState(null); // Holds the selected book for popup
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Controls the visibility of the book details popup
  const [showMore, setShowMore] = useState(false); // Controls whether more search results are shown

  // Function to handle search and fetch data from Google Books API
  const handleSearch = async () => {
    if (searchTerm.trim() === "") return; // Do nothing if search term is empty

    setLoading(true); // Set loading state
    setNotFound(false); // Reset not found state
    setShowMore(false); // Reset "show more" state
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&maxResults=10`);
      const data = await response.json();
      if (data.items && data.items.length === 0) {
        setNotFound(true); // No results found
      } else {
        setResults(data.items); // Update results with data
      }
    } catch (error) {
      console.error("Error fetching data from Google Books API:", error); // Log any errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle when a book is clicked to show detailed popup
  const handleBookClick = (book) => {
    setSelectedBook(book); // Set selected book
    setIsPopupVisible(true); // Show popup
  };

  // Close the popup
  const closePopup = () => {
    setIsPopupVisible(false); // Hide popup
    setSelectedBook(null); // Clear selected book
  };

  // Show a limited number of results initially, with an option to show more
  const displayedResults = showMore ? results : results.slice(0, 5);

  return (
    <div className="container mx-auto p-4 bg-gray-800 text-white min-h-screen">
      {/* Search input with search button */}
      <div className="mb-4 flex items-center border border-gray-300 rounded-lg overflow-hidden w-full max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search for a book..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch(); // Trigger search on Enter key press
            }
          }}
          className="flex-1 p-2 outline-none bg bg-gray-900 text-white"
          style={{ width: '200px' }}
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
          <FaSearch /> {/* Search icon */}
        </button>
      </div>

      {/* Message when no results are found */}
      {notFound && (
        <p className="text-red-600 text-center mb-4">No books found. Try another search term.</p>
      )}

      {/* Loading message */}
      {loading && <p className="text-center">Loading...</p>}

      {/* Heading for genres */}
      <h1 className="text-2xl font-bold mb-4 text-blue-600 text-center">Search Genres</h1>

      {/* Genre grid */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${results.length === 0 ? 'h-full' : 'h-1/3'}`}>
        {genres.map((genre, index) => (
          <Link to={genre.link} key={index} className="block">
            <div className="flex items-center justify-between border border-gray-300 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer bg-gray-700 hover:bg-blue-500">
              <span className="text-xl font-semibold text-gray-200 hover:text-orange-500">{genre.title}</span>
              <img src={genre.image} alt={`${genre.title} cover`} className="w-16 h-16 rounded-lg object-cover" />
            </div>
          </Link>
        ))}
      </div>

      {/* Search results section */}
      {displayedResults.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-center">Search Results:</h2>
          <div className="flex overflow-x-auto space-x-4 mt-2">
            {/* Display search results */}
            {displayedResults.map((book) => (
              <div
                key={book.id}
                className="border rounded-lg p-2 cursor-pointer hover:bg-gray-600 min-w-[150px]"
                onClick={() => handleBookClick(book)} // Show book details popup on click
              >
                {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                )}
                <h3 className="mt-2 text-lg font-semibold">{truncateText(book.volumeInfo.title, 30)}</h3>
                {book.volumeInfo.authors && (
                  <p className="text-sm text-gray-300">{truncateText(book.volumeInfo.authors.join(", "), 20)}</p>
                )}
                {book.volumeInfo.publisher && (
                  <p className="text-sm text-gray-300">{truncateText(book.volumeInfo.publisher, 20)}</p>
                )}
              </div>
            ))}
          </div>
          {/* Button to show more results */}
          {!showMore && results.length > 5 && (
            <button
              onClick={() => setShowMore(true)}
              className="mt-4 bg-blue-500 text-white p-2 rounded-md"
            >
              Show More
            </button>
          )}
        </div>
      )}

      {/* Book detail popup */}
      {isPopupVisible && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg text-black">
            <h2 className="text-xl font-bold mb-2">{selectedBook.volumeInfo.title}</h2>
            {selectedBook.volumeInfo.imageLinks && (
              <img
                src={selectedBook.volumeInfo.imageLinks.thumbnail}
                alt={selectedBook.volumeInfo.title}
                className="mb-2"
              />
            )}
            {selectedBook.volumeInfo.authors && (
              <p><strong>Authors:</strong> {selectedBook.volumeInfo.authors.join(", ")}</p>
            )}
            {selectedBook.volumeInfo.publisher && (
              <p><strong>Publisher:</strong> {selectedBook.volumeInfo.publisher}</p>
            )}
            {selectedBook.volumeInfo.description && (
              <p><strong>Description:</strong> {truncateText(selectedBook.volumeInfo.description, 100)}</p>
            )}
            <button
              onClick={closePopup}
              className="mt-4 bg-blue-500 text-white p-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore; // Export the Explore component
