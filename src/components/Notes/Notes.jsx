// class 'page-title', 'bg-system-blue-hovered' is defined in the 'index.css' file

import { Link } from "react-router-dom";
import { useState } from "react";
import { notes } from "../Data/Data";

function Notes() {
  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const orderChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Piezīmju meklēšana pēc teksta meklēšanas laukumā ievadītā teksta
  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().match(searchInput.toLowerCase());
  });

  // Piezīmju filtrēšana pēc izveidošanas datuma
  const sortedNotes = filteredNotes.sort((firstNote, secondNote) => {
    if (sortOrder == "desc") {
      return new Date(secondNote.createdAt) - new Date(firstNote.createdAt);
    } else {
      return new Date(firstNote.createdAt) - new Date(secondNote.createdAt);
    }
  });

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
        {sortedNotes.length > 0 ? (
          <ul className="h-[600px] mb-5 overflow-y-scroll text-white">
            {sortedNotes.map((note, index) => (
              <li key={note.id} className={`${index == notes.length - 1 ? "" : "mb-2"}`}>
                <Link to={`${note.id}`}>
                  <div className="p-3 bg-system-blue hover:bg-system-blue-hovered rounded-sm">
                    <h4 className="font-medium truncate">{note.title}</h4>
                    <p>{note.createdAt.toLocaleDateString()}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="h-[600px]">
            <h2 className="mt-8 text-center">Piezīmes netika atrastas!</h2>
          </div>
        )}
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
