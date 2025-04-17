type ButtonProps = {
  color?: 'blue' | 'red' | 'green';
  label: string;
  onClick?: () => void;
};

const baseClasses = 'px-4 py-2 rounded font-semibold transition-colors duration-200';

const colorClasses: Record<string, string> = {
  blue: 'bg-blue-600 hover:bg-blue-800 text-white',
  red: 'bg-red-600 hover:bg-red-800 text-white',
  green: 'bg-green-600 hover:bg-green-800 text-white',
};

export default function Button({ color = "blue", label, onClick }: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${colorClasses[color]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
