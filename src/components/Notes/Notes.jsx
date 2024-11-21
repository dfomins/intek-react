// class 'page-title', 'bg-system-blue-hovered' is defined in the 'index.css' file

import { Link } from "react-router-dom";
import { notes } from "../Data";

function Notes() {
  return (
    <div className="panel-width my-14">
      <h1 className="page-title">Privātās piezīmes</h1>
      <div>
        <div className="mb-3 flex max-sm:flex-col">
          <input className="sm:mr-2 max-sm:mb-2 system-input" placeholder="Meklēt pēc nosaukuma" />
          <select className="sm:w-40 system-input">
            <option value="desc">Jaunākās</option>
            <option value="asc">Vecākās</option>
          </select>
        </div>
        <ul className="h-[600px] mb-5 overflow-y-scroll text-white">
        {notes.map((note, index) => (
          <li key={note.id} className={`${index == notes.length - 1 ? "" : "mb-2"}`}>
            <Link to={`${note.id}`}>
              <div className="p-3 bg-system-blue hover:bg-system-blue-hovered rounded-sm">
                <p className="text-lg font-medium truncate">{note.title}</p>
                <p>{note.createdAt.toLocaleDateString()}</p>
              </div>
            </Link>
          </li>
        ))}
        </ul>
        <div className="flex justify-center">
          <button className="h-12 px-3 system-button hover:bg-system-green hover:text-white shadow-sm">
            Pievienot jaunu
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notes;