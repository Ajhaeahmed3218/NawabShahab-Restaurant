import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PriverRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation();
    console.log(location.pathname);

    if (loading) {
        
     return   <div className="flex justify-center items-center text-3xl h-[100vh]">
        <span className="loading loading-spinner loading-lg"></span>
     </div>
        
    }

    if (user) {
        return children;
    }
    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PriverRoute;