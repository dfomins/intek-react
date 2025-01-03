import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function TopPanel({ title, createdAt = null }) {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[100px] flex justify-center bg-system-blue text-white">
      <div className="panel-width flex justify-between">
        <div className="flex items-center">
          <span className="mr-6 text-2xl">
            <i className="fa-solid fa-circle-left cursor-pointer" onClick={() => navigate(-1)} />
          </span>
          <div>
            <h2 className="break-words">{title}</h2>
            {createdAt != null ? <p>Izveidota: {createdAt.toLocaleDateString()}</p> : ""}
          </div>
        </div>
        <div className="flex items-center">
          <Link className="text-2xl cursor-pointer" to={`mainit`}>
            <FontAwesomeIcon icon={faPen} className="mr-3 text-2xl cursor-pointer" />
          </Link>
          <FontAwesomeIcon icon={faTrash} className="text-2xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default TopPanel;
