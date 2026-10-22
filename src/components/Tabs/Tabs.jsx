import { useState } from "react";
import Tab from "../Tab";
import TabsDropdown from "../TabsDropdown";
import styles from "./Tabs.module.scss";
import TabContextMenu from "../TabContextMenu";

function Tabs({ initialTabs }) {
  const visibleTabs = JSON.parse(JSON.stringify(initialTabs)).slice(0, 7);
  const hiddenTabs = JSON.parse(JSON.stringify(initialTabs)).slice(7);

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
    <nav className={styles.tabs}>
      <div className={styles.list}>
        {visibleTabs.map((tab) => (
          <div key={tab.id} onContextMenu={(e) => handleContextMenu(e, tab)}>
            <Tab variant="menu" tabData={tab} pinToggle={pinToggle} />
          </div>
        ))}
      </div>
      <TabsDropdown
        hiddenTabs={hiddenTabs}
        pinToggle={pinToggle}
        handleContextMenu={handleContextMenu}
      />
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
