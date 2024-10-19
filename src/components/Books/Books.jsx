import React, { useEffect, useState } from "react";
import { fetchBooks } from "../../services/bookApi"; // Import the fetchBooks function from the API service
import { FaStar } from "react-icons/fa6"; // Import star icon for ratings
import { useNavigate } from 'react-router-dom'; // Import useNavigate to navigate between routes

const Books = ({ handlereadNowPopup }) => {
  // Initialize state to hold books data and loading status
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook to navigate programmatically

  // useEffect hook to fetch books data when the component mounts
  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const fetchedBooks = await fetchBooks("fiction", 5); // Fetch 5 fiction books from the API
        setBooksData(fetchedBooks); // Update state with the fetched books
      } catch (error) {
        console.error("Error fetching books:", error); // Log any errors
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchBooksData(); // Call the function to fetch books data
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Section heading and introductory text */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Want to read something new
          </p>
          <h1 className="text-3xl font-bold">Explore</h1>
          <p className="text-xs text-gray-400">
            "Step into the pages of a new adventure— every book is a doorway to a world waiting to be explored. What will you discover today?"
          </p>
        </div>

        <div>
          {/* Display books in a responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
            {loading ? ( 
              // Show loading message while books are being fetched
              <div className="col-span-5 text-center">
                <p>Loading books...</p>
              </div>
            ) : booksData.length > 0 ? ( 
              // Display books if data is available
              booksData.map(({ id, cover, title, rating, pages }) => (
                <div key={id} className="div space-y-3">
                  {/* Display book cover */}
                  <img
                    src={cover}
                    alt={title}
                    className="h-[220px] w-[150px] object-cover rounded-md"
                  />
                  <div>
                    {/* Display book title */}
                    <h3 className="font-semibold">{title}</h3>
                    {/* Display number of pages */}
                    <p className="text-sm text-gray-700">{pages} pages</p>
                    {/* Display book rating with a star icon */}
                    <div className="flex items-center gap-1">
                      <FaStar className="text-orange-600" />
                      <span>{rating ? rating : "No rating yet"}</span>
                    </div>
                    <div>
                      {/* Button to read the book, triggering a popup */}
                      <button
                        onClick={handlereadNowPopup}
                        className="bg-gradient-to-r from-orange-500 to-orange-700 hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                      >
                        Read Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : ( 
              // Display message if no books are available
              <div className="col-span-5 text-center">
                <p>No books available to display.</p>
              </div>
            )}
          </div>
          
          {/* Button to view all books, navigates to the Explore page */}
          <div className="flex justify-center">
            <button
              className="text-center mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md"
              onClick={() => navigate('/explore')}
            >
              View All Books
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
