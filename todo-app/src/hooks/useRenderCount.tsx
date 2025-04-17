import { useRef, useEffect } from "react";

/**
 * Custom hook to track how many times a component has rendered.
 *
 * Useful for:
 * - Debugging unnecessary re-renders
 * - Visualizing React's render behavior
 * - Learning and understanding the render cycle
 *
 * Returns:
 * - The current render count as a number
 */
export default function useRenderCount() {
  // useRef creates a persistent value that survives re-renders
  // It does not trigger re-renders when updated
  const count = useRef(1); // Start at 1 because the component has already rendered once

  // Every time the component re-renders, increment the counter
  useEffect(() => {
    count.current += 1;
  });

  // Return the current render count
  return count.current;
}
