import Datepicker from "react-tailwindcss-datepicker";
import { useState } from "react";
import { users } from "./Data/Data";
import { buildings } from "./Data/Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Work() {
  const [dateValue, setDateValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [date, setDate] = useState(new Date());

  const handleDateChange = (date) => {
    setDate(date);
    console.log(date);
  };

  const customTheme = {
    popup: {
      root: {
        inner: "inline-block rounded-lg bg-white p-4 dark:bg-gray-700",
      },
      footer: {
        button: {
          base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium",
        },
      },
    },
  };

  return (
    <div className="panel-width my-14">
      <h1 className="page-title">Darbs</h1>
      <div className="max-h-[1000px] md:max-h-[600px] flex max-md:flex-col shadow-md">
        <div className="flex flex-col items-center p-5 border-r border-gray bg-white">
          <div>
            <label>Datums:</label>
            <Datepicker
              i18n={"lv"}
              startWeekOn="mon"
              primaryColor={"green"}
              inputClassName="system-input w-full mb-3 text-md cursor-pointer"
              toggleClassName="absolute right-0 px-3 mt-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
              displayFormat="DD/MM/YYYY"
              useRange={false}
              asSingle={true}
              readOnly={true}
              value={dateValue}
              onChange={(newValue) => setDateValue(newValue)}
            />
          </div>
          <div>
            <label>Darbinieki:</label>
            <select className="system-input w-full cursor-pointer">
              <option value="all">Visos objektos</option>
              {buildings.map((building) => (
                <option key={building.id} value={building.id}>
                  {building.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full overflow-y-auto">
          <table className="table-auto w-full shadow-sm">
            <thead className="text-white">
              <tr>
                <th className="ps-6 p-3 text-start sticky top-0 left-0 z-10 bg-system-blue">Nr.</th>
                <th className="p-3 text-start sticky top-0 bg-system-blue">Vārds</th>
                <th className="p-3 text-start sticky top-0 bg-system-blue">Uzvārds</th>
                <th className="p-3 text-start sticky top-0 bg-system-blue">Stundas</th>
                <th className="min-w-[75px] p-3 sticky top-0 right-0 z-10 bg-system-blue">
                  <FontAwesomeIcon icon={faGear} />
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="even:bg-white">
                  <td className="ps-6 p-3 text-start sticky left-0">{user.id}</td>
                  <td className="p-3 text-start">{user.name}</td>
                  <td className="p-3 text-start">{user.surname}</td>
                  <td className="p-3 text-start"></td>
                  <td className="p-3 text-center sticky right-0">
                    <FontAwesomeIcon icon={faPen} className="mr-3 cursor-pointer" />
                    <FontAwesomeIcon icon={faTrash} className="cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Work;
