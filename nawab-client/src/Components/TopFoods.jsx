import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const TopFoods = () => {
    const [topFoods, setTopFoods] = useState([])

    useEffect(() => {
        fetch('https://nawab-sahab-server.vercel.app/allfoodSort')
        .then(res => res.json())
        .then(data => setTopFoods(data))
    },[])
    console.log(topFoods);
    return (
        <div className="flex flex-col items-center w-full justify-center gap-y-20">
            <h1 className="text-5xl font-bold text-center mt-[80px]">Top Foods</h1>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-y-10 gap-x-[200px] ">
                {
                    topFoods.map(food => <div key={food._id} className="card md:w-full w-fit flex-col md:flex-row card-side bg-gray-300 shadow-xl">
                        <div className="lg:w-[250px] w-full h-[250px]l rounded-2xl"><img className="rounded-2xl w-full h-full" src={food?.foodImg} alt="Food" /></div>
                        <div className="card-body font-bold">
                            <h2 className="card-title">{food?.foodName}</h2>
                            <h2 className="card-title">Price :{food?.price}</h2>
                            <p>Category : {food?.foodCategory}</p>
                            <p>purchase : {food?.purchase}</p>
                            
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

export default TopFoods;