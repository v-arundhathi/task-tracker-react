import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import TaskFilter from "./TaskFilter";
import TaskChart from "./TaskChart";



export default function TaskList() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [tagFilter, setTagFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const addTask = (task) => setTasks([task, ...tasks]);

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  const toggleTask = (id) =>
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

  const editTask = (id, newTitle, newDesc, newDueDate) =>
  setTasks(
    tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            title: newTitle,
            description: newDesc,
            dueDate: newDueDate,
          }
        : task
    )
  );


  const overdueCount = tasks.filter(
  (t) => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
).length;

const counts = {
  all: tasks.length,
  completed: tasks.filter((t) => t.completed).length,
  pending: tasks.filter((t) => !t.completed).length,
  overdue: overdueCount,
};


  const filteredTasks = tasks
    .filter((t) => {
      if (filter === "completed") return t.completed;
      if (filter === "pending") return !t.completed;
      if (filter === "overdue")
      return !t.completed && t.dueDate && new Date(t.dueDate) < new Date();
    return true;
    })
    .filter((t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.description &&
        t.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter((t) => {
      if (tagFilter === "All") return true;
      return t.tag === tagFilter;
    });

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>{username}'s Tasks</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={toggleDarkMode}>
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* 🔍 Search Input */}
      <div className="task-search">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 🏷 Tag Filter */}
      <div className="task-tag-filter">
        <label htmlFor="tagFilter">Filter by tag: </label>
        <select
          id="tagFilter"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
          <option value="General">General</option>
        </select>
      </div>

      <TaskFilter currentFilter={filter} setFilter={setFilter} counts={counts} />

      <TaskForm onAddTask={addTask} />
      <TaskChart tasks={tasks} />

      {filteredTasks.length === 0 ? (
        <p>No tasks match your search.</p>
      ) : (
        filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        ))
      )}
    </div>
  );
}
