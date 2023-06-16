import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

import { useCollection } from "../hooks/useCollection";

// components
import ProjectList from "../components/ProjectList";

// styles
import "./Dashboard.css";
import ProjectFilter from "../components/ProjectFilter";

export const Dashboard = () => {
  const { user, authLoading } = useAuthContext();
  const { documents, error } = useCollection("projects");
  const [currentFilter, setCurrentFilter] = useState("all");

  const changeFilter = (filter) => {
    setCurrentFilter(filter);
  };

  if (authLoading || !documents) {
    return <h1>Loading..</h1>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const projects = documents.filter((doc) => {
    switch (currentFilter) {
      case "all":
        return true;
      case "mine":
        let isAssignedToMe = false;
        doc.assignedUsersList.forEach((pUser) => {
          if (pUser.id === user.uid) {
            isAssignedToMe = true;
          }
        });
        return isAssignedToMe;
      case doc.category:
        return true;
      default:
        return false;
    }
  });

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectList projects={projects} />}
      {documents && (
        <ProjectFilter
          changeFilter={changeFilter}
          currentFilter={currentFilter}
        />
      )}
    </div>
  );
};
