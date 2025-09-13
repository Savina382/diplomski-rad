import style from "./button.module.css";

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  className = "",
  size = "medium",
  fullWidth = false,
  ...rest
}) {

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${style.button} ${style[variant]} ${style[size]} ${
        fullWidth ? style.fullWidth : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
