import { useState } from "react";
import { users } from "./Data/Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";

function AllUsers() {
  // Meklēšana
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Lietotāju meklēšana pēc teksta meklēšanas laukumā ievadītā teksta
  const filteredUsers = users.filter((user) => {
    return (user.name + " " + user.surname).toLowerCase().match(searchInput.toLowerCase());
  });

  const [editingUserId, setEditingUserId] = useState(null);

  // Lietotāja informācijas rediģešana
  const startEditing = (user) => {
    setEditingUserId(user.id);
  };

  // Saglabāt lietotāja informācijas izmaiņas (nav līdz galam realizēts)
  const saveChanges = () => {
    setEditingUserId(null);
  };

  // Atcelt lietotāja informācijas izmaiņas
  const cancelEdit = () => {
    setEditingUserId(null);
  };

  return (
    <div className="panel-width my-14">
      <h1 className="page-title">Visi lietotāji</h1>
      <div>
        <div className="mb-2 flex max-md:flex-col justify-between">
          <input type="text" className="system-input" placeholder="Meklēt..." onChange={handleSearchChange} value={searchInput} />
        </div>
        <div className="h-[600px] overflow-auto">
          <table className="table-auto w-full shadow-sm">
            <thead className="text-white">
              <tr>
                <th className="p-3 text-center sticky top-0 left-0 z-20 bg-system-blue">Nr.</th>
                <th className="p-3 text-start sticky top-0 bg-system-blue">Vārds</th>
                <th className="p-3 text-start sticky top-0 bg-system-blue">Uzvārds</th>
                <th className="p-3 text-start sticky top-0 bg-system-blue">E-pasts</th>
                <th className="p-3 text-start sticky top-0 bg-system-blue">Objekti</th>
                <th className="p-3 text-start sticky top-0 bg-system-blue">Loma</th>
                <th className="min-w-[75px] p-3 sticky top-0 right-0 z-10 bg-system-blue">
                  <FontAwesomeIcon icon={faGear} />
                </th>
              </tr>
            </thead>
            <tbody className="min-h-[500px]">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="even:bg-white">
                  {editingUserId == user.id ? (
                    <>
                      <td className="p-3 text-center sticky left-0 text-white bg-system-blue">{user.id}</td>
                      <td className="p-3 text-start">
                        <input type="text" className="system-input max-w-48" value={user.name} />
                      </td>
                      <td className="p-3 text-start">
                        <input type="text" className="system-input max-w-48" value={user.surname} />
                      </td>
                      <td className="p-3 text-start">
                        <input type="text" className="system-input max-w-64" value={user.email} />
                      </td>
                      <td className="p-3 text-start">{user.buildings.join(", ")}</td>
                      <td className="p-3 text-start">{user.role}</td>
                      <td className="p-3 text-center sticky right-0 text-white bg-system-blue">
                        <FontAwesomeIcon icon={faCheck} className="mr-3 cursor-pointer" onClick={() => saveChanges()} />
                        <FontAwesomeIcon icon={faBan} className="cursor-pointer" onClick={() => cancelEdit()} />
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3 text-center sticky left-0 text-white bg-system-blue">{user.id}</td>
                      <td className="p-3 text-start">{user.name}</td>
                      <td className="p-3 text-start">{user.surname}</td>
                      <td className="p-3 text-start">{user.email}</td>
                      <td className="p-3 text-start">{user.buildings.join(", ")}</td>
                      <td className="p-3 text-start">{user.role}</td>
                      <td className="p-3 text-center sticky right-0 text-white bg-system-blue">
                        <FontAwesomeIcon icon={faPen} className="mr-3 cursor-pointer" onClick={() => startEditing(user)} />
                        <FontAwesomeIcon icon={faTrash} className="cursor-pointer" />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
            <tbody>
              <tr>
                <td colSpan={7} className="p-3 sticky bottom-0 border-t-2 border-[#52ab98] bg-white">
                  Kopā: {users.length}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
