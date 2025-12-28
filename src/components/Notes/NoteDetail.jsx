import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { noteService } from "../../services/noteService";
import Details from "../NotesNotificationsBlocks/Details.jsx";

function NoteDetail() {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await noteService.getNote(id);
                const noteData = response.data;

                // Defensive date parsing
                let createdAtDate = null;
                if (noteData.createdAt) {
                    const parsed = new Date(noteData.createdAt);
                    createdAtDate = isNaN(parsed) ? null : parsed;
                }

                setNote({
                    ...noteData,
                    createdAtDate,
                });
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || err.message || "Failed to fetch note");
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    if (loading) return <h2>Notiek ielāde...</h2>;
    if (error) return <h2 className="text-red-500 font-bold">{error}</h2>;
    if (!note) return <h2>Note not found</h2>;

    return <Details info={note} />;
}

export default NoteDetail;
