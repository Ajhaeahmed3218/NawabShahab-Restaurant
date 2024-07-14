import {  createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home";
import AllFood from "../Pages/AllFood";
import Gallery from "../Pages/Gallery";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import MyAddedFoodItems from "../Pages/MyAddedFoodItems";
import AddFoodItem from "../Pages/AddFoodItem";
import OrderedFoodItems from "../Pages/OrderedFoodItems";
import DetailsFood from "../Pages/DetailsFood";
import UpdateFood from "../Pages/UpdateFood";
import PriverRoute from "./PriverRoute";
import Error from "../Components/Error";
import Purchase from "../Pages/Purchase";
import ShortMenu from "../Pages/ShortMenu";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      errorElement : <Error/>,
      children : [
        {
            path : "/",
            element:<Home/>,
        },
        {
            path:"/allfoods",
            element:<AllFood/>,
            loader: () => fetch('https://nawab-sahab-server.vercel.app/allfood')
        },
        {
            path:"/gallery",
            element:<Gallery/>,
            loader : () => fetch('https://nawab-sahab-server.vercel.app/foodgallery')
        },
        {
            path: "/register",
            element:<Register/>
        },
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/myfooditems",
            element:<PriverRoute><MyAddedFoodItems/></PriverRoute>
        },
        {
            path:"/addfooditem",
            element:<PriverRoute><AddFoodItem/></PriverRoute>
        },
        {
            path:"/myorderedfooditems",
            element:<PriverRoute><OrderedFoodItems/></PriverRoute>
        },
        {
            path:`/details/:id`,
            element : <DetailsFood/>,
            loader: ({params}) => fetch(`https://nawab-sahab-server.vercel.app/allfood/${params.id}`)
        },
        {
            path:"/updatefood/:id",
            element:<PriverRoute><UpdateFood/></PriverRoute>,
            loader : ({params}) => fetch(`https://nawab-sahab-server.vercel.app/allfood/${params.id}`,{credentials: 'include'})
        },
        {
            path:"/purchase/:id",
            element:<PriverRoute><Purchase/></PriverRoute>,
            loader : ({params}) => fetch(`https://nawab-sahab-server.vercel.app/allfood/${params.id}`,{credentials: 'include'})
        },
        {
            path:'/shortMenu',
            element : <ShortMenu/>
        }
      ]
    },
  ]);

export default router