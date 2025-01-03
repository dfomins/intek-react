import { useParams } from "react-router-dom";
import { buildings } from "../Data/Data";
import TopPanel from "../NotesNotificationsBlocks/DetailTopPanel";

function BuildingDetail() {
  const params = useParams();
  const building = buildings[params.id - 1];

  return (
    <div className="w-full flex flex-col items-center">
      <TopPanel title={building.title} />
      <div className="panel-width mt-5">
        <div className="flex flex-col lg:flex-row">
          <div className="flex justify-center">
            <img src={building.image} className="lg:max-w-96 max-h-64" />
          </div>
          <ul className="max-lg:mt-5 lg:ms-5 text-xl">
            <li>
              <span className="font-semibold">Pilsēta:</span> {building.city}
            </li>
            <li>
              <span className="font-semibold">Iela:</span> {building.street}
            </li>
          </ul>
        </div>
        <h2 className="mt-3 font-semibold">Informācija:</h2>
        <p className="break-words text-lg">{building.description}</p>
      </div>
    </div>
  );
}

export default BuildingDetail;
