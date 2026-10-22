import { useRef, useState } from "react";
import Tab from "../Tab";
import TabsDropdown from "../TabsDropdown";
import styles from "./Tabs.module.scss";
import TabContextMenu from "../TabContextMenu";
import { useTabsSplit } from "@/hooks/useTabsSplit";
import { useTabsDrag } from "@/hooks/useTabsDrag";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useLocalStorage } from "@/hooks/useLocalStorage";

function Tabs({ initialTabs }) {
  const [tabs, setTabs] = useLocalStorage("browser_tabs_state", initialTabs);
  const [contextMenu, setContextMenu] = useState(null);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);

  const { visibleTabs, hiddenTabs, measureTab } = useTabsSplit(
    tabs,
    containerRef,
    dropdownRef,
  );

  const { handleDragEnd } = useTabsDrag(tabs, setTabs, visibleTabs);

  const handleContextMenu = (e, tab) => {
    e.preventDefault();

    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      tabId: tab.id,
      isPinned: tab.pinned,
    });
  };

  const closeMenu = () => setContextMenu(null);

  const pinToggle = (id) => {
    setTabs((prevTabs) => {
      const updated = prevTabs.map((tab) =>
        tab.id === id ? { ...tab, pinned: !tab.pinned } : tab,
      );
      const pinnedTabs = updated.filter((tab) => tab.pinned);
      const unpinnedTabs = updated.filter((tab) => !tab.pinned);
      return [...pinnedTabs, ...unpinnedTabs];
    });
  };

  return (
    <nav ref={containerRef} className={styles.tabs}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tabs-list" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.list}
            >
              {visibleTabs.map((tab, index) => (
                <Draggable key={tab.id} draggableId={tab.id} index={index}>
                  {(dragProvided, snapshot) => (
                    <Tab
                      variant="menu"
                      tabData={tab}
                      handleContextMenu={(e) => handleContextMenu(e, tab)}
                      isDragging={snapshot.isDragging}
                      style={dragProvided.draggableProps.style}
                      ref={(el) => {
                        dragProvided.innerRef(el);
                        measureTab(tab.id)(el);
                      }}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {!!hiddenTabs.length && (
        <TabsDropdown
          ref={dropdownRef}
          hiddenTabs={hiddenTabs}
          pinToggle={pinToggle}
          handleContextMenu={handleContextMenu}
        />
      )}
      {contextMenu && (
        <TabContextMenu
          position={{ x: contextMenu.x, y: contextMenu.y }}
          isPinned={contextMenu.isPinned}
          onClose={closeMenu}
          onTogglePin={() => pinToggle(contextMenu.tabId)}
        />
      )}
    </nav>
  );
}

export default Tabs;
