import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

// Service
import { noteService } from "../../services/noteService";

function NoteDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleDelete = async () => {
        if (!window.confirm("Vai tiešām dzēst šo piezīmi?")) return;

        try {
            await noteService.deleteNote(id);
            toast.success("Piezīme veiksmīgi dzēsta!");
            navigate("/piezimes");
        } catch (error) {
            console.error(error);
            toast.error("Kļūda dzēšot piezīmi");
        }
    };

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await noteService.getNote(id);
                const noteData = response.data;

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

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full h-[100px] flex justify-center bg-system-blue text-white">
                <div className="panel-width flex justify-between">
                    <div className="flex items-center">
                        <span className="mr-6 text-2xl">
                            <i className="fa-solid fa-circle-left cursor-pointer" onClick={() => navigate(-1)} />
                        </span>
                        <div>
                            <h2 className="break-words">{note.title}</h2>
                            {note.createdAtDate ? <p>Izveidota: {note.createdAtDate.toLocaleDateString()}</p> : null}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Link className="text-2xl cursor-pointer" to={`mainit`}>
                            <FontAwesomeIcon icon={faPen} className="mr-3 text-2xl cursor-pointer" />
                        </Link>
                        <FontAwesomeIcon icon={faTrash} onClick={handleDelete} className="text-2xl cursor-pointer" />
                    </div>
                </div>
            </div>
            <div className="panel-width mt-3 break-words">
                <p className="">{note.content}</p>
            </div>
        </div>
    );
}

export default NoteDetail;
