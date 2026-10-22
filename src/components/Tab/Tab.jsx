import { NavLink } from "react-router";
import styles from "./Tab.module.scss";
import Icon from "../ui/Icon";
function Tab({
  variant = "menu",
  tabData,
  pinToggle,
  onClick,
  ref,
  handleContextMenu,
}) {
  const getLinkClassName = ({ isActive }) =>
    [
      styles.tab,
      styles[variant],
      isActive && styles.active,
      tabData.pinned && styles.pinned,
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <div ref={ref} onContextMenu={handleContextMenu} className={styles.wrapper}>
      <NavLink onClick={onClick} className={getLinkClassName} to={tabData.path}>
        <Icon name={tabData.icon} />
        <span>{tabData.title}</span>
        <button className={styles.close}>
          <Icon name={"cross"} />
        </button>
      </NavLink>
      {tabData.pinned && (
        <div className={styles.info}>
          <Icon name={tabData.icon} />
          <span>{tabData.title}</span>
        </div>
      )}
    </div>
  );
}

export default Tab;
