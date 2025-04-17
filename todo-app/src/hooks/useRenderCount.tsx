import { useRef, useEffect } from 'react';

export default function useRenderCount() {
  const count = useRef(1); // starts at 1 because we already rendered once

  useEffect(() => {
    count.current += 1;
  });

  return count.current;
}
