import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Match } from "./MatchesListBasket.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

const MatchDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [match, setMatch] = useState<Match | null>(
    location.state?.match || null
  );
  const [hasJoined, setHasJoined] = useState(false);
  const [showAlert, setShowAlert] = useState<{
    message: string;
    type: "success" | "danger";
  } | null>(null);

  useEffect(() => {
    // Check if user has already joined from localStorage
    const joinedMatches = JSON.parse(
      localStorage.getItem("joinedMatches") || "[]"
    );
    setHasJoined(joinedMatches.includes(Number(id)));

    // Get stored player counts from localStorage
    const storedCounts = JSON.parse(
      localStorage.getItem("playerCounts") || "{}"
    );
    if (match && storedCounts[match.id]) {
      setMatch((prev) =>
        prev ? { ...prev, userCount: storedCounts[match.id] } : null
      );
    }
  }, [id, match?.id]);

  const updatePlayerCount = (count: number) => {
    if (!match) return;

    // Update match state
    const updatedMatch = {
      ...match,
      userCount: count,
    };
    setMatch(updatedMatch);

    // Store updated count in localStorage
    const storedCounts = JSON.parse(
      localStorage.getItem("playerCounts") || "{}"
    );
    storedCounts[match.id] = count;
    localStorage.setItem("playerCounts", JSON.stringify(storedCounts));
  };

  const handleJoin = async () => {
    try {
      if (!match) return;

      // Update player count
      updatePlayerCount(match.userCount + 1);
      setHasJoined(true);
      setShowAlert({
        message: "Successfully joined the match!",
        type: "success",
      });

      // Save joined status to localStorage
      const joinedMatches = JSON.parse(
        localStorage.getItem("joinedMatches") || "[]"
      );
      joinedMatches.push(Number(id));
      localStorage.setItem("joinedMatches", JSON.stringify(joinedMatches));

      // Hide alert after 3 seconds
      setTimeout(() => setShowAlert(null), 3000);
    } catch (error) {
      console.error("Error joining match:", error);
    }
  };

  const handleCancel = async () => {
    try {
      if (!match) return;

      // Update player count
      updatePlayerCount(Math.max(0, match.userCount - 1));
      setHasJoined(false);
      setShowAlert({ message: "Successfully left the match!", type: "danger" });

      // Remove from joined matches in localStorage
      const joinedMatches = JSON.parse(
        localStorage.getItem("joinedMatches") || "[]"
      );
      const updatedJoinedMatches = joinedMatches.filter(
        (matchId: number) => matchId !== Number(id)
      );
      localStorage.setItem(
        "joinedMatches",
        JSON.stringify(updatedJoinedMatches)
      );

      // Hide alert after 3 seconds
      setTimeout(() => setShowAlert(null), 3000);
    } catch (error) {
      console.error("Error canceling match:", error);
    }
  };

  if (!match) {
    return (
      <div className="text-center p-5">
        Match not found.
        <button className="btn btn-link" onClick={() => navigate(-1)}>
          Go back to matches
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {showAlert && (
        <div
          className={`alert alert-${showAlert.type} alert-dismissible fade show`}
          role="alert"
        >
          {showAlert.message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowAlert(null)}
          ></button>
        </div>
      )}

      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Match Details</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h4>Venue</h4>
              <p className="lead">{match.venue}</p>

              <h4>Date & Time</h4>
              <p className="lead">
                {new Date(match.startDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <h4>Format</h4>
              <p className="lead">{match.format}</p>
            </div>
            <div className="col-md-6">
              <h4>Level</h4>
              <p className="lead">{match.level}</p>

              <h4>Players</h4>
              <p className="lead">{match.userCount}/10</p>

              <h4>Category</h4>
              <p className="lead">{match.category}</p>
            </div>
          </div>

          <div className="mt-4">
            {!hasJoined ? (
              <button
                className="btn btn-success me-2"
                onClick={handleJoin}
                disabled={match.userCount >= 10}
              >
                {match.userCount >= 10 ? "Match Full" : "Join Match"}
              </button>
            ) : (
              <button className="btn btn-danger me-2" onClick={handleCancel}>
                Cancel Participation
              </button>
            )}
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Back to Matches
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
