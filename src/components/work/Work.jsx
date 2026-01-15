export default function Work({ users, editMode, editedHours, handleHoursChange, errors }) {
    return (
        <div className="flex flex-col justify-between w-full min-h-[600px]">
            <div className="overflow-y-auto">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th className="sticky top-0 py-4 ps-10 pe-4 border-b border-slate-300 bg-slate-100">
                                <p className="block text-sm font-normal leading-none text-slate-500">Vārds, Uzvārds</p>
                            </th>
                            <th className="sticky top-0 p-4 border-b border-slate-300 bg-slate-100">
                                <p className="block text-sm text-center font-normal leading-none text-slate-500">Stundas</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="bg-slate-50 border-b border-slate-200">
                                <td className="py-4 ps-10 pe-4 min-w-[120px]">
                                    <p className="flex items-center gap-2 font-semibold text-sm text-slate-800">
                                        <span>
                                            {user.name} {user.surname}
                                        </span>

                                        {user.object_ids.length === 0 && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="text-yellow-500">
                                                <path fill="currentColor" fillRule="evenodd" d="M12 13.8a1 1 0 0 1-1-1v-5a1 1 0 0 1 2 0v5a1 1 0 0 1-1 1" clipRule="evenodd" />
                                                <path fill="currentColor" d="M10.947 15.958a1.053 1.053 0 1 1 2.106 0a1.053 1.053 0 0 1-2.106 0" />
                                                <path
                                                    fill="currentColor"
                                                    fillRule="evenodd"
                                                    d="m15.607 4.642l5.876 10.72c1.512 2.759-.473 6.138-3.607 6.138H6.124c-3.134 0-5.12-3.38-3.607-6.139l5.876-10.72c1.566-2.855 5.648-2.855 7.214 0Zm-1.804 1c-.782-1.429-2.824-1.429-3.606 0L4.32 16.36c-.757 1.38.236 3.069 1.803 3.069h11.752c1.567 0 2.56-1.69 1.803-3.07z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
                                    </p>
                                </td>
                                <td className="h-full px-4 min-w-[100px]">
                                    <p className="text-center block text-sm text-slate-800">
                                        {editMode ? (
                                            <input
                                                type="text"
                                                value={editedHours[user.id] ?? ""}
                                                onChange={(e) => {
                                                    const value = e.target.value.toLowerCase();
                                                    handleHoursChange(user.id, value);
                                                }}
                                                className={`system-input h-[35px] w-[35px] text-center ${errors[user.id] ? "border-red-500 focus:ring-red-500" : ""}`}
                                            />
                                        ) : (
                                            <span>{user.work_record?.hours ?? ""}</span>
                                        )}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <table className="border-t border-slate-300">
                <tbody>
                    <tr className="flex max-lg:flex-col justify-around items-center min-h-10 bg-white text-left">
                        <th colSpan={3}>
                            <p className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" className="text-yellow-500">
                                    <path fill="currentColor" fillRule="evenodd" d="M12 13.8a1 1 0 0 1-1-1v-5a1 1 0 0 1 2 0v5a1 1 0 0 1-1 1" clipRule="evenodd" />
                                    <path fill="currentColor" d="M10.947 15.958a1.053 1.053 0 1 1 2.106 0a1.053 1.053 0 0 1-2.106 0" />
                                    <path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        d="m15.607 4.642l5.876 10.72c1.512 2.759-.473 6.138-3.607 6.138H6.124c-3.134 0-5.12-3.38-3.607-6.139l5.876-10.72c1.566-2.855 5.648-2.855 7.214 0Zm-1.804 1c-.782-1.429-2.824-1.429-3.606 0L4.32 16.36c-.757 1.38.236 3.069 1.803 3.069h11.752c1.567 0 2.56-1.69 1.803-3.07z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>-</span>
                                <span className="text-sm font-medium">darbiniekam nav piesaistīti darba objekti</span>
                            </p>
                        </th>

                        <th colSpan="2">s - slimība | a - attaisnots</th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
