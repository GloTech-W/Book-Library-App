import React from "react"; // Import React
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa"; // Import icons from react-icons
import Logo from "../../assets/Website/logo.png"; // Import the logo image

// List of footer links for navigation
const FooterLinks = [
  {
    title: "Home",
    link: "/#", // Home page link
  },
  {
    title: "About",
    link: "/#about", // Link to About section
  },
  {
    title: "Contact",
    link: "/#contact", // Link to Contact section
  },
];

const Footer = () => {
  return (
    <div className="bg-gray-400 dark:bg-gray-600"> {/* Footer background color */}
      <section className="container"> {/* Main container */}
        <div className="grid md:grid-cols-3 py-5"> {/* Grid layout with 3 columns for medium screens */}
          
          {/* Company Details Section */}
          <div className="py-8 px-4">
            {/* Company Logo and Name */}
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              <img src={Logo} alt="Logo" className="max-w-[50px]" /> {/* Logo Image */}
              ReadShelf {/* Company Name */}
            </h1>

            {/* Company Description */}
            <p className="">
              The Book Library is an online platform that allows users to search for books,
              view detailed information about them, and manage their personal reading list.
            </p>
            <br />

            {/* Company Address */}
            <div className="flex items-center gap-3">
              <FaLocationArrow /> {/* Location Icon */}
              <p>38th Street, Los Angeles</p> {/* Address */}
            </div>

            {/* Company Contact Number */}
            <div className="flex items-center gap-3 mt-3">
              <FaMobileAlt /> {/* Mobile Icon */}
              <p>+97 55743578</p> {/* Contact Number */}
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 mt-6">
              {/* Instagram */}
              <a href="#">
                <FaInstagram className="text-3xl" /> {/* Instagram Icon */}
              </a>

              {/* Facebook */}
              <a href="#">
                <FaFacebook className="text-3xl" /> {/* Facebook Icon */}
              </a>

              {/* LinkedIn */}
              <a href="#">
                <FaLinkedin className="text-3xl" /> {/* LinkedIn Icon */}
              </a>
            </div>
          </div>

          {/* Navigation Links Section */}
          <div className="col-span-2 md:pl-10"> {/* This takes two columns on medium screens */}
            <div className="py-8 px-4">
              <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                Important Links {/* Links Title */}
              </h1>

              {/* List of Important Links */}
              <ul className={`flex flex-col gap-3`}>
                {FooterLinks.map((link) => (
                  <li key={link.title} className="cursor-pointer hover:translate-x-1 duration-300 hover:text-primary space-x-1 text-gray-500">
                    <span>&#11162;</span> {/* Arrow Icon */}
                    <span>{link.title}</span> {/* Link Title */}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Text */}
        <div>
          <div className="text-center py-10 border-t-2 border-gray-300/50">
            @copyright 2024 . All rights reserved {/* Copyright Message */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer; 
