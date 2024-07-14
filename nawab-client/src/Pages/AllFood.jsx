import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLoaderData } from "react-router-dom";

const AllFood = () => {
    const loadedData = useLoaderData()
    const [allFood, setAllFood] = useState(loadedData)
    // const {foodImg} = allFood
    const [searchInput, setSearchInput] = useState('');
    const handleSearch = e =>{
        e.preventDefault();
        // Here you can perform any action with the searchInput state
        console.log(searchInput);
        
    }
    useEffect(() => {
        fetch(`https://nawab-sahab-server.vercel.app/search/${searchInput}`)
        .then(res => res.json())
        .then(data => setAllFood(data))
    },[searchInput])

    return (
        <div className="container mx-auto">
            <Helmet>
                <title>
                    Allfood | Nawabsahab
                </title>
            </Helmet>
            <div className="hero min-h-[30vh] rounded-2xl my-12 bg-cover bg-center" style={{ backgroundImage: 'url(https://i.ibb.co/7n7CxRX/res-banner-2.jpg)' }}>
                <div className="hero-overlay bg-opacity-60 rounded-2xl"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="w-[400px]">
                        <h1 className="mb-5 text-5xl font-bold">All Foods</h1>

                        <form onSubmit={handleSearch} className="max-w-md mx-auto" >
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-black dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input onChange={(e) => setSearchInput(e.target.value)} type="search" id="default-search" className="block w-full p-4 pt-5 ps-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50/65 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Food Name"  />
                                <button  type="submit" className="text-white  absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                            </div>
                            <button className="btn btn-active btn-ghost">Reset</button>
                        </form>


                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-y-5 my-[80px]">
                {
                    allFood.map(food => <div key={food._id} className="card md:w-2/3  card-side bg-gray-300 shadow-xl">
                        <div className="lg:w-[250px] h-[250px]l rounded-2xl"><img className="rounded-2xl w-full h-full" src={food?.foodImg} alt="Food" /></div>
                        <div className="card-body font-bold">
                            <h2 className="card-title">{food?.foodName}</h2>
                            <h2 className="card-title">Price :{food?.price}</h2>
                            <p>Category : {food?.foodCategory}</p>
                            <p>quantity : {food?.quantity}</p>

                            <div className="card-actions justify-end">
                                <Link to={`/details/${food?._id}`}><button className="btn bg-[#da3939bb] border-none">Show Details</button></Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AllFood; <h1>All Food</h1>