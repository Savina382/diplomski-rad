import style from "./date-input.module.css";
import FieldLabel from "./field-label";

export function DateInput({
  id,
  onChange,
  disabled,
  hasError,
  className,
  value,
  min,
  max,
  ...rest
}) {
  return (
    <input
      id={id}
      type="date"
      onChange={(e) => onChange(e.target.value, id)}
      disabled={disabled}
      className={`${style.dateInput} ${
        hasError ? style.hasError : ""
      } ${className}`}
      value={value}
      min={min}
      max={max}
      {...rest}
    />
  );
}

export default function DateInputField({
  id,
  onChange,
  disabled,
  hasError,
  className,
  inputClassName,
  value,
  label,
  bottomText,
  min,
  max,
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
      <DateInput
        id={id}
        onChange={onChange}
        disabled={disabled}
        hasError={hasError}
        className={inputClassName}
        value={value}
        min={min}
        max={max}
        {...rest}
      />
    </FieldLabel>
  );
}