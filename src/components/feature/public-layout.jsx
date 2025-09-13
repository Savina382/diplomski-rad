import style from "./public-layout.module.css";

export default function PublicLayout({ children, heading = "" }) {
  return (
    <div className={style.publicLayout}>
      <main className={style.publicLayoutMain}>
        <h1 className={style.publicLayoutHeading}>{heading}</h1>
        {children}
      </main>
    </div>
  );
}
