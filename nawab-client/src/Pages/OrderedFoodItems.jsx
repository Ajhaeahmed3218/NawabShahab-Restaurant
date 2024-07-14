import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

import { AuthContext } from "../Provider/AuthProvider";
import useAxsiosSecure from "../hooks/useAxsiosSecure";
// import useAxsiosSecure from "../hooks/useAxsiosSecure";


const OrderedFoodItems = () => {
    const { user } = useContext(AuthContext)
    // console.log(`https://nawab-sahab-server.vercel.app/purchase/${user?.email}`);
    const [userFood, setUserFood] = useState([])
    const axiosSecure = useAxsiosSecure()

    useEffect(() => {

        // fetch(`https://nawab-sahab-server.vercel.app/purchase/${user?.email}` ,{credentials: 'include'}) 


        //     .then(res => res.json())
        //     .then(data => {
        //         // console.log(data);
        //         setUserFood(data)
        //         // Do something with the data
        //     })
        //     .catch(error => {
        //         console.error('Fetch error:', error);
        //         // Handle the error
        //     });


        axiosSecure(`/purchase/${user?.email}`, {withCredentials : true})
        .then(res => setUserFood(res.data))

    }, [user,axiosSecure]);


    const handleDelete = (_id) => {
        console.log(_id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://nawab-sahab-server.vercel.app/purchase/${_id}`, {
                    method: "DELETE",

                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            const remaining = userFood.filter(spot => spot._id !== _id)
                            setUserFood(remaining)
                        }
                    })
            }
        });
    }
    return (
        <div>
            <Helmet>
                <title>
                    My Ordered food | Nawabsahab
                </title>
            </Helmet>
        <h1 className="text-4xl text-center font-bold">My purchase Page</h1>
        <div className="overflow-x-auto container mx-auto mt-[80] mb-36">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Food img</th>
                        <th>Food Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       userFood.map(food => <tr key={food._id}>
                        
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={food.foodImg} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>

                            </div>
                        </td>
                        <td>
                           {food.foodName}
                                                            
                        </td>
                        <td>{food.price}</td>
                        <th>
                            {food.newQuantity}
                        </th>
                        
                        <td><button onClick={() => handleDelete(food._id)} className="btn">X</button></td>
                    </tr>)
                    }

                </tbody>
            </table>
        </div>
    </div>
    );
};

export default OrderedFoodItems;