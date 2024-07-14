import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";


const Main = () => {
    return (
        <div className="opensans">
            < Navbar/>
            <Outlet></Outlet>
            <Footer/>
        </div>
    );
};

export default Main;