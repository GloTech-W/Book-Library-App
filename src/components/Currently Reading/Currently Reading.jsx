import React, { useEffect, useState } from "react";
import { fetchBooks } from "../../services/bookApi"; 
import { IoIosArrowForward } from "react-icons/io"; 

const genres = [
  { name: "Romance", query: "romance" },
  { name: "New Adult", query: "new adult" },
  { name: "Horror", query: "horror" },
  { name: "Historical Fiction", query: "historical fiction" },
  { name: "Magical Fiction", query: "magical" },
];

const CurrentlyReading = () => {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    const fetchBooksData = async () => {
      const books = await Promise.all(
        genres.map(async (genre) => {
          const data = await fetchBooks(genre.query, 1);
          return {
            genre: genre.name,
            ...data[0],
          };
        })
      );
      setBooksData(books);
    };

    fetchBooksData();
  }, []);

  return (
    <>
      <span id="currently-reading"></span>
      <div className="py-10 bg-blue-200 dark:bg-blue-800">
        <div className="container">
          <div className="text-center mb-20 max-w-[400px] mx-auto">
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-blue-600">
              Currently Reading
            </p>
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-xs text-gray-400">
              "A reader lives a thousand lives before he dies. The man who never reads lives only one." — George R.R. Martin
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
            {booksData.map((book, index) => {
              // Calculate progress based on index for demo
              const progress = (index + 1) * 20; // Example progress calculation (modify as needed)

              return (
                <div
                  key={index}
                  data-aos="zoom-in"
                  className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-gray-500 hover:text-white relative shadow-xl duration-high group max-w-[300px]"
                >
                  <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
                    {book.genre}
                  </p>
                  <div className="h-[100px]">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="max-w-[100px] block mx-auto transform -translate-y-14 group-hover:scale-105 duration-300 shadow-md"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h1 className="text-xl font-bold">{book.title}</h1>
                    <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                      {book.author}
                    </p>
                    <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                      {book.publisher}
                    </p>
                    <div className="w-full h-2 bg-gray-300 rounded-full mt-4 mb-2">
                      <div
                        className="h-2 bg-orange-600 rounded-full"
                        style={{ width: `${progress}%` }} // Dynamic progress
                      ></div>
                    </div>
                    {/* Button logic based on progress */}
                    <button
                      className={`py-1 px-4 rounded-full mt-4 transition duration-300 ${
                        progress === 100
                          ? "bg-green-600 text-white"
                          : "bg-orange-600 hover:scale-105 text-white group-hover:bg-white group-hover:text-orange-600"
                      }`}
                      onClick={() => {
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
          <div className="flex justify-center mt-10">
            <button
              className="text-gray-500 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 flex items-center"
              onClick={() => console.log("Navigate to next page")}
            >
              <span>Next Page</span>
              <IoIosArrowForward className="ml-2 text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentlyReading;
