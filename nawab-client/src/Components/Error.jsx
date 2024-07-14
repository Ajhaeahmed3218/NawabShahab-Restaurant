import { Link } from "react-router-dom";


const Error = () => {
    return (
        <div className="flex flex-col justify-center items-center ">
            <img className="w-[400px] " src="https://i.ibb.co/qpqTm93/eror.jpg" alt="404 page not found" />
            <Link to={'/'}><button className="btn">Go to Home</button></Link>
        </div>
    );
};

export default Error;