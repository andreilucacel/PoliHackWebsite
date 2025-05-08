import React from "react";
import GoogleMapTennis from "./GoogleMap";
import MatchesList from "./MatchesList";
import { Match } from "./MatchesList";

const TennisPage: React.FC = () => {
  const matches: Match[] = [
    {
      id: 1,
      venue: "Winners Tennis Club",
      format: "Singles",
      level: "Intermediate",
      userCount: 2,
      category: "Tennis",
      startDate: new Date().toISOString(),
      day: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      venue: "Gheorgheni Tennis Complex",
      format: "Doubles",
      level: "Advanced",
      userCount: 4,
      category: "Tennis",
      startDate: new Date().toISOString(),
      day: new Date().toLocaleDateString(),
    },
    {
      id: 3,
      venue: "Parcul Sportiv Iuliu Hatieganu",
      format: "Singles",
      level: "Beginner",
      userCount: 2,
      category: "Tennis",
      startDate: new Date().toISOString(),
      day: new Date().toLocaleDateString(),
    },
  ];

  return (
    <div className="container mt-4">
      <h2>Tennis Matches</h2>
      <div className="row">
        <div className="col-md-8">
          <GoogleMapTennis />
        </div>
        <div className="col-md-4">
          <MatchesList matches={matches} />
        </div>
      </div>
    </div>
  );
};

export default TennisPage;
