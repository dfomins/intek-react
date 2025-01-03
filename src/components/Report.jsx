import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { users } from "./Data/Data";

function Report() {
  const [userId, setUserId] = useState(users[0].id);

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  let date = new Date();

  const [value, setValue] = useState({
    startDate: new Date(date.getFullYear(), date.getMonth(), 1),
    endDate: date,
  });

  const userWorkData = () => {
    return users.find((user) => user.id == userId).work.filter((work) => work.date >= value.startDate && new Date(work.date).setHours(0, 0, 0, 0) <= value.endDate);
  };

  const displayedData = userWorkData();

  const maxDate = new Date();

  return (
    <div className="panel-width my-14">
      <h1 className="page-title">Atskaite</h1>
      <div className="flex flex-col md:flex-row mb-5">
        <div className="md:w-4/12 max-md:mb-2">
          <Datepicker displayFormat="DD/MM/YYYY" maxDate={maxDate} readOnly={true} separator="-" value={value} onChange={(newValue) => setValue(newValue)} />
        </div>
        <select className="md:ms-5 rounded-lg" onChange={handleChange}>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.id + ". " + user.name + " " + user.surname}
            </option>
          ))}
        </select>
      </div>
      <div className="max-h-[800px] overflow-y-auto">
        <table className="w-full text-left overflow-y-auto">
          <thead className="text-white">
            <tr>
              <th className="p-3 sticky top-0 bg-system-blue">Datums</th>
              <th className="sticky top-0 bg-system-blue">Stundas</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {displayedData.map((work) => (
              <tr key={work.id}>
                <td className="p-2">
                  {work.date.toLocaleDateString("lv-LV", {
                    day: "numeric",
                    month: "long",
                  })}
                </td>
                <td>{work.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;
