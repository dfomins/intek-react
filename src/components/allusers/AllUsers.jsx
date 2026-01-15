import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

// Service
import { userService } from "../../services/userService";
import { workObjectService } from "../../services/objects/service";

function AllUsers() {
    const [users, setUsers] = useState([]);
    const [objects, setObjects] = useState([]);
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
                console.log(users);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchObjects = async () => {
            try {
                const response = await workObjectService.getObjects();
                console.log(response.data);
                const objects = response.data.map((object) => ({
                    ...object,
                }));
                setObjects(objects);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch objects");
            } finally {
                setLoading(false);
            }
        };

        fetchObjects();
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
    const saveChanges = async (user) => {
        try {
            let payload = {};
        } catch (error) {
            setError("Failed to save user information");
        }

        try {
            let payload = {
                user_id: user.id,
                object_ids: user.objectIds || [],
            };

            await workObjectService.syncUserObjects(payload);
            toast.success("Lietotāja informācija tika veiksmīgi atjaunota!", {
                style: {
                    minWidth: "400px",
                },
            });
            setEditingUserId(null);
        } catch (error) {
            setError("Failed to save user objects");
        }
    };

    // Atcelt lietotāja informācijas izmaiņas
    const cancelEdit = () => {
        setEditingUserId(null);
    };

    if (loading) {
        return (
            <div className="my-14 flex items-center justify-center max-lg:flex-col">
                <h2 className="font-bold">Notiek ielāde...</h2>
            </div>
        );
    }

    return (
        <div className="panel-width my-14">
            <h1 className="page-title">Visi lietotāji</h1>
            {/* 
            <div className="mb-2 flex max-md:flex-col justify-between">
                <input type="text" className="system-input" placeholder="Meklēt..." onChange={handleSearchChange} value={searchInput} />
            </div> */}

            <div className="mb-2 flex max-md:flex-col justify-between">
                {/* <input type="text" className="system-input" placeholder="Meklēt..." onChange={handleSearchChange} value={searchInput} /> */}
                <input className="system-input pr-11 h-10 pl-3 py-2" placeholder="Meklēt darbinieku" onChange={handleSearchChange} value={searchInput} />
            </div>

            <div className="overflow-x-auto">
                <div className="overflow-y-auto max-h-[600px] border rounded shadow-sm">
                    <div class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                        <table class="w-full text-left table-auto min-w-max">
                            <thead>
                                <tr>
                                    <th class="sticky top-0 p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">Vārds, Uzvārds</p>
                                    </th>
                                    <th class="sticky top-0 p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">E-pasts</p>
                                    </th>
                                    <th class="sticky top-0 p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">Loma</p>
                                    </th>
                                    <th class="sticky top-0 p-4 border-b border-slate-300 bg-slate-50"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => {
                                    const isEditing = editingUserId === user.id;

                                    return (
                                        <React.Fragment key={user.id}>
                                            <tr className="hover:bg-slate-50 border-b border-slate-200">
                                                <td className="p-4 py-5 min-w-[120px]">
                                                    <p className="block font-semibold text-sm text-slate-800">
                                                        {user.name} {user.surname}
                                                    </p>
                                                </td>
                                                <td className="p-4 py-5 min-w-[150px]">
                                                    <p className="block text-sm text-slate-800">{user.email}</p>
                                                </td>
                                                <td className="p-4 py-5 min-w-[100px]">
                                                    <p className="block text-sm text-slate-800">{user.role}</p>
                                                </td>
                                                <td className="p-4 py-5">
                                                    <div className="flex gap-3 justify-center">
                                                        {isEditing ? (
                                                            <>
                                                                <button className="text-slate-600 hover:text-slate-800" onClick={() => saveChanges(user)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6.414A2 2 0 0 0 19.414 5L17 2.586A2 2 0 0 0 15.586 2zm0 2h9.586L18 6.414V20H6zm10.238 6.793a1 1 0 1 0-1.414-1.414l-4.242 4.243l-1.415-1.415a1 1 0 0 0-1.414 1.414l2.05 2.051a1.1 1.1 0 0 0 1.556 0l4.88-4.879Z" />
                                                                    </svg>
                                                                </button>
                                                                <button className="text-slate-600 hover:text-slate-800" onClick={() => setEditingUserId(null)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24">
                                                                        <title xmlns="">cancel</title>
                                                                        <path
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            stroke-linecap="round"
                                                                            stroke-linejoin="round"
                                                                            stroke-width="1.5"
                                                                            d="m5 19l7-7m0 0l7-7m-7 7L5 5m7 7l7 7"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button className="text-slate-600 hover:text-slate-800" onClick={() => startEditing(user)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path d="M10.825 22q-.675 0-1.162-.45t-.588-1.1L8.85 18.8q-.325-.125-.612-.3t-.563-.375l-1.55.65q-.625.275-1.25.05t-.975-.8l-1.175-2.05q-.35-.575-.2-1.225t.675-1.075l1.325-1Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337l-1.325-1Q2.675 9.9 2.525 9.25t.2-1.225L3.9 5.975q.35-.575.975-.8t1.25.05l1.55.65q.275-.2.575-.375t.6-.3l.225-1.65q.1-.65.588-1.1T10.825 2h2.35q.675 0 1.163.45t.587 1.1l.225 1.65q.325.125.613.3t.562.375l1.55-.65q.625-.275 1.25-.05t.975.8l1.175 2.05q.35.575.2 1.225t-.675 1.075l-1.325 1q.025.175.025.338v.674q0 .163-.05.338l1.325 1q.525.425.675 1.075t-.2 1.225l-1.2 2.05q-.35.575-.975.8t-1.25-.05l-1.5-.65q-.275.2-.575.375t-.6.3l-.225 1.65q-.1.65-.587 1.1t-1.163.45zm1.225-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5" />
                                                                    </svg>
                                                                </button>
                                                                <button className="text-slate-600 hover:text-slate-800">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z" />
                                                                    </svg>
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>

                                            {isEditing && (
                                                <tr>
                                                    <td colSpan={4} className="bg-slate-100 p-4">
                                                        <div>
                                                            <h4 className="mb-2 font-semibold">Personīgā informācija</h4>
                                                            <div className="flex flex-col gap-3 mb-4">
                                                                <div className="flex gap-5">
                                                                    <div className="flex flex-col max-w-64">
                                                                        <label>Personas kods</label>
                                                                        <input type="text" className="system-input pr-11 h-8 pl-3" />
                                                                    </div>
                                                                    <div className="flex flex-col max-w-64">
                                                                        <label>Dzimšanas datums</label>
                                                                        <input type="text" className="system-input pr-11 h-8 pl-3" />
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-5">
                                                                    <div className="flex flex-col max-w-64">
                                                                        <label>Pilsēta</label>
                                                                        <input type="text" className="system-input pr-11 h-8 pl-3" />
                                                                    </div>
                                                                    <div className="flex flex-col max-w-64">
                                                                        <label>Iela</label>
                                                                        <input type="text" className="system-input pr-11 h-8 pl-3" />
                                                                    </div>
                                                                    <div className="flex flex-col max-w-64">
                                                                        <label>Mājas numurs</label>
                                                                        <input type="text" className="system-input pr-11 h-8 pl-3" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <h4 className="mb-2 font-semibold">Piesaistīt darba objektiem</h4>
                                                            <div className="flex flex-col gap-2">
                                                                {objects.map((obj) => (
                                                                    <label key={obj.id} className="flex items-center gap-1 cursor-pointer">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={user.objectIds?.includes(obj.id) || false}
                                                                            onChange={(e) =>
                                                                                setUsers((prev) =>
                                                                                    prev.map((u) =>
                                                                                        u.id !== user.id
                                                                                            ? u
                                                                                            : {
                                                                                                  ...u,
                                                                                                  objectIds: e.target.checked
                                                                                                      ? [...(u.objectIds || []), obj.id]
                                                                                                      : (u.objectIds || []).filter((id) => id !== obj.id),
                                                                                              }
                                                                                    )
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
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllUsers;
