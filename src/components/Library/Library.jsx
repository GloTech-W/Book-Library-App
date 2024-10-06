import React from "react";
import LibImage from "../../assets/Website/lib.png";
import { GrSecure } from "react-icons/gr";

const Library = () => {
  return (
    <div className="min-h-[550px] bg-blue-400 flex justify-center items-center py-12 sm:py-0">
      <div data-aos="slide-up" className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div>
            <img
              src={LibImage}
              alt="Library"
              className="max-w-[400px] h-[350px] w-full mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-6 sm:pt-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Welcome to ReadShelf
            </h1>
            <p className="text-sm text-gray-200 tracking-wide leading-5">
              Whether you're a passionate reader or just starting your literary journey, 
              our app is designed to inspire, engage, and connect you with the books you’ll love.
              <br />
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <GrSecure className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400" />
                <p className="text-white">Quality Books</p>
              </div>
              <div className="flex items-center gap-4">
                <GrSecure className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-orange-100 dark:bg-orange-400" />
                <p className="text-white">Easy Reading</p>
              </div>
              <div className="flex items-center gap-4">
                <GrSecure className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-yellow-100 dark:bg-yellow-400" />
                <p className="text-white">Get Suggestions on New Books</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
