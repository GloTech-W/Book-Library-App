import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"; // Importing the Navbar component
import Hero from "./components/Hero/Hero"; // Importing the Hero component
import Footer from "./components/Footer/Footer"; // Importing the Footer component
import Subscribe from "./components/Subscribe/Subscribe"; // Importing the Subscribe component
import Library from "./components/Library/Library"; // Importing the Library component
import Books from "./components/Books/Books"; // Importing the Books component
import ReadNowPopup from "./components/ReadNow/ReadNow"; // Importing the ReadNowPopup component
import CurrentlyReading from "./components/CurrentlyReading/CurrentlyReading"; // Importing the CurrentlyReading component
import Explore from "./pages/Explore"; // Importing the Explore page component
import Login from "./pages/Login"; // Importing the Login page component
import SignUp from "./pages/SignUp"; // Importing the SignUp page component

function App() {
  // State to manage the visibility of the ReadNowPopup
  const [readNowPopup, setReadNowPopup] = useState(false);

  // Function to open the ReadNowPopup
  const handleReadNowPopup = () => {
    setReadNowPopup(true);
  };

  return (
    <Router>
      <div className="App bg-white dark:bg-gray-900"> {/* Main container with light and dark mode support */}
        <Routes>
          {/* Default route: Login Page */}
          <Route path="/" element={<Login />} />
          
          {/* Route for Sign Up Page */}
          <Route path="/signup" element={<SignUp />} />
          
          {/* Home route for the homepage layout */}
          <Route path="/home" element={
            <>
              {/* Navbar for the homepage */}
              <Navbar handleReadNowPopup={handleReadNowPopup} /> 
              
              {/* Hero section of the homepage */}
              <Hero handleReadNowPopup={handleReadNowPopup} />
              
              {/* Library section */}
              <Library />
              
              {/* Currently Reading section */}
              <CurrentlyReading />
              
              {/* Subscribe section */}
              <Subscribe />
              
              {/* Books section included as part of the homepage */}
              <Books handleReadNowPopup={handleReadNowPopup} />
              
              {/* Footer section */}
              <Footer />
              
              {/* Popup for reading now functionality */}
              <ReadNowPopup readNowPopup={readNowPopup} setReadNowPopup={setReadNowPopup} />
            </>
          } />
          
          {/* Route for Explore Page */}
          <Route path="/explore" element={
            <>
              {/* Navbar for the Explore page */}
              <Navbar handleReadNowPopup={handleReadNowPopup} />
              
              {/* Explore page content */}
              <Explore />
            </>
          } />
          
          {/* 404 Route to handle undefined paths */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
