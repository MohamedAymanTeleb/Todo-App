import { Outlet } from "react-router-dom";

function Layout() {

    return (
        <>
            <div className="mx-5">
                <Outlet />
            </div >
        </>
    )
}

export default Layout