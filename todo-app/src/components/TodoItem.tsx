// File: src/components/TodoItem.tsx
import Button from './Button';

type TodoItemProps = {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TodoItem({ id, text, completed, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between bg-white rounded shadow p-3 w-full max-w-md">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
          className="w-5 h-5"
        />
        <span className={`text-lg ${completed ? 'line-through text-gray-400' : 'text-black'}`}>
          {text}
        </span>
      </div>
      <Button
        color="red"
        label="Delete"
        onClick={() => onDelete(id)}
      />
    </div>
    
  );
}
