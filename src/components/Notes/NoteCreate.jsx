import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Service
import { noteService } from "../../services/noteService";

function NoteCreate() {
    const navigate = useNavigate();

    const initialFormValues = { title: "", content: "" };
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const [titleCounter, setTitleCounter] = useState(0);
    const [contentCounter, setContentCounter] = useState(0);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        if (name === "title") setTitleCounter(value.length);
        if (name === "content") setContentCounter(value.length);
        console.log(formValues);
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

        try {
            const response = await noteService.postNote(payload);
            navigate("/piezimes");

            toast.success("Piezīme veiksmīgi izveidota!");
        } catch (error) {
            console.error(error);
            toast.error("Kļūda izveidojot piezīmi");
        }
    };

    const maxTitleLength = 100;
    const maxContentLength = 2000;

    return (
        <div className="panel-width my-14">
            <h1 className="page-title">Piezīmes izveidošana</h1>
            <div className="px-10">
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label>Nosaukums</label>
                    <input type="text" name="title" className="system-input mb-1" value={formValues.title} maxLength={maxTitleLength} onChange={handleChange} />
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
                    <button type="submit" className="h-12 px-3 system-button bg-system-blue hover:bg-system-green text-white shadow-sm">
                        Izveidot
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NoteCreate;
