import { useParams } from "react-router-dom";
import { notes } from "../Data/Data.jsx";
import Details from "../NotesNotificationsBlocks/Details.jsx";

function NoteDetail() {
  const params = useParams();
  const note = notes[params.id - 1];

  return <Details info={note} />;
}

export default NoteDetail;
