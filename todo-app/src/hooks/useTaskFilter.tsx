import { useState, useMemo } from "react";
import type { Task } from "./useTodoManager"; // import your Task type

export type FilterType = "all" | "active" | "completed";

export default function useTaskFilter(tasks: Task[]) {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return { filter, setFilter, filteredTasks };
}
