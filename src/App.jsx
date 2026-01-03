import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Profile from "./components/Profile.jsx";
import Settings from "./components/Settings.jsx";
import Notes from "./components/Notes/Notes.jsx";
import NoteCreate from "./components/Notes/NoteCreate.jsx";
import NoteDetail from "./components/Notes/NoteDetail.jsx";
import NoteEdit from "./components/Notes/NoteEdit.jsx";

import Notifications from "./components/Notifications/Notifications.jsx";
import NotificationCreate from "./components/Notifications/NotificationCreate.jsx";
import NotificationDetail from "./components/Notifications/NotificationDetail.jsx";
import NotificationEdit from "./components/Notifications/NotificationEdit.jsx";

import Work from "./components/Work.jsx";
import Report from "./components/Report.jsx";
import Buildings from "./components/Buildings/Buildings.jsx";
import BuildingDetail from "./components/Buildings/BuildingDetail.jsx";
import Contacts from "./components/Contacts.jsx";
import AllUsers from "./components/AllUsers.jsx";
import NoMatch from "./components/NoMatch/NoMatch.jsx";

import PrivateRoute from "./components/PrivateRoute.jsx";
import ObjectCreate from "./components/Buildings/BuildingCreate.jsx";

function App() {
    return (
        <>
            <Toaster position="top-center" />

            <Routes>
                {/* Public route */}
                <Route path="/login" element={<Login />} />

                {/* Private routes */}
                <Route element={<PrivateRoute />}>
                    <Route
                        path="*"
                        element={
                            <>
                                <Navbar />
                                <main>
                                    <section className="min-h-[calc(100vh-80px)] flex justify-center bg-system-grey">
                                        <Routes>
                                            {/* All authenticated users */}
                                            <Route path="/profils" element={<Profile />} />
                                            <Route path="/profila_iestatijumi" element={<Settings />} />
                                            <Route path="/piezimes" element={<Notes />} />
                                            <Route path="/piezimes/jauna" element={<NoteCreate />} />
                                            <Route path="/piezimes/:id" element={<NoteDetail />} />
                                            <Route path="/piezimes/:id/mainit" element={<NoteEdit />} />
                                            <Route path="/pazinojumi" element={<Notifications />} />
                                            <Route path="/atskaite" element={<Report />} />
                                            <Route path="/darba_objekti" element={<Buildings />} />
                                            <Route path="/darba_objekti/:id" element={<BuildingDetail />} />
                                            <Route path="/kontakti" element={<Contacts />} />
                                            <Route path="*" element={<NoMatch />} />

                                            {/* Manager */}
                                            <Route element={<PrivateRoute allowedRoles={["ROLE_MANAGER"]} />}>
                                                <Route path="/pazinojumi/jauns" element={<NotificationCreate />} />
                                                <Route path="/pazinojumi/:id/mainit" element={<NotificationEdit />} />
                                                <Route path="/darba_objekti/jauns" element={<ObjectCreate />} />
                                                <Route path="/visi_lietotaji" element={<AllUsers />} />
                                                <Route path="/darbs" element={<Work />} />
                                            </Route>
                                        </Routes>
                                    </section>
                                </main>
                                <Footer />
                            </>
                        }
                    />
                </Route>
            </Routes>
        </>
    );
}

export default App;
