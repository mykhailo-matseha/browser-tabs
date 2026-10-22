const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export function useTabsDrag(tabs, setTabs, visibleTabs) {
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination || source.index === destination.index) return;

    const draggedTab = visibleTabs[source.index];
    const targetTab = visibleTabs[destination.index];

    if (draggedTab.pinned !== targetTab.pinned) {
      return;
    }

    setTabs((prevTabs) => {
      const realSourceIndex = prevTabs.findIndex((t) => t.id === draggedTab.id);
      const realDestIndex = prevTabs.findIndex((t) => t.id === targetTab.id);

      return reorder(prevTabs, realSourceIndex, realDestIndex);
    });
  };

  return { handleDragEnd };
}
