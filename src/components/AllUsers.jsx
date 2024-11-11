import { users } from "./Data";

function AllUsers() {
    return (
        <div className="w-11/12 xl:w-[1200px] l:w-[950px]">
            <h1 className="page-title">Visi lietotāji</h1>
            <div>
                <input type="text"  className="system-input float-right mb-2" placeholder="Meklēt..."/>
                <table className="w-full shadow-sm">
                    <thead className="bg-system-blue text-white">
                        <tr className="border border-black">
                            <th className="p-2 text-start">Nr.</th>
                            <th className="p-2 text-start">Vārds</th>
                            <th className="p-2 text-start">Uzvārds</th>
                            <th className="p-2 text-start">E-pasts</th>
                            <th className="p-2 text-start">Objekti</th>
                            <th className="p-2 text-start">Loma</th>
                            <th className="p-2 text-start">Iestatījumi</th>
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
                                <td className="p-2 text-start">Asd</td>
                            </tr>
                        ))}
                        <tr>
                            <td className="p-2 text-start" colSpan={7}>Kopā: {users.length}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllUsers;