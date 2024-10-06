import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

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


const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") return;

    setLoading(true);
    setNotFound(false);
    setShowMore(false);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      if (data.docs.length === 0) {
        setNotFound(true);
      } else {
        setResults(data.docs);
      }
    } catch (error) {
      console.error("Error fetching data from Open Library:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setSelectedBook(null);
  };

  const displayedResults = showMore ? results : results.slice(0, 5);

  return (
    <div className="container mx-auto p-4 bg-gray-800 text-white min-h-screen">
      <div className="mb-4 flex items-center border border-gray-300 rounded-lg overflow-hidden w-full max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search for a book..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          className="flex-1 p-2 outline-none bg bg-gray-900 text-white"
          style={{ width: '200px' }}
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
          <FaSearch />
        </button>
      </div>

      {notFound && (
        <p className="text-red-600 text-center mb-4">No books found. Try another search term.</p>
      )}

      {loading && <p className="text-center">Loading...</p>}

      <h1 className="text-2xl font-bold mb-4 text-blue-600 text-center">Search Genres</h1>

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

      {displayedResults.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-center">Search Results:</h2>
          <div className="flex overflow-x-auto space-x-4 mt-2">
            {displayedResults.map((book) => (
              <div
                key={book.key}
                className="border rounded-lg p-2 cursor-pointer hover:bg-gray-600 min-w-[150px]"
                onClick={() => handleBookClick(book)}
              >
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="mt-2 text-lg font-semibold">{truncateText(book.title, 30)}</h3>
                {book.author_name && (
                  <p className="text-sm text-gray-300">{truncateText(book.author_name.join(", "), 20)}</p>
                )}
                {book.publisher && (
                  <p className="text-sm text-gray-300">{truncateText(book.publisher.join(", "), 20)}</p>
                )}
              </div>
            ))}
          </div>
          {!showMore && results.length > 5 && (
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => setShowMore(true)}
            >
              View More
            </button>
          )}
        </div>
      )}

      {isPopupVisible && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={closePopup}
            >
              &times;
            </button>
            <img
              src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`}
              alt={selectedBook.title}
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="text-2xl font-bold mt-4">{truncateText(selectedBook.title, 40)}</h2>
            <p className="text-sm text-gray-500 mt-2">
              <strong>Publication Date:</strong> {selectedBook.first_publish_year || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              <strong>ISBN:</strong> {selectedBook.isbn ? selectedBook.isbn[0] : "N/A"}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              <strong>Description:</strong> {truncateText(selectedBook.description?.value || "", 100) || "No description available."}
            </p>
            {selectedBook.number_of_pages ? (
              <p className="text-sm text-gray-500">
                <strong>Number of Pages:</strong> {selectedBook.number_of_pages}
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                <strong>Number of Pages:</strong> N/A
              </p>
            )}
            {selectedBook.subject && (
              <p className="text-sm text-gray-500">
                <strong>Subjects:</strong> {truncateText(selectedBook.subject.join(", "), 50)}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
