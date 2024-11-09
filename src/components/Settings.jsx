function Settings() {
    return (
        <div className="w-11/12 xl:w-[1200px] lg:w-[950px]">
            <h1 className="page-title">Profila iestatījumi</h1>
            {/* <div className="flex flex-wrap text-white gap-2">
                <div className="basis-1/2 p-8 flex flex-col items-start rounded-sm bg-system-blue">
                    <h2 className="mb-3">Pamata informācija</h2>
                    <label>Vārds</label>
                    <input className="w-full system-input mb-3" type="text" />
                    <label>Uzvārds</label>
                    <input className="w-full system-input mb-3" type="text" />
                    <label>E-pasts</label>
                    <input className="w-full system-input mb-5" type="text" />
                    <button className="p-2 bg-white hover:bg-[#c8d8e4] duration-300 rounded-sm text-black">Apstiprināt</button>
                </div>
                <div className="basis-1/2 p-8 flex flex-col rounded-sm bg-system-blue">
                    <h2 className="mb-3">Paroles maiņa</h2>
                    <label>Vecā parole</label>
                    <input className="system-input mb-3" type="password" />
                    <label>Jaunā parole</label>
                    <input className="system-input mb-3" type="password" />
                    <label>Jaunās paroles apstiprināšana</label>
                    <input className="system-input mb-3" type="password" />
                </div>
                <div className="w-5/12 p-8 flex flex-col items-start rounded-sm bg-system-blue">
                <h2 className="mb-3">Papildus informācija</h2>

                </div>
            </div> */}

            <div className="grid grid-cols-2 gap-5 text-white">
                <div className="p-8 flex flex-col items-start rounded-sm bg-system-blue">
                    <h2 className="mb-3">Pamata informācija</h2>
                    <label>Vārds</label>
                    <input className="w-full system-input mb-3" type="text" />
                    <label>Uzvārds</label>
                    <input className="w-full system-input mb-3" type="text" />
                    <label>E-pasts</label>
                    <input className="w-full system-input mb-5" type="text" />
                    <button className="p-2 bg-white hover:bg-[#c8d8e4] duration-300 rounded-sm text-black">Apstiprināt</button>
                </div>
                <div className="p-8 flex flex-col items-start rounded-sm bg-system-blue">
                    <h2 className="mb-3">Paroles maiņa</h2>
                    <label>Vecā parole</label>
                    <input className="w-full system-input mb-3" type="password" />
                    <label>Jaunā parole</label>
                    <input className="w-full system-input mb-3" type="password" />
                    <label>Jaunās paroles apstiprināšana</label>
                    <input className="w-full system-input mb-5" type="password" />
                    <button className="p-2 bg-white hover:bg-[#c8d8e4] duration-300 rounded-sm text-black">Atjaunot paroli</button>
                </div>
                <div className="p-8 flex flex-col items-start rounded-sm bg-system-blue">
                    <h2 className="mb-3">Papildus informācija</h2>
                    <label>Vecā parole</label>
                    <input className="w-full system-input mb-3" type="password" />
                    <label>Jaunā parole</label>
                    <input className="w-full system-input mb-3" type="password" />
                    <label>Jaunās paroles apstiprināšana</label>
                    <input className="w-full system-input mb-3" type="password" />
                    <button className="p-2 bg-white hover:bg-[#c8d8e4] duration-300 rounded-sm text-black">Apstiprināt</button>
                </div>
            </div>
        </div>
    );
}

export default Settings;