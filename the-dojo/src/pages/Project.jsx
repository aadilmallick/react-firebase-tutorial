import React from "react";
import { useParams } from "react-router-dom";
import { useDocument } from "../hooks/useDocument";
import Avatar from "../components/Avatar";
import "./Project.css";
import ProjectComments from "../components/ProjectComments";

export const Project = () => {
  const { id } = useParams();
  const { document: project, error } = useDocument("projects", id);
  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!project) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="project-details">
      <div>
        <div className="project-summary">
          <h2 className="page-title">{project.name}</h2>
          <p className="due-date">
            Project due by {project.dueDate.toDate().toDateString()}
          </p>
          <p className="details">{project.details}</p>
          <h4>Project assigned to:</h4>
          <div className="assigned-users">
            {project.assignedUsersList.map((user) => (
              <div key={user.id}>
                <Avatar src={user.photoURL} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ProjectComments project={project} />
    </div>
  );
};
