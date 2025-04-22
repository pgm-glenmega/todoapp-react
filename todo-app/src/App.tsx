// 📦 Component Imports – These handle how the UI looks
import TodoItem from "./components/TodoItem";        // Shows one task
import TodoInput from "./components/TodoInput";      // Lets user add a task
import FilterTabs from "./components/FilterTabs";    // Tabs to filter tasks (All, Active, Completed)

// 🧠 Custom Hooks – These manage the logic & state behind the scenes
import useTaskFilter from "./hooks/useTaskFilter";       // Manages which tasks are visible based on filter
import useTodoManager from "./hooks/useTodoManager";     // Handles all task data: adding, deleting, and storing
import useRenderCount from "./hooks/useRenderCount";     // Counts how many times the App re-renders (for debugging)

export default function App() {
  // 📋 useTodoManager handles the full list of tasks (from localStorage)
  // Provides helper functions for adding/deleting tasks
  const { tasks, addTask, deleteTask } = useTodoManager();

  // 🎯 useTaskFilter returns:
  // 1. The current filter value (e.g. "all", "active", "completed")
  // 2. A function to update it
  // 3. The list of tasks to show based on that filter
  const { filter, setFilter, filteredTasks } = useTaskFilter(tasks);

  // 🔁 useRenderCount returns a number that increases every time this App component re-renders
  const renderCount = useRenderCount();

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* 🔠 App Title */}
      <h1 className="text-3xl font-bold mb-6">Todo Test App</h1>

      {/* 🧭 Filter buttons to switch between All / Active / Completed tasks */}
      <FilterTabs value={filter} onChange={setFilter} />

      {/* 📝 Main section that holds all task items */}
      <div className="space-y-4 w-full max-w-md">

        {/* ✅ Render each task in the list using TodoItem */}
        {filteredTasks.map((task) => (
          <TodoItem
            key={task.id}
            id={task.id}
            text={task.text}
            initialCompleted={task.completed} // ✅ Used as the initial value only
            onDelete={deleteTask} // ✅ Removes the task from state when delete is clicked
          />
        ))}

        {/* ➕ Input for adding a new task */}
        <TodoInput onAdd={addTask} />

        {/* 🧠 Optional debug message showing how many times this App component has re-rendered */}
        <p className="text-sm text-gray-500 text-center">
          Render Count: {renderCount}
        </p>
      </div>
    </div>
  );
}
