import React, { useState } from "react";
import VenueList from "./VenueForOwners";
import CourtsList from "./CourtList";

const MainContent = () => {
  const [refreshCourts, setRefreshCourts] = useState(false);

  const handleVenueDeleted = () => {
    setRefreshCourts((prev) => !prev); 
  };

  return (
    <div className="p-6">
      <VenueList onVenueDeleted={handleVenueDeleted} />
      <CourtsList refresh={refreshCourts} />
    </div>
  );
};

export default MainContent;
