import style from "./table.module.css";

export function Table({ children, className = "", ...rest }) {
  return (
    <div className={`${style.tableContainer} ${className}`}>
      <table className={style.table} {...rest}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className = "", ...rest }) {
  return (
    <thead className={`${style.tableHeader} ${className}`} {...rest}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className = "", ...rest }) {
  return (
    <tbody className={`${style.tableBody} ${className}`} {...rest}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className = "", clickable = false, onClick, ...rest }) {
  return (
    <tr 
      className={`${style.tableRow} ${clickable ? style.clickable : ""} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </tr>
  );
}

export function TableCell({ children, className = "", header = false, align = "left", ...rest }) {
  const Component = header ? "th" : "td";
  const alignClass = style[`align${align.charAt(0).toUpperCase() + align.slice(1)}`] || "";
  
  return (
    <Component 
      className={`${header ? style.tableHeaderCell : style.tableCell} ${alignClass} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function TableFooter({ children, className = "", ...rest }) {
  return (
    <tfoot className={`${style.tableFooter} ${className}`} {...rest}>
      {children}
    </tfoot>
  );
}

// Default export is the main Table component
export default Table;
