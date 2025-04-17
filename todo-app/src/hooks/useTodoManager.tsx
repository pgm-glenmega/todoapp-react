import { useState, useEffect } from "react";

// Define the shape of a Task object
export type Task = {
  id: number; // Unique identifier for the task
  text: string; // Description of the task
  completed: boolean; // Whether the task is done or not
};

/**
 * Custom hook that manages todo tasks:
 * - Handles task state
 * - Saves to and loads from localStorage
 * - Provides functions to add, delete, and toggle tasks
 */
export default function useTodoManager(initialTasks: Task[] = []) {
  // Initialize state from localStorage if it exists, otherwise use initialTasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : initialTasks;
  });

  // Sync tasks to localStorage every time they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //Adds a new task to the list
  const addTask = (text: string, completed = false) => {
    const newTask = {
      id: Date.now(), // Use timestamp as unique ID
      text,
      completed,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  // Removes a task from the list by its ID
  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Toggles the 'completed' status of a task
  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Return state and handler functions to the component that uses this hook
  return { tasks, addTask, deleteTask, toggleTask };
}
