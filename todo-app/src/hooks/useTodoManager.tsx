// ✅ Import core React hooks used for state, side effects, performance
import { useState, useEffect, useMemo, useCallback } from "react";

// ✅ Define what a Task looks like
// This is a TypeScript type to enforce structure and help with autocomplete
export type Task = {
  id: number;         // Unique ID for the task (used for toggling, deleting)
  text: string;       // The text content of the task
  completed: boolean; // Whether the task is completed or not
};

/**
 * ✅ Custom React Hook: useTodoManager
 *
 * This hook manages all todo-related logic for your app:
 * - Adds tasks
 * - Deletes tasks
 * - Toggles completed status
 * - Stores and loads tasks from localStorage
 * - Calculates if all tasks are done
 */
export default function useTodoManager(initialTasks: Task[] = []) {
  /**
   * ✅ useState: manages the list of tasks
   * - It initializes with localStorage data if available
   * - If not, it uses the default tasks you pass in (optional)
   */
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : initialTasks;
  });

  /**
   * ✅ useEffect: Save tasks to localStorage every time they change
   * - Keeps your data persistent even when you reload the page
   */
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  /**
   * ✅ Function to add a new task
   * - `Date.now()` is used for a unique ID
   * - Adds the new task to the existing list using the spread operator
   */
  const addTask = (text: string, completed = false) => {
    const newTask = {
      id: Date.now(),
      text,
      completed,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  /**
   * ✅ useCallback: Memoized function to toggle task completion
   * - Prevents re-creating the function on every render
   * - Safer for performance and helps with memoization in child components
   */
  const toggleTask = useCallback((id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  /**
   * ✅ useCallback: Memoized function to delete a task by ID
   */
  const deleteTask = useCallback((id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  /**
   * ✅ useMemo: Efficiently calculates if all tasks are completed
   * - Recomputes only when tasks change
   * - Used to show "All tasks complete!" in UI
   */
  const allComplete = useMemo(() => {
    return tasks.length > 0 && tasks.every((task) => task.completed);
  }, [tasks]);

  /**
   * ✅ Return all values and functions that the component using this hook needs
   */
  return {
    tasks,          // The current list of tasks
    addTask,        // Function to add a task
    toggleTask,     // Function to toggle a task's completed state
    deleteTask,     // Function to delete a task
    allComplete,    // Boolean indicating if all tasks are completed
  };
}
