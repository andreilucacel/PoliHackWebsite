import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export interface Match {
  id: number;
  category: string;
  userCount: number;
  venue: string;
  startDate: string | Date;
  day: string;
  format: string;
  level: string;
}

interface MatchesListProps {
  matches: Match[];
}

function MatchesList({ matches }: MatchesListProps) {
  useEffect(() => {
    console.log("MatchesList received matches:", matches);
    console.log("Number of matches:", matches.length);
    if (matches.length > 0) {
      console.log(
        "First match structure:",
        JSON.stringify(matches[0], null, 2)
      );
    }
  }, [matches]);

  const formatDate = (date: string | Date): string => {
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      if (isNaN(dateObj.getTime())) {
        console.error("Invalid date:", date);
        return "Invalid date";
      }
      return dateObj.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Error formatting date";
    }
  };

  if (matches.length === 0) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info">
          No tennis matches found. Try adjusting your search criteria.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {matches.map((match) => (
          <div key={match.id} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{match.venue}</h5>
                <p className="card-text">
                  <strong>Date:</strong> {formatDate(match.startDate)}
                </p>
                <p className="card-text">
                  <strong>Format:</strong> {match.format}
                </p>
                <p className="card-text">
                  <strong>Level:</strong> {match.level}
                </p>
                <p className="card-text">
                  <strong>Players:</strong> {match.userCount}
                </p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary w-100">Join Match</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatchesList;
