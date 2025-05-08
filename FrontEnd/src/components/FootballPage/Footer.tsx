import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MainFooter from "../NavbarPages/MainFooter";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white mt-5">
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold text-uppercase">Levels of Play</h2>
      <div className="row g-4">
        {/* Beginner Level */}
        <div className="col-md-6 col-lg-3">
          <div className="d-flex align-items-center mb-3">
            <i className="fas fa-seedling fa-2x me-3 text-success"></i>
            <h3 className="mb-0 fw-semibold">BEGINNER</h3>
          </div>
          <ul className="list-unstyled text-light">
            <li className="mb-2">• Ideal for those new to football</li>
            <li className="mb-2">• Learn basic skills and rules</li>
            <li className="mb-2">• Friendly, supportive environment</li>
          </ul>
        </div>
  
        {/* Recreational Level */}
        <div className="col-md-6 col-lg-3">
          <div className="d-flex align-items-center mb-3">
            <i className="fas fa-basketball-ball fa-2x me-3 text-primary"></i>
            <h3 className="mb-0 fw-semibold">RECREATIONAL</h3>
          </div>
          <ul className="list-unstyled text-light">
            <li className="mb-2">• Great for casual players</li>
            <li className="mb-2">• Focus on fun and fundamentals</li>
            <li className="mb-2">• Meet fellow enthusiasts</li>
          </ul>
        </div>
  
        {/* Competitive Level */}
        <div className="col-md-6 col-lg-3">
          <div className="d-flex align-items-center mb-3">
            <i className="fas fa-trophy fa-2x me-3 text-warning"></i>
            <h3 className="mb-0 fw-semibold">INTERMEDIATE</h3>
          </div>
          <ul className="list-unstyled text-light">
            <li className="mb-2">• For skilled players</li>
            <li className="mb-2">• Organized games & tournaments</li>
            <li className="mb-2">• Join local leagues</li>
          </ul>
        </div>
  
        {/* Advanced Level */}
        <div className="col-md-6 col-lg-3">
          <div className="d-flex align-items-center mb-3">
            <i className="fas fa-fire fa-2x me-3 text-danger"></i>
            <h3 className="mb-0 fw-semibold">ADVANCED</h3>
          </div>
          <ul className="list-unstyled text-light">
            <li className="mb-2">• Elite-level competition</li>
            <li className="mb-2">• High-intensity training</li>
            <li className="mb-2">• Showcase your skills</li>
          </ul>
        </div>
      </div>
    </div>

      {/* Find Out More Section */}
      <div className="bg-navy py-5" style={{ backgroundColor: "#0A2647" }}>
        <div className="container">
          <h2 className="text-center mb-4">FIND OUT MORE</h2>
          <div className="accordion" id="footerAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#howLeaguesWork"
                >
                  HOW THE LEAGUES WORK
                </button>
              </h2>
              <div
                id="howLeaguesWork"
                className="accordion-collapse collapse"
                data-bs-parent="#footerAccordion"
              >
                <div className="accordion-body">
                  <p>
                    Our leagues run throughout the year in 8-12 week seasons.
                    Teams play one match per week at the same venue, same day,
                    and same time.
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#howToRegister"
                >
                  HOW TO REGISTER
                </button>
              </h2>
              <div
                id="howToRegister"
                className="accordion-collapse collapse"
                data-bs-parent="#footerAccordion"
              >
                <div className="accordion-body">
                  <p>
                    Registration is easy! Simply click the 'ENQUIRE NOW' button
                    on any match that interests you, and we'll guide you through
                    the process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </footer>
  );
};

export default Footer;
