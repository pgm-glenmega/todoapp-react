// ✅ We import React hooks to handle state and side effects
import { useEffect, useState } from "react";

// ✅ This is a reusable button component (you already made this)
import Button from "./Button";

// ✅ Define the shape of the data this component expects to receive
// - id: unique task identifier
// - text: the actual task description
// - completed: whether the task is done (initial value only)
// - onDelete: function from the parent to delete the task
type TodoItemProps = {
  id: number;
  text: string;
  initialCompleted: boolean; // 📌 Only used for initial checkbox value (we manage it locally after that)
  onDelete: (id: number) => void;
};

export default function TodoItem({
  id,
  text,
  onDelete,
}: TodoItemProps) {
  // ✅ This is the local checkbox state
  // We use useState to keep track of whether *this one* item is checked or not
  // This keeps state local and avoids re-rendering the entire App when toggled
  const [completed, setCompleted] = useState(
    localStorage.getItem(`todo-${id}-completed`) === "true"
  );

  // ✅ This useEffect runs **only once** (on first render)
  // We check if this item's checkbox state was saved earlier in localStorage
  // If yes, we restore it so the user sees it persisted after refresh
  useEffect(() => {
    const stored = localStorage.getItem(`todo-${id}-completed`);
    if (stored !== null) {
      setCompleted(stored === "true"); // Convert string back to boolean
    }
  }, [id]);

  // ✅ This useEffect runs **every time** the `completed` checkbox changes
  // We save the new value to localStorage so it remembers your toggle on reload
  useEffect(() => {
    localStorage.setItem(`todo-${id}-completed`, String(completed));
  }, [completed, id]);

  return (
    <div className="flex items-center justify-between bg-white rounded shadow p-3 w-full max-w-md">
      {/* ✅ Checkbox + task text area */}
      <div className="flex items-center gap-2">
        {/* 🔁 This checkbox reflects the current state */}
        <input
          type="checkbox"
          checked={completed} // Controlled input (checkbox value depends on state)
          onChange={() => setCompleted((prev) => !prev)} // Toggle checkbox state
          className="w-5 h-5"
        />

        {/* 📌 Style the text with a strikethrough when the task is completed */}
        <span
          className={`text-lg ${
            completed ? "line-through text-gray-400" : "text-black"
          }`}
        >
          {text}
        </span>
      </div>

      {/* 🗑️ Button to delete the task — calls parent’s onDelete function */}
      <Button color="red" label="Delete" onClick={() => onDelete(id)} />
    </div>
  );
}
