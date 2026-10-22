import { useRef, useState } from "react";
import Tab from "../Tab";
import TabsDropdown from "../TabsDropdown";
import styles from "./Tabs.module.scss";
import TabContextMenu from "../TabContextMenu";
import { useTabsSplit } from "@/hooks/useTabsSplit";

function Tabs({ initialTabs }) {
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);

  const { visibleTabs, hiddenTabs, measureTab } = useTabsSplit(
    initialTabs,
    containerRef,
    dropdownRef,
  );

  const [contextMenu, setContextMenu] = useState(null);

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

  const pinToggle = () => {
    console.log("pin");
  };

  return (
    <nav ref={containerRef} className={styles.tabs}>
      <div className={styles.list}>
        {visibleTabs.map((tab) => (
          <Tab
            key={tab.id}
            variant="menu"
            tabData={tab}
            pinToggle={pinToggle}
            handleContextMenu={(e) => handleContextMenu(e, tab)}
            ref={measureTab(tab.id)}
          />
        ))}
      </div>
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
          pinToggle={() => pinToggle(contextMenu.tabId)}
        />
      )}
    </nav>
  );
}

export default Tabs;
