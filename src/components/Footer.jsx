import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className="flex justify-center py-10 bg-system-green text-white drop-shadow-md">
      <div className="w-11/12 xl:w-[1200px] lg:w-[950px] flex justify-between flex-wrap">
        <div className="w-full md:w-6/12 mb-3">
          <h3 className="mb-3 font-semibold">Par mums</h3>
          <p>Intek - moderns portāls, lai jūs varētu veidot darba atskaites savā uzņēmumā. Viegla atskaišu sistēma ļaus atzīmēt stundu skaitu katram darbiniekam pāris minūšu garumā.</p>
        </div>
        <div className="max-md:w-6/12 mb-3">
          <h3 className="mb-3 text-[20px] font-semibold">Papildus</h3>
          <ul>
            <li className="mb-2">
              <Link to="/kontakti">Kontakti</Link>
            </li>
            <li>
              <Link to="/">Atsauksmes</Link>
            </li>
          </ul>
        </div>
        <div className="mb-3">
          <h3 className="mb-3 font-semibold">Kontakti</h3>
          <div className="flex gap-2 items-center mb-2">
            <FontAwesomeIcon icon={faPhone} className="text-xl" />
            <p>+371 12345678</p>
          </div>
          <div className="flex gap-2 items-center mb-2">
            <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
            <p>info@intek.lv</p>
          </div>
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faLocationDot} className="text-xl" />
            <p>Jelgava, Lielā iela 2</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
