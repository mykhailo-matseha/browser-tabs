import { useRef } from "react";
import Icon from "@/components/ui/Icon";
import styles from "./TabContextMenu.module.scss";
import { useClickOut } from "@/hooks/useClickOut";

export default function TabContextMenu({
  position,
  onClose,
  onTogglePin,
  isPinned,
}) {
  const menuRef = useRef(null);
  useClickOut(menuRef, onClose);

  return (
    <div
      ref={menuRef}
      className={styles.menu}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <button
        aria-label="toggle pin button"
        type="button"
        className={styles.item}
        onClick={() => {
          onTogglePin();
          onClose();
        }}
      >
        <Icon name="pin" />
        <span>{isPinned ? "Tab abpinnen" : "Tab anpinnen"}</span>
      </button>
    </div>
  );
}
