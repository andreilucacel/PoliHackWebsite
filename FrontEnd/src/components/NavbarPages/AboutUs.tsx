// src/pages/About.tsx
import { useEffect } from "react";
import MainFooter from "../NavbarPages/MainFooter.tsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import AOS from "aos";
import "aos/dist/aos.css";

import aboutImage1 from "../../assets/about1.jpg";
import aboutImage2 from "../../assets/image2.jpg";
import aboutImage3 from "../../assets/image3.jpg";
import teamImage from "../../assets/about2.jpg";

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      disable: "mobile",
    });
  }, []);

  return (
    <div className="container-fluid p-0 bg-dark text-light">
      {/* Hero Banner */}
      <div
        className="position-relative text-center"
        style={{
          height: "60vh",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${teamImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-white text-center" data-aos="zoom-in">
          <h1 className="display-3 fw-bold mb-4">Our Slogan</h1>
          <p
            className="lead fs-4"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            Building a fitness community that empowers and connects
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0" data-aos="fade-right">
            <img
              src={aboutImage1}
              alt="Squadfit team training"
              className="img-fluid rounded shadow-lg"
              style={{
                border: "4px solid rgba(15, 82, 186, 0.3)",
              }}
            />
          </div>
          <div className="col-lg-6" data-aos="fade-left">
            <div className="ps-lg-5">
              <h2 className="fw-bold mb-4 text-primary">Our Mission</h2>
              <p className="fs-5 mb-4 text-light">
                At Squadfit, we're revolutionizing sport by organizing exciting
                competitions that invite you to play solo or with friends.
                Launched in 2025, we've expanded from a local challenge group to
                a vibrant community of players across towns. We believe sports
                should be fun, accessible, and adaptable—whether friendly or
                competitive, connecting communities across your town.
              </p>
              <p className="fs-5 mb-4 text-light">
                We believe fitness should be accessible, enjoyable, and
                sustainable. Our eco-conscious approach means we minimize our
                environmental impact while maximizing your results.
              </p>
              <div className="d-flex align-items-center">
                <div className="me-4">
                  <h3 className="fw-bold text-primary">50+</h3>
                  <p className="mb-0 text-light">Members</p>
                </div>
                <div className="me-4">
                  <h3 className="fw-bold text-primary">20+</h3>
                  <p className="mb-0 text-light">Sports Fields</p>
                </div>
                <div>
                  <h3 className="fw-bold text-primary">100%</h3>
                  <p className="mb-0 text-light">Community Focused</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-5" style={{ backgroundColor: "#2d3748" }}>
        <div className="container">
          <h2 className="text-center mb-5 text-primary" data-aos="fade-down">
            Our Core Values
          </h2>
          <div className="row g-4">
            <div className="col-md-4" data-aos="fade-up">
              <div className="card h-100 border-0 shadow-lg text-primary">
                <div className="card-body text-center p-4 bg-primary">
                  <div className="mb-4" style={{ fontSize: "2.5rem" }}>
                    💪
                  </div>
                  <h3 className="card-title mb-3 text-light">
                    Strength in Community
                  </h3>
                  <p className="card-text text-light">
                    We believe fitness is better together. Our members motivate
                    each other to push beyond limits. Every friendly competition
                    ignites a spark of camaraderie.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="card h-100 border-0 shadow-lg bg-primary">
                <div className="card-body text-center p-4">
                  <div className="mb-4" style={{ fontSize: "2.5rem" }}>
                    🌱
                  </div>
                  <h3 className="card-title mb-3 text-light">Eco-Active</h3>
                  <p className="card-text text-light">
                    Play At Squadfit, sustainable energy meets the thrill of
                    competition. Join friendly and spirited games that challenge
                    you to move, connect, and boost your fitness.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="400">
              <div className="card h-100 border-0 shadow-lg bg-primary">
                <div className="card-body text-center p-4">
                  <div className="mb-4" style={{ fontSize: "2.5rem" }}>
                    ✨
                  </div>
                  <h3 className="card-title mb-3 text-light">
                    Community Synergy
                  </h3>
                  <p className="card-text text-light">
                    We unite local players through engaging matches—whether
                    competing solo or with friends. Every game is a chance to
                    strengthen community bonds and enhance your health.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container py-5">
        <h2 className="text-center mb-5 text-primary" data-aos="fade-down">
          Meet The Founders
        </h2>
        <div className="row g-4 justify-content-center">
          <div className="col-lg-4 col-md-6" data-aos="fade-up">
            <div
              className="card border-0 shadow-lg h-100"
              style={{ backgroundColor: "#2d3748" }}
            >
              <img
                src={aboutImage2}
                className="card-img-top"
                alt="Victor Muresan - CEO"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h3 className="card-title mb-2 text-primary">Victor Muresan</h3>
                <p
                  className="text-uppercase small mb-3"
                  style={{ color: "#87CEEB" }}
                >
                  CEO & Head Trainer
                </p>
                <p className="card-text text-light">
                  Former professional athlete with 5+ years training experience.
                  Passionate about making elite training accessible to all.
                </p>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div
              className="card border-0 shadow-lg h-100"
              style={{ backgroundColor: "#2d3748" }}
            >
              <img
                src={aboutImage3}
                className="card-img-top"
                alt="Lucacel Andrei - COO"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h3 className="card-title mb-2 text-primary">Andrei Tataru</h3>
                <p
                  className="text-uppercase small mb-3"
                  style={{ color: "#87CEEB" }}
                >
                  COO & Nutrition Expert
                </p>
                <p className="card-text text-light">
                  Sports nutrition specialist who believes food is fuel. Creates
                  our meal plans and sustainable operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        className="py-5 text-center"
        style={{
          backgroundColor: "#1E3A8A",
          backgroundImage: "linear-gradient(to right,rgb(0, 0, 255), #87CEEB)",
        }}
        data-aos="fade-up"
      >
        <div className="container">
          <h2 className="fw-bold mb-4" style={{ color: "#FFFFFF" }}>
            Ready to Join the Squad?
          </h2>
          <p
            className="lead mb-5"
            style={{ color: "#E2E8F0", maxWidth: "700px", margin: "0 auto" }}
          >
            Whether you're a beginner or seasoned athlete, we have a place for
            you in our community.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a
              href="/football"
              className="btn btn-primary btn-lg px-4 py-2 fw-bold"
              style={{ backgroundColor: "#87CEEB", border: "none" }}
            >
              Sign Up Now
            </a>
            <a
              href="/contact"
              className="btn btn-outline-light btn-lg px-4 py-2 fw-bold"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <MainFooter />
    </div>
  );
}