import { useState } from "react";
import Select from "react-select";
// styles
import "./Create.css";
import { useCollection } from "../hooks/useCollection";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Timestamp } from "firebase/firestore";
import { useFirestore } from "../hooks/useFirestore";

export function Create() {
  // form field values
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const { documents, error, loading } = useCollection("users");
  const { user } = useAuthContext();
  const { addDocument, response } = useFirestore("projects");

  useEffect(() => {
    if (documents) {
      const options = documents.map((doc) => ({
        value: doc,
        label: doc.displayName,
      }));
      setUsers(options);
    }
  }, [documents]);

  if (!user) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(name, details, dueDate, category.value);
    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const project = {
      name,
      details,
      category: category.value,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      assignedUsersList,
      createdBy,
      comments: [],
    };

    console.log(project);

    await addDocument(project);
  };

  if (loading) {
    return <h1>loading</h1>;
  }

  if (response.loading) {
    return <h1>locading</h1>;
  }

  if (response.error) {
    console.log(response.error);
  }

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          {/* select here later */}
          <Select
            options={[
              { value: "compsci", label: "Computer Science" },
              { value: "marketing", label: "Marketing" },
            ]}
            onChange={(option) => setCategory(option)}
          />
        </label>
        <label>
          <span>Assign to:</span>
          {/* select here later */}
          <Select
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>

        <button className="btn">Add Project</button>
      </form>
    </div>
  );
}
