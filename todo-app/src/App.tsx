import TodoItem from "./components/TodoItem";
import TodoInput from "./components/TodoInput";

//custom hooks
import useTodoManager from "./hooks/useTodoManager";
import useRenderCount from "./hooks/useRenderCount";

export default function App() {
  const { tasks, addTask, deleteTask, toggleTask } = useTodoManager();

  const allComplete = tasks.every((task) => task.completed);

  const renderCount = useRenderCount();
  console.log(`Render count: ${renderCount}`);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Todo Test App</h1>
      <div className="space-y-4 w-full max-w-md">
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            id={task.id}
            text={task.text}
            completed={task.completed}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
        {allComplete && (
          <p className="text-green-600 font-bold mt-4 text-center">
            All tasks are complete!
          </p>
        )}

        <TodoInput onAdd={addTask} />
        <p className="text-sm text-gray-500 text-center">
          Render Count: {renderCount}
        </p>
      </div>
    </div>
  );
}
