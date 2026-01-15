import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

function AppLayout() {
    return (
        <>
            <Navbar />
            <main>
                <section className="min-h-[calc(100vh-80px)] flex justify-center bg-system-grey">
                    <Outlet />
                </section>
            </main>
            <Footer />
        </>
    );
}

export default AppLayout;
