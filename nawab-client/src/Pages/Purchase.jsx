import {  useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";


const Purchase = () => {
    const {user} = useAuth()
    // const { user } = useContext(AuthContext)
    const [available, setAvailable] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const food = useLoaderData()
    const { _id, foodName, foodCategory, quantity, price, foodOrigin, addBy, foodImg } = food 
    console.log("foooooooooood",food);
    const handleAddSpot = event => {
        event.preventDefault();
        const form = event.target

        const foodName = form.foodName.value;
        const newFoodCategory = foodCategory;
        const beyerEmail = form.beyerEmail.value;
        const newQuantity = form.quantity.value;
        const price = form.price.value;
        const beyer = form.addBy.value;
        const foodOrigin = form.foodOrigin.value;


        // console.log(beyer, user.email);
        const info = {
            foodName, newFoodCategory, newQuantity, price, beyer, foodOrigin, beyerEmail, foodImg
        }

        if (addBy === user.email) {
            Swal.fire({
                title: 'Oops!',
                text: "You can't purchase your own added food items.",
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return;
        }
        // Check if the available quantity is zero
        if (quantity === 0) {
            Swal.fire({
                title: 'Sorry!',
                text: 'This item is currently out of stock.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            setAvailable(true)
            return;
        }

        if (quantity < newQuantity) {
            Swal.fire({
                title: 'Oops!',
                text: 'You can\'t buy more than the available quantity.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return;
        }



        // console.log(info);
        // ?newQuantity=${newQuantity}
        fetch(`https://nawab-sahab-server.vercel.app/purchase/${_id}?newQuantity=${newQuantity}`, {
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
                        text: 'Purchase successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    form.reset()
                    navigate(location?.state ? location.state : '/')

                }
            })




    }

    // console.log(available);

    return (
        <div className="container mx-auto">
            <Helmet>
                <title>
                    Purchase | Nawabsahab
                </title>
            </Helmet>
            <div className="hero min-h-[30vh] rounded-2xl my-[80px] " style={{ backgroundImage: 'url(https://i.ibb.co/nDS7rXq/res-banner.jpg)' }}>
                <div className="hero-overlay bg-opacity-60 rounded-2xl "></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Purchase Now</h1>

                    </div>
                </div>
            </div>

            <form onSubmit={handleAddSpot} className="border-2 md:p-6 md:mx-5 rounded-xl my-[100px]">
                <div className="grid md:grid-cols-2  gap-7 p-16">
                    {/* food name */}
                    <div>
                        <p className="text-xl ml-3">Name</p>
                        <input className="w-full h-[50px] border-2 rounded-xl p-1  " required type="text" name="foodName" defaultValue={foodName} />
                    </div>
                    {/* Price */}
                    <div>
                        <p className="text-xl ml-3">Price</p>
                        <input className="w-full h-[50px] border-2 rounded-xl p-1 " required type="text" name="price" value={price} />
                    </div>
                    {/* quantity */}
                    <div>
                        <p className="text-xl ml-3">Quantity</p>
                        <input className="w-full h-[50px] border-2 rounded-xl p-1 " required type="text" name="quantity" defaultValue={quantity} />
                    </div>
                    {/*  Buyer */}
                    <div>
                        <p className="text-xl ml-3">Buyer</p>
                        <input className="w-full h-[50px] border-2 rounded-xl p-1 " value={user?.displayName} required type="text" name="addBy" />
                    </div>

                    {/* Buyer Email */}
                    <div>
                        <p className="text-xl ml-3">Buyer Email</p>
                        <input className="w-full h-[50px] border-2 rounded-xl p-1 " required type="email" name="beyerEmail" value={user?.email} />
                    </div>
                    {/* Buying Date */}
                    <div>
                        <p className="text-xl ml-3">Buying Date</p>
                        <input className="w-full h-[50px] border-2 rounded-xl p-1 " required type="text" name="foodOrigin" value={new Date().toLocaleString()} readOnly />
                    </div>




                </div>
                <div className=" container mx-auto " >
                <input
                className="lg:w-full h-[50px] rounded-xl bg-[#2596be] p-1"
                type="submit"
                value="Add"
                disabled={available}
                
            />
                </div>
            </form>
        </div>
    );
};

export default Purchase;