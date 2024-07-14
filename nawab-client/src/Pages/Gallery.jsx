import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import {  Navigate, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";



const Gallery = () => {
    const { user } = useContext(AuthContext)
    const loaderDate = useLoaderData()
    const [gallery, setGallery] = useState(loaderDate)
    const [goToLogin, setGoToLogin] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    // const [goToLogin, setGoToLogin] = useState(true)
    // const { previousPath } = location.state || {};
   
    console.log(goToLogin);
    const handleAddGallery = event => {
       
        event.preventDefault();
        const form = event.target

        const name = form.name.value;
        const feedback = form.feedback.value;
        const imgUrl = form.imgUrl.value;

        const info = {
            name, feedback, imgUrl
        }
        // console.log(info);
        
        // Send data to server

        fetch('https://nawab-sahab-server.vercel.app/foodgallery', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: ' Added successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    form.reset()
                }
            })


    }

    if (goToLogin) {
    return <Navigate state={location.pathname} to={'/login'}></Navigate>
        
    }



   

    return (
        <div className="container mx-auto">
            <Helmet>
                <title>
                    Gallery | Nawabsahab
                </title>
            </Helmet>
            <div className="">
                <div className="hero min-h-[30vh] rounded-2xl my-12" style={{ backgroundImage: 'url(https://i.ibb.co/nDS7rXq/res-banner.jpg)' }}>
                    <div className="hero-overlay bg-opacity-60 rounded-2xl"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Gallery Page</h1>
                
                            <button className="btn bg-[#dc4149] border-none text-xl px-8" onClick={() => user ? document.getElementById('my_modal_4').showModal() : setGoToLogin(true) }>Add</button>
                        </div>
                    </div>
                </div>

                {/* You can open the modal using document.getElementById('ID').showModal() method */}

                <dialog id="my_modal_4" className="modal">
                   
                        

                        <div className="modal-box w-11/12 max-w-5xl">

                            <form onSubmit={handleAddGallery} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" name="name" value={user?.displayName} placeholder="email" className="input input-bordered" required />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Feedback</span>
                                    </label>
                                    <input type="text" name="feedback" placeholder="write Your experience " className="input input-bordered" required />

                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Image url</span>
                                    </label>
                                    <input type="text" name="imgUrl" placeholder="Image url " className="input input-bordered" required />

                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Add</button>
                                </div>
                            </form>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div> 
                        
                </dialog>
                    
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-7 my-12">
                    {
                        gallery.map(data => <div key={data._id} className="w-72 h-fit group">
                            <div className="relative overflow-hidden">
                                <img src={data.imgUrl} alt="" />
                                <div className="absolute w-full h-full bg-black/30 text-center  -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <h3 className="text-2xl text-white font-bold my-5">{data.name}</h3>
                                    <p className="text-xl text-white font-bold ">{data.feedback}</p>
                                </div>
                            </div>

                        </div>)
                    }
                </div>
            </div>


        </div>
    );

}
export default Gallery; <h1>Gallery</h1>