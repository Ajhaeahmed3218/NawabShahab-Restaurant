import { Helmet } from "react-helmet-async";
import Banner from "../Components/Banner";
import TopFoods from "../Components/TopFoods";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";


const Home = () => {
    return (
        <div className="container mx-auto p-10">
            <Helmet>
                <title>
                    Home | Nawabsahab
                </title>
            </Helmet>
            <div className=" mt-[80px]">
                <Banner />
            </div>

            <div className="">
                <TopFoods />
                <div className="flex justify-center mt-24">
                    <Link to={`/allfoods`}><button className="btn bg-[#da3939bb]  border-none">Show All</button></Link>

                </div>
            </div>


            {/* Short Menu */}
            <section>
                <h1 className="text-5xl font-bold text-center mt-[80px] mb-20">Short Menu</h1>

                <div className="lg:flex justify-between gap-14 my-[120px]">
                    <Link to={'/shortMenu'} className="avatar flex flex-col justify-center items-center gap-5">
                        <div className="w-28 lg:w-[200px] rounded-full">
                            <img src="https://i.ibb.co/syps5Mj/starter.webp" />

                        </div>
                        <h3 className="text-2xl ">Appetizers </h3>
                    </Link>

                    <Link to={'/shortMenu'} className="avatar flex flex-col justify-center items-center gap-5">
                        <div className="w-24 lg:w-[200px] rounded-full">
                            <img src="https://i.ibb.co/vPJ1v0M/Main-Courses.jpg" />

                        </div>
                        <h3 className="text-2xl ">Main Courses</h3>
                    </Link>

                    <Link to={'/shortMenu'} className="avatar flex flex-col justify-center items-center gap-5">
                        <div className="w-28 lg:w-[200px] rounded-full">
                            <img src="https://i.ibb.co/9WYcCWq/Desserts.jpg" />

                        </div>
                        <h3 className="text-2xl ">Desserts </h3>
                    </Link>

                    <Link to={'/shortMenu'} className="avatar flex flex-col justify-center items-center gap-5">
                        <div className="w-24 lg:w-[200px] rounded-full">
                            <img src="https://i.ibb.co/nf8ZXzz/Beverages.jpg" />

                        </div>
                        <h3 className="text-2xl ">Beverages </h3>
                    </Link>
                    <Link to={'/shortMenu'} className="avatar flex flex-col justify-center items-center gap-5">
                        <div className="w-24 lg:w-[200px] rounded-full">
                            <img src="https://i.ibb.co/pyv6v5P/ramen.jpg" />

                        </div>
                        <h3 className="text-2xl ">Our Specials </h3>
                    </Link>


                </div>
            </section>


            {/* Meet Our Kitchen Kings*/}
            <section className="my-[200px]">
                <span className="text-2xl font-semibold bg-red-600 text-white p-1 rounded-sm">PROFESSIONAL TEAM</span>
                <h2 className="text-5xl mt-6 font-bold">Meet Our Kitchen Kings</h2>

                <div className=" mt-[120px] flex lg:flex-row flex-col justify-around">

                    <div className="card card-compact w-96 bg-gray-500 shadow-xl">
                        <figure><img src="https://i.ibb.co/7GcYNdw/Demo-1-Team-Image-1.jpg" alt="Shoes" /></figure>
                        <div className="card-body flex flex-col justify-center items-center">
                            <h2 className="card-title text-3xl text-white">Tamanna Chowdhury</h2>
                            <p className="text-2xl text-yellow-600">Master Chef</p>
                            <div className="card-actions justify-end mt-8 gap-8">
                                <button className="btn  text-2xl text-blue-600"><FaFacebookF /></button>
                                <button className="btn  text-2xl text-pink-600"><FaInstagram /></button>
                                <button className="btn  text-2xl text-blue-600"><FaTwitter /></button>
                            </div>
                        </div>
                    </div>

                    <div className="card card-compact w-96 bg-gray-500 shadow-xl">
                        <figure><img src="https://i.ibb.co/2vyNJGH/Demo-1-Team-Image-2.jpg" alt="Shoes" /></figure>
                        <div className="card-body flex flex-col justify-center items-center">
                            <h2 className="card-title text-3xl text-white">Christopher</h2>
                            <p className="text-2xl text-yellow-600">Executive Chef</p>
                            <div className="card-actions justify-end mt-8 gap-8">
                                <button className="btn  text-2xl text-blue-600"><FaFacebookF /></button>
                                <button className="btn  text-2xl text-pink-600"><FaInstagram /></button>
                                <button className="btn  text-2xl text-blue-600"><FaTwitter /></button>
                            </div>
                        </div>
                    </div>

                    <div className="card card-compact w-96 bg-gray-500 shadow-xl">
                        <figure><img src="https://i.ibb.co/KWh8R2N/Demo-1-Team-Image-3.jpg" alt="Shoes" /></figure>
                        <div className="card-body flex flex-col justify-center items-center">
                            <h2 className="card-title text-3xl text-white">Abdur Rahaman</h2>
                            <p className="text-2xl text-yellow-600">Chief Chef</p>
                            <div className="card-actions justify-end mt-8 gap-8">
                                <button className="btn  text-2xl text-blue-600"><FaFacebookF /></button>
                                <button className="btn  text-2xl text-pink-600"><FaInstagram /></button>
                                <button className="btn  text-2xl text-blue-600"><FaTwitter /></button>
                            </div>
                        </div>
                    </div>





                </div>
            </section>



        </div>
    );
};

export default Home;