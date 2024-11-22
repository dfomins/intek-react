import { Link } from "react-router-dom";
import { buildings } from "./Data/Data";

function Buildings() {  
  return(
    <div className="panel-width my-14">
      <h1 className="page-title">Darba objekti</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {buildings.map((building, index) => (
            <Link to={`${building.id}`} key={building.id}>
              <div className="max-md:max-w-[350px] max-md:mx-auto shadow-md">
                <img src={building.image} className="h-[300px] object-cover drop-shadow-2xl" />
                <div className="bg-system-blue p-3 text-white">
                  {building.title}
                </div>
              </div>
            </Link>
        ))}
      </div>
    </div>
  );
}

export default Buildings;
