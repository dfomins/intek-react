// class 'page-title' is defined in the 'index.css' file

import { Link } from "react-router-dom";
import { notifications } from "./Data";

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
          {notifications.map((notification, index) => (
            <li key={notification.id} className={`${index == notifications.length - 1 ? "" : "mb-2"}`}>
              <Link to={notification.id}>
                <div className="p-3 bg-system-blue hover:bg-system-blue-hovered rounded-sm">
                  <p className="text-lg font-medium truncate">{notification.title}</p>
                  <p>{notification.createdAt}</p>
                  <p>Izveidoja: {notification.createdBy}</p>
                </div>
              </Link>
            </li>
          ))}
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
