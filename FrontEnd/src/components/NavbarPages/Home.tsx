// src/pages/Home.tsx
import { useEffect } from 'react';
import MainFooter from '../NavbarPages/MainFooter.tsx';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import AOS from 'aos';
import 'aos/dist/aos.css';

import fitnessVideo from '../../assets/video.mp4';
import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';
import image3 from '../../assets/image3.jpg';
import image4 from '../../assets/image4.jpg';

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      disable: 'mobile',
    });
  }, []);

  return (
    <div className="container-fluid p-0 bg-dark text-light">
      {/* Video Section with Overlay */}
      <div className="position-relative text-center">
        <video
          className="w-100"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ 
            maxHeight: '600px', 
            objectFit: 'cover', 
            display: 'block', // Ensures no inline spacing
            width: '100%',    // Explicitly set width
            height: 'auto'    // Let height adjust naturally, or set a fixed height
          }}
        >
          <source src={fitnessVideo} type="video/mp4" />
        </video>

        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          <div className="text-white text-center">
            <h1 className="display-4 fw-bold">Welcome to Squadfit</h1>
            <p className="lead">Your ultimate destination for sports and fitness</p>
          </div>
        </div>
      </div>

      {/* Card Container */}
      <div className="container py-5 ">
        <h2 className="text-center mb-5" style={{ color: '#FFFFFF' }} data-aos="fade-down">
          Our Features
        </h2>
        <div className="row g-4">
          {/* Card 1 */}
          <div className="col-md-4 col-sm-6" data-aos="fade-up">
            <div className="card h-100 shadow-lg border-0 overflow-hidden transition-all"
              style={{
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                backgroundColor: '#2d3748'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(15, 82, 186, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
              }}>
              <img
                src={image1}
                className="card-img-top"
                alt="Workout"
                style={{
                  height: '200px',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div className="card-body">
                <h5 className="card-title text-primary">Reservation</h5>
                <p className="card-text text-light">
                  Use our reservation system to book your next spot in a group class or training session.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4 col-sm-6" data-aos="fade-up" data-aos-delay="200">
            <div className="card h-100 shadow-lg border-0 overflow-hidden transition-all"
              style={{
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                backgroundColor: '#2d3748'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(15, 82, 186, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
              }}>
              <img
                src={image2}
                className="card-img-top"
                alt="Personal Training"
                style={{
                  height: '200px',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div className="card-body">
                <h5 className="card-title text-primary">Competitions</h5>
                <p className="card-text text-light">
                  Join our competitions and showcase your skills against other members.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4 col-sm-6" data-aos="fade-up" data-aos-delay="400">
            <div className="card h-100 shadow-lg border-0 overflow-hidden transition-all"
              style={{
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                backgroundColor: '#2d3748'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(15, 82, 186, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
              }}>
              <img
                src={image3}
                className="card-img-top"
                alt="Sports Facilities"
                style={{
                  height: '200px',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div className="card-body">
                <h5 className="card-title text-primary">Facilities</h5>
                <p className="card-text text-light">
                  Access premium sports amenities including courts, tracks, and equipment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a
  href="/about"
  className="text-decoration-none"
  style={{ display: 'block' }}
>
  <div
    className="text-white d-flex align-items-center justify-content-center my-5"
    style={{
      backgroundImage: `url(${image4})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '50vh',
      padding: '2rem',
      textAlign: 'center',
      position: 'relative',
    }}
  >
    {/* Overlay (optional for better contrast) */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
      }}
    ></div>

    <div data-aos="zoom-in" style={{ zIndex: 2 }}>
      <h2 className="fw-bold mb-3" style={{ fontSize: '2.5rem' }}>About Us</h2>
      <p className="lead">Click to learn more about our mission and the people behind Squadfit.</p>
    </div>
  </div>
</a>
      <MainFooter />
    </div>
  );
}