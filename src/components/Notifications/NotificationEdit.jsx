import { useParams } from "react-router-dom";
import { notifications } from "../Data/Data";
import Edit from "../NotesNotificationsBlocks/Edit";

function NotificationEdit() {
  const params = useParams();
  const notification = notifications[params.id - 1];

  return <Edit data={notification} />;
}

export default NotificationEdit;
