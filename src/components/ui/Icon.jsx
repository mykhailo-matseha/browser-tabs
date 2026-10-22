// src/components/ui/Icon/Icon.jsx
import "@/assets/styles/common/_sprites.scss";

const icons = import.meta.glob("@/assets/img/icons/*.svg", {
  eager: true,
  import: "default",
});

export default function Icon({ name }) {
  const iconPath = icons[`/src/assets/img/icons/${name}.svg`];

  if (!iconPath) {
    console.warn(`Not found`);
    return null;
  }

  const inlineStyles = {
    "--icon-url": `url("${iconPath}")`,
  };

  return <span className={`icon`} style={inlineStyles} />;
}
