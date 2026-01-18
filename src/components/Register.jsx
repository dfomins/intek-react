function Register() {
    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-bl from-[#f2f2f2] to-[#52ab98]">
            <div className="inner-container">
                <div className="left-panel">
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <form onSubmit={handleSubmit}>
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

export default Register();
