import { NavLink } from "react-router";
import styles from "./TabsDropdown.module.scss";
import Icon from "../ui/Icon";
import Tab from "../Tab";
import { useRef, useState } from "react";
import { useClickOut } from "@/hooks/useClickOut";
function TabsDropdown({ hiddenTabs, pinToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef(null);
  useClickOut(listRef, () => setIsOpen(false));
  return (
    <div
      ref={listRef}
      className={`${styles.dropdown} ${isOpen ? styles.open : ""}`}
    >
      <button
        className={styles.button}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Icon name={"ch-up"} />
      </button>
      {isOpen && (
        <div className={styles.body}>
          {hiddenTabs.map((tab) => (
            <Tab
              key={tab.id}
              variant="dropdown"
              tabData={tab}
              pinToggle={pinToggle}
              onClick={() => setIsOpen(false)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TabsDropdown;
