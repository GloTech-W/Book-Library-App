import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";
import Subscribe from "./components/Subscribe/Subscribe";
import Library from "./components/Library/Library";
import Books from "./components/Books/Books"; 
import ReadNowPopup from "./components/Read Now/Read Now";
import CurrentlyReading from "./components/Currently Reading/Currently Reading";
import Explore from "./pages/Explore"; // Updated import for Explore component
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"; // Import the new SignUp component

function App() {
  const [readNowPopup, setReadNowPopup] = useState(false);

  const handlereadNowPopup = () => {
    setReadNowPopup(true);
  };

  return (
    <Router>
      <div className="App bg-white dark:bg-gray-900">
        <Routes>
          {/* Default route: Login Page */}
          <Route path="/" element={<Login />} />
          
          {/* Route for Sign Up Page */}
          <Route path="/signup" element={<SignUp />} />
          
          {/* Home route for the homepage layout */}
          <Route path="/home" element={
            <>
              <Navbar handlereadNowPopup={handlereadNowPopup} /> {/* Navbar for the homepage */}
              <Hero handlereadNowPopup={handlereadNowPopup} />
              <Library />
              <CurrentlyReading />
              <Subscribe />
              <Books handlereadNowPopup={handlereadNowPopup} /> {/* Include Books component as a section on the homepage */}
              <Footer />
              <ReadNowPopup readNowPopup={readNowPopup} setReadNowPopup={setReadNowPopup} />
            </>
          } />
          
          {/* Route for Explore Page */}
          <Route path="/explore" element={
            <>
              <Navbar handlereadNowPopup={handlereadNowPopup} /> {/* Add Navbar to Explore */}
              <Explore />
            </>
          } />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;