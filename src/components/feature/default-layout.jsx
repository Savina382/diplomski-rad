import Navbar from "./navbar";
import style from "./default-layout.module.css";

export default function DefaultLayout({ children, heading = "" }) {
  return (
    <div className={style.defaultLayout}>
      <Navbar />
      <main className={style.defaultLayoutMain}>
        {heading && <h1 className={style.defaultLayoutHeading}>{heading}</h1>}
        {children}
      </main>
    </div>
  );
}
