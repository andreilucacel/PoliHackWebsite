import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export interface Match {
  id: number;
  category: string;
  userCount: number;
  venue: string;
  startDate: string | Date; // Allow both string and Date types
  day: string;
  format: string;
  level: string;
}

interface MatchesListProps {
  matches: Match[];
}

const MatchesList: React.FC<MatchesListProps> = ({ matches }) => {
  const navigate = useNavigate();

  // Debug log to see what matches are being passed
  useEffect(() => {
    console.log("MatchesList component rendered");
    console.log(
      "MatchesList received matches:",
      JSON.stringify(matches, null, 2)
    );
    console.log("Number of matches in MatchesList:", matches.length);

    // Check if matches have the expected structure
    if (matches.length > 0) {
      console.log("First match structure:", {
        id: matches[0].id,
        category: matches[0].category,
        venue: matches[0].venue,
        startDate: matches[0].startDate,
        day: matches[0].day,
        format: matches[0].format,
        level: matches[0].level,
        userCount: matches[0].userCount,
      });
    } else {
      console.log("No matches received in MatchesList");
    }
  }, [matches]);

  // Format date function
  const formatDate = (dateValue: string | Date) => {
    try {
      console.log("Formatting date:", dateValue);
      // If it's already a Date object, use it directly
      const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      console.log("Formatted date:", formattedDate);
      return formattedDate;
    } catch (error) {
      console.error("Error formatting date:", error);
      return String(dateValue); // Return as string if parsing fails
    }
  };

  const handleEnquire = (match: Match) => {
    // Get the latest player count from localStorage
    const storedCounts = JSON.parse(
      localStorage.getItem("playerCounts") || "{}"
    );
    const updatedMatch = {
      ...match,
      userCount: storedCounts[match.id] || match.userCount,
    };

    navigate(`/match/${match.id}`, { state: { match: updatedMatch } });
  };

  return (
    <div className="container-fluid mt-4">
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="bg-dark text-white">
            <tr>
              <th>VENUE</th>
              <th>START DATE</th>
              <th>DAY</th>
              <th>FORMAT</th>
              <th>LEVEL</th>
              <th>PLAYERS</th>
              <th>ACTION</th>
              <th>CHAT</th>
            </tr>
          </thead>
          <tbody>
            {matches && matches.length > 0 ? (
              matches.map((match) => {
                // Get the latest player count from localStorage
                const storedCounts = JSON.parse(
                  localStorage.getItem("playerCounts") || "{}"
                );
                const currentUserCount =
                  storedCounts[match.id] || match.userCount;

                console.log(
                  "Rendering match:",
                  match.id,
                  "with userCount:",
                  currentUserCount
                );
                return (
                  <tr key={match.id}>
                    <td>{match.venue}</td>
                    <td>{formatDate(match.startDate)}</td>
                    <td>{match.day}</td>
                    <td>{match.format}</td>
                    <td>{match.level}</td>
                    <td>{currentUserCount}/10</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEnquire(match)}
                      >
                        ENQUIRE NOW
                      </button>
                      </td>
                      <td>
                        <button
                        className="btn btn-secondary"
                        onClick={() => navigate(`/chat/${match.id}`)}
                        >
                        CHAT
                        </button>
                      </td>
                      </tr>
                    );
                    })
                  ) : (
                    <tr>
                    <td colSpan={8} className="text-center">
                      No matches found. Try adjusting your search filters.
                    </td>
                    </tr>
                  )}
                  </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatchesList;