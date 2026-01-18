import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Service
import { authService } from "../../services/authService";
import { workObjectService } from "../../services/objects/service";

function Buildings() {
    const [workObjects, setWorkObjects] = useState([]);
    const [assignedWorkObjects, setAssignedWorkObjects] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const currentUser = authService.getCurrentUser();

    useEffect(() => {
        const fetchWorkObjects = async () => {
            try {
                const response = await workObjectService.getObjects(assignedWorkObjects);
                const workObjects = response.data.map((object) => ({
                    ...object,
                }));
                setWorkObjects(workObjects);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch work objects");
            } finally {
                setLoading(false);
            }
        };

        fetchWorkObjects();
    }, [assignedWorkObjects]);

    if (loading) {
        return (
            <div className="my-14 flex items-center justify-center max-lg:flex-col">
                <h2 className="font-bold">Notiek ielāde...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-14 flex items-center justify-center max-lg:flex-col">
                <h2 className="text-red-500 font-bold">{error}</h2>
            </div>
        );
    }

    const handleAssignedChange = (e) => {
        setAssignedWorkObjects(e.target.checked);
    };

    return (
        <div className="panel-width my-14">
            <h1 className="page-title">Darba objekti</h1>
            <div className="mb-2">
                <label className="cursor-pointer">
                    <input type="checkbox" className="mr-2" checked={assignedWorkObjects} onChange={handleAssignedChange} />
                    <span className="font-medium text-lg align-middle">Mani objekti</span>
                </label>
            </div>
            <div className="h-[600px] grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-5">
                {workObjects.length > 0 ? (
                    workObjects.map((workObject) => (
                        <Link to={`${workObject.id}`} key={workObject.id}>
                            <div className="max-md:max-w-[350px] max-md:mx-auto shadow-md">
                                <img src={workObject.image_path} className="h-[300px] object-cover drop-shadow-2xl" alt={workObject.title} />
                                <div className="bg-system-blue p-3 text-white">{workObject.title}</div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <h2 className="col-span-full mt-8 text-center">Objekti netika atrasti!</h2>
                )}
            </div>
            {currentUser.role == "ROLE_MANAGER" && (
                <div className="flex justify-center">
                    <Link to="/darba_objekti/jauns" className="flex items-center h-12 px-3 system-button bg-system-blue text-white hover:bg-system-green shadow-sm">
                        <p>Pievienot jaunu</p>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Buildings;
