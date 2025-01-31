import { useContext } from "react";
import LoginForm from "../components/LoginForm";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router";
import GlobalContext from "../context/GlobalContext";

export default function DefaulLayout() {
    const { overlayLogin } = useContext(GlobalContext)
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>

            <Footer />
            {overlayLogin && <LoginForm />}
        </>

    )
}