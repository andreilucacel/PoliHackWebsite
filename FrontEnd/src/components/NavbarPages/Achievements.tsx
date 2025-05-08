import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import trophyImage from "../../assets/trophy.png";
import MainFooter from "./MainFooter";

// Define user interface
interface User {
  id: number;
  username: string;
  totalGamesPlayed: number;
}

// Define achievement interface
interface Achievement {
  id: number;
  title: string;
  description: string;
  points: number;
  condition: (user: User) => boolean;
}

export default function Achievements() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Hardcoded achievements
  const achievements: Achievement[] = [
    {
      id: 1,
      title: "Newbie",
      description: "Play your first game",
      points: 50,
      condition: (user: User) => user.totalGamesPlayed >= 1,
    },
    {
      id: 2,
      title: "Regular",
      description: "Play 10 games",
      points: 100,
      condition: (user: User) => user.totalGamesPlayed >= 10,
    },
    {
      id: 3,
      title: "Veteran",
      description: "Play 50 games",
      points: 250,
      condition: (user: User) => user.totalGamesPlayed >= 50,
    },
    {
      id: 4,
      title: "Master",
      description: "Play 100 games",
      points: 500,
      condition: (user: User) => user.totalGamesPlayed >= 100,
    },
  ];

  // Use hardcoded user data
  useEffect(() => {
    // Hardcoded user data
    const hardcodedUser: User = {
      id: 1,
      username: "Sebi",
      totalGamesPlayed: 5,
    };
  
    setUser(hardcodedUser);
    setLoading(false);
  }, []);

  // Calculate total points and unlocked achievements
  const getUserAchievements = () => {
    if (!user) return { unlocked: [], points: 0 };

    const unlocked = achievements.filter((ach) => ach.condition(user));
    const totalPoints = unlocked.reduce((sum, ach) => sum + ach.points, 0);
    return { unlocked, points: totalPoints };
  };

  const { unlocked, points } = getUserAchievements();

  if (loading) {
    return (
      <div className="container-fluid p-0 bg-dark text-light min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0 bg-dark text-light">
      {/* Hero Banner */}
      <div
        className="position-relative text-center"
        style={{
          height: "45vh",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${trophyImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-white">
          <h1 className="display-3 fw-bold mb-4">Achievements</h1>
          <p className="lead fs-4">Track your progress and earn rewards!</p>
        </div>
      </div>

      {/* User Stats */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card bg-primary text-light shadow-lg p-4">
              <h2 className="text-center mb-4">{user?.username}'s Stats</h2>
              <div className="row text-center">
                <div className="col-md-4">
                  <h3 className="fw-bold">{user?.totalGamesPlayed}</h3>
                  <p>Games Played</p>
                </div>
                <div className="col-md-4">
                  <h3 className="fw-bold">
                    {unlocked.length}/{achievements.length}
                  </h3>
                  <p>Achievements Unlocked</p>
                </div>
                <div className="col-md-4">
                  <h3 className="fw-bold">{points}</h3>
                  <p>Total Points</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements List */}
      <div className="container py-5">
        <h2 className="text-center mb-5 text-primary">Your Achievements</h2>
        <div className="row g-4">
          {achievements.map((achievement) => {
            const isUnlocked = unlocked.some(
              (ach) => ach.id === achievement.id
            );
            return (
              <div key={achievement.id} className="col-md-6">
                <div
                  className={`card h-100 shadow-lg ${
                    isUnlocked
                      ? "border-primary bg-dark"
                      : "border-secondary bg-secondary opacity-75"
                  }`}
                >
                  <div className="card-body d-flex align-items-center">
                    <div className="me-3">
                      <span style={{ fontSize: "2rem" }}>
                        {isUnlocked ? "🏆" : "🔒"}
                      </span>
                    </div>
                    <div>
                      <h3 className="card-title mb-2 text-light">
                        {achievement.title}
                      </h3>
                      <p className="card-text text-light">
                        {achievement.description}
                      </p>
                      <p className="text-primary fw-bold mb-0">
                        {achievement.points} Points
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div
        className="py-5 text-center"
        style={{
          backgroundImage: "linear-gradient(to right, rgb(0, 0, 255), #87CEEB)",
        }}
      >
        <div className="container">
          <h4 className="text-white fs-4 mb-5">
            Unlock new achievements and collect points!
          </h4>
          <a
              href="/football"
              className="btn btn-outline-light btn-lg px-4 py-2 fw-bold"
            >
              Play Now
            </a>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}
