// class 'page-title' is defined in the 'index.css' file

import { useState } from "react";

import NotificationsRender from "./NotificationsRender";

function Notifications() {
  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  }

  const orderChange = (e) => {
    setSortOrder(e.target.value);
  }

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
        <NotificationsRender searchInput={searchInput} sortOrder={sortOrder} />
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
