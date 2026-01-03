import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Service
import { notificationService } from "../../services/notificationService";

function NotificationCreate() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const initialFormValues = { title: "", content: "" };
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const [titleCounter, setTitleCounter] = useState(0);
    const [contentCounter, setContentCounter] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        if (name === "title") setTitleCounter(value.length);
        if (name === "content") setContentCounter(value.length);
        console.log(formValues);
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        if (!values.title) {
            errors.title = "Nosaukums ir obligāts";
        }
        if (!values.content) {
            errors.content = "Saturs nevar būt tukšs";
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
        setIsSubmit(true);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const payload = {
            title: formValues.title,
            content: formValues.content,
        };

        console.log(payload);

        setLoading(true);
        try {
            console.log("Sending payload:", payload);
            const response = await notificationService.postNotification(payload);
            toast.success("Paziņojums tika veiksmīgi izveidots!");
            navigate("/pazinojumi");
        } catch (error) {
            console.error(error.response?.data);
            toast.error("Kļūda izveidojot paziņojumu");
        } finally {
            setLoading(false);
        }
    };

    const maxTitleLength = 100;
    const maxContentLength = 2000;

    return (
        <div className="panel-width my-14">
            <h1 className="page-title">Paziņojuma izveidošana</h1>
            <div className="px-10">
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label>Nosaukums</label>
                    <input name="title" type="text" className="system-input mb-1" value={formValues.title} maxLength={maxTitleLength} onChange={handleChange} />
                    <div className="flex mb-4 items-center">
                        <div className="flex-1">
                            <p className="text-red-600 text-sm">{formErrors.title}</p>
                        </div>
                        <p className="text-end">
                            {titleCounter}/{maxTitleLength}
                        </p>
                    </div>
                    <label>Saturs</label>
                    <textarea name="content" className="system-input min-h-[400px] mb-1 resize-none" value={formValues.content} maxLength={maxContentLength} onChange={handleChange}></textarea>
                    <div className="flex mb-4 items-center">
                        <div className="flex-1">
                            <p className="text-red-600 text-sm">{formErrors.content}</p>
                        </div>
                        <p className="text-end">
                            {contentCounter}/{maxContentLength}
                        </p>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`h-12 px-3 system-button ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-system-blue hover:bg-system-green"} text-white shadow-sm`}
                    >
                        {loading ? "Izveido..." : "Izveidot"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NotificationCreate;
