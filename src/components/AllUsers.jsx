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
                <table className="w-full shadow-sm">
                    <thead className="bg-system-blue text-white">
                        <tr className="border border-black">
                            <th className="p-2 text-start">Nr.</th>
                            <th className="p-2 text-start">Vārds</th>
                            <th className="p-2 text-start">Uzvārds</th>
                            <th className="p-2 text-start">E-pasts</th>
                            <th className="p-2 text-start">Objekti</th>
                            <th className="p-2 text-start">Loma</th>
                            <th className="p-2">Iestatījumi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className={`${user.id % 2 == 0 ? "bg-[#F3F3F3]" : "bg-white"}`}>
                                <td className="p-2 text-start">{user.id}</td>
                                <td className="p-2 text-start">{user.name}</td>
                                <td className="p-2 text-start">{user.surname}</td>
                                <td className="p-2 text-start">{user.email}</td>
                                <td className="p-2 text-start">{user.objects}</td>
                                <td className="p-2 text-start">{user.role}</td>
                                <td className="p-2 text-center">
                                    <i className="fa-solid fa-pen-to-square mr-3" />
                                    <i className="fa-solid fa-trash"></i>
                                </td>
                            </tr>
                        ))}
                        <tr className="text-white">
                            <td className="p-2 bg-system-blue text-start" colSpan={7}>Kopā: {users.length}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllUsers;