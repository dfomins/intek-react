// class 'page-title', 'bg-system-blue-hovered' is defined in the 'index.css' file

import { Link } from "react-router-dom";
import { useState } from "react";
import NotesRender from "./NotesRender";

function Notes() {
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
      <h1 className="page-title">Privātās piezīmes</h1>
      <div>
        <div className="mb-3 flex max-sm:flex-col">
          <input className="sm:mr-2 max-sm:mb-2 system-input" placeholder="Meklēt pēc nosaukuma" onChange={handleChange} value={searchInput} />
          <select className="sm:w-40 system-input" onChange={orderChange}>
            <option value="desc">Jaunākās</option>
            <option value="asc">Vecākās</option>
          </select>
        </div>
        <NotesRender searchInput={searchInput} sortOrder={sortOrder} />
        <div className="flex justify-center">
          <button className="h-12 px-3 system-button bg-system-blue text-white hover:bg-system-green shadow-sm">
            <Link to="/piezimes/jauna">Pievienot jaunu</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notes;
