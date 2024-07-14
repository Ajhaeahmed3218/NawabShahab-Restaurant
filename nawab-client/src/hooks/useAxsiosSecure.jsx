import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL : 'https://nawab-sahab-server.vercel.app',
    withCredentials:true
})

const useAxsiosSecure = () => {
    const{logOut} = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        axiosSecure.interceptors.response.use( res => {
            return res ;
        }, error => {
            
            if (error.response.status === 401 || error.response.status === 403 ) {
                console.log('error in interceptors ',error.response);
                console.log('Logout user ');
                logOut()
                .then(() => { 
                    navigate('/login')
                })
                .catch(error => console.log(error))
            }
        })
    },[])
    return axiosSecure
};

export default useAxsiosSecure;