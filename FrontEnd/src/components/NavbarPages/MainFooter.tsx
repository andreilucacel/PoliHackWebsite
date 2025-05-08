// src/components/MainFooter.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function MainFooter() {
    return (
        <footer className="bg-dark text-light pt-5 pb-4 position-relative overflow-hidden">
            <div className="container position-relative z-1">
                <div className="row gy-5">
                    {/* Quick Links */}
                    <div className="col-md-6 animate__animated animate__fadeInLeft">
                        <h5 className="text-uppercase fw-bold mb-4">Quick Links</h5>
                        <ul className="list-unstyled">
                        <li className="mb-3">
                                <a href="/" className="text-light text-decoration-none position-relative d-inline-block link-hover">
                                    Home
                                </a>
                            </li>
                            <li className="mb-3">
                                <a href="/about" className="text-light text-decoration-none position-relative d-inline-block link-hover">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/faq" className="text-light text-decoration-none position-relative d-inline-block link-hover">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-md-6 animate__animated animate__fadeInRight">
                        <h5 className="text-uppercase fw-bold mb-4">Connect With Us</h5>
                        <div className=" bg-opacity-10 rounded-4 p-4 shadow-sm" style={{backgroundColor: '#2d3748' }}>
                            <p className="mb-2 d-flex align-items-center">
                                <i className="bi bi-envelope me-2 text-primary fs-5"></i>
                                <span>
                                    <a href="mailto:info@squadfit.com" className="text-white text-decoration-none hover-primary">info@squadfit.com</a>
                                </span>
                            </p>
                            <p className="mb-0 d-flex align-items-center">
                                <i className="bi bi-telephone me-2 text-primary fs-5"></i>
                                <span>
                                    <a href="tel:+40728524664" className="text-white text-decoration-none hover-primary">+40 728 524 664</a>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="text-center mt-5 animate__animated animate__fadeInUp">
                    <hr className="border-secondary mb-4" />
                    <p className="mb-0 text-white-50">&copy; {new Date().getFullYear()} Squadfit. All rights reserved.</p>
                </div>
            </div>

            {/* Subtle background overlay */}
            <div className="bg-decoration position-absolute top-0 start-0 w-100 h-100 opacity-10"></div>

            {/* Optional: Add this style for link hover underline effect */}
            <style>{`
                .link-hover::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: -2px;
                    width: 100%;
                    height: 2px;
                    background-color: #0d6efd;
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.3s ease;
                }
                .link-hover:hover::after {
                    transform: scaleX(1);
                }
            `}</style>
        </footer>
    );
}
