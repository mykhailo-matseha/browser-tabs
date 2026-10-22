import { useState, useLayoutEffect, useRef } from "react";

export function useTabsSplit(initialTabs, containerRef, dropdownRef) {
  const [visibleCount, setVisibleCount] = useState(initialTabs.length);
  const tabWidthsRef = useRef(new Map());

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateCount = () => {
      const containerWidth = container.offsetWidth;
      if (!containerWidth) return;

      const dropdownWidth = dropdownRef?.current?.offsetWidth || 36;
      const availableWidth = containerWidth - dropdownWidth;

      let currentWidth = 0;
      let count = 0;

      for (const tab of initialTabs) {
        const tabWidth = tabWidthsRef.current.get(tab.id) || 0;
        const isLast = count === initialTabs.length - 1;
        const limit = isLast ? containerWidth : availableWidth;

        if (tab.pinned || currentWidth + tabWidth <= limit) {
          currentWidth += tabWidth;
          count++;
        } else {
          break;
        }
      }

      setVisibleCount(Math.max(count, 1));
    };

    const observer = new ResizeObserver(updateCount);
    observer.observe(container);

    if (document.readyState === "complete") {
      updateCount();
    } else {
      window.addEventListener("load", updateCount, { once: true });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("load", updateCount);
    };
  }, [initialTabs, containerRef, dropdownRef]);

  return {
    visibleTabs: initialTabs.slice(0, visibleCount),
    hiddenTabs: initialTabs.slice(visibleCount),
    measureTab: (id) => (el) => el && tabWidthsRef.current.set(id, el.offsetWidth),
  };
}
