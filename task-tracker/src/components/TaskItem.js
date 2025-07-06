import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate || "");

  const handleSave = () => {
    onEdit(task.id, editedTitle, editedDescription, editedDueDate);
    setIsEditing(false);
  };

  const isOverdue =
    task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-top">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        <div className="task-details">
          <div className="task-meta">
            {isEditing ? (
              <div className="edit-fields">
                <input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Edit title"
                />
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder="Edit description"
                />
                <input
                  type="date"
                  value={editedDueDate}
                  onChange={(e) => setEditedDueDate(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
              </div>
            ) : (
              <>
                <div className="task-title-and-date">
                  <h3>{task.title}</h3>
                  <small className="timestamp">
                    {new Date(task.createdAt).toLocaleString()}
                  </small>
                </div>

                {task.description && <p>{task.description}</p>}
                <span className="task-tag">{task.tag}</span>

                {task.dueDate && (
                  <div className="task-due-date">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                )}

                {isOverdue && (
                  <div className="task-overdue">⚠ Overdue</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {!isEditing && (
        <div className="task-actions">
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this task?")) {
                onDelete(task.id);
              }
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
