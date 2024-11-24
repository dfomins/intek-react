// class 'profile-settings-panel' is defined in the 'index.css' file
import { users } from "./Data/Data";

function Settings() {
  return (
    <div className="panel-width my-14">
      <h1 className="page-title">Profila iestatījumi</h1>
      <div className="grid md:grid-cols-2 gap-7 text-white">
        <div className="profile-settings-panel">
          <h2 className="mb-3 font-medium">Pamata informācija</h2>
          <form>
            <label>Vārds</label>
            <input
              className="w-full system-input mb-3"
              type="text"
              defaultValue={users[0].name}
            />
            <label>Uzvārds</label>
            <input
              className="w-full system-input mb-3"
              type="text"
              defaultValue={users[0].surname}
            />
            <label>E-pasts</label>
            <input
              className="w-full system-input mb-5"
              type="text"
              defaultValue={users[0].email}
            />
            <button
              type="submit"
              className="p-2 bg-white hover:bg-[#c8d8e4] duration-300 rounded-sm text-black"
            >
              Apstiprināt
            </button>
          </form>
        </div>
        <div className="profile-settings-panel">
          <h2 className="mb-3 font-medium">Paroles maiņa</h2>
          <form>
            <label>Vecā parole</label>
            <input className="w-full system-input mb-3" type="password" />
            <label>Jaunā parole</label>
            <input className="w-full system-input mb-3" type="password" />
            <label>Jaunās paroles apstiprināšana</label>
            <input className="w-full system-input mb-5" type="password" />
            <button
              type="submit"
              className="p-2 bg-white hover:bg-[#c8d8e4] duration-300 rounded-sm text-black"
            >
              Atjaunot paroli
            </button>
          </form>
        </div>
        <div className="md:col-span-2 profile-settings-panel">
          <h2 className="mb-3 font-medium">Papildus informācija</h2>
          <form>
            <label>Personas kods</label>
            <input className="w-full system-input mb-3" type="text" />
            <label>Dzimšanas datums</label>
            <input className="w-full system-input mb-3" type="date" />
            <label>Pilsēta</label>
            <input className="w-full system-input mb-3" type="text" />
            <label>Iela</label>
            <input className="w-full system-input mb-3" type="text" />
            <label>Mājas numurs</label>
            <input className="w-full system-input mb-3" type="text" />
            <button
              type="submit"
              className="p-2 bg-white hover:bg-[#c8d8e4] duration-300 rounded-sm text-black"
            >
              Saglabāt
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;
