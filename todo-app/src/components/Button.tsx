// Define the type for the props this button accepts
type ButtonProps = {
  color?: 'blue' | 'red' | 'green';    // Optional color theme (defaults to 'blue')
  label: string;                       // Text to display inside the button
  onClick?: () => void;                // Optional click handler
};

// Shared Tailwind classes used for every button, regardless of color
const baseClasses =
  'px-4 py-2 rounded font-semibold transition-colors duration-200';

// Define specific Tailwind styles for each color variant
const colorClasses: Record<string, string> = {
  blue: 'bg-blue-600 hover:bg-blue-800 text-white',
  red: 'bg-red-600 hover:bg-red-800 text-white',
  green: 'bg-green-600 hover:bg-green-800 text-white',
};

/**
 * Reusable Button component.
 * 
 * Props:
 * - `color` sets the button's style variant (default: 'blue')
 * - `label` is the text shown inside the button
 * - `onClick` is the function triggered when the button is clicked
 */
export default function Button({
  color = 'blue',       // default to blue if no color prop is passed
  label,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${colorClasses[color]}`} // Combine base + color styles
      onClick={onClick} // Attach the click handler if provided
    >
      {label}
    </button>
  );
}
