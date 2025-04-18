type Props = {
  value: 'all' | 'active' | 'completed';
  onChange: (filter: 'all' | 'active' | 'completed') => void;
};

export default function FilterTabs({ value, onChange }: Props) {
  return (
    <div className="flex justify-center gap-2 mb-4">
      {['all', 'active', 'completed'].map((f) => (
        <button
          key={f}
          onClick={() => onChange(f as Props['value'])}
          className={`px-3 py-1 rounded ${
            value === f
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {f[0].toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
