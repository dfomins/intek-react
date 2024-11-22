// class 'navbar-li' is defined in the 'index.css' file
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { useState } from "react";

function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function changeState() {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <nav className="w-11/12 xl:min-w-[1200px] lg:min-w-[950px] h-[80px] flex m-auto justify-between md:justify-center lg:justify-between xl:justify-between items-center drop-shadow-md">
        <div className="md:hidden lg:block">
          <Link to="/">
            <img className="max-w-16" src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="max-md:hidden">
          <ul className="flex items-center space-x-7 uppercase font-bold tracking-wide">
            <Link to="/">
              <li className="tracking-widest navbar-li">Profils</li>
            </Link>
            <Link to="/piezimes">
              <li className="navbar-li">Piezīmes</li>
            </Link>
            <Link to="/pazinojumi">
              <li className="navbar-li">Paziņojumi</li>
            </Link>
            <Link to="/darbs">
              <li className="navbar-li">Darbs</li>
            </Link>
            <Link to="atskaite">
              <li className="navbar-li">Atskaite</li>
            </Link>
            <Link to="/darba_objekti">
              <li className="navbar-li">Objekti</li>
            </Link>
            <Link to="/login">
              <i className="fa-solid fa-arrow-right-from-bracket navbar-li" title="Iziet"></i>
            </Link>
          </ul>
        </div>
        <i className="fa-solid fa-bars text-lg md:hidden cursor-pointer" onClick={changeState}></i>
      </nav>
      <div className={`fixed w-60 h-full top-0 md:hidden duration-300 shadow-md z-20 bg-system-green text-white ${isMenuOpen ? "right-0" : "-right-60"}`}>
        <div className="flex justify-end">
          <i className="fa-solid fa-xmark px-5 pt-3 text-2xl cursor-pointer" onClick={changeState}/>
        </div>
        <div className="flex flex-col p-6">
          <ul className="tracking-widest" onClick={changeState}>
            <li className="mb-2 navbar-li">
              <Link to="/">Profils</Link>
            </li>
            <li className="mb-2 navbar-li">
              <Link to="/piezimes">Piezīmes</Link>
            </li>
            <li className="mb-2 navbar-li">
              <Link to="/pazinojumi">Paziņojumi</Link>
            </li>
            <li className="mb-2 navbar-li">
              <Link to="/darbs">Darbs</Link>
            </li>
            <li className="mb-2 navbar-li">
              <Link to="/atskaite">Atskaite</Link>
            </li>
            <li className="mb-2 navbar-li">
              <Link to="/darba_objekti">Objekti</Link>
            </li>
            <li className="navbar-li">
              <Link to="/login">
                <i className="fa-solid fa-arrow-right-from-bracket navbar-li" title="Iziet" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
