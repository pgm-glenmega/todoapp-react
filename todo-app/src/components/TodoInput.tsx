import { useState } from 'react';

type Props = {
  onAdd: (text: string, completed?: boolean) => void;
};

export default function TodoInput({ onAdd }: Props) {
  const [input, setInput] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input.trim(), isCompleted);
      setInput('');
      setIsCompleted(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 mb-4 w-full max-w-md">
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

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => setIsCompleted(!isCompleted)}
        />
        Mark as completed
      </label>
    </div>
  );
}
