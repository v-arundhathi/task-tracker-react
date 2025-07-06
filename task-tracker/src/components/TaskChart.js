import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#00C49F", "#FFBB28", "#FF4C4C"];

export default function TaskChart({ tasks }) {
  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.filter((t) => !t.completed).length;
  const overdue = tasks.filter(
    (t) => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
  ).length;

  const rawData = [
  { name: "Completed", value: completed },
  { name: "Pending", value: pending - overdue },
  { name: "Overdue", value: overdue },
];

const data = rawData.filter((d) => d.value > 0);


  return (
    <div className="task-chart">
      <h3>Task Overview</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            labelLine={false}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
