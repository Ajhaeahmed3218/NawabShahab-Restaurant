import { Helmet } from "react-helmet-async";
import { Link, useLoaderData } from "react-router-dom";


const DetailsFood = () => {
    const food = useLoaderData()
    const { foodName, _id, foodImg, price, foodCategory, foodOrigin,quantity, shorDescription, addBy } = food
    // console.log(foodImage);
    return (
        <div className="container mx-auto my-[150px]">
            <Helmet>
                <title>
                {foodName} | Nawabsahab
                </title>
            </Helmet>
           
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <div className="lg:w-[600px] "><img className="rounded-2xl" src={foodImg} alt="Album" /></div>
                <div className=" p-5 space-y-2">
                    <h2 className="card-title text-3xl font-bold "> {foodName}</h2>
                    <p className="text-2xl">${price}</p>
                    <p className="text-2xl">{foodCategory}</p>
                    <p className="text-2xl">Made By {addBy}</p>
                    <p className="text-2xl">Food Origin is {foodOrigin}</p>
                    <p className="text-2xl">Available Now :  {quantity}</p>
                    <p className="text-2xl w-2/3 font-light">{shorDescription}</p>
                    <div className="card-actions justify-start">
                        <Link to={`/purchase/${_id}`}><button className="btn bg-[#da3939bb] font-bold text-xl">Purchase</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsFood;