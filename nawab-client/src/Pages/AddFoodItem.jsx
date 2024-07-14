import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";


const AddFoodItem = () => {
    const { user } = useContext(AuthContext)
    // console.log(user);
    const handleAddSpot = event => {
        event.preventDefault();
        const form = event.target

        const foodName = form.foodName.value;
        const foodImg = form.foodImg.value;
        const foodCategory = form.foodCategory.value;
        const quantity = parseInt(form.quantity.value);
        const price = form.price.value;
        const addBy = form.addBy.value;
        const foodOrigin = form.foodOrigin.value;
        const shorDescription = form.shorDescription.value;
        const purchase = 0 ;
        const madeBy = user.displayName

        

        const info = {
            foodName, foodImg, foodCategory, quantity, price, addBy, foodOrigin, shorDescription , purchase, madeBy
        }
        // console.log(info);

        // Send data to server

        fetch('https://nawab-sahab-server.vercel.app/allfood',  {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);

                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Tourist Sport Added successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    form.reset()
                }
            })

    
}





    return (
        <div>
            <Helmet>
                <title>
                    Add food items | Nawabsahab
                </title>
            </Helmet>
            <h1 className="md:text-4xl text-2xl font-bold text-center">Add a Food Item</h1>
            <form onSubmit={handleAddSpot} className="border-2 md:p-6 md:mx-5 rounded-xl my-[100px]">
                <div className="grid md:grid-cols-2  gap-7 p-16">
                    {/* food name */}
                    <input className="w-full h-[50px] border-2 rounded-xl p-1  " required type="text" name="foodName" placeholder="Food Name" />
                    {/* Food img */}
                    <input className="w-full h-[50px] border-2 rounded-xl p-1 " required type="text" name="foodImg" placeholder="Food Image" />
                    {/* Food Category */}
                    <input className="w-full h-[50px] border-2 rounded-xl p-1 " required type="text" name="foodCategory" placeholder="Food Category" />
                    {/* quantity */}
                    <input className="w-full h-[50px] border-2 rounded-xl p-1 " required type="text" name="quantity" placeholder="Quantity" />
                    {/* Price */}
                    <input className="w-full h-[50px] border-2 rounded-xl p-1 " required type="text" name="price" placeholder="Price" />
                    {/* Add By */}
                    <input className="w-full h-[50px] border-2 rounded-xl p-1 "  value={user?.email} required type="text"  placeholder="Add By" name="addBy"/>
                    {/* Food Origin */}
                    <input className="w-full h-[50px] border-2 rounded-xl p-1 " required type="text" name="foodOrigin" placeholder="Food Origin" />
                    {/* A short description */}
                    <input className="w-full h-[50px] border-2 rounded-xl p-1 " required type="text" name="shorDescription" placeholder="Short description" />

                   

                </div>
                <div className="container mx-auto">
                <input className="lg:w-full h-[50px]  rounded-xl bg-[#2596be] p-1 " type="submit" value="Add " />
                </div>
            </form>
        </div>
    );
};

export default AddFoodItem;<h1>Add a food item</h1>