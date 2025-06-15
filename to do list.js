import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return alert("Task cannot be empty!");
    setTasks([
      ...tasks,
      { id: Date.now(), text: input.trim(), completed: false },
    ]);
    setInput("");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleFilterChange = (e) => setFilter(e.target.value);

  const filteredTasks = tasks.filter(t =>
    filter === "completed" ? t.completed :
    filter === "incomplete" ? !t.completed : true
  );

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="input-group">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="filter">
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="completed">✔️ Completed</option>
          <option value="incomplete">❌ Incomplete</option>
        </select>
      </div>

      <TodoList
        tasks={filteredTasks}
        onToggle={toggleComplete}
        onDelete={deleteTask}
      />
    </div>
  );
};

export default App;
