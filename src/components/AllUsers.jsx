import { users } from "./Data";

function AllUsers() {
    return (
        <div className="w-11/12 xl:w-[1200px] l:w-[950px]">
            <h1 className="page-title">Visi lietotāji</h1>
            <div>
                <div className="mb-2 flex justify-between">
                    <button className="px-2 bg-system-blue hover:bg-system-green duration-100 rounded-sm text-white">Izveidot jaunu lietotāju</button>
                    <input type="text"  className="system-input" placeholder="Meklēt..."/>
                </div>
                <div className="h-[500px] overflow-auto">
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
                            {users.map(user => (
                                <tr key={user.id} className={`${user.id % 2 == 0 ? "bg-[#F3F3F3]" : "bg-white"}`}>
                                    <td className={`p-3 text-start sticky left-0 ${user.id % 2 == 0 ? "bg-[#F3F3F3]" : "bg-white"}`}>{user.id}</td>
                                    <td className="p-3 text-start">{user.name}</td>
                                    <td className="p-3 text-start">{user.surname}</td>
                                    <td className="p-3 text-start">{user.email}</td>
                                    <td className="p-3 text-start">{user.objects}</td>
                                    <td className="p-3 text-start">{user.role}</td>
                                    <td className={`p-3 text-center sticky right-0 ${user.id % 2 == 0 ? "bg-[#F3F3F3]" : "bg-white"}`}>
                                        <i className="fa-solid fa-pen-to-square mr-3 cursor-pointer" />
                                        <i className="fa-solid fa-trash cursor-pointer"></i>
                                    </td>
                                </tr>
                            ))}
                            {/* <tr className="bg-white border-t-2 border-[#2b6777]">
                                <td className="p-2 text-start" colSpan={7}>Kopā: {users.length}</td>
                            </tr> */}
                        </tbody>
                    </table>  
                </div>
                <div className="p-3 bg-white border-t-2 border-[#2b6777]">
                    Kopā: {users.length}
                </div>
            </div>
        </div>
    )
}

export default AllUsers;