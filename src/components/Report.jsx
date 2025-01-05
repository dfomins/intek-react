import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { users } from "./Data/Data";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

function Report() {
  const [userId, setUserId] = useState(users[0].id);

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  let date = new Date();

  const [dateValue, setDateValue] = useState({
    startDate: new Date(date.getFullYear(), date.getMonth(), 1),
    endDate: new Date(),
  });

  // Atlasa darbinieka nostrādātās darba stundas konkrētā datumu periodā
  const userWorkData = () => {
    return users.find((user) => user.id == userId).work.filter((work) => work.date >= dateValue.startDate && new Date(work.date).setHours(0, 0, 0, 0) <= dateValue.endDate);
  };

  const data = userWorkData().map((item) => ({
    datums: item.date.toLocaleDateString("en-GB"),
    uv: item.time,
  }));

  const renderLineChart = (
    <div className="w-full h-[400px] me-8">
      <ResponsiveContainer>
        <LineChart data={data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="datums" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="panel-width my-14">
      <h1 className="page-title">Atskaite</h1>
      <div className="flex flex-col md:flex-row mb-5">
        <div className="md:w-4/12 max-md:mb-2 z-20">
          <Datepicker
            i18n="lv"
            startWeekOn="mon"
            primaryColor={"green"}
            inputClassName="system-input w-full cursor-pointer"
            displayFormat="DD/MM/YYYY"
            maxDate={new Date()}
            readOnly={true}
            separator="-"
            value={dateValue}
            onChange={(newValue) => setDateValue(newValue)}
          />
        </div>
        <select className="system-input md:ms-5 rounded-lg cursor-pointer" onChange={handleChange}>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.id + ". " + user.name + " " + user.surname}
            </option>
          ))}
        </select>
      </div>
      <div className="h-[600px] bg-white shadow-sm">
        <div className="flex flex-col">
          <div className="-m-1.5">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-auto max-h-[600px]">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="">
                      <th scope="col" className="sticky top-0 z-10 px-6 py-3 text-start text-xs font-medium bg-white text-gray-500 uppercase">
                        Datums
                      </th>
                      <th scope="col" className="sticky top-0 z-10 px-6 py-3 text-start text-xs font-medium bg-white text-gray-500 uppercase">
                        Stundas
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {userWorkData().length > 0 ? (
                      userWorkData().map((work) => (
                        <tr key={work.id} className="even:bg-white">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{work.date.toLocaleDateString(["ban", "id"])}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{work.time}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="h-10 text-center">
                          Nav datu
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center p-5 bg-white mt-5 shadow-sm">
        <h1 className="page-title">Darba stundu grafiks</h1>
        {renderLineChart}
      </div>
    </div>
  );
}

export default Report;
