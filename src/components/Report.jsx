import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { users } from "./Data/Data";

function Report() {
  const maxDate = new Date();

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  return (
    <div className="panel-width my-14">
      <h1 className="page-title">Atskaite</h1>
      <div className="flex">
        <div className="w-4/12">
          <Datepicker displayFormat="DD/MM/YYYY" maxDate={maxDate} separator="-" value={value} onChange={(newValue) => setValue(newValue)} />
        </div>
        <select className="ms-5 rounded-lg">
          {users.map((user) => (
            <option value={user.id}>{user.id + ". " + user.name + " " + user.surname}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Report;
