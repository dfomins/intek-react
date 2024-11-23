import { Link } from "react-router-dom";
import { notifications } from "../Data/Data";

function NotificationsRender({ searchInput, sortOrder }) {
    const filteredNotifications = notifications.filter((notification) => {
        return notification.title.toLowerCase().match(searchInput.toLowerCase());
    });
    
    const sortedNotifications = filteredNotifications.sort((firstNotif, secondNotif) => {
        if (sortOrder == "desc") {
            return new Date(secondNotif.createdAt) - new Date(firstNotif.createdAt);
        } else {
            return new Date(firstNotif.createdAt) - new Date(secondNotif.createdAt);
        }
    });

    if (sortedNotifications.length > 0) {
        return(
            <ul className="h-[600px] mb-5 overflow-y-scroll text-white">
            {sortedNotifications.map((notification, index) => (
                <li key={notification.id} className={`${index == notifications.length - 1 ? "" : "mb-2"}`}>
                <Link to={`${notification.id}`}>
                    <div className="p-3 bg-system-blue hover:bg-system-blue-hovered rounded-sm">
                    <p className="text-lg font-medium truncate">{notification.title}</p>
                    <p>{notification.createdAt.toLocaleDateString()}</p>
                    <p>Izveidoja: {notification.createdBy}</p>
                    </div>
                </Link>
                </li>
            ))}
            </ul>
        );
    } else {
        return(
            <div className="h-[600px]">
                <h2 className="mt-8 text-center">Paziņojumi netika atrasti!</h2>
            </div>
        );
    }
}

export default NotificationsRender;