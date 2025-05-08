import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/NavbarPages/Home";
import About from "./components/NavbarPages/AboutUs";
import Achievements from "./components/NavbarPages/Achievements";
// Football components
import FootballHeader from "./components/FootballPage/Header";
import FootballMatchesList from "./components/FootballPage/MatchesList";
import FootballMapComponent from "./components/FootballPage/GoogleMap";
import FootballFooter from "./components/FootballPage/Footer";
import NavBar from "./components/Navbar";

// Basketball components
import BasketballHeader from "./components/BasketballPage/Header";
import BasketballMatchesList from "./components/BasketballPage/MatchesListBasket";
import BasketballMapComponent from "./components/BasketballPage/GoogleMapBasket";
import BasketballFooter from "./components/BasketballPage/Footer";

import TennisPage from "./components/TennisPage/TennisPage";
import MatchDetails from "./components/FootballPage/MatchDetails";

import { Match as FootballMatch } from "./components/FootballPage/MatchesList";
import { Match as BasketballMatch } from "./components/BasketballPage/MatchesListBasket";
import imageSrcPath from "./assets/logo_hack.png";
import Chat from "./components/Chat";

function App() {
  const [footballMatches, setFootballMatches] = useState<FootballMatch[]>([]);
  const [basketballMatches, setBasketballMatches] = useState<BasketballMatch[]>(
    []
  );
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  type NavItem = {
    label: string;
    url: string;
    exact?: boolean;
  };

  const navItems: NavItem[] = [
    { label: "Home", url: "/", exact: true },
    { label: "About Us", url: "/about" },
    { label: "Achievements", url: "/achievements" },
  ];

  const dropdownItems: NavItem[] = [
    { label: "Football", url: "/football" },
    { label: "Basketball", url: "/basketball" },
    { label: "Tennis", url: "/tennis" },
  ];

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navigation */}
        <NavBar
          imageSrcPath={imageSrcPath}
          navItems={navItems}
          dropdownTitle="Sports"
          dropdownItems={dropdownItems}
          brandUrl="/"
        />

        <Routes>
          {/* Football Page */}
          <Route
            path="/football"
            element={
              <>
                <FootballHeader onMatchesUpdate={setFootballMatches} />
                <div className="container-fluid mt-4 flex-grow-1">
                  <div className="d-flex justify-content-end mb-3">
                    <div className="btn-group">
                      <button
                        className={`btn ${
                          viewMode === "list"
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => setViewMode("list")}
                      >
                        List View
                      </button>
                      <button
                        className={`btn ${
                          viewMode === "map"
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => setViewMode("map")}
                      >
                        Map View
                      </button>
                    </div>
                  </div>

                  {viewMode === "list" ? (
                    <FootballMatchesList matches={footballMatches} />
                  ) : (
                    <div style={{ height: "600px" }}>
                      <FootballMapComponent />
                    </div>
                  )}
                </div>
                <FootballFooter />
              </>
            }
          />

          {/* Basketball Page */}
          <Route
            path="/basketball"
            element={
              <>
                <BasketballHeader onMatchesUpdate={setBasketballMatches} />
                <div className="container-fluid mt-4 flex-grow-1">
                  <div className="d-flex justify-content-end mb-3">
                    <div className="btn-group">
                      <button
                        className={`btn ${
                          viewMode === "list"
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => setViewMode("list")}
                      >
                        List View
                      </button>
                      <button
                        className={`btn ${
                          viewMode === "map"
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => setViewMode("map")}
                      >
                        Map View
                      </button>
                    </div>
                  </div>

                  {viewMode === "list" ? (
                    <BasketballMatchesList matches={basketballMatches} />
                  ) : (
                    <div style={{ height: "600px" }}>
                      <BasketballMapComponent />
                    </div>
                  )}
                </div>
                <BasketballFooter />
              </>
            }
          />
          {/* <Route
            path="/basketball"
            element={
              <>
                <BasketballHeader onMatchesUpdate={setBasketballMatches} />
                <div className="container-fluid mt-4 flex-grow-1">
                  <div className="d-flex justify-content-end mb-3">
                    <div className="btn-group">
                      <button
                        className={`btn ${
                          viewMode === "list"
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => setViewMode("list")}
                      >
                        List View
                      </button>
                      <button
                        className={`btn ${
                          viewMode === "map"
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => setViewMode("map")}
                      >
                        Map View
                      </button>
                    </div>
                  </div>

                  {viewMode === "list" ? (
                    <div className="row g-4">
                      {basketballMatches.map((match) => (
                        <div key={match.id} className="col-md-6 col-lg-4">
                          <div className="card h-100">
                            <div className="card-body">
                              <h5 className="card-title">{match.venue}</h5>
                              <p className="card-text">
                                <strong>Level:</strong> {match.level}
                                <br />
                                <strong>Format:</strong> {match.format}
                                <br />
                                <strong>Day:</strong> {match.day}
                                <br />
                                <strong>Time:</strong>{" "}
                                {typeof match.startDate === "string"
                                  ? match.startDate
                                  : match.startDate.toLocaleString()}
                                <br />
                                <strong>Address:</strong> {match.venue}
                              </p>
                              <button className="btn btn-primary">
                                ENQUIRE NOW
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ height: "600px" }}>
                      <BasketballMapComponent />
                    </div>
                  )}
                </div>
                <BasketballFooter />
              </>
            }
          /> */}

          {/* About Page */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tennis" element={<TennisPage />} />
          <Route path="/match/:id" element={<MatchDetails />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/chat/:matchId" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
