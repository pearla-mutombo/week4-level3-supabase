import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      return;
    }

    setTasks(data);
  }

  useEffect(() => {
    let ignore = false;

    async function loadTasks() {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (ignore) return;

      if (error) {
        setError(error.message);
        return;
      }

      setTasks(data);
    }

    loadTasks();

    return () => {
      ignore = true;
    };
  }, []);

  async function addTask(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    setLoading(true);
    setError("");

    const { error } = await supabase.from("tasks").insert([
      {
        title: title.trim(),
        description: description.trim(),
      },
    ]);

    if (error) {
      setError(error.message);
    } else {
      setTitle("");
      setDescription("");
      await fetchTasks();
    }

    setLoading(false);
  }

  async function updateTask(task) {
    setError("");

    const { error } = await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", task.id);

    if (error) {
      setError(error.message);
      return;
    }

    await fetchTasks();
  }

  async function deleteTask(taskId) {
    setError("");

    const { error } = await supabase.from("tasks").delete().eq("id", taskId);

    if (error) {
      setError(error.message);
      return;
    }

    await fetchTasks();
  }

  return (
    <main className="task-manager">
      <header className="task-manager__header">
        <div>
          <p className="task-manager__eyebrow">Stay organized</p>
          <h1>Task Manager</h1>
          <p className="task-manager__subtitle">
            Create, manage, and track your tasks in one place.
          </p>
        </div>
      </header>

      <section className="task-form-section">
        <div className="section-heading">
          <h2>Add a New Task</h2>
          <p>Create a task and keep your work moving forward.</p>
        </div>

        <form className="task-form" onSubmit={addTask}>
          <div className="form-group">
            <label htmlFor="task-title">Task title</label>
            <input
              id="task-title"
              type="text"
              placeholder="Enter your task title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              placeholder="Add some details about your task"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows="4"
            />
          </div>

          <button
            className="button button--primary"
            type="submit"
            disabled={loading}>
            {loading ? "Adding Task..." : "Add Task"}
          </button>
        </form>
      </section>

      {error && (
        <p className="task-error" role="alert">
          {error}
        </p>
      )}

      <section className="task-list-section">
        <div className="section-heading section-heading--tasks">
          <div>
            <p className="task-manager__eyebrow">Your workspace</p>
            <h2>Your Tasks</h2>
          </div>

          <span className="task-count">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </span>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks yet</h3>
            <p>Add your first task using the form above.</p>
          </div>
        ) : (
          <div className="task-grid">
            {tasks.map((task) => (
              <article
                className={`task-card ${
                  task.completed ? "task-card--completed" : ""
                }`}
                key={task.id}>
                <div className="task-card__top">
                  <span
                    className={`task-status ${
                      task.completed
                        ? "task-status--completed"
                        : "task-status--active"
                    }`}>
                    {task.completed ? "Completed" : "In Progress"}
                  </span>
                </div>

                <div className="task-card__content">
                  <h3>{task.title}</h3>
                  <p>{task.description || "No description provided."}</p>
                </div>

                <div className="task-card__actions">
                  <button
                    className="button button--secondary"
                    type="button"
                    onClick={() => updateTask(task)}>
                    {task.completed
                      ? "Mark as Not Completed"
                      : "Mark as Completed"}
                  </button>

                  <button
                    className="button button--danger"
                    type="button"
                    onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
