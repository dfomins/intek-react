import { useState } from "react";
import { Link } from "react-router-dom";
import { buildings } from "../Data/Data";
import { users } from "../Data/Data";

let user = users[0];

function Buildings() {
  const [checked, setChecked] = useState(false);

  const handleCheckedChange = (e) => {
    setChecked(e.target.checked);
  };

  const getFilteredBuildings = () => {
    return buildings.filter((building) => user.buildings.includes(building.id));
  };

  const displayedBuildings = checked ? getFilteredBuildings() : buildings;

  return (
    <div className="panel-width my-14">
      <h1 className="page-title">Darba objekti</h1>
      <div className="mb-2">
        <label className="cursor-pointer">
          <input type="checkbox" className="mr-2" checked={checked} onChange={handleCheckedChange} />
          <span className="font-medium text-lg align-middle">Mani objekti</span>
        </label>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {displayedBuildings.map((building) => (
          <Link to={`${building.id}`} key={building.id}>
            <div className="max-md:max-w-[350px] max-md:mx-auto shadow-md">
              <img src={building.image} className="h-[300px] object-cover drop-shadow-2xl" />
              <div className="bg-system-blue p-3 text-white">{building.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Buildings;
