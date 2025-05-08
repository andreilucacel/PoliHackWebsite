import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Match } from "./MatchesList";

interface HeaderProps {
  onMatchesUpdate: (matches: Match[]) => void;
}

interface ApiMatch {
  id: number;
  category: string;
  userCount: number;
  venue: string;
  startDate: string | Date;
  day: string;
  format: string;
  level: string;
}

// Extend Window interface to include our custom property
declare global {
  interface Window {
    handleSearch: () => Promise<void>;
  }
}

function Header({ onMatchesUpdate }: HeaderProps) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    level: "",
    format: "",
    day: "",
  });

  // Expose handleSearch to window object for testing
  useEffect(() => {
    window.handleSearch = handleSearch;
  }, []);

  const levels = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Recreational",
    "Recreational (Indoor)",
    "Intermediate (Indoor)",
  ];

  const formats = ["Singles", "Doubles", "Mixed Doubles"];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleSearch = async () => {
    // Remove the initial validation to allow searching without filters
    setLoading(true);
    setError("");
    try {
      console.log("Starting API request...");
      console.log("Current filters:", {
        search,
        level: selectedFilters.level,
        format: selectedFilters.format,
        day: selectedFilters.day,
      });

      const response = await fetch(
        "https://7eac-5-2-197-133.ngrok-free.app/api/games/getall",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          mode: "cors",
          credentials: "include",
        }
      );

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (response.status === 403) {
        throw new Error(
          "Access forbidden - CORS issue or insufficient permissions"
        );
      }

      if (response.status === 401) {
        throw new Error("Unauthorized - Authentication required");
      }

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();
      console.log("Raw API Response:", JSON.stringify(data, null, 2));
      console.log("Number of matches in API response:", data.length);

      // Process the data to ensure dates are properly handled
      const processedData = data.map((match: ApiMatch) => {
        // Create a copy of the match
        const processedMatch = { ...match };

        // If startDate is a string, try to parse it as a Date
        if (typeof processedMatch.startDate === "string") {
          try {
            // Try to parse the date string
            const parsedDate = new Date(processedMatch.startDate);
            if (!isNaN(parsedDate.getTime())) {
              // If valid date, use the parsed date
              processedMatch.startDate = parsedDate;
            }
          } catch (error) {
            console.error("Error parsing date:", error);
            // Keep the original string if parsing fails
          }
        }

        return processedMatch;
      });

      console.log("Processed Data:", JSON.stringify(processedData, null, 2));
      console.log("Number of matches after processing:", processedData.length);

      // Filter the data based on selected filters
      const filteredData = processedData.filter((match: ApiMatch) => {
        // Only show tennis matches
        const matchesCategory = match.category === "Tennis";
        console.log(
          `Match ${match.id}: category=${match.category}, matchesCategory=${matchesCategory}`
        );

        // Apply other filters only if they are selected
        const matchesLevel =
          !selectedFilters.level || match.level === selectedFilters.level;
        const matchesFormat =
          !selectedFilters.format || match.format === selectedFilters.format;

        // Handle day format conversion
        let matchesDay = true;
        if (selectedFilters.day) {
          // Convert selected day to match API format (e.g., "Monday" -> "MONDAY")
          const selectedDayUpper = selectedFilters.day.toUpperCase();
          matchesDay = match.day === selectedDayUpper;
          console.log(
            `Match ${match.id}: day=${match.day}, selectedDay=${selectedDayUpper}, matchesDay=${matchesDay}`
          );
        }

        // Search by venue
        const matchesSearch =
          !search.trim() ||
          match.venue.toLowerCase().includes(search.toLowerCase());

        const shouldInclude =
          matchesCategory &&
          matchesLevel &&
          matchesFormat &&
          matchesDay &&
          matchesSearch;

        console.log(`Match ${match.id} filter results:`, {
          matchesCategory,
          matchesLevel,
          matchesFormat,
          matchesDay,
          matchesSearch,
          shouldInclude,
        });

        return shouldInclude;
      });

      console.log("Filtered Data:", JSON.stringify(filteredData, null, 2));
      console.log("Number of matches after filtering:", filteredData.length);

      // Log the final data being passed to MatchesList
      console.log(
        "Final data being passed to MatchesList:",
        JSON.stringify(filteredData, null, 2)
      );

      onMatchesUpdate(filteredData);
    } catch (err: unknown) {
      console.error("Error in handleSearch:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
    setLoading(false);
  };

  const handleFilterChange = (
    filterType: "level" | "format" | "day",
    value: string
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="text-center position-relative"
        style={{
          backgroundImage: "url('/tennis.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "100px 20px",
        }}
      >
        <h1 className="text-white fw-bold">TENNIS</h1>
        <p className="text-white">
          Find the best tennis courts and matches near you!
        </p>

        {/* Search Section */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="bg-white p-4 rounded shadow">
                <div className="row g-3">
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="I want to play tennis in..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={selectedFilters.level}
                      onChange={(e) =>
                        handleFilterChange("level", e.target.value)
                      }
                    >
                      <option value="">Select Level</option>
                      {levels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={selectedFilters.format}
                      onChange={(e) =>
                        handleFilterChange("format", e.target.value)
                      }
                    >
                      <option value="">Select Format</option>
                      {formats.map((format) => (
                        <option key={format} value={format}>
                          {format}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={selectedFilters.day}
                      onChange={(e) =>
                        handleFilterChange("day", e.target.value)
                      }
                    >
                      <option value="">Select Day</option>
                      {days.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100"
                      onClick={handleSearch}
                      disabled={loading}
                    >
                      {loading ? "Searching..." : "Find Matches"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading and Error States */}
      <div className="container mt-4">
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
}

export default Header;
