import style from "./text-input.module.css";
import FieldLabel from "./field-label";

export function TextInput({
  id,
  onChange,
  type = "text",
  disabled,
  hasError,
  className,
  value,
  placeholder = "Unesite vrednost...",
  ...rest
}) {
  return (
    <input
      id={id}
      type={type}
      onChange={(e) => onChange(e.target.value, id)}
      disabled={disabled}
      className={`${style.textInput} ${
        hasError ? style.hasError : ""
      } ${className}`}
      value={value}
      placeholder={placeholder}
      {...rest}
    />
  );
}

export default function TextInputField({
  id,
  onChange,
  type = "text",
  disabled,
  hasError,
  className,
  inputClassName,
  value,
  label,
  bottomText,
  ...rest
}) {
  return (
    <FieldLabel
      id={id}
      label={label}
      bottomText={bottomText}
      hasError={hasError}
      displayLabel
      className={className}
      disabled={disabled}
    >
      <TextInput
        id={id}
        onChange={onChange}
        type={type}
        disabled={disabled}
        hasError={hasError}
        className={inputClassName}
        value={value}
        {...rest}
      />
    </FieldLabel>
  );
}
