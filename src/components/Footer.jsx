import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="flex justify-center py-10 bg-system-green text-white">
      <div className="w-11/12 xl:w-[1200px] lg:w-[950px] flex justify-between flex-wrap">
        <div className="w-full md:w-6/12 mb-3">
          <h3 className="mb-3 font-semibold">Par mums</h3>
          <p>Intek - moderns portāls, lai jūs varētu veidot darba atskaites savā uzņēmumā. Viegla atskaišu sistēma ļaus atzīmēt stundu skaitu katram darbiniekam pāris minūšu garumā.</p>
        </div>
        <div className="max-md:w-6/12 mb-3">
          <h3 className="text-[20px] font-semibold">Saites</h3>
          <ul>
            <li>
              <Link to="/">Profils</Link>
            </li>
            <li>
              <Link to="/piezimes">Piezīmes</Link>
            </li>
            <li>
              <Link to="/pazinojumi">Paziņojumi</Link>
            </li>
            <li>
              <Link to="/darbs">Darbs</Link>
            </li>
            <li>
              <Link to="/atskaite">Atskaite</Link>
            </li>
            <li>
              <Link to="/darba_objekti">Objekti</Link>
            </li>
          </ul>
        </div>
        <div className="mb-3">
          <h3 className="mb-3 font-semibold">Kontakti</h3>
          <div className="flex gap-2 items-center">
            <i className="fa-solid fa-phone" />
            <p>+371 12345678</p>
          </div>
          <div className="flex gap-2 items-center">
            <i className="fa-solid fa-envelope" />
            <p>info@intek.lv</p>
          </div>
          <div className="flex gap-2 items-center">
            <i className="fa-solid fa-location-dot" />
            <p>Jelgava, Lielā iela 2</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
