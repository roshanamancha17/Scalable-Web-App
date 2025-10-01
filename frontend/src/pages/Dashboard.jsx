import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch user & tasks or redirect if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const fetchData = async () => {
      try {
        const [resUser, resTasks] = await Promise.all([
          API.get("/auth/profile", { headers: { Authorization: `Bearer ${token}` } }),
          API.get("/tasks", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setUser(resUser.data);
        setTasks(resTasks.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const res = await API.post("/tasks", { text: newTask }, { headers: { Authorization: `Bearer ${token}` } });
      setTasks([res.data, ...tasks]);
      setNewTask("");
    } catch (err) {
      console.error("Add task failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Delete task failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Dashboard</h1>

      {/* User Info */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        {user ? (
          <>
            <h2 className="text-xl font-semibold">Welcome, {user.name} 👋</h2>
            <p className="text-gray-600">{user.email}</p>
          </>
        ) : (
          <p className="text-gray-500">Loading user info...</p>
        )}
      </div>

      {/* Add Task */}
      <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition w-full sm:w-auto">
          Add
        </button>
      </form>

      {/* Task List */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Your Tasks</h3>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li key={task._id} className="flex justify-between items-center border-b pb-2">
                <span>{task.text}</span>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
