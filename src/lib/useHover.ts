import { useCallback, useState } from "react";

export function useHover() {
  const [isHovering, setIsHovering] = useState(false);

  return {
    isHovering,
    bindHover: {
      onMouseEnter: useCallback(() => setIsHovering(true), []),
      onMouseLeave: useCallback(() => setIsHovering(false), []),
    },
  };
}
