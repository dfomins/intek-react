// import './App.css'
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Profile from "./components/Profile.jsx";
import Settings from "./components/Settings.jsx";
import Notes from "./components/Notes/Notes.jsx";
import NoteDetail from "./components/Notes/NoteDetail.jsx";
import NoteCreate from "./components/Notes/NoteCreate.jsx";
import Notifications from "./components/Notifications.jsx";
import Work from "./components/Work.jsx";
import Report from "./components/Report.jsx";
import Buildings from "./components/Buildings.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllUsers from "./components/AllUsers.jsx";

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
                <section className="min-h-screen w-screen flex justify-center bg-system-grey">
                  <Routes>
                    <Route exact path="/" element={<Profile />} />
                    <Route exact path="/profila_iestatijumi" element={<Settings />} />
                    <Route path="/piezimes" element={<Notes />} />
                    <Route path="/piezimes/:id" element={<NoteDetail />} />
                    <Route path="/piezimes/jauna" element={<NoteCreate />} />
                    <Route path="/pazinojumi" element={<Notifications />} />
                    <Route path="/darbs" element={<Work />} />
                    <Route path="/atskaite" element={<Report />} />
                    <Route path="/darba_objekti" element={<Buildings />} />
                    <Route path="/visi_lietotaji" element={<AllUsers />} />
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
