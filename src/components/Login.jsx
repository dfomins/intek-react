import { Link } from "react-router-dom";
import bgimage from "../images/login/login_bg.jpg";
import logo from "../images/logo.png";

function Login() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-11/12 xl:w-[1200px] lg:w-[950px] h-96 xl:h-[600px] lg:h-[475px] flex bg-white shadow-lg">
        <div className="w-1/2 flex flex-col gap-5 px-10 justify-center rounded-lg bg-system-grey">
          <div>
            <label>E-pasts</label>
            <input type="text" className="system-input w-full"/>
          </div>
          <div>
            <label>Parole</label>
            <input type="password" className="system-input w-full"/>
          </div>
          <Link to="/"><button className="w-full h-12 bg-gradient-to-tr from-[#52ab98] to-[#2b6777] rounded-md text-white">Pieslēgties</button></Link>
        </div>
        <div style={{ backgroundImage: `url(${bgimage})` }} className="w-1/2 bg-cover bg-center" />
      </div>
    </div>
  );
}

export default Login;