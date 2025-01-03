import { useParams } from "react-router-dom";
import { notifications } from "../Data/Data.jsx";
import Details from "../NotesNotificationsBlocks/Details.jsx";

function NotificationDetail() {
  const params = useParams();
  const notification = notifications[params.id - 1];

  return <Details info={notification} />;
}

export default NotificationDetail;
