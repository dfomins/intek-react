import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Service
import { userService } from "../services/userService";
import { authService } from "../services/authService";

let dayDefault = ["Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena"];

// Funkcija, ar kuras palīdzību var izvadīt šodienas datumu
function CurrentDateAndDay() {
    return (
        <>
            <h4 className="font-semibold">{dayDefault[new Date().getDay()]}</h4>
            <p>
                {new Date().toLocaleDateString("lv-LV", {
                    day: "numeric",
                    month: "long",
                })}
            </p>
        </>
    );
}

function Profile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    const currentUser = authService.getCurrentUser();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await userService.getMe();
                setUser(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch user");
            }
        };
        fetchUser();
    }, []);

    let userRole = "";
    if (user?.role === "MANAGER") userRole = "Vadītājs";
    if (user?.role === "FOREMAN") userRole = "Brigadieris";
    if (user?.role === "EMPLOYEE") userRole = "Darbinieks";

    if (error)
        return (
            <div className="my-14 flex items-center justify-center max-lg:flex-col">
                <h2 className="text-red-500 font-bold">{error}</h2>
            </div>
        );
    if (!user) {
        return (
            <div className="my-14 flex items-center justify-center max-lg:flex-col">
                <h2 className="font-bold">Notiek ielāde...</h2>
            </div>
        );
    }

    return (
        <>
            <div className="panel-width my-14 flex justify-between max-lg:flex-col">
                <div className="w-auto h-fit px-10 py-8 lg:me-10 max-lg:mb-10 bg-system-green rounded-md text-center text-white lg:sticky top-10">
                    <h2 className="mb-2 text-center text-[25px] font-bold truncate">{user.name + " " + user.surname}</h2>
                    <h3 className="text-center text-[20px] font-medium">{userRole}</h3>
                    <div className="max-w-[400px] mx-auto my-6 w-full rounded-full border border-solid border-gray-400">
                        <img className="h-full w-full rounded-full object-cover" src={user.imagePath} alt="Profila bilde" />
                    </div>
                    <div className="text-[18px] leading-[2.5]">
                        <Link to="/profila_iestatijumi">
                            <p>Profila iestatījumi</p>
                        </Link>
                        {currentUser.role == "ROLE_MANAGER" && (
                            <Link to="/visi_lietotaji">
                                <p>Visi lietotāji</p>
                            </Link>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-12 w-full rounded-md text-white">
                    <div className="flex flex-col bg-system-green rounded-md text-center">
                        <div className="py-4 bg-system-blue rounded-t-md">{CurrentDateAndDay()}</div>
                        <div className="h-48 flex items-center justify-center grow">
                            <h3>Nostrādātās stundas: 8</h3>
                        </div>
                    </div>
                    <div className="flex flex-col bg-system-green rounded-md">
                        <div className="py-4 bg-system-blue rounded-t-md text-center font-medium">
                            <h3>Manas piezīmes</h3>
                        </div>
                        <div className="flex flex-col items-center grow py-3 text-black">
                            <div className="w-full px-3 pt-2 pb-3">
                                <ul className="space-y-3">
                                    {user.notes && user.notes.length > 0 ? (
                                        user.notes.map((note) => {
                                            const createdAtDate = new Date(note.createdAt);

                                            return (
                                                <li key={note.id}>
                                                    <Link to={`/piezimes/${note.id}`}>
                                                        <div className="profile-list-item">
                                                            <p>{note.title}</p>
                                                            <p>Izveidota: {createdAtDate.toLocaleDateString()}</p>
                                                        </div>
                                                    </Link>
                                                </li>
                                            );
                                        })
                                    ) : (
                                        <p className="text-center text-white my-5">Nav piezīmju</p>
                                    )}
                                </ul>
                            </div>
                            <div>
                                <Link className="system-button bg-white hover:bg-system-grey" to="/piezimes">
                                    Visas piezīmes
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-system-green rounded-md">
                        <div className="py-4 bg-system-blue rounded-t-md text-center font-medium">
                            <h3>Paziņojumi</h3>
                        </div>
                        <div className="flex flex-col items-center grow py-3 text-black">
                            <div className="w-full px-3 pt-2 pb-3">
                                <ul className="space-y-2">
                                    {user.notifications && user.notifications.length > 0 ? (
                                        user.notifications.map((notification) => {
                                            const createdAtDate = new Date(notification.createdAt);

                                            return (
                                                <li key={notification.id}>
                                                    <Link to={`/pazinojumi/${notification.id}`}>
                                                        <div className="profile-list-item">
                                                            <p>{notification.title}</p>
                                                            <p>Izveidots: {createdAtDate.toLocaleDateString()}</p>
                                                        </div>
                                                    </Link>
                                                </li>
                                            );
                                        })
                                    ) : (
                                        <li className="text-center text-white my-5">Nav paziņojumu</li>
                                    )}
                                </ul>
                            </div>
                            <div>
                                <Link className="system-button bg-white hover:bg-system-grey" to="/pazinojumi">
                                    Visi paziņojumi
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
