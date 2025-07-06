export default function TaskFilter({ currentFilter, setFilter, counts }) {
  return (
    <div className="task-filters">
      <button
        onClick={() => setFilter("all")}
        className={currentFilter === "all" ? "active" : ""}
      >
        All ({counts.all})
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={currentFilter === "completed" ? "active" : ""}
      >
        Completed ({counts.completed})
      </button>
      <button
        onClick={() => setFilter("pending")}
        className={currentFilter === "pending" ? "active" : ""}
      >
        Pending ({counts.pending})
      </button>
      <button
  className={currentFilter === "overdue" ? "active" : ""}
  onClick={() => setFilter("overdue")}
>
  Overdue ({counts.overdue})
</button>

    </div>
  );
}
