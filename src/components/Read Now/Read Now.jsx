import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlinePlusCircle } from "react-icons/ai";

const ReadNowPopup = ({ readNowPopup, setReadNowPopup }) => {
  const [readingListPopup, setReadingListPopup] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleConfirm = () => {
    setConfirmationMessage("Added to Reading List");
    setReadingListPopup(false);
    setTimeout(() => {
      setConfirmationMessage("");
    }, 3000);
  };

  return (
    <>
      {readNowPopup && (
        <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[300px]">
            <div className="flex items-center justify-between">
              <h1>Read Now</h1>
              <IoCloseOutline
                className="text-2xl cursor-pointer"
                onClick={() => setReadNowPopup(false)}
              />
            </div>
            <div className="mt-4 flex justify-between items-center">
              <button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full">
                Read Now
              </button>
              <AiOutlinePlusCircle
                className="text-3xl text-primary cursor-pointer"
                onClick={() => setReadingListPopup(true)}
              />
            </div>
            {confirmationMessage && (
              <div className="mt-4 text-green-600 font-semibold text-center">
                {confirmationMessage}
              </div>
            )}
          </div>
        </div>
      )}
      {readingListPopup && (
        <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[300px]">
            <div className="flex items-center justify-between">
              <h1>Add to Reading List</h1>
              <IoCloseOutline
                className="text-2xl cursor-pointer"
                onClick={() => setReadingListPopup(false)}
              />
            </div>
            <div className="mt-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Add this book to your Reading List
              </label>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReadNowPopup;