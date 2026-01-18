import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

// Service
import { notificationService } from "../../services/notificationService";
import { authService } from "../../services/authService";

function NotificationDetail() {
    const currentUser = authService.getCurrentUser();

    const navigate = useNavigate();
    const { id } = useParams();
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleDelete = async () => {
        if (!window.confirm("Vai tiešām dzēst šo paziņojumu?")) return;

        try {
            await notificationService.deleteNotification(id);
            toast.success("Paziņojums veiksmīgi dzēsts!");
            navigate("/pazinojumi");
        } catch (error) {
            console.error(error);
            toast.error("Kļūda dzēšot paziņojumu");
        }
    };

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const response = await notificationService.getNotification(id);
                const notificationData = response.data;

                let createdAtDate = null;
                if (notificationData.createdAt) {
                    const parsed = new Date(notificationData.createdAt);
                    createdAtDate = isNaN(parsed) ? null : parsed;
                }

                setNotification({
                    ...notificationData,
                    createdAtDate,
                });
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || err.message || "Failed to fetch notification");
            } finally {
                setLoading(false);
            }
        };

        fetchNotification();
    }, [id]);

    if (loading) return <h2>Notiek ielāde...</h2>;
    if (error) return <h2 className="text-red-500 font-bold">{error}</h2>;
    if (!notification) return <h2>Notification not found</h2>;

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full h-[100px] flex justify-center bg-system-blue text-white">
                <div className="panel-width flex justify-between">
                    <div className="flex items-center">
                        <span className="mr-6 text-2xl">
                            <i className="fa-solid fa-circle-left cursor-pointer" onClick={() => navigate(-1)} />
                        </span>
                        <div>
                            <h2 className="break-words">{notification.title}</h2>
                            {notification.createdAtDate ? <p>Izveidota: {notification.createdAtDate.toLocaleDateString()}</p> : null}
                        </div>
                    </div>
                    {currentUser.role == "ROLE_MANAGER" && (
                        <div className="flex items-center">
                            <Link className="text-2xl cursor-pointer" to={`mainit`}>
                                <FontAwesomeIcon icon={faPen} className="mr-3 text-2xl cursor-pointer" />
                            </Link>
                            <FontAwesomeIcon icon={faTrash} onClick={handleDelete} className="text-2xl cursor-pointer" />
                        </div>
                    )}
                </div>
            </div>
            <div className="panel-width mt-3 break-words">
                <p className="">{notification.content}</p>
            </div>
        </div>
    );
}

export default NotificationDetail;
