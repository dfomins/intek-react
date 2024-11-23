import { useState } from 'react';
import { users } from './Data/Data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';

function Work() {
  const [value, setValue] = useState(dayjs(new Date()));

  console.log(value);

  function setBackground(index) {
    if(index % 2 == 0) {
        return "bg-[#F3F3F3]";
    } else {
        return "bg-white";
    }
  }

  return(
    <div className="panel-width my-14">
      <h1 className="page-title">Darbs</h1>
      <div className="max-h-[600px] flex max-md:flex-col">
        <div className="px-3 border-r border-gray bg-white">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar value={value} disableFuture onChange={(newValue) => setValue(newValue)}/>
          </LocalizationProvider>
        </div>
        <div className="w-full overflow-y-auto">
          <table className="table-auto w-full shadow-sm ">
            <thead className="text-white">
              <tr>
                  <th className="ps-6 p-3 text-start sticky top-0 left-0 z-10 bg-system-blue">Nr.</th>
                  <th className="p-3 text-start sticky top-0 bg-system-blue">Vārds</th>
                  <th className="p-3 text-start sticky top-0 bg-system-blue">Uzvārds</th>
                  <th className="p-3 text-start sticky top-0 bg-system-blue">Stundas</th>
                  <th className="min-w-[75px] p-3 sticky top-0 right-0 z-10 bg-system-blue"><FontAwesomeIcon icon={faGear} /></th>
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
                        <FontAwesomeIcon icon={faTrash} className="cursor-pointer"/>
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
