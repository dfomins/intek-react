import { useParams } from "react-router-dom";
import { notes } from "../Data/Data.jsx";
import Edit from "../NotesNotificationsBlocks/Edit.jsx";

function NoteEdit() {
  const params = useParams();
  const note = notes[params.id - 1];

  return <Edit data={note} />;
}

export default NoteEdit;
