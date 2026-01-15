import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

// Service
import { workObjectService } from "../../services/objects/service";

function BuildingDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [workObject, setWorkObject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleDelete = async () => {
        if (!window.confirm("Vai tiešām dzēst šo objektu?")) return;

        try {
            await workObjectService.deleteWorkObject(id);
            toast.success("Darba objekts veiksmīgi dzēsts!");
            navigate("/darba_objekti");
        } catch (error) {
            console.error(error);
            toast.error("Kļūda dzēšot objektu");
        }
    };

    useEffect(() => {
        const fetchWorkObject = async () => {
            try {
                const response = await workObjectService.getObject(id);
                const workObjectData = response.data;
                setWorkObject({
                    ...workObjectData,
                });

                console.log(workObject);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || err.message || "Failed to fetch work object");
            } finally {
                setLoading(false);
            }
        };

        fetchWorkObject();
    }, [id]);

    if (loading) return <h2>Notiek ielāde...</h2>;
    if (error) return <h2 className="text-red-500 font-bold">{error}</h2>;
    if (!workObject) return <h2>Work object not found</h2>;

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full h-[100px] flex justify-center bg-system-blue text-white">
                <div className="panel-width flex justify-between">
                    <div className="flex items-center">
                        <span className="mr-6 text-2xl">
                            <i className="fa-solid fa-circle-left cursor-pointer" onClick={() => navigate(-1)} />
                        </span>
                        <div>
                            <h2 className="break-words">{workObject.title}</h2>
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
            <div className="panel-width mt-5">
                <div className="flex flex-col lg:flex-row">
                    <div className="flex justify-center">
                        <img src={workObject.imagePath} className="lg:max-w-96 max-h-64" />
                    </div>
                    <ul className="max-lg:mt-5 lg:ms-5 text-xl">
                        <li>
                            <span className="font-semibold">Pilsēta:</span> {workObject.address.city}
                        </li>
                        <li>
                            <span className="font-semibold">Iela:</span> {workObject.address.street}
                        </li>
                        <li>
                            <span className="font-semibold">Mājas numurs:</span> {workObject.address.houseNumber}
                        </li>
                    </ul>
                </div>
                <h2 className="mt-3 font-semibold">Informācija:</h2>
                <p className="break-words text-lg">{workObject.content}</p>
            </div>
        </div>
    );
}

export default BuildingDetail;
