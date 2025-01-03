import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Details({ info }) {
  const navigate = useNavigate();

  if (info != null) {
    return (
      <div className="w-full flex flex-col items-center">
        <div className="w-full h-[100px] flex justify-center bg-system-blue text-white">
          <div className="panel-width flex justify-between">
            <div className="flex items-center">
              <span className="mr-6 text-2xl">
                <i className="fa-solid fa-circle-left cursor-pointer" onClick={() => navigate(-1)} />
              </span>
              <div>
                <h2 className="truncate">{info.title}</h2>
                <p>Izveidota: {info.createdAt.toLocaleDateString()}</p>
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
        <div className="panel-width mt-3 break-words">
          <p className="">{info.content}</p>
        </div>
      </div>
    );
  }
}

export default Details;
