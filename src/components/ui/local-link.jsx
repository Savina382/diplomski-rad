import { Link } from "react-router";
import style from "./local-link.module.css";

export default function LocalLink({ to, children, ...props }) {
  return <Link className={style.localLink} to={to} {...props}>{children}</Link>;
}