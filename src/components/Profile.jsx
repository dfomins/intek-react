// class 'profile-list-item' is defined in the 'index.css' file

import { Link } from "react-router-dom";
import profilePicture from "../images/profile/profile-picture.jpg";
import { notes } from "./Data";
import { notifications } from "./Data";

let dayDefault = [
  "Svētdiena",
  "Pirmdiena",
  "Otrdiena",
  "Trešdiena",
  "Ceturtdiena",
  "Piektdiena",
  "Sestdiena",
];

function CurrentDateAndDay() {
  return (
    <>
      <p>{dayDefault[new Date().getDay()]}</p>
      <p>{new Date().toLocaleDateString("lv-LV", { day: "numeric", month: "long" })}</p>
    </>
  );
}

function Profile() {
  return (
    <>
      <div className="panel-width my-14 flex justify-between max-lg:flex-col">
        <div className="w-auto h-fit px-10 py-8 lg:me-10 max-lg:mb-10 bg-system-green rounded-md text-center text-white">
          <h2 className="mb-2 text-center text-[25px] font-bold truncate">Daniels Fomins</h2>
          <h3 className="text-center text-[20px] font-medium">Vadītājs</h3>
          <div className="max-w-[400px] mx-auto my-6 w-full rounded-full border border-solid border-gray-400">
            <img className="h-full w-full rounded-full object-cover" src={profilePicture} alt="Profila bilde" />
          </div>
          <div className="text-[18px] leading-[2.5]">
            <a href="#">
              <p>Mani darba objekti</p>
            </a>
            <Link to="/profila_iestatijumi">
              <p>Profila iestatījumi</p>
            </Link>
            <a href="#">
              <p>Izveidot jaunu lietotāju</p>
            </a>
            <Link to="/visi_lietotaji">
              <p>Visi lietotāji</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-12 w-full rounded-md text-white">
          <div className="flex flex-col bg-system-green rounded-md text-center">
            <div className="py-4 bg-system-blue rounded-t-md">
              {CurrentDateAndDay()}
            </div>
            <div className="h-40 flex items-center justify-center grow">
              <h3>Nostrādātās stundas: 8</h3>
            </div>
          </div>
          <div className="flex flex-col bg-system-green rounded-md">
            <div className="py-4 bg-system-blue rounded-t-md text-center font-medium">
              <h3>Paziņojumi</h3>
            </div>
            <div className="flex flex-col items-center grow py-3 text-black">
              <div className="w-full px-3 pt-2 pb-3">
                <ul className="space-y-2">
                  {notes.map(note => (
                    <li key={note.id}>
                      <Link to={`piezimes/${note.id}`}>
                        <div className="profile-list-item">
                          <p>{note.title}</p>
                          <p>Izveidota: {note.createdAt.toLocaleDateString()}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <button className="system-button bg-white hover:bg-system-grey">Izveidot jaunu</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-system-green rounded-md">
            <div className="py-4 bg-system-blue rounded-t-md text-center font-medium">
              <h3>Manas piezīmes</h3>
            </div>
            <div className="flex flex-col items-center grow py-3 text-black">
              <div className="w-full px-3 pt-2 pb-3">
                <ul className="space-y-2">
                  {notifications.map(notification => (
                    <li key={notification.id}>
                    <Link to={`pazinojumi/${notification.id}`}>
                      <div className="profile-list-item">
                        <p>{notification.title}</p>
                        <p>Izveidots: {notification.createdAt.toLocaleDateString()}</p>
                      </div>
                    </Link>
                  </li>
                  ))}
                </ul>
              </div>
              <div>
                <button className="system-button bg-white hover:bg-system-grey">Izveidot jaunu</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
