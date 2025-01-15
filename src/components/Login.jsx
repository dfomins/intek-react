import "./Login.scss";
import { Link } from "react-router-dom";
import bgimage from "../images/login/login_bg_3.webp";

function Login() {
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-bl from-[#f2f2f2] to-[#52ab98]">
      <div className="inner-container">
        <div className="left-panel">
          <div>
            <label className="label">E-pasts</label>
            <input type="text" />
          </div>
          <div>
            <label className="label">Parole</label>
            <input type="password" />
          </div>
          <Link to="/">
            <button className="button">Pieslēgties</button>
          </Link>
        </div>
        <div style={{ backgroundImage: `url(${bgimage})` }} className="right-panel" />
      </div>
    </div>
  );
}

export default Login;
