import React, { useEffect, useState } from "react";
import Button from "./Button";
import { TiLocationArrow, TiThMenu, TiTimes } from "react-icons/ti";
import { useRef } from "react";
import { useWindowScroll } from "react-use";
import { Link } from "react-router-dom";

const navitems = ["home", "Ai", "Short Films", "About", "Account"];

const Navbar = () => {
  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  return (
    <div
      ref={navContainerRef}
      className={`fixed inset-x-0 top-4 h-16 z-50 border-none transition-all duration-700 sm:inset-x-6 ${!isVisible && !isMobileMenuOpen ? "-translate-y-24" : ""}`}
    >
      <header className="absolute w-full top-1/2 -translate-y-1/2 z-50">
        <nav className="flex justify-between items-center size-full p-4">
          <div className="flex gap-7 items-center">
            <img src="./img/logo.png" alt="logo" className="w-10" />
            <Button
              id="product-button"
              tital="Request movies"
              righticon={<TiLocationArrow />}
              containerClass="!bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navitems.map((item) => (
                <Link
                  key={item}
                  className="nav-hover-btn"
                  to={`/${item.toLowerCase().replace(" ", "-")}`}
                >
                  {" "}
                  {item}
                </Link>
              ))}
            </div>

            <button
              className="ml-4 p-2 text-white md:hidden relative z-50"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <TiTimes className="size-8" />
              ) : (
                <TiThMenu className="size-8" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md md:hidden">
          {navitems.map((item) => (
            <Link
              key={item}
              className="nav-hover-btn my-4 text-2xl"
              to={`/${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
