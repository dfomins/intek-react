import { Link } from "react-router-dom";
import bgimage from "../images/login/login_bg.jpg";
import logo from "../images/logo.png";

function Login() {
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-bl from-[#f2f2f2] to-[#52ab98]">
      <div className="w-11/12 xl:w-[1200px] lg:w-[950px] h-96 xl:h-[600px] lg:h-[475px] flex rounded-lg shadow-lg">
        <div className="w-1/2 flex flex-col gap-5 px-10 justify-center rounded-l-lg bg-system-grey">
          <div>
            <label>E-pasts</label>
            <input type="text" className="system-input w-full" />
          </div>
          <div>
            <label>Parole</label>
            <input type="password" className="system-input w-full" />
          </div>
          <Link to="/">
            <button className="w-full h-12 system-button bg-system-blue hover:bg-system-green text-white">Pieslēgties</button>
          </Link>
        </div>
        <div style={{ backgroundImage: `url(${bgimage})` }} className="w-1/2 bg-cover bg-center rounded-r-lg" />
      </div>
    </div>
  );
}

export default Login;
