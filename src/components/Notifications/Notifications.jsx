// class 'page-title' is defined in the 'index.css' file

import { useState } from "react";
import { Link } from "react-router-dom";
import { notifications } from "../Data/Data";

function Notifications() {
  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  }

  const orderChange = (e) => {
    setSortOrder(e.target.value);
  }

  const filteredNotifications = notifications.filter((notification) => {
    return notification.title.toLowerCase().match(searchInput.toLowerCase());
  });

  const sortedNotifications = filteredNotifications.sort((firstNotif, secondNotif) => {
    if (sortOrder == "desc") {
      return new Date(secondNotif.createdAt) - new Date(firstNotif.createdAt);
    } else {
      return new Date(firstNotif.createdAt) - new Date(secondNotif.createdAt);
    }
  });

  return (
    <div className="panel-width my-14">
      <h1 className="page-title">Paziņojumi</h1>
      <div>
        <div className="mb-3 flex max-sm:flex-col">
          <input className="sm:mr-2 max-sm:mb-2 system-input" placeholder="Meklēt pēc nosaukuma" onChange={handleChange} value={searchInput} />
          <select className="sm:w-40 system-input" onChange={orderChange}>
            <option value="desc">Jaunākie</option>
            <option value="asc">Vecākie</option>
          </select>
        </div>
        <ul className="h-[600px] mb-5 overflow-y-scroll text-white">
          {sortedNotifications.map((notification, index) => (
            <li key={notification.id} className={`${index == notifications.length - 1 ? "" : "mb-2"}`}>
              <Link to={`${notification.id}`}>
                <div className="p-3 bg-system-blue hover:bg-system-blue-hovered rounded-sm">
                  <p className="text-lg font-medium truncate">{notification.title}</p>
                  <p>{notification.createdAt.toLocaleDateString()}</p>
                  <p>Izveidoja: {notification.createdBy}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <button className="h-12 px-3 system-button bg-system-blue hover:bg-system-green text-white shadow-sm">
            Pievienot jaunu
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
