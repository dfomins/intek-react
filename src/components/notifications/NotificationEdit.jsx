import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// Service
import { notificationService } from "../../services/notificationService";

function NotificationEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const initialFormValues = { title: "", content: "" };
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const [titleCounter, setTitleCounter] = useState(0);
    const [contentCounter, setContentCounter] = useState(0);

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const response = await notificationService.getNotification(id);
                const { title, content } = response.data;

                setFormValues({ title, content });
                setTitleCounter(title.length);
                setContentCounter(content.length);
            } catch (error) {
                console.error("Failed to load notification", error);
                toast.error("Neizdevās ielādēt paziņojumu");
            }
        };

        fetchNotification();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        if (name === "title") setTitleCounter(value.length);
        if (name === "content") setContentCounter(value.length);
    };

    const validate = (values) => {
        const errors = {};
        if (!values.title) errors.title = "Nosaukums ir obligāts";
        if (!values.content) errors.content = "Saturs nevar būt tukšs";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validate(formValues);
        setFormErrors(errors);
        setIsSubmit(true);

        if (Object.keys(errors).length > 0) return;

        const payload = {
            title: formValues.title.trim(),
            content: formValues.content.trim(),
        };

        try {
            await notificationService.updateNotification(id, payload);
            toast.success("Paziņojums veiksmīgi atjaunināts!");
            navigate("/pazinojumi");
        } catch (error) {
            console.error(error);
            toast.error("Kļūda saglabājot paziņojumu");
        }
    };

    const maxTitleLength = 100;
    const maxContentLength = 2000;

    return (
        <div className="panel-width my-14">
            <h1 className="page-title">Paziņojuma rediģēšana</h1>
            <div className="px-10">
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label>Nosaukums</label>
                    <input type="text" name="title" className="system-input mb-1" value={formValues.title} maxLength={maxTitleLength} onChange={handleChange} />
                    {formErrors.title && <p className="text-red-600 text-sm mb-2">{formErrors.title}</p>}
                    <p className="mb-4 text-end">
                        {titleCounter}/{maxTitleLength}
                    </p>

                    <label>Saturs</label>
                    <textarea name="content" className="system-input min-h-[400px] mb-1 resize-none" value={formValues.content} maxLength={maxContentLength} onChange={handleChange}></textarea>
                    {formErrors.content && <p className="text-red-600 text-sm mb-2">{formErrors.content}</p>}
                    <p className="mb-4 text-end">
                        {contentCounter}/{maxContentLength}
                    </p>

                    <button type="submit" className="h-12 px-3 system-button bg-system-blue hover:bg-system-green text-white shadow-sm">
                        Saglabāt
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NotificationEdit;
