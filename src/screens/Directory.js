import NavbarComp from "../components/navbar";
import { useLocation } from "react-router-dom";

const Directory = () => {
    const location = useLocation();
    return (
        <div>
            {location.pathname === "/directory" && <NavbarComp />}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                <h1 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-2xl animate-pulse">
                    Coming Soon...
                </h1>
            </div>
        </div>
    );
};

export default Directory;
