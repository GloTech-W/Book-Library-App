import React, { useEffect, useState } from "react";
import { fetchBooks } from "../../services/bookApi";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Books = ({handlereadNowPopup}) => {
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const fetchedBooks = await fetchBooks("fiction", 5);
        setBooksData(fetchedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooksData();
  }, []);

  return (
    <div className="mt-14 mb-12">
      <div className="container">
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
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
            {loading ? (
              <div className="col-span-5 text-center">
                <p>Loading books...</p>
              </div>
            ) : booksData.length > 0 ? (
              booksData.map(({ id, cover, title, rating, pages }) => (
                <div key={id} className="div space-y-3">
                  <img
                    src={cover}
                    alt={title}
                    className="h-[220px] w-[150px] object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-gray-700">{pages} pages</p>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-orange-600" />
                      <span>{rating ? rating : "No rating yet"}</span>
                    </div>
                    <div>
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
              <div className="col-span-5 text-center">
                <p>No books available to display.</p>
              </div>
            )}
          </div>
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
