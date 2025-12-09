import "./Login.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import bgimage from "../images/login/login_bg_3.webp";

// Service
import { authService } from "../services/authService";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await authService.login(email, password);
            navigate("/profils");
        } catch (err) {
            console.error(err);
            setError("Invalid email or password");
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-bl from-[#f2f2f2] to-[#52ab98]">
            <div className="inner-container">
                <div className="left-panel">
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="label">E-pasts</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label className="label">Parole</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="button">
                            Pieslēgties
                        </button>
                    </form>
                </div>
                <div style={{ backgroundImage: `url(${bgimage})` }} className="right-panel" />
            </div>
        </div>
    );
}

export default Login;
