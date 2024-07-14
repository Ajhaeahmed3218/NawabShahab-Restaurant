import { Link } from "react-router-dom";


const Banner = () => {
    return (
        <div >
            <div className="carousel lg:w-[full]  h-[70vh] rounded-2xl">
                <div id="slide1" className="carousel-item relative w-full">
                    <img  src="https://i.ibb.co/8DPgcnj/Artboard-1-1.jpg" className="w-full " />
                    <Link to={'allfoods'}><button className="btn text-xl absolute bottom-24 left-[10rem] bg-yellow-400 border-none" >All Foods</button></Link>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img src="https://i.ibb.co/7zJnP2x/Artboard-2.jpg" className="w-full" />
                    <Link to={'allfoods'}><button className="btn text-xl absolute bottom-24 left-[10rem] bg-yellow-400 border-none" >All Foods</button></Link>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img src="https://i.ibb.co/QbG7mX5/Artboard-3.jpg" className="w-full" />
                    <Link to={'allfoods'}><button className="btn text-xl absolute bottom-24 left-[10rem] bg-yellow-400 border-none" >All Foods</button></Link>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Banner;