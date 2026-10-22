import styles from "./TabsDropdown.module.scss";
import Icon from "../ui/Icon";
import Tab from "../Tab";
import { useState } from "react";
import { useClickOut } from "@/hooks/useClickOut";
function TabsDropdown({ ref, hiddenTabs, handleContextMenu }) {
  const [isOpen, setIsOpen] = useState(false);
  useClickOut(ref, () => setIsOpen(false));
  return (
    <div
      ref={ref}
      className={`${styles.dropdown} ${isOpen ? styles.open : ""}`}
    >
      <button
        aria-label="toggle dropdown button"
        type="button"
        className={styles.button}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Icon name={"ch-up"} />
      </button>
      {isOpen && (
        <div className={styles.body}>
          {hiddenTabs.map((tab) => (
            <div key={tab.id} onContextMenu={(e) => handleContextMenu(e, tab)}>
              <Tab
                variant="dropdown"
                tabData={tab}
                onClick={() => setIsOpen(false)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TabsDropdown;
