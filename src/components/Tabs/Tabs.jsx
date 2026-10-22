import Tab from "../Tab";
import TabsDropdown from "../TabsDropdown";
import styles from "./Tabs.module.scss";

function Tabs({ initialTabs }) {
  const visibleTabs = JSON.parse(JSON.stringify(initialTabs)).slice(0, 7);
  const hiddenTabs = JSON.parse(JSON.stringify(initialTabs)).slice(7);
  const pinToggle = () => {
    console.log("pin");
  };

  return (
    <nav className={styles.tabs}>
      <div className={styles.list}>
        {visibleTabs.map((tab) => (
          <Tab
            key={tab.id}
            variant="menu"
            tabData={tab}
            pinToggle={pinToggle}
          />
        ))}
      </div>
      <TabsDropdown hiddenTabs={hiddenTabs} pinToggle={pinToggle} />
    </nav>
  );
}

export default Tabs;
