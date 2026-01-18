import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/layout/AppLayout.jsx";

import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

import Profile from "./components/Profile.jsx";
import Settings from "./components/Settings.jsx";
import Notes from "./components/notes/Notes.jsx";
import NoteCreate from "./components/notes/NoteCreate.jsx";
import NoteDetail from "./components/notes/NoteDetail.jsx";
import NoteEdit from "./components/notes/NoteEdit.jsx";

import Notifications from "./components/notifications/Notifications.jsx";
import NotificationCreate from "./components/notifications/NotificationCreate.jsx";
import NotificationDetail from "./components/notifications/NotificationDetail.jsx";
import NotificationEdit from "./components/notifications/NotificationEdit.jsx";

import ForemanWork from "./components/work/ForemanWork.jsx";
import ManagerWork from "./components/work/ManagerWork.jsx";
import EmployeeReport from "./components/reports/EmployeeReport.jsx";
import ManagerReport from "./components/reports/ManagerReport.jsx";
import Buildings from "./components/objects/Objects.jsx";
import BuildingDetail from "./components/objects/ObjectDetail.jsx";
import Contacts from "./components/Contacts.jsx";
import AllUsers from "./components/allusers/AllUsers.jsx";
import NoMatch from "./components/nomatch/NoMatch.jsx";

import PrivateRoute from "./components/PrivateRoute.jsx";
import ObjectCreate from "./components/objects/ObjectCreate.jsx";

function App() {
    return (
        <>
            <Toaster position="top-center" />

            <Routes>
                {/* Public */}
                <Route path="/login" element={<Login />} />

                {/* Private */}
                <Route element={<PrivateRoute />}>
                    <Route element={<PrivateRoute allowedRoles={["ROLE_MANAGER"]} />}>
                        <Route path="/registret" element={<Register />} />
                    </Route>

                    <Route element={<AppLayout />}>
                        {/* All authenticated */}
                        <Route path="/profils" element={<Profile />} />
                        <Route path="/profila_iestatijumi" element={<Settings />} />
                        <Route path="/piezimes" element={<Notes />} />
                        <Route path="/piezimes/jauna" element={<NoteCreate />} />
                        <Route path="/piezimes/:id" element={<NoteDetail />} />
                        <Route path="/piezimes/:id/mainit" element={<NoteEdit />} />
                        <Route path="/pazinojumi" element={<Notifications />} />
                        <Route path="/pazinojumi/:id" element={<NotificationDetail />} />
                        <Route path="/darba_objekti" element={<Buildings />} />
                        <Route path="/darba_objekti/:id" element={<BuildingDetail />} />
                        <Route path="/kontakti" element={<Contacts />} />

                        {/* Employee and foreman */}
                        <Route element={<PrivateRoute allowedRoles={["ROLE_EMPLOYEE", "ROLE_FOREMAN"]} />}>
                            <Route path="/atskaite" element={<EmployeeReport />} />
                        </Route>

                        {/* Foreman */}
                        <Route element={<PrivateRoute allowedRoles={["ROLE_FOREMAN"]} />}>
                            <Route path="/brigadieris/darbs" element={<ForemanWork />} />
                        </Route>

                        {/* Manager */}
                        <Route element={<PrivateRoute allowedRoles={["ROLE_MANAGER"]} />}>
                            <Route path="/pazinojumi/jauns" element={<NotificationCreate />} />
                            <Route path="/pazinojumi/:id/mainit" element={<NotificationEdit />} />
                            <Route path="/darba_objekti/jauns" element={<ObjectCreate />} />
                            <Route path="/visi_lietotaji" element={<AllUsers />} />
                            <Route path="/vaditajs/darbs" element={<ManagerWork />} />
                            <Route path="/vaditajs/atskaite" element={<ManagerReport />} />
                        </Route>

                        <Route path="*" element={<NoMatch />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
