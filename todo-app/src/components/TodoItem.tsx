import Button from "./Button"; // Import the reusable Button component

// Define the props expected by the TodoItem component
type TodoItemProps = {
  id: number; // Unique identifier for this task
  text: string; // The task's description
  completed: boolean; // Whether the task is marked as done
  onToggle: (id: number) => void; // Callback to toggle completion state
  onDelete: (id: number) => void; // Callback to delete the task
};

// A single task item component.
export default function TodoItem({
  id,
  text,
  completed,
  onToggle,
  onDelete,
}: TodoItemProps) {
  return (
    <div className="flex items-center justify-between bg-white rounded shadow p-3 w-full max-w-md">
      {/* Checkbox + Task Text */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={completed} // Controlled checkbox (state comes from parent)
          onChange={() => onToggle(id)} // Trigger parent's toggle function
          className="w-5 h-5"
        />

        <span
          className={`text-lg ${
            completed ? "line-through text-gray-400" : "text-black"
          }`}
        >
          {text}
        </span>
      </div>

      {/* button */}
      <Button
        color="red"
        label="Delete"
        onClick={() => onDelete(id)} // Trigger parent's delete function
      />
    </div>
  );
}
