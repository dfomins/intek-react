import { Link } from "react-router-dom";
import { notes } from "../Data/Data";

function NotesRender({ searchInput, sortOrder }) {
    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().match(searchInput.toLowerCase());
      });
    
      const sortedNotes = filteredNotes.sort((firstNote, secondNote) => {
        if (sortOrder == "desc") {
          return new Date(secondNote.createdAt) - new Date(firstNote.createdAt);
        } else {
          return new Date(firstNote.createdAt) - new Date(secondNote.createdAt);
        }
      });

    if (sortedNotes.length > 0) {
        return (
            <ul className="h-[600px] mb-5 overflow-y-scroll text-white">
            
            {sortedNotes.map((note, index) => (
            <li key={note.id} className={`${index == notes.length - 1 ? "" : "mb-2"}`}>
                <Link to={`${note.id}`}>
                <div className="p-3 bg-system-blue hover:bg-system-blue-hovered rounded-sm">
                    <p className="text-lg font-medium truncate">{note.title}</p>
                    <p>{note.createdAt.toLocaleDateString()}</p>
                </div>
                </Link>
            </li>
            ))}
            </ul>
        );
    } else {
        return(
            <div className="h-[600px]">
                <h2 className="mt-8 text-center">Piezīmes netika atrastas!</h2>
            </div>
        );
    }
}

export default NotesRender;