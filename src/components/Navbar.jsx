// class 'navbar-li' is defined in the 'index.css' file
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

function Navbar() {
  return (
    <nav className="min-w-[1000px] w-11/12 m-auto flex justify-between items-center h-20 drop-shadow-md overflow-hidden">
      <Link to="/">
        <img className="max-w-16" src={logo} alt="Logo" />
      </Link>
      <div>
        <ul className="flex space-x-7 uppercase font-bold tracking-wide">
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
    </nav>
  );
}

export default Navbar;
