import React from "react";
import { Link as RouterLink } from "react-router-dom"; // Renamed Link to avoid conflict with react-scroll
import { Link as ScrollLink } from "react-scroll"; // Import react-scroll for smooth scrolling
import LibImage from "../../assets/Website/lib.png";
import UserIcon from "../../assets/website/user.png"; 
import DarkMode from "./DarkMode";
import { FaCaretDown } from "react-icons/fa"; 

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/home",
  },
  {
    id: 2,
    name: "Explore",
    link: "/explore",
  },
];

const DropdownLinks = [
  {
    name: "Current Reads",
    scrollTo: "currently-reading", // Updated for scrolling
  },
  {
    name: "Explore",
    link: "/explore",
  },
  {
    name: "Reading Lists",
    link: "/#",
  },
];

const Navbar = ({ handlereadNowPopup }) => {
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200">
      <div className="container py-4 sm:py-0">
        <div className="flex justify-between items-center">
          <div>
            <RouterLink to="/" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={LibImage} alt="LibImage" className="w-10" />
              ReadShelf
            </RouterLink>
          </div>
          <div className="flex justify-between items-center gap-5">
            <div>
              <DarkMode />
            </div>
            <ul className="hidden sm:flex items-center gap-4">
              {Menu.map((menu) => (
                <li key={menu.id} className="flex items-center">
                  <RouterLink
                    to={menu.link}
                    className="inline-block py-5 px-4 hover:text-primary duration-200 cursor-pointer"
                  >
                    {menu.name}
                  </RouterLink>
                </li>
              ))}

              <li className="group relative cursor-pointer">
                <RouterLink
                  to="/#home"
                  className="flex h-[72px] items-center gap-[2px]"
                >
                  My Library{" "}
                  <span>
                    <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                  </span>
                </RouterLink>
                <div className="absolute -left-9 z-[9999] hidden w-[150px] rounded-md bg-white p-2 text-black group-hover:block">
                  <ul className="space-y-3">
                    {DropdownLinks.map((data) => (
                      <li key={data.name}>
                        {data.scrollTo ? (
                          // Use ScrollLink for smooth scrolling
                          <ScrollLink
                            to={data.scrollTo}
                            smooth={true}
                            duration={500}
                            offset={-70} // Adjust to ensure proper positioning
                            className="inline-block w-full rounded-md p-2 hover:bg-primary/20 cursor-pointer"
                          >
                            {data.name}
                          </ScrollLink>
                        ) : (
                          <RouterLink
                            className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                            to={data.link}
                          >
                            {data.name}
                          </RouterLink>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li className="group relative cursor-pointer">
                <div className="flex items-center gap-2">
                  <img
                    src={UserIcon}
                    alt="UserIcon"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                </div>
                <div className="absolute right-0 z-[9999] hidden w-[150px] rounded-md bg-white p-2 text-black group-hover:block">
                  <ul className="space-y-3">
                    {/* Add user-specific dropdown links */}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
