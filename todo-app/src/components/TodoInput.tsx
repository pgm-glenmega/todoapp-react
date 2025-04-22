import { useState } from "react";

// Define the type for the props expected by this component
type Props = {
  onAdd: (text: string, completed?: boolean) => void;
};

/**
 * A controlled input component for adding new tasks.
 *
 * Features:
 * - Text input for the task description
 * - Checkbox to mark the task as completed upon creation
 * - 'Add' button to submit the new task
 *
 * Props:
 * - onAdd: function to pass the task text and completed state back to the parent
 */
export default function TodoInput({ onAdd }: Props) {
  // State to hold the input text value
  const [input, setInput] = useState("");

  // State to track whether the task should be added as completed
  const [isCompleted, setIsCompleted] = useState(false);

  // Handles the "Add" button click.
  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input.trim(), isCompleted); // Call parent with new task data
      setInput(""); // Clear input field
      setIsCompleted(false); // Reset checkbox
    }
  };

  // Component UI
  return (
    <div className="flex flex-col gap-2 mb-4 w-full max-w-md">
      {/* Input + Add Button Row */}
      <div className="flex gap-2">
        <input
          className="flex-1 px-4 py-2 border rounded text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
    </div>
  );
}
