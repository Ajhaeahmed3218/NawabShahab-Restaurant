import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";


const Register = () => {
    const {createUser, setUser,  upDateUserProfile} = useContext(AuthContext)
    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const name = form.name.value;
        const photo = form.photo.value;
        const password = form.password.value
        // console.log(email, password,name,photo);

        if (!/[A-Z]/.test(password)) {
            return Swal.fire({
                title: 'error',
                text: "Please include at least one uppercase letter.",
                icon: 'error',
                confirmButtonText: 'Cool'
              })
             
        }

        if (!/[a-z]/.test(password)) {
           
            return Swal.fire({
                title: 'error',
                text: "Please include at least one lowercase letter.",
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        }

        if (password.length < 6) {
          
            return Swal.fire({
                title: 'error',
                text: "Password must be at least 6 characters long.",
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        }
        
        createUser(email, password) 
        .then((result) => {
            // Signed up 
            upDateUserProfile(name, photo)
            setUser(result.user)
            // console.log(result.user);
            return Swal.fire({
                title: 'Success',
                text: "Successfully Registerd.",
                icon: 'success',
                confirmButtonText: 'Cool'
              })
            // ...
          })
        .catch((error) => {
            console.error(error);
            return Swal.fire({
                title: 'error',
                text: (error.message),
                icon: 'error',
                confirmButtonText: 'Cool'
              })
          })
    }
    return (
        <div>
            
            <div className="hero md:min-h-screen bg-base-200">
            <Helmet>
                <title>
                    Register | Nawabsahab
                </title>
            </Helmet>
                <div className="hero-content flex-col lg:flex-row">
                    <div className="md:mr-12 md:w-1/2 w-2/3">
                        <img src="https://i.ibb.co/1ng8jZq/login.jpg" alt="" />
                    </div>
                    <div className="card card-body shrink-0 md:w-full  md:max-w-sm shadow-2xl bg-slate-400">
                        <h1 className="text-4xl font-semibold text-center mt-5">Register </h1>

                        <form onSubmit={handleLogin} className="">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo Url</span>
                                </label>
                                <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <p className="my-4 text-center">Allready Have an acount ? <Link className="text-[#FF3811] font-bold" to={"/login"}>Login</Link> </p>
                    </div>
                </div>
            </div>
        </div>
        // <div>
        //     <div className="hero min-h-screen bg-base-200">
        //         <div className="hero-content flex-col lg:flex-row">
        //             <div className="text-center lg:text-left md:w-full w-[100px] h-[50vh]" style={{
        //                 backgroundImage: 'url("https://i.ibb.co/1ng8jZq/login.jpg")',
        //                 backgroundSize: 'cover',
        //                 backgroundPosition: 'center',
        //             }}>
        //                <div className="text-white pl-8 md:flex flex-col justify-center h-full">
        //                <h1 className="text-5xl font-bold ">Login now!</h1>
        //                 <p className="">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        //                </div>
        //             </div>
        //             <div className="card shrink-0 md:w-full max-w-sm shadow-2xl bg-base-100">
        //                 <form className="card-body">
        //                     <div className="form-control">
        //                         <label className="label">
        //                             <span className="label-text">Email</span>
        //                         </label>
        //                         <input type="email" placeholder="email" className="input input-bordered" required />
        //                     </div>
        //                     <div className="form-control">
        //                         <label className="label">
        //                             <span className="label-text">Password</span>
        //                         </label>
        //                         <input type="password" placeholder="password" className="input input-bordered" required />
        //                         <label className="label">
        //                             <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
        //                         </label>
        //                     </div>
        //                     <div className="form-control mt-6">
        //                         <button className="btn btn-primary">Login</button>
        //                     </div>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default Register;