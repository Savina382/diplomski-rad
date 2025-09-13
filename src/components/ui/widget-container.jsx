import style from "./widget-container.module.css";

export default function WidgetContainer({
  children,
  size = "medium",
  loading = false,
  title = "",
}) {
  return (
    <div className={`${style.container} ${style[size]}`}>
      <div className={style.title}>{title}</div>
      <div className={style.content}>
        {loading ? <div className={style.loading}>Učitavanje...</div> : children}
      </div>
    </div>
  );
}
