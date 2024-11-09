// class 'profile-list-item' is defined in the 'index.css' file

import { Link } from "react-router-dom";
import profilePicture from "../images/profile/profile-picture.jpg";

function Profile() {
  return (
    <>
      <div className="w-11/12 xl:w-[1200px] lg:w-[950px] flex justify-between max-lg:flex-col">
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
            <a href="#">
              <p>Visi lietotāji</p>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-12 w-full rounded-md text-white">
          <div className="flex flex-col bg-system-green rounded-md text-center">
            <div className="py-4 bg-system-blue rounded-t-md">
              <p>
                Datums
                <br />
                Diena
              </p>
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
                  <li>
                    <a href="#">
                      <div className="profile-list-item">
                        <p>1. paziņojums</p>
                        <p>Izveidots: datums</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="profile-list-item">
                        <p>2. paziņojums</p>
                        <p>Izveidots: datums</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <button className="bg-white px-2 py-1 rounded-sm">Izveidot jaunu</button>
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
                  <li>
                    <a href="#">
                      <div className="profile-list-item">
                        <p>1. piezīme</p>
                        <p>Izveidots: datums</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="profile-list-item">
                        <p>2. piezīme</p>
                        <p>Izveidots: datums</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <button className="bg-white px-2 py-1 rounded-sm">Izveidot jaunu</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
