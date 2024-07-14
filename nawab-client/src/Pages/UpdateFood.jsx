import { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const UpdateFood = () => {
    const { user } = useContext(AuthContext)
    const food = useLoaderData()
    const {_id, foodName, foodImg, foodCategory, quantity, price,  foodOrigin, shorDescription } = food
   
    const handleAddSpot = event => {
        event.preventDefault();
        const form = event.target

        const foodName = form.foodName.value;
        const foodImg = form.foodImg.value;
        const foodCategory = form.foodCategory.value;
        const quantity = form.quantity.value;
        const price = form.price.value;
        const addBy = form.addBy.value;
        const foodOrigin = form.foodOrigin.value;
        const shorDescription = form.shorDescription.value;
        const purchase = 0 ;
        

        const info = {
            foodName, foodImg, foodCategory, quantity, price, addBy, foodOrigin, shorDescription , purchase
        }
        console.log(info);

        fetch(`https://nawab-sahab-server.vercel.app/allfood/${_id}`, {
            method:"PUT",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(info)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Tourist Sport Update successfully',
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
                Update Food | Nawabsahab
                </title>
            </Helmet>
        <h1 className="md:text-4xl text-2xl font-bold text-center">Update Food Item</h1>
        <form onSubmit={handleAddSpot} className="border-2 md:p-6 md:mx-5 rounded-xl my-[100px]">
            <div className="grid md:grid-cols-2  gap-7 p-16">
                {/* food name */}
                <input className="w-full h-[50px] border-2 rounded-xl p-1  " required type="text" name="foodName" defaultValue ={foodName} />
                {/* Food img */}
                <input className="w-full h-[50px] border-2 rounded-xl p-1 " required type="text" name="foodImg" defaultValue ={foodImg} />
                {/* Food Category */}
                <input className="w-full h-[50px] border-2 rounded-xl p-1 " required type="text" name="foodCategory" defaultValue ={foodCategory} />
                {/* quantity */}
                <input className="w-full h-[50px] border-2 rounded-xl p-1 " required type="text" name="quantity" defaultValue ={quantity} />
                {/* Price */}
                <input className="w-full h-[50px] border-2 rounded-xl p-1 " required type="text" name="price" defaultValue={price} />
                {/* Add By */}
                <input className="w-full h-[50px] border-2 rounded-xl p-1 "  value={user?.email} required type="text"   name="addBy"/>
                {/* Food Origin */}
                <input className="w-full h-[50px] border-2 rounded-xl p-1 " required type="text" name="foodOrigin" defaultValue ={foodOrigin} />
                {/* A short description */}
                <input className="w-full h-[50px] border-2 rounded-xl p-1 " required type="text" name="shorDescription" defaultValue ={shorDescription} />

               

            </div>
            <div className="container mx-auto">
            <input className="lg:w-full h-[50px]  rounded-xl bg-[#2596be] p-1 " type="submit" value="Add " />
            </div>
        </form>
    </div>
    );
};

export default UpdateFood;