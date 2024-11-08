import { Link } from "react-router-dom";

function Notes() {
  return (
    <div className="w-11/12 xl:w-[1200px] lg:w-[950px]">
      <h1 className="text-center mb-7">Privātās piezīmes</h1>
      <div>
        <div className="mb-3 flex max-sm:flex-col">
          <input className="sm:mr-2 max-sm:mb-2 system-input" placeholder="Meklēt pēc nosaukuma" />
          <select className="sm:w-40 system-input">
            <option value="desc">Jaunākās</option>
            <option value="asc">Vecākās</option>
          </select>
        </div>
        <ul className="text-white">
          <li>
            <Link to="1">
              <div className="p-3 bg-system-blue rounded-sm">
                <p className="text-lg font-medium">Piezīme 1</p>
                <p>04/11/2024 11:53</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="2">
              <div className="mt-3 p-3 bg-system-blue rounded-sm">
                <p className="text-lg font-medium">Piezīme 2</p>
                <p>05/12/2024 12:03</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Notes;
