import { users } from "./Data";

function AllUsers() {
    function setBackground(index) {
        if(index % 2 == 0) {
            return "bg-[#F3F3F3]";
        } else {
            return "bg-white";
        }
    }

    return (
        <div className="w-11/12 xl:w-[1200px] l:w-[950px]">
            <h1 className="page-title">Visi lietotāji</h1>
            <div>
                <div className="mb-2 flex justify-between">
                    <button className="px-2 bg-system-blue hover:bg-system-green duration-100 rounded-sm text-white">Izveidot jaunu lietotāju</button>
                    <input type="text"  className="system-input" placeholder="Meklēt..."/>
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
                                <th className="min-w-[75px] p-3 sticky top-0 right-0 z-10 bg-system-blue"><i className="fa-solid fa-gear" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id} className={`${setBackground(index)}`}>
                                    <td className={`p-3 text-start sticky left-0 ${setBackground(index)}`}>{user.id}</td>
                                    <td className="p-3 text-start">{user.name}</td>
                                    <td className="p-3 text-start">{user.surname}</td>
                                    <td className="p-3 text-start">{user.email}</td>
                                    <td className="p-3 text-start">{user.objects}</td>
                                    <td className="p-3 text-start">{user.role}</td>
                                    <td className={`p-3 text-center sticky right-0 ${setBackground(index)}`}>
                                        <i className="fa-solid fa-pen-to-square mr-3 cursor-pointer" />
                                        <i className="fa-solid fa-trash cursor-pointer"></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="p-3 sticky bottom-0 border-t-2 border-[#2b6777] bg-white">
                        Kopā: {users.length}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllUsers;