// Importing components that handle UI
import TodoItem from "./components/TodoItem"; // Displays a single todo item
import TodoInput from "./components/TodoInput"; // Input field for adding new tasks
import FilterTabs from "./components/FilterTabs"; // Tabs for filtering tasks (all, active, completed)
import useTaskFilter from "./hooks/useTaskFilter"; // Custom hook for filtering tasks
// Importing custom hooks for managing logic
import useTodoManager from "./hooks/useTodoManager"; // Handles task logic: add, delete, toggle
import useRenderCount from "./hooks/useRenderCount"; // Tracks how many times the component re-renders

export default function App() {
  // Destructuring the task state and action functions from the custom hook
  const { tasks, addTask, deleteTask, toggleTask, allComplete } = useTodoManager();

  const { filter, setFilter, filteredTasks } = useTaskFilter(tasks);

  
  
  // Tracks how many times this component has re-rendered (for dev/debug insight)
  const renderCount = useRenderCount();
  console.log(`Render count: ${renderCount}`); // Can be removed in production

  // JSX (UI) returned by the component
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* App Title */}
      <h1 className="text-3xl font-bold mb-6">Todo Test App</h1>

      {/* Filter tabs for showing all, active, or completed tasks */}
      <FilterTabs value={filter} onChange={setFilter} />

      {/* Main container for input + tasks + messages */}
      <div className="space-y-4 w-full max-w-md">
        {/* Loop through all tasks and render a TodoItem for each */}
        {filteredTasks.map((task) => (
          <TodoItem
            key={task.id}
            id={task.id}
            text={task.text}
            completed={task.completed}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}

        {/* Message shown only when all tasks are marked as completed */}
        {allComplete && (
          <p className="text-green-600 font-bold mt-4 text-center">
            All tasks are complete!
          </p>
        )}

        {/* Input component to add new tasks */}
        <TodoInput onAdd={addTask} />

        {/* Show how many times this component has rendered */}
        <p className="text-sm text-gray-500 text-center">
          Render Count: {renderCount}
        </p>
      </div>
    </div>
  );
}
