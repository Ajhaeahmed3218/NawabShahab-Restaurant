import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
    const { user, logOut, setUser } = useContext(AuthContext)

    const [theme, setTheme] = useState("light")
    useEffect(() => {
        localStorage.setItem("theme", theme)
        const localTheme = localStorage.getItem('theme')
        document.querySelector('html').setAttribute('data-theme', localTheme)
    }, [theme])


    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }
    // console.log(theme);

    
    const handleLoguot = () => {
        setUser(null)
        logOut()

    }

    const navLink = <>
        <li><NavLink to={"/"} className={({ isActive }) => isActive ? "text-white border-2 border-[#d03eb3] bg-[#dc4149] py-3 px-5 font-bold rounded-xl" : "font-bold py-3 px-5 "}>Home</NavLink></li>

        <li><NavLink to={"/allfoods"} className={({ isActive }) => isActive ? "text-white border-2 border-[#4fadff] bg-[#dc4149]  py-3 px-5 font-bold rounded-xl" : "font-bold py-3 px-5 "}>All Foods</NavLink></li>

        <li><NavLink to={"/gallery"} className={({ isActive }) => isActive ? "text-white border-2 border-[#4fadff] bg-[#dc4149]  py-3 px-5 font-bold rounded-xl" : "font-bold py-3 px-5 "}>Gallery</NavLink></li>



        <li><NavLink to={"/register"} className={({ isActive }) => isActive ? "text-white border-2 border-[#4fadff] bg-[#dc4149]  py-3 px-5 font-bold rounded-xl" : "font-bold py-3 px-5 "}>Register</NavLink></li>



    </>
    return (
        <div  className="sticky ">
            <div className="navbar bg-base-100 container mx-auto my-8">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLink}
                        </ul>
                    </div>
                    <Link to={'/'} className=" text-xl"><img className="md:w-[50px] w-[30px]" src="https://i.ibb.co/d7pZKX8/Untitled-1.png" alt="Logo" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLink}
                    </ul>
                </div>
                <div className="navbar-end">
                    <label className="swap swap-rotate md:mr-5">

                        {/* this hidden checkbox controls the state */}
                        <input onChange={handleToggle} type="checkbox" className="theme-controller" />

                        {/* sun icon */}
                        <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                        {/* moon icon */}
                        <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                    </label>
                    {

                        user ? <>
                            <div className="dropdown dropdown-end md:mr-4 z-30">

                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar z-30 " data-tooltip-id="my-tooltip" data-tooltip-content={user?.displayName}>
                                    <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                                    </div>
                                    {/* <ReactTooltip
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content="Hello world!" /> */}
                                </div>
                                <ul tabIndex={0} className="mt-3 z-[30] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">

                                    {/* <li>{user?.displayName}</li> */}
                                    <li><Link to={"/myfooditems"}>My added food items</Link></li>
                                    <li><Link to={"/addfooditem"}>Add a food item</Link></li>
                                    <li><Link to={"/myorderedfooditems"}>My ordered food items</Link></li>
                                    {/* <li><button onClick={handleLoguot}>Logout</button></li> */}
                                </ul>



                            </div>
                            <Link ><a onClick={handleLoguot} className="btn border-[#4fadff]">Logout</a></Link>
                        </>
                            : <Link to={'/login'}><a className="btn border-[#4fadff]">Login</a></Link>
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default Navbar;