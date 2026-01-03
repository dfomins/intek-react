import React, { useState, useEffect } from "react";
// import { users } from "./Data/Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";

// Service
import { userService } from "../services/userService";

function AllUsers() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userService.getUsers();
                console.log(response.data);
                const users = response.data.map((user) => ({
                    ...user,
                }));
                setUsers(users);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

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

            <div className="mb-2 flex max-md:flex-col justify-between">
                <input type="text" className="system-input" placeholder="Meklēt..." onChange={handleSearchChange} value={searchInput} />
            </div>

            <div className="overflow-x-auto">
                <div className="overflow-y-auto max-h-[600px] border rounded shadow-sm">
                    <table className="table-auto w-full min-w-[800px] border-collapse">
                        <thead className="bg-system-blue text-white">
                            <tr>
                                <th className="p-3 text-center sticky left-0 z-40 bg-system-blue">Nr.</th>
                                <th className="p-3 text-start">Vārds</th>
                                <th className="p-3 text-start">Uzvārds</th>
                                <th className="p-3 text-start">E-pasts</th>
                                <th className="p-3 text-start">Objekti</th>
                                <th className="p-3 text-start">Loma</th>
                                <th className="p-3 text-center sticky right-0 z-40 bg-system-blue">
                                    <FontAwesomeIcon icon={faGear} />
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredUsers.map((user, index) => {
                                const rowBg = index % 2 === 0 ? "bg-white" : "bg-gray-50";
                                const isEditing = editingUserId === user.id;

                                return (
                                    <React.Fragment key={user.id}>
                                        <tr className={`${rowBg} hover:bg-gray-100`}>
                                            <td className={`p-3 text-center sticky left-0 z-30 ${rowBg} whitespace-nowrap`}>{user.id}</td>
                                            {isEditing ? (
                                                <>
                                                    <td className={`p-3 text-start ${rowBg}`}>
                                                        <input
                                                            type="text"
                                                            className="system-input w-full"
                                                            value={user.name}
                                                            onChange={(e) => setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, name: e.target.value } : u)))}
                                                        />
                                                    </td>
                                                    <td className={`p-3 text-start ${rowBg}`}>
                                                        <input
                                                            type="text"
                                                            className="system-input w-full"
                                                            value={user.surname}
                                                            onChange={(e) => setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, surname: e.target.value } : u)))}
                                                        />
                                                    </td>
                                                    <td className={`p-3 text-start ${rowBg}`}>
                                                        <input
                                                            type="text"
                                                            className="system-input w-full"
                                                            value={user.email}
                                                            onChange={(e) => setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, email: e.target.value } : u)))}
                                                        />
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className={`p-3 text-start ${rowBg}`}>{user.name}</td>
                                                    <td className={`p-3 text-start ${rowBg}`}>{user.surname}</td>
                                                    <td className={`p-3 text-start ${rowBg}`}>{user.email}</td>
                                                </>
                                            )}
                                            <td className={`p-3 text-start ${rowBg}`}>{user.buildings?.join(", ") || "-"}</td>
                                            <td className={`p-3 text-start ${rowBg}`}>{user.role}</td>
                                            <td className={`p-3 text-center sticky right-0 z-30 ${rowBg} whitespace-nowrap`}>
                                                {isEditing ? (
                                                    <div className="flex gap-2">
                                                        <FontAwesomeIcon icon={faCheck} className="cursor-pointer text-green-500" onClick={() => setEditingUserId(null)} />
                                                        <FontAwesomeIcon icon={faBan} className="cursor-pointer text-red-500" onClick={() => setEditingUserId(null)} />
                                                    </div>
                                                ) : (
                                                    <div className="flex gap-2">
                                                        <FontAwesomeIcon icon={faPen} className="cursor-pointer text-blue-500" onClick={() => startEditing(user)} />
                                                        <FontAwesomeIcon icon={faTrash} className="cursor-pointer text-red-500" />
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                        {isEditing && (
                                            <tr className={`bg-gray-100 border-b`}>
                                                <td colSpan={7} className="p-3">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {/* Personal code */}
                                                        <div className="flex flex-col">
                                                            <label className="text-sm">Personas kods</label>
                                                            <input
                                                                type="text"
                                                                className="system-input w-full"
                                                                value={user.personal_code || ""}
                                                                onChange={(e) => setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, personal_code: e.target.value } : u)))}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <label className="text-sm">Dzimšanas datums</label>
                                                            <input
                                                                type="date"
                                                                className="system-input w-full"
                                                                value={user.date_of_birth || ""}
                                                                onChange={(e) => setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, date_of_birth: e.target.value } : u)))}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <label className="text-sm">Pilsēta</label>
                                                            <input
                                                                type="text"
                                                                className="system-input w-full"
                                                                value={user.city || ""}
                                                                onChange={(e) => setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, city: e.target.value } : u)))}
                                                            />
                                                        </div>

                                                        <div className="flex flex-col">
                                                            <label className="text-sm">Iela</label>
                                                            <input
                                                                type="text"
                                                                className="system-input w-full"
                                                                value={user.street || ""}
                                                                onChange={(e) => setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, street: e.target.value } : u)))}
                                                            />
                                                        </div>

                                                        <div className="flex flex-col">
                                                            <label className="text-sm">Mājas numurs</label>
                                                            <input
                                                                type="text"
                                                                className="system-input w-full"
                                                                value={user.house_number || ""}
                                                                onChange={(e) => setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, house_number: e.target.value } : u)))}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mt-4">
                                                        <h4 className="mb-2 font-semibold">Darba objekti</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {objects.map((obj) => (
                                                                <label key={obj.id} className="flex items-center gap-1">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={user.objects?.includes(obj.id) || false}
                                                                        onChange={(e) =>
                                                                            setUsers((prev) =>
                                                                                prev.map((u) => {
                                                                                    if (u.id !== user.id) return u;
                                                                                    const updatedObjects = e.target.checked
                                                                                        ? [...(u.objects || []), obj.id]
                                                                                        : (u.objects || []).filter((id) => id !== obj.id);
                                                                                    return { ...u, objects: updatedObjects };
                                                                                })
                                                                            )
                                                                        }
                                                                    />
                                                                    {obj.title}
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>

                        <tfoot>
                            <tr className="bg-white">
                                <td className="p-3 sticky left-0 bottom-0 z-40 bg-white border-t-2 border-[#52ab98]" colSpan={2}>
                                    Kopā: {users.length}
                                </td>
                                <td className="p-3 sticky bottom-0 bg-white border-t-2 border-[#52ab98]" colSpan={5}></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AllUsers;
