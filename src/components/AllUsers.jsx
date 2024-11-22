import { useState } from "react";
import { users } from "./Data/Data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function AllUsers() {
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    }

    const filteredUsers = users.filter((user) => {
        return (user.name + " " + user.surname).toLowerCase().match(searchInput.toLowerCase());
    });

    function setBackground(index) {
        if(index % 2 == 0) {
            return "bg-[#F3F3F3]";
        } else {
            return "bg-white";
        }
    }

    return (
        <div className="panel-width my-14">
            <h1 className="page-title">Visi lietotāji</h1>
            <div>
                <div className="mb-2 flex justify-between">
                    <button className="px-2 system-button bg-system-blue text-white hover:bg-system-green">Izveidot jaunu lietotāju</button>
                    <input type="text"  className="system-input" placeholder="Meklēt..." onChange={handleChange} value={searchInput}/>
                </div>
                <div className="h-[600px] overflow-auto">
                    <table className="table-auto w-full shadow-sm">
                        <thead className="text-white">
                            <tr>
                                <th className="p-3 text-start sticky top-0 left-0 z-10 bg-system-blue">Nr.</th>
                                <th className="p-3 text-start sticky top-0 bg-system-blue">Vārds</th>
                                <th className="p-3 text-start sticky top-0 bg-system-blue">Uzvārds</th>
                                <th className="p-3 text-start sticky top-0 bg-system-blue">E-pasts</th>
                                <th className="p-3 text-start sticky top-0 bg-system-blue">Objekti</th>
                                <th className="p-3 text-start sticky top-0 bg-system-blue">Loma</th>
                                <th className="min-w-[75px] p-3 sticky top-0 right-0 z-10 bg-system-blue"><FontAwesomeIcon icon={faGear} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={user.id} className={`${setBackground(index)}`}>
                                    <td className={`p-3 text-start sticky left-0 ${setBackground(index)}`}>{user.id}</td>
                                    <td className="p-3 text-start">{user.name}</td>
                                    <td className="p-3 text-start">{user.surname}</td>
                                    <td className="p-3 text-start">{user.email}</td>
                                    <td className="p-3 text-start">{user.objects.join(', ')}</td>
                                    <td className="p-3 text-start">{user.role}</td>
                                    <td className={`p-3 text-center sticky right-0 ${setBackground(index)}`}>
                                        <FontAwesomeIcon icon={faPen} className="mr-3 cursor-pointer" />
                                        <FontAwesomeIcon icon={faTrash} className="cursor-pointer"/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="p-3 sticky bottom-0 border-t-2 border-[#52ab98] bg-white">
                        Kopā: {users.length}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllUsers;