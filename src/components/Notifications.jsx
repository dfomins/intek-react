// class 'page-title' is defined in the 'index.css' file

import { Link } from "react-router-dom";

function Notifications() {
  return (
    <div className="w-11/12 xl:w-[1200px] lg:w-[950px]">
      <h1 className="page-title">Paziņojumi</h1>
      <div>
        <div className="mb-3 flex max-sm:flex-col">
          <input className="sm:mr-2 max-sm:mb-2 system-input" placeholder="Meklēt pēc nosaukuma" />
          <select className="sm:w-40 system-input">
            <option value="desc">Jaunākie</option>
            <option value="asc">Vecākie</option>
          </select>
        </div>
        <ul className="h-[500px] mb-5 overflow-y-scroll text-white">
          <li>
            <Link to="1">
              <div className="p-3 bg-system-blue hover:bg-system-blue-hovered rounded-sm">
                <p className="text-lg font-medium truncate">Paziņojums 1</p>
                <p>04/11/2024 11:53</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="2">
              <div className="mt-3 p-3 bg-system-blue hover:bg-system-blue-hovered rounded-sm">
                <p className="text-lg font-medium truncate">Paziņojums 2</p>
                <p>05/12/2024 12:03</p>
              </div>
            </Link>
          </li>
        </ul>
        <div className="flex justify-center">
          <button className="h-12 px-3 bg-system-blue hover:bg-system-green duration-100 rounded-sm text-white">
            Pievienot jaunu
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
