import { useState, useMemo } from "react";
import type { Task } from "./useTodoManager"; // Import the Task type definition

// Define the possible values for the filter
export type FilterType = "all" | "active" | "completed";

/**
 * Custom hook: useTaskFilter
 * 
 * This hook allows filtering of the todo list based on a selected filter type.
 * It also ensures that the filtering logic uses the most recent checkbox states
 * that may have been changed directly in localStorage by individual TodoItems.
 */
export default function useTaskFilter(tasks: Task[]) {
  // Local state to keep track of the selected filter tab ("all" by default)
  const [filter, setFilter] = useState<FilterType>("all");

  /**
   * ✅ Step 1: Sync each task's completed state with localStorage
   * - This ensures accuracy even if tasks are toggled independently in TodoItem.
   * - For each task, we read its completed state from localStorage (if it exists).
   * - If not found, we fall back to the task’s stored completed value.
   */
  const syncedTasks = useMemo(() => {
    return tasks.map((task) => {
      const stored = localStorage.getItem(`todo-${task.id}-completed`);
      const completed = stored !== null ? stored === "true" : task.completed;
      return { ...task, completed };
    });
  }, [tasks]);

  /**
   * ✅ Step 2: Apply the current filter to the synced tasks
   * - "all": return everything
   * - "active": return only incomplete tasks
   * - "completed": return only completed tasks
   */
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return syncedTasks.filter((task) => !task.completed);
      case "completed":
        return syncedTasks.filter((task) => task.completed);
      default:
        return syncedTasks;
    }
  }, [syncedTasks, filter]);

  // ✅ Return everything needed to use the filtering logic in a component
  return { filter, setFilter, filteredTasks };
}