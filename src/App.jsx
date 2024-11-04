// import './App.css'
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Profile from "./components/Profile.jsx";
import Notes from "./components/Notes.jsx";
import Notifications from "./components/Notifications.jsx";
import Work from "./components/Work.jsx";
import Report from "./components/Report.jsx";
import Buildings from "./components/Buildings.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <main>
                <section className="min-h-screen w-screen flex justify-center py-14 bg-system-grey">
                  <Routes>
                    <Route exact path="/" element={<Profile />} />
                    <Route path="/piezimes" element={<Notes />} />
                    <Route path="/pazinojumi" element={<Notifications />} />
                    <Route path="/darbs" element={<Work />} />
                    <Route path="/atskaite" element={<Report />} />
                    <Route path="/darba_objekti" element={<Buildings />} />
                  </Routes>
                </section>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
