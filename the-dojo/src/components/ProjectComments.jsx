import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Timestamp } from "firebase/firestore";
import { useFirestore } from "../hooks/useFirestore";
export default function ProjectComments({ project }) {
  const { user } = useAuthContext();
  const [newComment, setNewComment] = useState("");
  const { updateDocument, response } = useFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: Timestamp.fromDate(new Date()),
      id: Math.random(),
    };
    console.log(commentToAdd);

    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });
  };

  return (
    <div className="project-comments">
      <h4>Project Comments</h4>

      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  );
}
