import { Datepicker } from "flowbite-react";

import { users } from "./Data/Data";
import { buildings } from "./Data/Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Work() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (date) => {
    setDate(date);
    console.log(date);
  };

  function setBackground(index) {
    if (index % 2 == 0) {
      return "bg-[#F3F3F3]";
    } else {
      return "bg-white";
    }
  }

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
        <div className="flex flex-col items-center pb-5 px-3 border-r border-gray bg-white">
          <Datepicker value={date} onChange={handleDateChange} theme={customTheme} inline maxDate={new Date()} weekStart={1} showClearButton={false} labelTodayButton="Šodiena" />
          <div className="px-4">
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
          <table className="table-auto w-full shadow-sm ">
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
                <tr key={user.id} className={`${setBackground(index)}`}>
                  <td className={`ps-6 p-3 text-start sticky left-0 ${setBackground(index)}`}>{user.id}</td>
                  <td className="p-3 text-start">{user.name}</td>
                  <td className="p-3 text-start">{user.surname}</td>
                  <td className="p-3 text-start"></td>
                  <td className={`p-3 text-center sticky right-0 ${setBackground(index)}`}>
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
