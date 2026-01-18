import { useState } from "react";
import bgimage from "../images/login/login_bg_3.webp";

function Register() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Lūdzu aizpildiet visus laukus");
            return;
        }

        // TODO: call auth service
        console.log({ email, password });
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-bl from-[#f2f2f2] to-[#52ab98]">
            <div className="inner-container h-[1000px]">
                <div className="left-panel">
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="label">Vārds</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label className="label">Uzvārds</label>
                            <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label className="label">E-pasts</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label className="label">Parole</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label className="label">Apstipriniet paroli</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="button">
                            Reģistrēt
                        </button>
                    </form>
                </div>
                <div style={{ backgroundImage: `url(${bgimage})` }} className="right-panel" />
            </div>
        </div>
    );
}

export default Register;
