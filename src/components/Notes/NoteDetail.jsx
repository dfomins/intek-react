import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { notes } from "../Data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function NoteDetail() {
    const params = useParams()
    const note = notes[params.id - 1];

    const navigate = useNavigate();

    if (note != null) {
        return (
            <div className="w-full flex flex-col items-center">
                <div className="w-full h-[100px] flex justify-center bg-system-green text-white">
                    <div className="panel-width flex justify-between">
                        <div className="flex items-center">
                            <span className="mr-6 text-2xl"><i className="fa-solid fa-circle-left cursor-pointer" onClick={() => navigate(-1)} /></span>
                            <div>
                                <h2 className="truncate">{note.title}</h2>
                                <p>Izveidota: {note.createdAt.toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faPen} className="mr-3 text-2xl cursor-pointer" />
                            <FontAwesomeIcon icon={faTrash} className="text-2xl cursor-pointer"/>
                        </div>
                    </div>
                </div>
                <div className="panel-width mt-3">
                    {note.content}
                </div>
            </div>
        );
    }
}

export default NoteDetail;