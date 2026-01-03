import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Service
import { imageService } from "../../services/imageService";
import { workObjectService } from "../../services/workObjectService";

function ObjectCreate() {
    const navigate = useNavigate();

    const initialFormValues = { title: "", content: "", city: "", street: "", houseNumber: "" };
    const [imageFile, setImageFile] = useState(null);
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const [titleCounter, setTitleCounter] = useState(0);
    const [cityCounter, setCityCounter] = useState(0);
    const [streetCounter, setStreetCounter] = useState(0);
    const [houseNumberCounter, setHouseNumberCounter] = useState(0);
    const [contentCounter, setContentCounter] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        if (name === "title") setTitleCounter(value.length);
        if (name === "city") setCityCounter(value.length);
        if (name === "street") setStreetCounter(value.length);
        if (name === "houseNumber") setHouseNumberCounter(value.length);
        if (name === "content") setContentCounter(value.length);
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        if (!values.title) errors.title = "Nosaukums ir obligāts";
        if (!values.city) errors.city = "Pilsētas nosaukums ir obligāts";
        if (!values.street) errors.street = "Jānorāda iela";
        if (!values.content) errors.content = "Saturs nevar būt tukšs";

        return errors;
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
        setIsSubmit(true);
        if (Object.keys(errors).length > 0) {
            return;
        }

        let imagePath = null;

        if (imageFile) {
            imagePath = await imageService.upload(imageFile, "work-objects-image-container");
        }

        console.log(imagePath);

        const payload = {
            title: formValues.title,
            content: formValues.content,
            city: formValues.city,
            street: formValues.street,
            houseNumber: formValues.houseNumber,
            imagePath: imagePath,
        };
        console.log(payload);
        try {
            const response = await workObjectService.postObject(payload);
            navigate("/darba_objekti");
            toast.success("Darba objekts veiksmīgi izveidota!");
        } catch (error) {
            console.error(error);
            toast.error("Kļūda izveidojot objektu");
        }
    };

    const maxTitleLength = 80;
    const maxCityLength = 50;
    const maxStreetLength = 50;
    const maxHouseNumberLength = 10;
    const maxContentLength = 2000;

    return (
        <div className="panel-width my-14">
            <h1 className="page-title">Objekta izveidošana</h1>
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
                    <label>Pilsēta</label>
                    <input type="text" name="city" className="system-input mb-1" value={formValues.city} maxLength={maxCityLength} onChange={handleChange} />
                    <div className="flex mb-4 items-center">
                        <div className="flex-1">
                            <p className="text-red-600 text-sm">{formErrors.city}</p>
                        </div>
                        <p className="text-end">
                            {cityCounter}/{maxCityLength}
                        </p>
                    </div>
                    <label>Iela</label>
                    <input type="text" name="street" className="system-input mb-1" value={formValues.street} maxLength={maxStreetLength} onChange={handleChange} />
                    <div className="flex mb-4 items-center">
                        <div className="flex-1">
                            <p className="text-red-600 text-sm">{formErrors.street}</p>
                        </div>
                        <p className="text-end">
                            {streetCounter}/{maxStreetLength}
                        </p>
                    </div>
                    <label>Mājas numurs</label>
                    <input type="text" name="houseNumber" className="system-input mb-1" value={formValues.houseNumber} maxLength={maxHouseNumberLength} onChange={handleChange} />
                    <div className="flex mb-4 items-center">
                        <div className="flex-1">
                            <p className="text-red-600 text-sm">{formErrors.houseNumber}</p>
                        </div>
                        <p className="text-end">
                            {houseNumberCounter}/{maxHouseNumberLength}
                        </p>
                    </div>
                    <label className="pt-3">Informācija</label>
                    <textarea name="content" value={formValues.content} maxLength={maxContentLength} onChange={handleChange} className="system-input min-h-[200px] max-h-[400px] mb-1 resize-y" />
                    <div className="flex mb-4 items-center">
                        <div className="flex-1">
                            <p className="text-red-600 text-sm">{formErrors.content}</p>
                        </div>
                        <p className="text-end">
                            {contentCounter}/{maxContentLength}
                        </p>
                    </div>
                    <label className="pt-3">Objekta bilde</label>
                    <input type="file" name="object_img" onChange={handleFileChange} className="my-2 w-full rounded border-2 border-dashed p-2 cursor-pointer bg-white" />
                    <button type="submit" className="mt-5 rounded-md bg-[#2b6777] py-2 px-4 text-white hover:bg-[#52ab98] transition-colors duration-300">
                        Izveidot
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ObjectCreate;
