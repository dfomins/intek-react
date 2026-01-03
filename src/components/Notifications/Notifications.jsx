// class 'page-title' is defined in the 'index.css' file

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Service
import { notificationService } from "../../services/notificationService";
import { authService } from "../../services/authService";

function Notifications() {
    const currentUser = authService.getCurrentUser();

    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [searchInput, setSearchInput] = useState("");
    const [sortOrder, setSortOrder] = useState("desc");

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await notificationService.getNotifications();
                const notificationsWithDates = response.data.map((notification) => ({
                    ...notification,
                    createdAtDate: new Date(notification.createdAt),
                }));
                setNotifications(notificationsWithDates);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch notifications");
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    if (loading) {
        return (
            <div className="my-14 flex items-center justify-center max-lg:flex-col">
                <h2 className="font-bold">Notiek ielāde...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-14 flex items-center justify-center max-lg:flex-col">
                <h2 className="text-red-500 font-bold">{error}</h2>
            </div>
        );
    }

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    const orderChange = (e) => {
        setSortOrder(e.target.value);
    };

    const filteredNotifications = notifications.filter((notification) => {
        return notification.title.toLowerCase().match(searchInput.toLowerCase());
    });

    const sortedNotifications = filteredNotifications.sort((a, b) => {
        if (sortOrder === "desc") {
            return b.createdAtDate - a.createdAtDate;
        } else {
            return a.createdAtDate - b.createdAtDate;
        }
    });

    return (
        <div className="panel-width my-14">
            <h1 className="page-title">Paziņojumi</h1>
            <div>
                <div className="mb-3 flex max-sm:flex-col">
                    <input className="sm:mr-2 max-sm:mb-2 system-input" placeholder="Meklēt pēc nosaukuma" onChange={handleChange} value={searchInput} />
                    <select className="sm:w-40 system-input" onChange={orderChange}>
                        <option value="desc">Jaunākie</option>
                        <option value="asc">Vecākie</option>
                    </select>
                </div>
                {sortedNotifications.length > 0 ? (
                    <ul className="h-[600px] mb-5 overflow-y-scroll text-white">
                        {sortedNotifications.map((notification, index) => (
                            <li key={notification.id} className={`${index == notifications.length - 1 ? "" : "mb-2"}`}>
                                <Link to={`${notification.id}`}>
                                    <div className="p-3 bg-system-blue hover:bg-system-blue-hovered rounded-sm">
                                        <h4 className="font-medium truncate">{notification.title}</h4>
                                        <p>{notification.createdAtDate.toLocaleDateString()}</p>
                                        <p>Izveidoja: {notification.createdBy}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="h-[600px]">
                        <h2 className="mt-8 text-center">Paziņojumi netika atrasti!</h2>
                    </div>
                )}
                {currentUser.role == "ROLE_MANAGER" && (
                    <div className="flex justify-center">
                        <Link to="/pazinojumi/jauns" className="flex items-center h-12 px-3 system-button bg-system-blue text-white hover:bg-system-green shadow-sm">
                            <p>Pievienot jaunu</p>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Notifications;
