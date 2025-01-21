import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router";

export default function DefaulLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>

    )
}