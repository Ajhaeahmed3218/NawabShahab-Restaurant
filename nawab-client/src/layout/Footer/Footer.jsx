

const Footer = () => {
    return (
        <div className="container mx-auto">
           <footer className="footer p-10 bg-neutral text-neutral-content">
    <div className="container mx-auto lg:flex lg:justify-between">
        <div className="flex items-center mb-6 lg:mb-0">
            <img src="https://i.ibb.co/d7pZKX8/Untitled-1.png" alt="NawabSahab Logo" className="h-8 w-8 lg:h-10 lg:w-10 mr-2" />
            <span className="font-bold text-lg lg:text-xl">NawabSahab</span>
        </div>
        <div className="footer-contact mb-6 lg:mb-0">
            <p>Contact us:</p>
            <p>Email: info@nawabsahab.com</p>
            <p>Phone: +1234567890</p>
        </div>
        <div className="footer-nav mb-6 lg:mb-0">
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Menu</a>
                <a className="link link-hover">Reservations</a>
                <a className="link link-hover">Catering</a>
                <a className="link link-hover">Events</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Careers</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </div>
        <div className="footer-social">
            <p>Follow us:</p>
            <div className="flex space-x-4">
                <a href="#" className="text-blue-500 hover:text-blue-700">
                    <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-700">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-700">
                    <i className="fab fa-instagram"></i>
                </a>
            </div>
        </div>
    </div>
    <div className="footer-info mt-6 lg:mt-0 text-center lg:text-left">
        <p>&copy; 2024 NawabSahab. All rights reserved.</p>
        <p>123 Main Street, City, Country</p>
    </div>
</footer>

        </div>
    );
};

export default Footer;