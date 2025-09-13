import style from "./field-label.module.css";

export default function FieldLabel({
  children,
  label,
  bottomText,
  id,
  hasError,
  displayLabel = true,
  className,
  classNameTitle,
  disabled,
  preventLableClickEvent,
}) {
  return (
    <label
      className={`${style.fieldLabel} ${hasError ? style.hasError : ""} ${
        disabled ? style.disabled : ""
      } ${className}`}
      htmlFor={id}
      onClick={(e) => preventLableClickEvent && e.preventDefault()}
    >
      <div className={`${style.fieldLabelTitle} ${classNameTitle}`}>
        {displayLabel ? label : ""}
      </div>
      {children}
      <div className={style.fieldLabelBottomText}>{bottomText}</div>
    </label>
  );
}
